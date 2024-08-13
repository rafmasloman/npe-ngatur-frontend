import { FloatingPosition, Menu } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface IActionMenuProps {
  actions: {
    onDelete?: ReactNode;
    onEdit?: ReactNode;
  };
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  position: FloatingPosition;
}
const ActionMenu = ({
  actions,
  opened,
  setOpened,
  children,
  position,
}: IActionMenuProps) => {
  return (
    <Menu
      position={position}
      opened={opened}
      onChange={setOpened}
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
