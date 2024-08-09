import { Select, SelectProps } from '@mantine/core';

const BaseSelectInput = ({ ...props }: SelectProps) => {
  return (
    <Select
      classNames={{
        input: `h-[50px] `,
        label: `${!props.description ? 'mb-2.5' : 'mb-0'}`,
        description: `mb-2.5`,
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
        description: {
          fontFamily: 'poppins',
        },
      }}
      {...props}
    />
  );
};

export default BaseSelectInput;
