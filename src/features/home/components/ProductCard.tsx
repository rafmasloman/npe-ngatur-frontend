'use client';

import { Card, Stack, Text } from '@mantine/core';

export interface IProductCardProps {
  name: string;
  description: string;
  icon: JSX.Element;
}

const ProductCard = ({ name, description, icon }: IProductCardProps) => {
  return (
    <Card
      radius={'lg'}
      shadow="xs"
      withBorder
      ff={'poppins'}
      className="w-[300px] h-[265px] border-[1px] border-solid border-[#B7B7B7]"
    >
      <Stack>
        <div className="p-2.5 border-[1px] border-solid rounded-lg border-[#B7B7B7] w-fit h-fit flex items-center">
          {icon}
        </div>

        <Text className="font-semibold text-lg">{name}</Text>
        <Text className="w-full leading-relaxed tracking-wide text-[#808080]">
          {description}
        </Text>
      </Stack>
    </Card>
  );
};

export default ProductCard;
