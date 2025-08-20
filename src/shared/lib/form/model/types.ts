import { type AnyFieldApi } from '@tanstack/react-form';

export interface BaseFormFieldProps {
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
  maxLength?: number;
}

export interface FormFieldProps {
  field: AnyFieldApi;
  label?: string;
  children: React.ReactNode;
  description?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
}

export interface TextFieldProps extends BaseFormFieldProps {
  inputType?: 'text' | 'email' | 'password' | 'datetime-local';
}

export interface SelectFieldProps extends BaseFormFieldProps {
  options: Array<{ value: string; label: string }>;
}

export interface MultiSelectFieldProps extends SelectFieldProps {
  field: AnyFieldApi;
}

export interface TextareaFieldProps extends BaseFormFieldProps {
  rows?: number;
  AreaClassName?: string;
}
export interface NumberFieldProps extends BaseFormFieldProps {
  min?: number;
  max?: number;
  step?: number;
  hideArrows?: boolean;
  useComma?: boolean;
}

export interface DateTimeFieldProps extends BaseFormFieldProps {
  showTime?: boolean;
}

export interface FileUploadFieldProps extends BaseFormFieldProps {
  accept?: string;
  loadingText?: string;
  errorText?: string;
  selectedText?: string;
  onUploadSuccess?: (imgUrl: string) => void;
  uploadFile: (file: File) => Promise<{ imgUrl: string } | null>;
  isUploading?: boolean;
  hasUploadError?: boolean;
}

export interface AddressFieldProps extends BaseFormFieldProps {}

export interface UseFieldValueOptions {
  componentName:
    | 'TextField'
    | 'NumberField'
    | 'SelectField'
    | 'MultiSelectField'
    | 'TextareaField'
    | 'FileUploadField'
    | 'DateTimeField'
    | 'AddressField'
    | 'RatingField';
  fieldName?: string;
}
