'use client';

export default function FooterText({ fee }: { fee: number }) {
  const text = fee === 0 ? '무료' : `${fee.toLocaleString()}원`;
  return (
    <div className="flex flex-col">
      <span className="font-bold text-lg">참가비 : {text}</span>
      <span className="text-xs text-muted-foreground">
        모두 함께 To tasty! 한 모금으로 이어지는 나만의 취향 찾기
      </span>
    </div>
  );
}
