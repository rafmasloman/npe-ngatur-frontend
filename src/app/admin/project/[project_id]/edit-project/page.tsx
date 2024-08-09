'use client';

import { useParams } from 'next/navigation';
import { ICProject } from '../../../../../assets/icons/nav-icon/project.icon';
import ProjectForm from '../../../../../features/projects/components/ProjectForm';
import useQueryMemberProject from '../../../../../services/member/hooks/useQueryMemberProjects';
import useUpdateProject from '../../../../../services/project/hooks/useUpdateProject';
import useQueryDetailProject from '../../../../../services/project/hooks/useQueryDetailProject';
import FormAdminLayout from '../../../../../layouts/FormLayout';
import { Text } from '@mantine/core';
import { useGetUserNonMember } from '../../../../../features/member/hooks/useGetUserNonMember';

const EditProjectAdminPage = () => {
  const params = useParams<{ project_id: string }>();

  const updateProject = useUpdateProject();
  const projectManagerOptions = useGetUserNonMember();

  const project = useQueryDetailProject({
    projectId: params.project_id,
    onSuccesCb(data) {},
    onErrorCb(error) {},
  });

  const handleUpdateProject = (values: any) => {
    const formData = new FormData();

    formData.set('projectName', values.projectName);
    formData.set('member', values.member as any);
    formData.set('description', values.description);
    formData.set('platform', values.platform as any);
    formData.set('startedDate', values.startedDate as string);
    formData.set('endDate', values.endDate as string);
    formData.set('projectIcon', values.projectIcon);
    formData.set('price', values.price.toString());
    formData.set('clientId', values.clientId);
    // console.log(formData.get('projectName'));
    // console.log(formData.get('member'));
    // console.log(formData.get('description'));
    // console.log(formData.get('platform'));
    // console.log(formData.get('startedDate'));
    // console.log(formData.get('endDate'));
    // console.log(formData.get('projectIcon'));
    console.log(`project icon : `, formData.get('projectIcon'));

    updateProject.mutate({ projectId: params.project_id, params: formData });
  };

  if (!project.data?.project && project.isLoading) {
    return <Text>Loading Initial Data...</Text>;
  }

  return (
    <FormAdminLayout
      title="Edit Project"
      icon={<ICProject width={25} height={25} />}
    >
      <ProjectForm
        formType="edit-form"
        isLoading={updateProject.isSuccess}
        initialValues={{
          projectName: project.data?.project.projectName,
          description: project.data?.project.description,
          price: project.data?.project.price,
          startedDate: project.data?.project.startedDate,
          endDate: project.data?.project.endDate,
          projectIcon: project.data?.project.projectIcon,
          member: project.data?.project.projectManager,
          platform: project.data?.project.platform,
          clientId: project.data?.project.client.id,
        }}
        onSubmit={handleUpdateProject}
      />
    </FormAdminLayout>
  );
};

export default EditProjectAdminPage;
