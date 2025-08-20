export default function WithIcon({
  Icon,
  text,
  className,
}: {
  Icon: React.ElementType;
  text: string;
  className: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <Icon className="w-[14px] mr-1" />
      <span>{text}</span>
    </div>
  );
}
