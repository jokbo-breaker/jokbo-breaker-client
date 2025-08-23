import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAccessToken } from '@/shared/utils/token';
import { api } from '@/shared/apis/factory';

export default function LoginSuccess() {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      if (pathname.startsWith('//')) {
        const fixed = pathname.replace(/^\/+/, '/');
        window.history.replaceState(null, '', `${fixed}${search}${hash}`);
      }

      const qs = new URLSearchParams(search);
      let token = qs.get('token');
      if (!token && hash.startsWith('#')) {
        token = new URLSearchParams(hash.slice(1)).get('token');
      }
      if (token) setAccessToken(token);

      window.history.replaceState(null, '', '/auth/success');

      try {
        await api.auth.me();
        navigate('/', { replace: true });
      } catch {
        navigate('/auth/login', { replace: true });
      }
    })();
  }, [pathname, search, hash, navigate]);

  return (
    <main className="mx-auto max-w-[40rem] px-[1.6rem] py-[2.4rem]">
      <h1 className="mb-[1.2rem] text-[2.0rem] font-medium">로그인 처리 중…</h1>
      <p className="text-[1.4rem] text-gray-600">잠시만 기다려 주세요.</p>
    </main>
  );
}
