export const filterTaskStatus = ({
  todos,
  status,
}: {
  todos?: any[];
  status: string;
}) => {
  const statusValue = todos?.filter((t: any) =>
    t.status.toLowerCase().includes(status),
  );

  return statusValue;
};
