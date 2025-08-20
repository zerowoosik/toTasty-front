import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogClose,
  Button,
} from '@/shared';

export default function MyMeetingsCancelDialog({ onConfirm }: { onConfirm: () => void }) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="justify-center pt-10 pb-6 w-full">
        <DialogTitle className="text-base font-medium text-center">
          모임 참가를 취소하시겠어요?
        </DialogTitle>
      </DialogHeader>
      <DialogFooter className="gap-2">
        <DialogClose asChild>
          <Button variant="danger" onClick={onConfirm}>
            참가 취소하기
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
