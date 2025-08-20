'use client';

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/shared/ui';
import { Check, ChevronDown } from 'lucide-react';
import { MultiSelectFieldProps } from '@/shared/lib/form/model/types';
import FormField from './FormField';

export default function MultiSelectField({
  label,
  options,
  field,
  className,
  placeholder,
}: MultiSelectFieldProps) {
  const selected = field.state.value as string[];

  const selectedLabels =
    selected.length > 0
      ? [...selected]
          .sort(
            (a, b) =>
              options.findIndex((opt) => opt.value === a) -
              options.findIndex((opt) => opt.value === b),
          )
          .map((val) => options.find((opt) => opt.value === val)?.label || val)
          .join(', ')
      : placeholder;

  const handleToggle = (value: string) => {
    const isSelected = selected.includes(value);
    const updated = isSelected ? selected.filter((v: string) => v !== value) : [...selected, value];
    field.handleChange(updated);
  };

  return (
    <FormField label={label} field={field} className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="justify-between bg-transparent w-full"
          >
            {selectedLabels}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleToggle(option.value)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${!selected.includes(option.value) && 'opacity-0'}`}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormField>
  );
}
