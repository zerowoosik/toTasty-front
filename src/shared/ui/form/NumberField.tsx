import Input from '../Input';
import useFieldValue from '../../lib/form/model/hooks/useFieldValue';
import useCommaInput from '../../lib/form/model/hooks/useCommaInput';
import FormField from './FormField';
import { NumberFieldProps } from '../../lib/form/model/types';

export default function NumberField({
  label,
  description,
  placeholder,
  min,
  max,
  step = 1,
  hideArrows = false,
  useComma = false,
  className,
  disabled,
  required,
}: NumberFieldProps) {
  const { field } = useFieldValue<number>({ componentName: 'NumberField' });
  const fieldId = `field-${field.name}`;

  const commaInput = useCommaInput(field.state.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (useComma) {
      const numericValue = commaInput.handleChange(e);
      if (numericValue !== null) {
        field.handleChange(numericValue);
      }
    } else {
      const value = Number(e.target.value) || 0;
      field.handleChange(value);
    }
  };

  return (
    <FormField
      field={field}
      label={label}
      description={description}
      required={required}
      className={className}
    >
      <Input
        id={fieldId}
        name={field.name}
        type={useComma ? 'text' : 'number'}
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={useComma ? commaInput.inputValue : String(field.state.value ?? '')}
        onChange={handleChange}
        onBlur={() => {
          field.handleBlur();
          if (useComma) {
            commaInput.handleBlur();
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        className={`${hideArrows ? 'hideArrows' : ''}`}
      />
    </FormField>
  );
}
