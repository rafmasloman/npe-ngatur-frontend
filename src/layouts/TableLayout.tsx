'use client';

import {
  Box,
  Container,
  Divider,
  Group,
  Space,
  Table,
  Text,
} from '@mantine/core';
import { PropsWithChildren, ReactNode } from 'react';

const tableHead = [
  { title: 'Name' },
  { title: 'Email' },
  { title: 'Role' },
  { title: 'Action' },
];

interface ITableAdminLayout extends PropsWithChildren {
  tableIcon?: ReactNode;
  tableTitle: string;

  headerRightSection?: ReactNode;
}

const TableAdminLayout = ({
  tableIcon,
  tableTitle,
  headerRightSection,
  ...props
}: ITableAdminLayout) => {
  return (
    <Container
      size={'lg'}
      className="bg-white py-4 relative border  border-neutral-200 rounded-2xl md:py-7 px-4 md:px-8 lg:px-14 lg:-mt-12"
    >
      <Group justify="space-between">
        <Group>
          {tableIcon}
          <Text className="text-base md:text-lg">{tableTitle}</Text>
        </Group>

        {headerRightSection}
      </Group>

      <Divider className="absolute left-0 w-full border-t-2 border-neutral-300 mt-5 border-0" />

      <Space h={50} />

      <Box className="overflow-scroll no-scrollbar">{props.children}</Box>
    </Container>
  );
};

export default TableAdminLayout;
