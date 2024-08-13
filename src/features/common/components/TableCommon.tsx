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

interface ITableCommonPropsType {
  tableHead: ITableHeadDataType[];
  tableBody: ReactNode;
}

const TableCommon = ({ tableHead, tableBody }: ITableCommonPropsType) => {
  return (
    <Table
      classNames={{
        th: `py-5 font-normal text-base text-neutral-400 text-nowrap`,
        td: `py-5 text-nowrap `,
        tr: `text-nowrap text-base font-medium`,
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

export default TableCommon;
