export const filterCompletedTaskOnProject = (task: any) => {
  const completedTask = task?.filter(
    (task: any) => task.status.toLowerCase() === 'Completed'.toLowerCase(),
  );

  return completedTask;
};
