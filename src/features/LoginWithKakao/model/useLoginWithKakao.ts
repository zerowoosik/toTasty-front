export function useLoginWithKakao() {
  const clientKey = '4dee82d02484205b6899f7dd440e4c6e';
  // TODO: 임시로 여기 둔거고 나중에 보안을 위해 빼둬야함
  async function handleLogin() {
    window.location.href =
      'https://kauth.kakao.com/oauth/authorize?' +
      `client_id=${clientKey}` +
      '&redirect_uri=http://localhost:3000/auth/kakao' +
      '&response_type=code';
  }

  return { handleLogin };
}
