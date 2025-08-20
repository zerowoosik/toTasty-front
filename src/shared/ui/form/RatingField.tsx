import Image from 'next/image';
import { Button } from '@/shared/ui';
import useFieldValue from '../../lib/form/model/hooks/useFieldValue';
import FormField from './FormField';
import Input from '../Input';
import useRatingStore from '../../lib/form/model/hooks/useRatingStore';
import { BaseFormFieldProps } from '../../lib/form/model/types';

export default function RatingField({
  label,
  description,
  required,
  className,
}: BaseFormFieldProps) {
  const { field } = useFieldValue<number>({ componentName: 'RatingField' });

  const selectedRating = useRatingStore((state) => state.selectedRating);
  const setSelectedRating = useRatingStore((state) => state.setSelectedRating);

  const ratingPointsHeartRender = () => {
    const result = [];
    for (let i = 1; i <= 5; i += 1) {
      const isChecked = i <= selectedRating;
      result.push(
        <Button
          type="button"
          key={`heartButton${i}`}
          variant="hidden"
          size="hidden"
          onClick={() => {
            setSelectedRating(i);
            field.setValue(i);
          }}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src={
                isChecked
                  ? '/assets/icons/heart-point-checked.svg'
                  : '/assets/icons/heart-point-unchecked.svg'
              }
              alt="check wish point"
              width={26.8}
              height={23.3}
            />
          </div>
        </Button>,
      );
    }
    return result;
  };

  return (
    <FormField
      field={field}
      label={label}
      description={description}
      required={required}
      className={className}
    >
      <div className="text-sm font-medium text-foreground mt-14">만족스러운 경험이었나요?</div>
      <div className="flex items-center mr-0.5 mt-3">{ratingPointsHeartRender()}</div>
      <Input type="hidden" name={field.name} value={selectedRating} />
    </FormField>
  );
}
