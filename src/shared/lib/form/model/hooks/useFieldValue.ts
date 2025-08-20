import { UseFieldValueOptions } from '../types';
import { useFieldContext } from './useFormContext';

export default function useFieldValue<
  T extends string | number | boolean | null | undefined | File | object,
>({
  componentName,
  fieldName,
}: UseFieldValueOptions): {
  value: T;
  displayValue: string;
  field: ReturnType<typeof useFieldContext<T>>;
} {
  const field = useFieldContext<T>();
  const name = fieldName || field.name;
  const { value: rawValue } = field.state;

  let displayValue: string;

  if (rawValue instanceof File) {
    displayValue = rawValue.name || '선택된 파일';
  } else if (rawValue === undefined) {
    if (process.env.NODE_ENV === 'development') {
      /* eslint-disable-next-line no-console */
      console.warn(
        `name이 "${name}"인  ${componentName}Field 값이 undefined 입니다. 확인해주세요.`,
      );
    }
    displayValue = '';
  } else if (rawValue === null) {
    displayValue = '';
  } else if (componentName === 'NumberField' && Number.isNaN(rawValue)) {
    if (process.env.NODE_ENV === 'development') {
      /* eslint-disable-next-line no-console */
      console.warn(`name이 "${name}"인  ${componentName}Field 값이 NaN 입니다. 확인해주세요.`);
    }
    displayValue = '';
  } else if (typeof rawValue === 'object') {
    try {
      displayValue = JSON.stringify(rawValue);
    } catch (error) {
      displayValue = '객체 데이터';
      if (process.env.NODE_ENV === 'development') {
        /* eslint-disable-next-line no-console */
        console.warn(
          `name이 "${name}"인 ${componentName}Field 객체를 문자열로 변환할 수 없습니다.`,
        );
      }
    }
  } else {
    displayValue = String(rawValue);
  }

  return {
    value: rawValue as T,
    displayValue,
    field,
  };
}
