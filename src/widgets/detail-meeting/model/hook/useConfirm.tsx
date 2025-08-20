'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui';

interface Options {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

export default function useConfirm() {
  const [open, setOpen] = useState(false);
  const optsRef = useRef<Options>({});
  const resolverRef = useRef<((v: boolean) => void) | null>(null);

  const confirm = useCallback((options?: Options) => {
    optsRef.current = {
      title: options?.title ?? '확인',
      description: options?.description ?? '이 작업을 진행할까요?',
      confirmText: options?.confirmText ?? '확인',
      cancelText: options?.cancelText ?? '취소',
      destructive: options?.destructive ?? false,
    };
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const handleClose = useCallback((result: boolean) => {
    setOpen(false);
    resolverRef.current?.(result);
    resolverRef.current = null;
  }, []);

  const ConfirmDialog = useMemo(
    () =>
      function ConfirmDialogUI() {
        const { title, description, confirmText, cancelText, destructive } = optsRef.current;
        return (
          <AlertDialog open={open} onOpenChange={(v) => !v && handleClose(false)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => handleClose(false)}>
                  {cancelText}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleClose(true)}
                  className={
                    destructive
                      ? 'border bg-background shadow-xs hover:bg-danger/20 dark:bg-input/30 dark:border-danger/60 dark:hover:bg-danger/30 border-danger text-danger'
                      : 'text-muted'
                  }
                >
                  {confirmText}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      },
    [open, handleClose],
  );

  return { confirm, ConfirmDialog };
}
