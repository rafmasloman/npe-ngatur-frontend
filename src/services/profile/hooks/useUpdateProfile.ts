import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_ADMIN_PAGE } from '../../../constant/page_routes';
import {
  GET_ALL_MEMBERS,
  GET_DETAIL_MEMBER,
  GET_USER_PROFILE,
  UPDATE_MEMBER,
  UPDATE_PROFILE,
} from '../../../constant/query_key';
import { useRouter } from 'next/navigation';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import profileService from '../ProfileService';

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useMutation({
    mutationKey: [UPDATE_PROFILE],
    mutationFn: profileService.updateProfile,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Profile gagal diubah',
          message: 'Gagal mengubah data Profile',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Profile diubah',
          message: 'Berhasil mengubah data Profile',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_USER_PROFILE] });
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Member gagal diubah',
        message: 'Gagal mengubah data member',
        status: 'FAILED',
      });
    },
  });

  return query;
};

export default useUpdateProfile;
