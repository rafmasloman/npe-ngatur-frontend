import { FloatingPosition, Menu, MenuProps } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface IActionMenuProps extends MenuProps {
  actions: {
    onDelete?: ReactNode;
    onEdit?: ReactNode;
  };
  itemId?: number | string;
  currentId?: number | string;
}

const ActionMenu = ({
  actions,
  opened,
  children,
  ...props
}: IActionMenuProps) => {
  return (
    <Menu
      position={props.position}
      opened={opened}
      onChange={props.onChange}
      styles={{
        item: {
          padding: 5,
        },
        dropdown: {
          fontFamily: 'poppins',
        },
      }}
    >
      <Menu.Target>
        <IconDots className="text-gray-400 hover:text-blue-400" size={27} />
      </Menu.Target>

      <Menu.Dropdown>
        {actions.onDelete}
        {actions.onEdit}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ActionMenu;
