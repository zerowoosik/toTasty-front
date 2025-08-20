import { z } from 'zod';

export const contentSchema = z
  .string()
  .min(10, '설명은 최소 10글자 이상 작성해주세요')
  .max(2000, '설명은 최대 2000글자를 초과할 수 없습니다');

export const tastingSchema = z
  .string()
  .min(10, '맛 설명은 최소 10글자 이상 작성해주세요.')
  .max(500, '맛 설명은 최대 500글자를 초과할 수 없습니다.');

export const flavorSchema = z
  .string()
  .min(10, '향 설명은 최소 10글자 이상 작성해주세요.')
  .max(500, '향 설명은 최대 500글자를 초과할 수 없습니다.');

export const colorSchema = z
  .string()
  .min(10, '색 설명은 최소 10글자 이상 작성해주세요.')
  .max(500, '색 설명은 최대 500글자를 초과할 수 없습니다.');
