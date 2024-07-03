import { Button, ButtonProps } from '@mantine/core';
import { ReactNode } from 'react';

interface IBaseButtonPropsType extends ButtonProps {
  variant: 'primary' | 'secondary';
  children: ReactNode;
}

const BaseButton = ({ variant, children, ...props }: IBaseButtonPropsType) => {
  const btnColor =
    variant === 'secondary'
      ? 'border-primary text-primary'
      : 'bg-primary text-white';

  return (
    <Button
      variant={variant === 'secondary' ? 'outline' : 'filled'}
      classNames={{
        root: `${btnColor} h-[48px]`,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
