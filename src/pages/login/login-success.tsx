import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '@/shared/utils/token';

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    // 토큰이 오면 저장 (JWT 방식), 안 와도 서버 세션이면 이후 me()로 확인 가능
    if (token) setAccessToken(token);

    // URL 정리(쿼리 제거) 후 홈으로 이동
    const cleanUrl = window.location.pathname; // '/auth/success'
    window.history.replaceState(null, '', cleanUrl);
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <main className="mx-auto max-w-[40rem] px-[1.6rem] py-[2.4rem]">
      <h1 className="mb-[1.2rem] text-[2.0rem] font-medium">로그인 처리 중…</h1>
      <p className="text-[1.4rem] text-gray-600">곧 메인으로 이동합니다.</p>
    </main>
  );
}
