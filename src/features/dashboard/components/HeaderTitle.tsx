import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import { COLORS } from '../../../constant/colors';

interface IHeaderTitle {
  title: string;
  href?: string;
}

const HeaderTitle = ({ title, href }: IHeaderTitle) => {
  return (
    <Group justify="space-between" className="w-full">
      <Text fw={700}>{title}</Text>
      {!href ? null : (
        <Link
          href={href}
          style={{
            color: COLORS.primary,
            fontSize: '0.875rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Lihat Semua {'>'}
        </Link>
      )}
    </Group>
  );
};

export default HeaderTitle;
