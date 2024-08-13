'use client';

import {
  ActionIcon,
  Avatar,
  Card,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  SimpleGrid,
  Space,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import PayrollForm from '../../../../../features/payroll/components/PayrollForm';
import { ICPayroll } from '../../../../../assets/icons/nav-icon/payroll.icon';
import useCreatePayroll from '../../../../../services/payroll/hooks/useCreatePayroll';
import useQueryProjectMemberPayroll from '../../../../../services/project/hooks/useQueryProjectMemberPayroll';
import TablePayroll from '../../../../../features/payroll/components/TablePayroll';
import { PAYROLL_PM_PAGE } from '../../../../../constant/page_routes';
import Link from 'next/link';
import { COLORS } from '../../../../../constant/colors';
import { BsMicrosoftTeams } from 'react-icons/bs';
import PayrollDashboardCard from '../../../../../features/common/components/PayrollDashboardCard';
import { FaCircleDollarToSlot } from 'react-icons/fa6';
import { BiPencil, BiPlus } from 'react-icons/bi';
import { useDisclosure } from '@mantine/hooks';
import { IoReturnDownBack } from 'react-icons/io5';
import { MasterCardLogo } from '../../../../../assets/images';
import { formatToRupiah } from '../../../../../utils/currency.utils';
import { useConfirmationModal } from '../../../../../features/common/hooks/useConfirmationModal';
import { useState } from 'react';
import useQueryPayrollDetail from '../../../../../services/payroll/hooks/useQueryPayrollDetail';
import useUpdatePayroll from '../../../../../services/payroll/hooks/useUpdatePayroll';

const tableHead = [
  { key: 'fullname', title: 'Member Name' },
  { key: 'phoneNumber', title: 'No.Telp' },
  { key: 'position', title: 'Jobdesk' },
  { key: 'salary', title: 'Gaji' },
  { key: 'persent', title: 'Jumlah Persen' },
  { key: 'assign-payroll', title: 'Tambahkan Payroll' },
  { key: 'action', title: 'Action' },
];

const AddPayrollManagement = () => {
  const params = useParams<{ projectId: string }>();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  const [memberId, setMemberId] = useState<string | null>(null);
  const [payrollID, setPayrollID] = useState<string | undefined>(undefined);

  const createPayroll = useCreatePayroll();
  const projectMemberPayroll = useQueryProjectMemberPayroll({
    projectId: params.projectId,
    onSuccesCb(data) {},
    onErrorCb(error) {},
  });

  const updatePayroll = useUpdatePayroll();

  const payrollDetail = useQueryPayrollDetail(payrollID);

  const modal = useConfirmationModal();

  const payrolOnMem = projectMemberPayroll.data?.member?.filter(
    (member: any) => {
      if (member.payroll.length > 0) {
        return member;
      }
    },
  );

  const handleOpenModalAssignPayroll = (memberId: string) => {
    setMemberId(memberId);
    open();
  };

  const handleCloseModalPayroll = () => {
    setMemberId(null);
    setPayrollID(undefined);
    modal.close();
    close();
  };

  const handleOpenModalEditPayroll = (memberId: string, payrollId: string) => {
    console.log('pay id : ', payrollId);
    console.log('mem id : ', memberId);
    setPayrollID(payrollId);
    setMemberId(memberId);
    modal.open();
  };

  const getMemberSalary = (ctx: any) => {
    if (ctx.payroll.length <= 0) {
      return 0;
    } else {
      const salary = ctx.payroll?.map((pay: any) => {
        if ((pay.memberId = ctx.id)) {
          return pay.salary;
        }
      });

      return salary[0];
    }
  };

  console.log('project member : ', projectMemberPayroll.data);

  const tBody = projectMemberPayroll?.data?.member?.map(
    (ctx: any, index: number) => {
      return (
        <Table.Tr className="bg-white text-nowrap hover:bg-sky-100" key={index}>
          <Table.Td>
            {
              <Flex
                direction={'row'}
                align={'center'}
                gap={10}
                className="text-nowrap"
              >
                <Avatar
                  size={30}
                  src={
                    !projectMemberPayroll?.data?.projectIcon
                      ? ''
                      : projectMemberPayroll.data.projectIcon
                  }
                />
                <Text className="text-sm">{`${ctx?.user?.firstname} ${ctx?.user?.lastname}`}</Text>
              </Flex>
            }
          </Table.Td>
          <Table.Td>{ctx?.phoneNumber}</Table.Td>
          <Table.Td>{ctx?.position}</Table.Td>
          <Table.Td>
            <Text>{formatToRupiah(getMemberSalary(ctx))}</Text>
          </Table.Td>
          <Table.Td>
            <Text>
              {ctx?.payroll.length <= 0 ? 0 : ctx?.payroll[0]?.percent}%
            </Text>
          </Table.Td>
          <Table.Td>
            {ctx?.payroll?.length <= 0 ? (
              <ActionIcon
                variant="filled"
                radius={'xl'}
                // size={'lg'}
                className="w-fit p-2.5 "
                onClick={() => handleOpenModalAssignPayroll(ctx?.id)}
              >
                <Flex direction={'row'} align={'center'} gap={5}>
                  <BiPlus size={'1.125rem'} />
                  <Text className="text-sm">Assign Payroll</Text>
                </Flex>
              </ActionIcon>
            ) : (
              <ActionIcon
                variant="filled"
                radius={'xl'}
                // size={'lg'}
                className="w-fit p-2.5 disabled:bg-neutral-200"
                disabled
              >
                <Flex direction={'row'} align={'center'} gap={5}>
                  <Text className="text-sm">Payroll has assigned</Text>
                </Flex>
              </ActionIcon>
            )}
          </Table.Td>
          <Table.Td>
            <Group align="center">
              {/* <ActionIcon
                variant="outline"
                radius={'xl'}
                color={'red'}
                c={COLORS.danger}
                opacity={'0.7'}
                size={'lg'}
                onClick={() => modal.handleConfirm(ctx?.id)}
              >
                <IconTrash size={'1.125rem'} />
              </ActionIcon> */}

              <ActionIcon
                variant="outline"
                radius={'xl'}
                color={'indigo'}
                disabled={ctx?.payroll.length <= 0}
                c={
                  ctx?.payroll.length <= 0
                    ? COLORS.custom_black
                    : COLORS.primary
                }
                opacity={'0.7'}
                size={'lg'}
                onClick={() =>
                  handleOpenModalEditPayroll(ctx?.id, ctx?.payroll[0]?.id)
                }
              >
                <BiPencil size={'1.125rem'} />
              </ActionIcon>
            </Group>
          </Table.Td>
        </Table.Tr>
      );
    },
  );

  const handleSubmitForm = (values: any) => {
    if (memberId) {
      const createPayload = {
        memberId,
        projectId: params.projectId,
        percent: values.percent,
      };

      createPayroll.mutate(createPayload);
    }
  };

  const handleSubmitEditForm = (values: any) => {
    if (!!memberId && !!payrollID) {
      const updatePayload = {
        memberId,
        projectId: params.projectId,
        percent: values.percent,
      };

      updatePayroll.mutate({ payId: payrollID, payload: updatePayload });
      console.log('update : ', updatePayload);
    }
  };

  //   if (payroll.isLoading && !payroll.data && users.userOptions === undefined) {
  //     return <Text>Loading Initial Data...</Text>;
  //   }

  return (
    <Stack className="container mx-auto">
      <Modal
        opened={opened}
        onClose={handleCloseModalPayroll}
        radius={'lg'}
        shadow="sm"
        title={
          <Group ff={'poppins'}>
            <ICPayroll width={'25'} height={'25'} />
            <Text className="font-semibold text-lg">Form Gaji</Text>
          </Group>
        }
      >
        <PayrollForm onSubmit={handleSubmitForm} />
      </Modal>

      <Modal
        opened={modal.opened}
        onClose={handleCloseModalPayroll}
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
        {!payrollDetail.data ? (
          <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'pink', type: 'bars' }}
          />
        ) : (
          <PayrollForm
            onSubmit={handleSubmitEditForm}
            initialValues={{
              percent: payrollDetail?.data?.percent,
              status: payrollDetail?.data?.payrollStatus,
            }}
          />
        )}
      </Modal>

      <ActionIcon
        onClick={() => router.push(`${PAYROLL_PM_PAGE}`)}
        radius={'lg'}
        color="gray"
        classNames={{ root: `w-fit p-3` }}
      >
        <Group>
          <IoReturnDownBack size={25} />
          <Text>Kembali</Text>
        </Group>
      </ActionIcon>

      <Space h={20} />

      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <Card
          shadow="xs"
          className="h-full p-5 lg:p-8 border text-white border-neutral-200 shadow rounded-3xl bg-gradient-to-r from-indigo-950 via-custom_black to-sky-950"
        >
          <Stack gap={30} className="h-full">
            <Group justify="space-between" className="w-full">
              <Text className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                Hi, Rafly Masloman
              </Text>
              <Avatar
                src={MasterCardLogo.src}
                size={30}
                className="w-fit"
                // visibleFrom="sm"
              />
            </Group>

            <Group justify="space-between" className="h-full">
              <Stack className="h-full">
                <Text className="text-xs lg:text-sm text-neutral-300">
                  Your Project :{' '}
                </Text>
                <Group gap={10}>
                  <Avatar size={40} />
                  <Text className="text-base sm:text-xl lg:text-2xl font-semibold">
                    {projectMemberPayroll.data?.projectName}
                  </Text>
                </Group>
                <Text className="text-xs lg:text-base text-neutral-300">
                  {projectMemberPayroll.data?.description}
                </Text>
              </Stack>

              <Stack align="end" justify="end" className="h-full">
                <Text className="md:text-base text-xs text-neutral-300">
                  Harga Project
                </Text>

                <Text className="font-semibold sm:text-xl text-lg lg:text-3xl">
                  {formatToRupiah(projectMemberPayroll.data?.price)}
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Card>

        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 1 }}
          spacing={20}
          // bg={'white'}
          // className="p-2.5 lg:p-5 border border-neutral-200 shadow rounded-3xl"
        >
          <PayrollDashboardCard
            icon={<BsMicrosoftTeams size={30} color="rgba(0, 191, 255, 1)" />}
            description="Total Member"
            totalData={projectMemberPayroll.data?.member?.length}
            // classNames={{
            //   root: `md:border-r md:border-b md:border-b-neutral-300 md:border-r-neutral-300`,
            // }}
          />

          <PayrollDashboardCard
            icon={<FaCircleDollarToSlot size={30} color="teal" />}
            description="Total terbayar"
            totalData={payrolOnMem?.length}
            // classNames={{
            //   root: `md:border-b md:border-b-neutral-300`,
            // }}
          />

          {/* <PayrollDashboardCard
            icon={<FaMoneyBillTransfer size={30} color="orange" />}
            description="Sisa Harga Project"
            totalData={formatToRupiah(
              projectMemberPayroll.data?.currentPayroll,
            )}
            classNames={{
              root: `md:border-r md:border-r-neutral-300`,
            }}
          />

          <PayrollDashboardCard
            icon={<FaMoneyCheckDollar size={30} color="blue" />}
            description="Total gaji yang diberikan"
            totalData={`${formatToRupiah(32000000)}`}
          /> */}
        </SimpleGrid>
      </SimpleGrid>

      <Space h={40} />
      <Stack gap={10} className="overflow-scroll no-scrollbar">
        <Text className="font-semibold text-xl text-custom_black">
          Daftar Gaji Member
        </Text>
        <TablePayroll tableHead={tableHead} tableBody={tBody} />
      </Stack>
    </Stack>
  );
};

export default AddPayrollManagement;
