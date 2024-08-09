'use client';

import { ICProject } from '../../../../assets/icons/nav-icon/project.icon';
import ProjectForm from '../../../../features/projects/components/ProjectForm';
import FormAdminLayout from '../../../../layouts/FormLayout';
import useCreateProject from '../../../../services/project/hooks/useCreateProject';

const AddProjectAdminPage = () => {
  const createProject = useCreateProject();

  const handleCreateProject = (values: any) => {
    const formData = new FormData();

    formData.set('projectName', values.projectName);
    formData.set('member', values.member as any);
    formData.set('description', values.description);
    formData.set('platform', values.platform as any);
    formData.set('startedDate', values.startedDate as string);
    formData.set('endDate', values.endDate as string);
    formData.set('projectIcon', values.projectIcon);
    formData.set('price', values.price.toString());
    formData.set('clientId', values.clientId as string);

    createProject.mutate(formData);
  };

  return (
    <FormAdminLayout
      title="Tambah Project"
      icon={<ICProject width={25} height={25} />}
    >
      <ProjectForm
        formType="create-form"
        isLoading={createProject.isSuccess}
        onSubmit={handleCreateProject}
      />
    </FormAdminLayout>
  );
};

export default AddProjectAdminPage;
