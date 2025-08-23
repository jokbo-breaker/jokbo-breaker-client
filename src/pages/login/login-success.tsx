import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAccessToken } from '@/shared/utils/token';
import { api } from '@/shared/apis/factory';
import { useToast } from '@/shared/contexts/ToastContext';
import LoopLoading from '@/shared/components/loop-loading';

export default function LoginSuccess() {
  const navigate = useNavigate();
  const { search, hash } = useLocation();
  const { showToast } = useToast();
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
        showToast('로그인되었습니다!', 'success');
        // 토스트가 표시될 시간을 주기 위해 약간의 지연
        setTimeout(() => {
          navigate('/onboarding', { replace: true });
        }, 500);
      } catch {
        showToast('로그인에 실패했습니다.', 'error');
        setTimeout(() => {
          navigate('/auth/login', { replace: true });
        }, 500);
      }
    })();
  }, [search, hash, navigate, showToast]);

  return <LoopLoading />;
}
