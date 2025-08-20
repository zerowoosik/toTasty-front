import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { PresignedInfo } from '../types';
import postFileInfo from '../../api/postFileInfo';
import uploadPresignedImage from '../../api/uploadPresignedImage';

export default function useUploadImageMutation(): UseMutationResult<
  PresignedInfo | null,
  Error,
  File,
  unknown
> {
  return useMutation({
    mutationFn: (image: File) => postFileInfo(image),
    onSuccess: async (data, variables) => {
      // URL 발급에 성공했기 때문에 onSuccess 에서 처리
      const urlInfo: PresignedInfo | null = data;

      if (urlInfo) {
        await uploadPresignedImage(urlInfo.presignedUrl, variables);
      }
    },
  });
}
