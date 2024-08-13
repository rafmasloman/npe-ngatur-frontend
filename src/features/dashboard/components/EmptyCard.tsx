import { Card, Group, Text } from '@mantine/core';

interface IEmptyCardProps {
  label: string;
  fullHeight?: boolean;
}

const EmptyCard = ({ label, fullHeight }: IEmptyCardProps) => {
  return (
    <Card
      shadow="sm"
      radius={'lg'}
      className=""
      classNames={{
        root: `${
          fullHeight ? 'h-full' : 'h-[150px]'
        } w-full bg-slate-200 border-2 border-dashed border-neutral-300`,
      }}
    >
      <Group align="center" justify="center" className="h-full">
        <Text className="text-center text-neutral-400">
          Not have {label} yet
        </Text>
      </Group>
    </Card>
  );
};

export default EmptyCard;
