'use client';

import { Fragment } from 'react';
import { Button } from '@/shared/ui';
import { getVisibleActions } from '../model/getVisibleActions';
import { FooterCtx, Handlers, ButtonVariant } from '../model/types';

export default function ActionButtons({ ctx, handlers }: { ctx: FooterCtx; handlers: Handlers }) {
  const actions = getVisibleActions(ctx);

  if (actions.length === 0) {
    return (
      <Button variant="outlinePrimary" disabled>
        진행 불가
      </Button>
    );
  }

  const call = (key: keyof Handlers) => () => (handlers[key] ?? handlers.onNoop)?.();

  return (
    <>
      {actions.map((a) => {
        const disabled = a.disabled?.(ctx) ?? false;
        const variant = a.variant === ButtonVariant.Outline ? 'outlinePrimary' : 'default';
        return (
          <Fragment key={a.id}>
            <Button variant={variant} disabled={disabled} onClick={call(a.handlerKey)}>
              {a.label}
            </Button>
          </Fragment>
        );
      })}
    </>
  );
}
