'use client';

import { useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import useFieldValue from '../../lib/form/model/hooks/useFieldValue';
import FormField from './FormField';
import { LocationInfo } from '../../constants';
import { AddressFieldProps } from '../../lib/form/model/types';
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '../index';

export default function AddressField({
  label,
  description,
  className = '',
  disabled,
  required,
  placeholder = '주소를 검색하세요',
}: AddressFieldProps) {
  const { field } = useFieldValue<LocationInfo>({
    componentName: 'AddressField',
  });
  const [isOpen, setIsOpen] = useState(false);
  const currentValue = field.state?.value as LocationInfo;

  const onCompletePost = (data: Address) => {
    const locationData: LocationInfo = {
      sido: data.sido,
      address: data.address,
      detail: '',
    };

    field.handleChange(locationData);
    setIsOpen(false);

    setTimeout(() => {
      const detailInput = document.querySelector('input[name="detailAddress"]');
      if (detailInput) {
        (detailInput as HTMLInputElement).focus();
      }
    }, 100);
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const detailValue = e.target.value;
    const updatedLocation: LocationInfo = {
      ...currentValue,
      detail: detailValue,
    };

    field.handleChange(updatedLocation);
  };

  return (
    <FormField
      field={field}
      label={label}
      description={description}
      required={required}
      className={className}
    >
      <div className="flex gap-4">
        <div className="flex-1">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal w-full"
                disabled={disabled}
              >
                {currentValue?.address || placeholder}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DaumPostcode onComplete={onCompletePost} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-2">
          <Input
            name="detailAddress"
            tabIndex={currentValue?.address ? 0 : -1}
            placeholder={
              currentValue?.address ? '상세 주소를 입력하세요' : '주소 먼저 검색해 주세요'
            }
            value={currentValue?.detail || ''}
            onChange={handleDetailChange}
            disabled={disabled || !currentValue?.address}
            className={`${!currentValue?.address ? 'opacity-50 bg-input text-secondary-foreground' : ''}`}
          />
        </div>
      </div>
    </FormField>
  );
}
