import { NumberInput, NumberInputProps } from '@mantine/core';

const BaseNumberInput = ({ ...props }: NumberInputProps) => {
  return (
    <NumberInput
      radius={'md'}
      ff={'poppins'}
      classNames={{
        input: `py-6 px-8 mt-2.5 h-[42px] `,
        
      }}
      styles={{
        input: {
          fontFamily: 'poppins',
        },
      }}
      {...props}
    />
  );
};

export default BaseNumberInput;
