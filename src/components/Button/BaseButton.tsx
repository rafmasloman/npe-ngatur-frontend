import { Button, ButtonProps } from '@mantine/core';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IBaseButtonPropsType extends ButtonProps {
  variant: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
}

const BaseButton = ({
  variant,
  onClick,
  children,
  ...props
}: IBaseButtonPropsType) => {
  const btnColor =
    variant === 'secondary'
      ? 'border-primary text-primary'
      : 'bg-primary text-white';

  return (
    <Button
      variant={variant === 'secondary' ? 'outline' : 'filled'}
      onClick={onClick}
      classNames={{
        root: `${btnColor} h-[45px]`,
      }}
      radius={'md'}
      {...props}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
