import { em, Tabs } from '@mantine/core';
import { PropsWithChildren, useState } from 'react';
import ProfileTabList from './ProfileTabList';
import { useMediaQuery } from '@mantine/hooks';

const ProfileTab = ({ children }: PropsWithChildren) => {
  const [activeTab, setActiveTab] = useState<string | null>('profile');
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Tabs
      orientation={isMobile ? 'horizontal' : 'vertical'}
      variant="pills"
      value={activeTab}
      onChange={setActiveTab}
      classNames={{
        panel: `ml-1.5 md:ml-10`,
      }}
    >
      <ProfileTabList activeTab={activeTab}></ProfileTabList>

      {children}
    </Tabs>
  );
};

export default ProfileTab;
