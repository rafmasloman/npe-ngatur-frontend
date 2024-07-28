import { TextInput, TextInputProps } from '@mantine/core';

const BaseTextInput = ({ ...props }: TextInputProps) => {
  return (
    <TextInput
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

export default BaseTextInput;
