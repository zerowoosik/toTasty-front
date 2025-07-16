import { loginWithKakao } from '../api/loginWithKakao';

// api와 ui를 연결하는 작업

export const useLoginWithKakao = () => {
  const handleLogin = async () => {
    alert('로그인 버튼 클릭 완료!');
    await loginWithKakao();
    // 상태 업데이트 등
  };
  return { handleLogin };
};
