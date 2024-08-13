import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import useQueryMemberProject from '../../../services/member/hooks/useQueryMemberProjects';

const useGetProjectsMember = () => {
  const user = useContext(AuthContext);
  const [projectsOption, setProjectsOption] = useState<
    { label: string; value: string }[]
  >([]);

  const projects = useQueryMemberProject(user.user?.id);

  useEffect(() => {
    if (projects.data) {
      projects.data.member.project.map((ctx: any) => {
        setProjectsOption([{ label: ctx.projectName, value: ctx.id }]);
      });
    }
  }, [projects.data]);

  return projectsOption;
};

export default useGetProjectsMember;
