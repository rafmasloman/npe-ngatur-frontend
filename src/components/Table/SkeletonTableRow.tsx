import { Skeleton } from '@mantine/core';

const SkeletonTableRow = (data: any[]) => {
  data.map((d, index) => {
    return <Skeleton key={index} height={20} radius="xl" />;
  });
};

export default SkeletonTableRow;
