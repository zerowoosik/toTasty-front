import Label from '../Label';
import ErrorField from './ErrorField';
import { FormFieldProps } from '../../lib/form/model/types';

export default function FormField({
  field,
  label,
  children,
  description,
  required,
  className = '',
  maxLength = 0,
}: FormFieldProps) {
  const fieldId = `field-${field.name}`;
  const hasInfo = label || required || maxLength > 0;

  return (
    <div className={`space-y-2 ${className}`}>
      {hasInfo && (
        <div className="flex items-center">
          {label && <Label htmlFor={fieldId}>{label}</Label>}
          {required && <p className="text-danger mr-auto ml-1">*</p>}
          {maxLength > 0 && (
            <p className="text-sm text-muted-foreground ml-auto">
              <span className="text-primary text-bold">{field.state.value?.length || 0}</span>/
              {maxLength}
            </p>
          )}
        </div>
      )}
      {children}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <ErrorField fieldStateMeta={field.state.meta} />
    </div>
  );
}
