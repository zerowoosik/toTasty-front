'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui';
import { useUserStore } from '@/entities/user';
import { useAppForm, DrinkType } from '@/shared';
import {
  ProfileImageUploadField,
  UpdatedUserProfile,
  usePatchUserProfileMutation,
} from '@/features/edit-user-profile';
import Image from 'next/image';
import EditIcon from 'public/assets/icons/edit-icon.svg';
import { toast } from 'react-toastify';
import { nicknameSchema, interestsSchema, profileImgUrlSchema } from '../model/validationSchema';

const INTEREST_OPTIONS: Array<{ value: string; label: string }> = [
  { value: DrinkType.coffee, label: '☕ 커피' },
  { value: DrinkType.wine, label: '🍷 와인' },
  { value: DrinkType.whisky, label: '🥃 위스키' },
];

export default function ProfileEditDialog() {
  const updateProfile = usePatchUserProfileMutation();
  const user = useUserStore((state) => state.user);
  const { nickname, interests, profileImgUrl } = user ?? {
    nickname: '',
    interests: [],
    profileImgUrl: '',
  };

  const profileDefaultValues = { nickname, interests: [...interests], profileImgUrl };

  const form = useAppForm({
    defaultValues: profileDefaultValues,
    validators: {},
    onSubmit: ({ value }: { value: UpdatedUserProfile }) => {
      const interestOrder = ['COFFEE', 'WINE', 'WHISKY'];
      value.interests?.sort((a, b) => interestOrder.indexOf(a) - interestOrder.indexOf(b));
      updateProfile.mutate(value, {
        onError: () => {
          toast.error('프로필 정보 수정에 실패했습니다.');
        },
      });
    },
  });

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={EditIcon}
          alt="logo"
          width={32}
          height={32}
          draggable={false}
          className="cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] w-full"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <form method="post" onSubmit={handleSubmit} className="max-w-full">
          <DialogHeader>
            <DialogTitle>프로필 수정</DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4 flex-1 max-w-full">
            <form.AppField
              name="profileImgUrl"
              validators={{ onMount: profileImgUrlSchema, onChange: profileImgUrlSchema }}
            >
              {(field) => <ProfileImageUploadField field={field} />}
            </form.AppField>

            <form.AppField
              name="nickname"
              validators={{
                onMount: nicknameSchema,
                onChange: nicknameSchema,
              }}
            >
              {(field) => (
                <field.TextField label="닉네임" inputType="text" className="overflow-hidden" />
              )}
            </form.AppField>
            <form.AppField
              name="interests"
              mode="array"
              validators={{
                onMount: interestsSchema,
              }}
            >
              {(field) => (
                <field.MultiSelectField
                  label="관심사"
                  options={INTEREST_OPTIONS}
                  field={field}
                  placeholder="관심사를 선택하세요"
                />
              )}
            </form.AppField>
          </div>

          <DialogFooter className="flex gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => form.reset()}
              >
                취소
              </Button>
            </DialogClose>
            <form.Subscribe
              selector={(state) => [state.isDefaultValue, state.canSubmit, state.isSubmitting]}
            >
              {([isDefaultValue, canSubmit, isSubmitting]) => (
                <DialogClose asChild>
                  <Button
                    type="submit"
                    variant="default"
                    className="flex-1"
                    disabled={isDefaultValue || !canSubmit || isSubmitting}
                  >
                    수정하기
                  </Button>
                </DialogClose>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
