import { Button, NavLink, Space, Stack } from '@mantine/core';
import NavbarItems from '../components/Navbar/NavbarItems';
import ICDashboard from '../assets/icons/nav-icon/dashboard.icon';
import { ICTeams } from '../assets/icons/nav-icon/teams.icon';
import Link from 'next/link';
import {
  CLIENT_ADMIN_PAGE,
  DASHBOARD_ADMIN_PAGE,
  EDIT_PAYROLL_ADMIN_PAGE,
  EDIT_PAYROLL_PM_PAGE,
  MEMBER_ADMIN_PAGE,
  PAYROLL_ADMIN_PAGE,
  PROJECT_PM_PAGE,
  PROJECTS_ADMIN_PAGE,
  USER_ADMIN_PAGE,
} from '../constant/page_routes';
import { ICUser } from '../assets/icons/nav-icon/user.icon';
import { ICClient } from '../assets/icons/nav-icon/client.icon';
import { IoExit, IoExitOutline } from 'react-icons/io5';
import { ICPayroll } from '../assets/icons/nav-icon/payroll.icon';
import { ICProject } from '../assets/icons/nav-icon/project.icon';

const NavbarAdmin = () => {
  return (
    <Stack gap={20} className="h-full" ff={'poppins'}>
      <NavLink
        href={DASHBOARD_ADMIN_PAGE}
        label="Dashboard"
        component={Link}
        leftSection={<ICDashboard width={25} height={25} />}
        classNames={{
          root: `hover:bg-sky-50 w-[230px] rounded-lg`,
          label: `text-base ml-2.5`,
        }}
      />

      <NavLink
        label="People"
        leftSection={<ICUser width={25} height={25} />}
        classNames={{
          root: `hover:bg-sky-50 w-[230px] rounded-lg`,
          label: `text-base ml-2.5`,
        }}
        childrenOffset={28}
      >
        <Space h={16} />

        <NavLink
          label="User Management"
          href={USER_ADMIN_PAGE}
          component={Link}
          leftSection={<ICUser width={23} height={23} />}
          classNames={{
            root: `hover:bg-sky-50 w-[230px] rounded-lg`,
            label: `text-base ml-1.5`,
          }}
        />

        <Space h={16} />

        <NavLink
          label="Crew"
          href={MEMBER_ADMIN_PAGE}
          component={Link}
          leftSection={<ICTeams width={23} height={23} />}
          classNames={{
            root: `hover:bg-sky-50 w-[230px] rounded-lg`,
            label: `text-base ml-1.5`,
          }}
        />

        <Space h={16} />

        <NavLink
          label="Client"
          href={CLIENT_ADMIN_PAGE}
          component={Link}
          leftSection={<ICClient width={23} height={23} />}
          classNames={{
            root: `hover:bg-sky-50 w-[230px] rounded-lg`,
            label: `text-base ml-1.5`,
          }}
        />
      </NavLink>

      <NavLink
        href={PAYROLL_ADMIN_PAGE}
        label="Gaji / Payroll"
        component={Link}
        leftSection={<ICPayroll width={25} height={25} />}
        classNames={{
          root: `hover:bg-sky-50 w-[230px] rounded-lg`,
          label: `text-base ml-2.5`,
        }}
      />

      <NavLink
        href={PROJECTS_ADMIN_PAGE}
        label="Projects"
        component={Link}
        leftSection={<ICProject width={25} height={25} />}
        classNames={{
          root: `hover:bg-sky-50 w-[230px] rounded-lg`,
          label: `text-base ml-2.5`,
        }}
      />

      <Button
        leftSection={<IoExitOutline className="text-primary text-2xl" />}
        variant="transparent"
        hiddenFrom="md"
        classNames={{
          root: `w-fit`,
          label: `font-normal`,
        }}
      >
        Logout
      </Button>

      {/* <Link href={ROUTES.PAYROLL} className="no-underline">
        <NavLink
          label="Payroll"
          icon={<ICPayroll className="w-7 h-7" />}
          styles={{
            label: {
              fontSize: rem(16),
              marginLeft: 10,
            },
          }}
          className="hover:bg-sky-50 w-[230px] rounded-lg"
        />
      </Link>

      

      <Link href={ROUTES.PROJECTS} className="no-underline">
        <NavLink
          label="Projects"
          icon={<ICProject width={25} height={25} />}
          styles={{
            label: {
              fontSize: rem(16),
              marginLeft: 10,
            },
          }}
          className="hover:bg-sky-50 w-[230px] rounded-lg"
        />
      </Link> */}
    </Stack>
  );
};

export default NavbarAdmin;
