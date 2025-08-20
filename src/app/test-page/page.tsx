'use client';

import { TestPage } from '@/views/test-page/TestPage';

import { create } from 'zustand';
import { ChangeEvent } from 'react';

import { useUploadImageMutation } from '@/features/upload-image';
import Image from 'next/image';
import { Button } from '@/shared';

interface TestFile {
  selectedFile: File | null;
  setSelectedFile: (file: File | undefined) => void;
}

interface UploadedFile {
  uploadedImage: string;
  setUploadedImage: (file: string) => void;
}

const useUploadFileStore = create<TestFile>()((set) => ({
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),
}));

const useUploadedImageFileStore = create<UploadedFile>()((set) => ({
  uploadedImage: 'https://totasty-bucket.s3.amazonaws.com/d85a906a-da8c-47b6-986e-8b801a7618f6.png',
  setUploadedImage: (file) => set({ uploadedImage: file }),
}));

export default function Page(): React.JSX.Element {
  const setSelectedFile = useUploadFileStore((state) => state.setSelectedFile);

  const uploadedImage = useUploadedImageFileStore((state) => state.uploadedImage);
  const setUploadedImage = useUploadedImageFileStore((state) => state.setUploadedImage);

  const { mutateAsync } = useUploadImageMutation();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const response = await mutateAsync(file);
      setSelectedFile(file);
      if (response) {
        setUploadedImage(response.imgUrl);
      }
    }
  };

  return (
    <div>
      <TestPage />
      <Button>
        파일 선택버튼
        <input type="file" id="file-input" onChange={handleFileChange} />
      </Button>

      <Image src={uploadedImage} alt="test" width={100} height={100} />
    </div>
  );
}
