import { Tabs, rem } from '@mantine/core';

interface TabListDataType {
  id: number;
  value: string;
  text: string;
}

const TabListData: TabListDataType[] = [
  {
    id: 1,
    value: 'tasks',
    text: 'Task',
  },
  {
    id: 2,
    value: 'overview',
    text: 'Overview',
  },
  {
    id: 3,
    value: 'milestone',
    text: 'Milestone',
  },
];

const TabList = ({ activeTab }: { activeTab: string | null }) => {
  console.log('tab : ', activeTab);

  return (
    <Tabs.List>
      {TabListData.map((item: TabListDataType) => {
        return (
          <Tabs.Tab
            key={item.id}
            fz={rem(16)}
            mr={rem(50)}
            value={item.value}
            pb={rem(20)}
            pl={0}
            className=""
            classNames={{
              tabLabel: `${
                activeTab === item.value ? 'text-primary' : 'text-cust-black'
              }`,
              tab: `hover:bg-transparent border-transparent hover:border-b-primary border-4 border-solid rounded-none ${
                activeTab === item.value ? 'border-b-primary' : ''
              }`,
            }}
          >
            {item.text}
          </Tabs.Tab>
        );
      })}
    </Tabs.List>
  );
};

export default TabList;
