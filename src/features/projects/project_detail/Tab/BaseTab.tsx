import { Tabs, Text, rem } from '@mantine/core';
import TabList from '../../components/TabList';
import { ReactNode, useState } from 'react';

interface IBaseTabPropsType {
  children: ReactNode;
}
const BaseTab = ({ children }: IBaseTabPropsType) => {
  const [activeTab, setActiveTab] = useState<string | null>('overview');

  return (
    <Tabs
      variant="pills"
      c={'black'}
      color="transparent"
      value={activeTab}
      onChange={setActiveTab}
      classNames={{
        list: ` px-5 border border-t-2  border-t-neutral-300 pt-2 items-center  border-neutral-200 rounded-br-3xl rounded-bl-3xl rounded-tr-0 rounded-tl-0`,
      }}
      defaultValue={'tasks'}
    >
      <TabList activeTab={activeTab} />

      {children}
    </Tabs>
  );
};

export default BaseTab;
