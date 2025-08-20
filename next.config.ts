import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'k.kakaocdn.net',
      'totasty-bucket.s3.amazonaws.com',
      'totasty-bucket.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

export default nextConfig;
