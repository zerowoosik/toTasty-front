import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './useFormContext';
import {
  TextField,
  TextareaField,
  SelectField,
  NumberField,
  FileUploadField,
  DateTimeField,
  AddressField,
  MultiSelectField,
  RatingField,
} from '../../../../ui/form';

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    SelectField,
    NumberField,
    FileUploadField,
    DateTimeField,
    AddressField,
    MultiSelectField,
    RatingField,
  },
  formComponents: {},
});

export default useAppForm;
