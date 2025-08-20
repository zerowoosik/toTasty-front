'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '../index';
import useFieldValue from '../../lib/form/model/hooks/useFieldValue';
import { DateTimeFieldProps } from '../../lib/form/model/types';
import { cn } from '../../lib/shadcnUtils';
import FormField from './FormField';

export default function DateTimeField({
  label,
  description,
  className = '',
  disabled,
  required,
  placeholder,
}: DateTimeFieldProps) {
  const { value, field } = useFieldValue<string>({
    componentName: 'DateTimeField',
  });

  const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string>(date ? format(date, 'HH') : '12');
  const [selectedMinute, setSelectedMinute] = useState<string>(date ? format(date, 'mm') : '00');
  const [selectedAmPm, setSelectedAmPm] = useState<'AM' | 'PM'>('AM');

  const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  const btnClass = 'rounded-full h-auto py-1 my-0.5';

  useEffect(() => {
    if (date) {
      let hour = parseInt(selectedHour, 10);
      if (selectedAmPm === 'PM' && hour < 12) {
        hour += 12;
      } else if (selectedAmPm === 'AM' && hour === 12) {
        hour = 0;
      }

      const newDate = new Date(date);
      newDate.setHours(hour);
      newDate.setMinutes(parseInt(selectedMinute, 10));

      const formattedDate = format(newDate, "yyyy-MM-dd'T'HH:mm");
      field.handleChange(formattedDate);
    }
  }, [date, selectedHour, selectedMinute, selectedAmPm, field]);

  useEffect(() => {
    if (value) {
      try {
        const dateValue = new Date(value);
        setDate(dateValue);

        const hourValue = dateValue.getHours();
        const formattedHour = hourValue % 12 === 0 ? '12' : String(hourValue % 12).padStart(2, '0');

        setSelectedHour(formattedHour);
        setSelectedMinute(format(dateValue, 'mm'));
        setSelectedAmPm(hourValue >= 12 ? 'PM' : 'AM');
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('Invalid date format:', error);
      }
    }
  }, [value]);

  const formattedDate = date
    ? `${format(date, 'yyyy-MM-dd')} ${selectedHour}:${selectedMinute} ${selectedAmPm}`
    : '';

  return (
    <FormField
      field={field}
      label={label}
      description={description}
      required={required}
      className={className}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDate || placeholder || '날짜와 시간을 선택하세요'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex border-b">
            <Calendar mode="single" selected={date} onSelect={setDate} />
            <div className="border-l p-3 flex">
              <div className="space-y-2 pr-4 border-r">
                <div className="text-center">시</div>
                <div className="overflow-y-auto max-h-70 flex flex-col items-center">
                  {hourOptions.map((hour) => (
                    <Button
                      key={hour}
                      variant={selectedHour === hour ? 'default' : 'ghost'}
                      className={btnClass}
                      onClick={() => setSelectedHour(hour)}
                    >
                      {hour}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 px-4 border-r">
                <div className="text-center">분</div>
                <div className="overflow-y-auto max-h-70 flex flex-col items-center">
                  {minutes.map((minute) => (
                    <Button
                      key={minute}
                      variant={selectedMinute === minute ? 'default' : 'ghost'}
                      className={btnClass}
                      onClick={() => setSelectedMinute(minute)}
                    >
                      {minute}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 pl-4">
                <Button
                  variant={selectedAmPm === 'AM' ? 'default' : 'ghost'}
                  className={btnClass}
                  onClick={() => setSelectedAmPm('AM')}
                >
                  AM
                </Button>
                <Button
                  variant={selectedAmPm === 'PM' ? 'default' : 'ghost'}
                  className={btnClass}
                  onClick={() => setSelectedAmPm('PM')}
                >
                  PM
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </FormField>
  );
}
