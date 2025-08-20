import { useState } from 'react';
import { Button } from '../Button';
import Input from '../Input';
import useFieldValue from '../../lib/form/model/hooks/useFieldValue';
import { FileUploadFieldProps } from '../../lib/form/model/types';
import FormField from './FormField';

export default function FileUploadField({
  label,
  description,
  disabled,
  required,
  className = '',
  accept = 'image/*',
  placeholder,
  loadingText = '업로드 중...',
  errorText = '업로드 실패, 다시 시도해주세요',
  selectedText = '업로드 준비 완료',
  onUploadSuccess,
  uploadFile,
  hasUploadError = false,
  ...props
}: FileUploadFieldProps) {
  const { value, field } = useFieldValue<string | null>({
    componentName: 'FileUploadField',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const fieldId = `field-${field.name}`;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setUploadStatus('loading');

    try {
      const response = await uploadFile(file);

      if (response && response.imgUrl) {
        field.handleChange(response.imgUrl);
        setUploadStatus('success');

        if (onUploadSuccess) {
          onUploadSuccess(response.imgUrl);
        }
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      /* eslint-disable-next-line */
      console.error('Image upload failed:', error);
      setUploadStatus('error');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`;
  };

  const getDisplayText = () => {
    if (uploadStatus === 'loading') return loadingText;
    if (hasUploadError || uploadStatus === 'error') return errorText;
    if (selectedFile && uploadStatus === 'idle') return selectedText;
    if (value && selectedFile) {
      return `${formatFileSize(selectedFile.size)}`;
    }
    if (value) return '업로드 완료';
    return placeholder || '이미지를 첨부해주세요';
  };

  return (
    <FormField
      field={field}
      label={label}
      description={description}
      required={required}
      className={className}
    >
      <div className="flex items-center gap-3 w-full">
        <Input
          id={fieldId}
          name={field.name}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          {...props}
        />
        <div
          tabIndex={-1}
          className="border-input h-9 w-full rounded-md border px-3 py-1 text-base shadow-xs opacity-50 md:text-sm bg-input text-secondary-foreground overflow-hidden text-ellipsis"
          aria-label="현재 선택된 파일 정보"
        >
          {getDisplayText()}
        </div>
        <Button
          type="button"
          variant={uploadStatus === 'error' ? 'outlineDanger' : 'outlinePrimary'}
          tabIndex={0}
          onClick={() => document.getElementById(fieldId)?.click()}
          aria-label="파일 찾기 버튼"
          className="cursor-pointer"
          disabled={disabled}
        >
          {disabled ? '선택 불가' : '파일 찾기'}
        </Button>
      </div>
    </FormField>
  );
}
