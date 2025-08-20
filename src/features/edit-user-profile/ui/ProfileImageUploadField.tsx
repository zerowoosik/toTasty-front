'use client';

import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { Button, UserIcon } from '@/shared/ui';
import { useUploadImageMutation } from '@/features/upload-image';
import { compressImage } from '@/shared/lib';
import type { AnyFieldApi } from '@tanstack/react-form';
import { toast } from 'react-toastify';

export default function ProfileImageUploadField({ field }: { field: AnyFieldApi }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(field.state.value || '');
  const uploadMutation = useUploadImageMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedFile = await compressImage(file, 100);
      const result = await uploadMutation.mutateAsync(compressedFile, {
        onError: () => {
          toast.error('이미지 업로드 중 문제가 발생했습니다.');
        },
      });
      if (result?.imgUrl) {
        setPreviewUrl(result.imgUrl);
        field.handleChange(result.imgUrl);
      }
    } catch (error) {
      // alert('이미지 업로드 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className="grid gap-2">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <UserIcon type="myPageIcon" ImageUrl={previewUrl || undefined} />
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadMutation.isPending}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
