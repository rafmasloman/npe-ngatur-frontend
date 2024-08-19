import { useQuery } from '@tanstack/react-query';
import { GET_ALL_CLIENTS } from '../../../constant/query_key';
import filesService from '../FilesService';
import { IFileParamsDataType } from '../FilesInterface';

export const useQueryDownloadedFile = (params: IFileParamsDataType) => {
  const query = useQuery({
    queryKey: [GET_ALL_CLIENTS, params],
    queryFn: () =>
      filesService.downloadFile({
        fileFolder: params.fileFolder,
        fileName: params.fileName,
      }),
    select(data) {
      return data;
    },
  });

  return query;
};
