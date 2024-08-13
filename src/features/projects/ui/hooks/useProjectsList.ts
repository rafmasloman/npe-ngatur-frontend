import useQueryProjects from '../../../../services/project/hooks/useQueryProjects';

const useProjectsList = () => {
  const projectsData = useQueryProjects({
    onSuccesCb(data) {
      return data;
    },
    onErrorCb(error) {
      return error;
    },
  });

  console.log('hooks ui projects data : ', projectsData.data);

  return projectsData;
};

export default useProjectsList;
