import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GET_USER_CREDENTIALS,
  GET_USER_PROFILE,
  UPDATE_PROFILE_PICTURE,
} from '../../../constant/query_key';
import NotificationAdmin from '../../../features/common/components/NotificationAdmin';
import profileService from '../ProfileService';

const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [UPDATE_PROFILE_PICTURE],
    mutationFn: profileService.updateProfilePicture,
    onSuccess(data, variables, context) {
      if (!data.data) {
        NotificationAdmin({
          title: 'Foto Profil gagal diubah',
          message: 'Gagal mengubah data Foto Profil',
          status: 'FAILED',
        });
      } else {
        NotificationAdmin({
          title: 'Foto Profil diubah',
          message: 'Berhasil mengubah data Foto Profil',
          status: 'SUCCESS',
        });
        queryClient.invalidateQueries({ queryKey: [GET_USER_CREDENTIALS] });
        queryClient.invalidateQueries({ queryKey: [GET_USER_PROFILE] });
      }
    },
    onError(error, variables, context) {
      NotificationAdmin({
        title: 'Foto Profil gagal diubah',
        message: 'Gagal mengubah data Foto Profil',
        status: 'FAILED',
      });
    },
  });

  return mutation;
};

export default useUpdateProfilePicture;
