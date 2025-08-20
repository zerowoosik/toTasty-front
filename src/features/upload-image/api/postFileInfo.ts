import { postApi } from '@/shared/api/axiosApis';
import { UploadFileInfo, PresignedInfo } from '../model/types';

function checkFileExtensions(filename: string): boolean {
  const dotIndex = filename.lastIndexOf('.');
  if (dotIndex === -1) {
    alert('확장자가 존재하지 않습니다. 다시 확인해주세요.');
    return false;
  }

  const allowedExt = ['jpg', 'jpeg', 'png', 'webp'];
  const fileExt = filename.substring(dotIndex + 1);

  return allowedExt.includes(fileExt);
}

export default async function postFileInfo(image: File): Promise<PresignedInfo | null> {
  if (!image || !image.name) {
    alert('유효하지 않은 이미지 파일입니다.');
    return null;
  }

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  const info: UploadFileInfo = {
    fileName: image.name,
  };

  if (image.size > 10 * 1024 * 1024) {
    alert('이미지 용량은 10MB 이하로 업로드 가능합니다.');
    return null;
  }

  if (!checkFileExtensions(image.name.toLowerCase())) {
    alert('지원하지 않는 이미지 확장자입니다.');
    return null;
  }

  return postApi<PresignedInfo>('/api/v1/images', info, headers);
}
