import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAccessToken } from '@/shared/utils/token';
import { api } from '@/shared/apis/factory';
import LoopLoading from '@/shared/components/loop-loading';

export default function LoginSuccess() {
  const navigate = useNavigate();
  const { search, hash } = useLocation();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      const qs = new URLSearchParams(search);
      let token = qs.get('token');
      if (!token && hash?.startsWith('#')) {
        token = new URLSearchParams(hash.slice(1)).get('token');
      }
      if (token) setAccessToken(token);

      window.history.replaceState(null, '', '/auth/success');

      try {
        await api.auth.me();
        navigate('/onboarding', { replace: true });
      } catch {
        navigate('/auth/login', { replace: true });
      }
    })();
  }, [search, hash, navigate]);

  return <LoopLoading />;
}
