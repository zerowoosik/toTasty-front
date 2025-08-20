import { type AnyFieldApi } from '@tanstack/react-form';

export default function ErrorField({
  fieldStateMeta,
}: {
  fieldStateMeta: AnyFieldApi['state']['meta'];
}) {
  return (
    <span className="block mb-5">
      {!fieldStateMeta.isValid && (
        <p className="text-danger text-xs">
          {fieldStateMeta.errors.map((err) => err.message).join(', ')}
        </p>
      )}
    </span>
  );
}
