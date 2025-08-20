import useFieldValue from '../../lib/form/model/hooks/useFieldValue';
import FormField from './FormField';
import { TextareaFieldProps } from '../../lib/form/model/types';
import { Textarea } from '../Textarea';

export default function TextareaField({
  label,
  placeholder,
  description,
  disabled,
  required,
  className,
  rows = 4,
  maxLength,
  AreaClassName,
}: TextareaFieldProps) {
  const { displayValue, field } = useFieldValue<string>({ componentName: 'TextareaField' });
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
      <Textarea
        id={fieldId}
        name={field.name}
        value={displayValue}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        className={AreaClassName}
      />
    </FormField>
  );
}
