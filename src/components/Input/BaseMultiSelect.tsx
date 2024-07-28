import { MultiSelect, MultiSelectProps } from '@mantine/core';

const BaseMultiSelectInput = ({ ...props }: MultiSelectProps) => {
  return (
    <MultiSelect
      classNames={{
        input: `h-[50px] `,
        pillsList: `h-full `,
        label: `mb-2.5`,
      }}
      ff={'Poppins'}
      radius={'md'}
      styles={{
        input: {
          fontFamily: 'poppins',
        },
        dropdown: {
          fontFamily: 'poppins',
        },
        option: {
          fontFamily: 'poppins',
        },
      }}
      {...props}
    />
  );
};

export default BaseMultiSelectInput;
