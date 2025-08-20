import { Input } from '@/shared/ui';
import useFieldValue from '../../lib/form/model/hooks/useFieldValue';
import FormField from './FormField';
import { TextFieldProps } from '../../lib/form/model/types';

export default function TextField({
  label,
  inputType = 'text',
  placeholder,
  description,
  disabled,
  required,
  className,
  maxLength,
}: TextFieldProps) {
  const { displayValue, field } = useFieldValue<string>({ componentName: 'TextField' });
  const fieldId = `field-${field.name}`;

  return (
    <FormField
      field={field}
      label={label}
      description={description}
      required={required}
      className={className}
      maxLength={maxLength}
    >
      <Input
        id={fieldId}
        type={inputType}
        name={field.name}
        value={displayValue}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
      />
    </FormField>
  );
}
