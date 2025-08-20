import { z } from 'zod';

export const nicknameSchema = z
  .string()
  .min(2, '닉네임은 최소 2글자 이상이어야 합니다')
  .max(10, '닉네임은 10글자를 초과할 수 없습니다');

export const interestsSchema = z.array(z.string()).min(1, '관심사를 1개 이상 선택해주세요');

export const profileImgUrlSchema = z.string().min(1, '파일을 첨부해주세요');
