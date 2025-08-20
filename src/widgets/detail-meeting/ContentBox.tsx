import { ContentBoxProps } from './model/types';

export default function ContentBox({ title, children }: ContentBoxProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="border-t-1 border-b-1 border-primary/30 p-4 rounded-3xl min-h-[300px] whitespace-break-spaces">
        {children}
      </div>
    </div>
  );
}
