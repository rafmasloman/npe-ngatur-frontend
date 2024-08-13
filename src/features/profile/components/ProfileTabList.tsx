import { Tabs, rem } from '@mantine/core';
import { IconType } from 'react-icons';
import { TbUserCode } from 'react-icons/tb';
import { BiEdit } from 'react-icons/bi';
import { HiOutlineKey } from 'react-icons/hi2';

interface ProfileTabListDataType {
  id: number;
  value: string;
  text: string;
  icon: IconType;
}

const ProfileTabListData: ProfileTabListDataType[] = [
  {
    id: 1,
    value: 'profile',
    text: 'My Profile',
    icon: TbUserCode,
  },
  {
    id: 2,
    value: 'edit-profile',
    text: 'Edit Profile',
    icon: BiEdit,
  },
  {
    id: 3,
    value: 'account',
    text: 'Account',
    icon: HiOutlineKey,
  },
];

const ProfileTabList = ({ activeTab }: { activeTab: string | null }) => {
  return (
    <Tabs.List
      classNames={{
        list: `border-r-2 border-r-neutral-200 md:min-h-screen border-solid `,
      }}
    >
      {ProfileTabListData.map((item: ProfileTabListDataType) => {
        const TabIcon = item.icon;
        return (
          <Tabs.Tab
            key={item.id}
            fz={rem(16)}
            // mr={rem(50)}
            // mb={rem(20)}
            value={item.value}
            leftSection={
              <TabIcon
                className={`${
                  activeTab === item.value
                    ? ' text-blue-500'
                    : 'text-custom_black'
                } text-2xl `}
              />
            }
            classNames={{
              tabLabel: `${
                activeTab === item.value
                  ? 'text-blue-500 font-medium'
                  : 'text-cust-black'
              } `,
              // tab: `hover:bg-transparent border-transparent hover:border-b-primary border-4 border-solid rounded-none ${
              //   activeTab === item.value ? 'border-b-primary' : ''
              // }`,
              tab: `${
                activeTab === item.value ? 'bg-blue-100 rounded-2xl' : ''
              } md:mr-12 md:mb-5`,
            }}
          >
            {item.text}
          </Tabs.Tab>
        );
      })}
    </Tabs.List>
  );
};

export default ProfileTabList;
