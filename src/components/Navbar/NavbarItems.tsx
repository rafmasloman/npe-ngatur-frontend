import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

interface INavbarItemsPropsType {
  items: {
    icon?: ReactNode;
    text: string;
    href: string;
    pathname?: string;
  }[];
  pathname?: string;
}

const NavbarItems = ({ items, pathname }: INavbarItemsPropsType) => {
  return (
    <Group gap={50}>
      {items.map((item, id) => {
        return (
          <Link key={id} href={item.href} className={` text-white `}>
            <Group gap={10} align="center">
              {item.icon}
              <Text
                className={` font-light ${
                  pathname === item.pathname?.toLowerCase()
                    ? 'text-amber-400 font-medium'
                    : ''
                }`}
              >
                {item.text}
              </Text>
            </Group>
          </Link>
        );
      })}
    </Group>
  );
};

export default NavbarItems;
