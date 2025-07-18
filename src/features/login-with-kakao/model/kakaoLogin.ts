export function kakaoLogin() {
  const clientKey = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  window.location.href =
    `https://kauth.kakao.com/oauth/authorize?` +
    `client_id=${clientKey}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code`;
}
