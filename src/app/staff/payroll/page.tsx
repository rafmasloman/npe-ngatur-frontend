'use client';

import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Table,
  Tabs,
  Text,
} from '@mantine/core';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import useQueryPayrollMember from '../../../services/payroll/hooks/useQueryPayrollMember';

import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import TablePayroll from '../../../features/payroll/components/TablePayroll';
import useQueryPayrolls from '../../../services/payroll/hooks/useQueryPayrolls';
import { IoFileTrayStacked } from 'react-icons/io5';
import { countMemberTotalPayroll } from '../../../features/payroll/helper/payrollHelper';
import { ICHand } from '../../../assets/icons/hand.icon';
import { formatToRupiah } from '../../../utils/currency.utils';
import BalanceCard from '../../../features/common/components/BalanceCard';

const tableHead = [
  { key: 'project', title: 'Project' },
  { key: 'salary', title: 'Gaji' },
  { key: 'percent', title: 'Percent' },
  { key: 'position', title: 'Jobdesk' },
  { key: 'status', title: 'Status' },
];

const PayrollStaffPage = () => {
  const user = useContext(AuthContext);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [projectId, setProjectId] = useState<string | undefined>(undefined);

  const payroll = useQueryPayrolls({
    onSuccesCb(data) {},
    onErrorCb(error) {},
  });

  const memberPayroll = useQueryPayrollMember(user.user?.id);

  const handleOpenProjectModal = () => {
    open();
  };

  const tBody = memberPayroll.data?.payroll?.map(
    (payroll: any, index: number) => {
      return (
        <Table.Tr key={index}>
          <Table.Td>
            <Flex direction={'row'} align={'center'} gap={10}>
              {!payroll.project?.projectIcon ? (
                <IoFileTrayStacked size={25} className="text-sky-600" />
              ) : (
                <Avatar size={25} src={payroll.project?.projectIcon} />
              )}
              <Text className="text-base font-medium">{`${payroll.project?.projectName}`}</Text>
            </Flex>
          </Table.Td>
          <Table.Td>{formatToRupiah(payroll.salary)}</Table.Td>
          <Table.Td>{payroll.percent}%</Table.Td>
          <Table.Td>{memberPayroll.data?.position}</Table.Td>
          <Table.Td>
            {
              <Badge
                size="lg"
                classNames={{
                  label: `font-medium`,
                }}
                color={payroll.payrollStatus === 'UNPAID' ? 'red' : 'green'}
              >
                {payroll.payrollStatus}
              </Badge>
            }
          </Table.Td>
        </Table.Tr>
      );
    },
  );

  // if (projects.isLoading && !projects.data) {
  //   return <Text>Loading Your Project...</Text>;
  // }

  return (
    <Stack className="container mx-auto">
      <Grid align="center">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack className="w-full">
            <Group>
              <Text className="text-2xl font-medium w-fit">
                Hi, {user.user?.firstname} {user.user?.lastname}!
              </Text>
              <ICHand width={'30'} height={'30'} />
            </Group>

            <Text className="text-justify lg:text-left text-balance text-neutral-400 w-fit">
              Anda dapat melihat daftar gaji anda untuk setiap project yang
              telah anda kerjakan selama ini, jika terdapat kesalahan dapat
              menghubungi penanggung jawab / project manager anda
            </Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <BalanceCard
            title="Balance Payroll"
            className="w-full h-fit  bg-gradient-to-r from-sky-950 to-cyan-950 p-4 sm:p-7 rounded-3xl border border-neutral-300"
            balance={
              memberPayroll.data?.payroll?.length <= 0
                ? 0
                : countMemberTotalPayroll(
                    memberPayroll?.data?.payroll?.map((pay: any) => pay.salary),
                  )
            }
          />
        </Grid.Col>
      </Grid>

      <Stack
        mt={'xl'}
        bg={'white'}
        className="p-7 border border-neutral-200 rounded-xl shadow-xs"
      >
        <Group justify="space-between">
          <Text className="font-semibold text-lg">Daftar Gaji Anda</Text>
        </Group>
        <TablePayroll tableBody={tBody} tableHead={tableHead} />
      </Stack>

      <Space h={30} />
    </Stack>
  );
};

export default PayrollStaffPage;
