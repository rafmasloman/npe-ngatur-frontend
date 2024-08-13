import { notifications } from '@mantine/notifications';
import { COLORS } from '../../../constant/colors';

interface INotificationAdminProps {
  title: string;
  message: string;
  status: 'SUCCESS' | 'FAILED';
}

const NotificationAdmin = ({
  title,
  message,
  status,
}: INotificationAdminProps) => {
  return notifications.show({
    title,
    message,
    color: status === 'SUCCESS' ? COLORS.success : COLORS.danger,
    withCloseButton: true,
    styles: {
      root: {
        '&::before': {
          backgroundColor:
            status === 'SUCCESS' ? COLORS.success : COLORS.danger,
        },
      },
    },
  });
};

export default NotificationAdmin;
