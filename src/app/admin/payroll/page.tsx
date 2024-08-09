'use client';

import {
  ActionIcon,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  Table,
  Text,
} from '@mantine/core';
import TableLayout from '../../../layouts/TableLayout';
import BaseTable from '../../../components/Table/BaseTable';
import { COLORS } from '../../../constant/colors';
import { IconPencilCode } from '@tabler/icons-react';
import { ICPayroll } from '../../../assets/icons/nav-icon/payroll.icon';
import useQueryPayrolls from '../../../services/payroll/hooks/useQueryPayrolls';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import PayrollForm from '../../../features/payroll/components/PayrollForm';
import useQueryPayrollDetail from '../../../services/payroll/hooks/useQueryPayrollDetail';
import useUpdatePayroll from '../../../services/payroll/hooks/useUpdatePayroll';

const tableHead = [
  { key: 'fullname', title: 'Nama Member' },
  { key: 'position', title: 'Jobdesk' },
  { key: 'percent', title: 'Persenan' },
  { key: 'salary', title: 'Gaji' },
  { key: 'status', title: 'Status' },
  { key: 'project', title: 'Project' },
  { key: 'action', title: 'Action' },
];

const PayrollAdminPage = () => {
  const [payrollTableData, setPayrollTableData] = useState<any>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [visible, { toggle }] = useDisclosure(true);

  const [projectId, setProjectId] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [payrollid, setPayrollid] = useState<string | null>(null);
  const [isLoadingPayrollDetail, setIsLoadingPayrollDetail] =
    useState<boolean>(true);

  const queryPayrolls = useQueryPayrolls({
    onSuccesCb(data) {
      setPayrollTableData(data);
    },
    onErrorCb(error) {},
  });

  const queryPayrollDetail = useQueryPayrollDetail(
    !payrollid ? undefined : payrollid,
  );

  const handleOpenModalEditPayroll = (
    payrollId: string,
    projectId: string,
    memberId: string,
  ) => {
    setProjectId(projectId);
    setMemberId(memberId);
    setPayrollid(payrollId);

    open();
  };

  const updatePayroll = useUpdatePayroll();

  const handleSubmitForm = (values: any) => {
    if (projectId && memberId) {
      const updatePayload = {
        memberId,
        projectId,
        percent: values.percent,
      };

      if (payrollid) {
        updatePayroll.mutate({
          payId: payrollid,
          payload: {
            ...updatePayload,
            transactionStatus: values.status,
          },
        });
      }
    }
  };

  const tBody = queryPayrolls.data?.map((payroll: any, index: number) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>{`${payroll.member.user.firstname} ${payroll.member.user.lastname}`}</Table.Td>

        <Table.Td>{payroll.member.position}</Table.Td>
        <Table.Td>{payroll.percent}</Table.Td>
        <Table.Td>{payroll.salary}</Table.Td>
        <Table.Td>
          <Text
            className={`${
              payroll.payrollStatus === 'UNPAID'
                ? 'text-red-600 text-sm'
                : 'text-green-600 text-sm'
            } font-medium`}
          >
            {payroll.payrollStatus}
          </Text>
        </Table.Td>
        <Table.Td>
          <Group>
            <Image
              className="w-5 h-5"
              alt="Projects Icon"
              src={`${process.env.NEXT_PUBLIC_API_DOWNLOAD_FILES_URL}/projects/${payroll.project.projectIcon}`}
            />
            <Text className="text-sm">{payroll.project.projectName}</Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <ActionIcon
            variant="outline"
            radius={'xl'}
            color={'gray'}
            c={COLORS.secondary}
            opacity={'0.7'}
            size={'lg'}
            onClick={() =>
              handleOpenModalEditPayroll(
                payroll.id,
                payroll.project.id,
                payroll.member.id,
              )
            }
          >
            <IconPencilCode size={'1.125rem'} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  useEffect(() => {
    if (!queryPayrollDetail.data) {
      setIsLoadingPayrollDetail(true);
    } else {
      setIsLoadingPayrollDetail(false);
    }
  }, [queryPayrollDetail.data]);

  if (queryPayrolls.isLoading) {
    return <Text className="text-center">Loading Payroll Data....</Text>;
  }

  return (
    <>
      <TableLayout
        tableTitle="Tabel Gaji"
        tableIcon={<ICPayroll width={25} height={25} />}
      >
        <Modal
          opened={opened}
          onClose={close}
          radius={'lg'}
          shadow="md"
          title={
            <Group ff={'poppins'}>
              <ICPayroll width={'25'} height={'25'} />
              <Text className="font-semibold text-lg">Ubah Form Gaji</Text>
            </Group>
          }
          classNames={{
            body: `px-5 pb-8`,
            title: `pt-2.5`,
          }}
        >
          <LoadingOverlay
            visible={isLoadingPayrollDetail}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'pink', type: 'bars' }}
          />

          <PayrollForm
            onSubmit={handleSubmitForm}
            initialValues={{
              percent: queryPayrollDetail.data?.percent,
              status: queryPayrollDetail.data?.payrollStatus,
            }}
          />
        </Modal>
        <BaseTable tableHead={tableHead} tableBody={tBody} />
      </TableLayout>
    </>
  );
};

export default PayrollAdminPage;
