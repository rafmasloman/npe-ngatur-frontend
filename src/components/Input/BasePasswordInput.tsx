import { PasswordInput, PasswordInputProps } from '@mantine/core';

const BasePasswordInput = ({ ...props }: PasswordInputProps) => {
  return (
    <PasswordInput
      withAsterisk
      placeholder="Masukkan Password"
      label="Password"
      radius={'md'}
      classNames={{
        root: ` w-full`,
        input: `p-6 mt-2.5`,
        innerInput: `h-full py-6 px-8`,
        label: `mb-0`,
      }}
      styles={{
        input: {
          fontFamily: 'poppins',
        },
        innerInput: {
          fontFamily: 'poppins',
        },
      }}
      {...props}
    />
  );
};

export default BasePasswordInput;
