import { Table } from '@mantine/core';
import { ReactNode } from 'react';

interface ITableHeadDataType {
  key: string;
  title: string;
}

interface ITableBodyDataType {
  key: string | number;
  rows: ReactNode | string;
}

interface IBaseTablePropsType {
  tableHead: ITableHeadDataType[];
  tableBody: ReactNode;
}

const BaseTable = ({ tableHead, tableBody }: IBaseTablePropsType) => {
  return (
    <Table
      classNames={{
        th: `py-5 font-medium text-sm text-nowrap`,
        td: `py-5 text-nowrap`,
        tr: `border-neutral-300`,
      }}
    >
      <Table.Thead>
        <Table.Tr>
          {tableHead.map((th) => {
            return <Table.Th key={th.key}>{th.title}</Table.Th>;
          })}
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>{tableBody}</Table.Tbody>
    </Table>
  );
};

export default BaseTable;
