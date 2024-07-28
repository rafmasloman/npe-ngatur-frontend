import { Select, SelectProps } from '@mantine/core';

const BaseSelectInput = ({ ...props }: SelectProps) => {
  return (
    <Select
      classNames={{
        input: `h-[50px] `,
        label: `mb-2.5`,
      }}
      radius={'md'}
      styles={{
        input: {
          fontFamily: 'poppins',
        },
        label: {
          fontFamily: 'poppins',
        },
        dropdown: {
          fontFamily: 'poppins',
        },
      }}
      {...props}
    />
  );
};

export default BaseSelectInput;
