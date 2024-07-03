import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

interface INavbarItemsPropsType {
  items: {
    icon?: ReactNode;
    text: string;
    href: string;
  }[];
}

const NavbarItems = ({ items }: INavbarItemsPropsType) => {
  return (
    <Group gap={50}>
      {items.map((item, id) => {
        return (
          <Link key={id} href={'/'} className="text-white">
            <Group gap={5} align="center">
              {item.icon}
              <Text className="font-light">{item.text}</Text>
            </Group>
          </Link>
        );
      })}
    </Group>
  );
};

export default NavbarItems;
