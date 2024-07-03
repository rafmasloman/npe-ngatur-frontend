export const countStatusTask = (status: string, tasks?: any[]) => {
  const totalTodoState = tasks?.filter((task: any) => {
    return task.status === status;
  }).length;

  console.log(`total task data ${status} : `, tasks);

  return totalTodoState;
};

export const getProjectManager = (member?: any[]) => {
  const pm = member?.find((m) => {
    return m.role === 'PROJECT_MANAGER';
  });

  return pm;
};

export const totalPercentTaskCompleted = (
  totalTask?: number,
  taskCompleted?: number,
) => {
  if (totalTask && taskCompleted) {
    const totalTaskPercent = Math.trunc((taskCompleted / totalTask) * 100);
    return totalTaskPercent;
  } else {
    return 0;
  }
};

export const countTaskPercentage = (total?: number, totalTask?: number) => {
  if (!total && !totalTask) {
    return 0;
  } else if (total && totalTask) {
    const countPercentage = (total / totalTask) * 100;

    return countPercentage;
  }
};
