'use client';

import { DateInput, DateInputProps } from '@mantine/dates';

const BaseDateInput = ({ ...props }: DateInputProps) => {
  return (
    <DateInput
      radius={'md'}
      ff={'poppins'}
      classNames={{ input: `p-6 mt-2.5 h-[42px]` }}
      {...props}
      styles={{
        input: {
          fontFamily: 'poppins',
        },
        calendarHeader: {
          fontFamily: 'poppins',
        },
        calendarHeaderControl: {
          fontFamily: 'poppins',
        },
        calendarHeaderLevel: {
          fontFamily: 'poppins',
        },
        month: {
          fontFamily: 'poppins',
        },
        day: {
          fontFamily: 'poppins',
        },
      }}
    />
  );
};

export default BaseDateInput;
