import { useCallback, useMemo, useState } from 'react';
import { BASE_URL, END_POINT } from '@/shared/apis/constants/endpoints';
import {
  useMeQuery,
  useAuthStatusQuery,
} from '@/shared/apis/auth/auth-queries';
import { useLogoutMutation } from '@/shared/apis/auth/auth-mutations';
import Icon from '@/shared/components/icon';

export default function LoginPage() {
  const { isFetching: meLoading } = useMeQuery();
  const { isFetching: statusLoading } = useAuthStatusQuery();
  const { isPending: logoutLoading } = useLogoutMutation();

  const [waking, setWaking] = useState(false);
  const googleStartUrl = useMemo(() => {
    const base = BASE_URL.replace(/\/$/, '');
    const path = END_POINT.AUTH_GOOGLE_START.replace(/^\//, '');
    const url = new URL(`${base}/${path}`);

    const isLocalHost = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(
      window.location.hostname,
    );
    if (isLocalHost) url.searchParams.set('returnTo', 'local');

    return url.toString();
  }, []);

  const wakeAndGoGoogle = useCallback(async () => {
    setWaking(true);
    try {
      const baseNoApi = BASE_URL.replace(/\/api\/?$/, '/');
      const health = `${baseNoApi.replace(/\/$/, '')}/health`;

      await fetch(health, { mode: 'no-cors' });
    } catch {
    } finally {
      window.location.assign(googleStartUrl);
    }
  }, [googleStartUrl]);

  const busy = meLoading || statusLoading || logoutLoading || waking;

  return (
    <div className="flex-col-center mx-auto h-dvh gap-[4.8rem] py-[2.4rem]">
      <div className="flex-col-center gap-[3.6rem]">
        <div className="flex-col-center gap-[1.2rem]">
          <h1 className="head3 text-black">환경을 지키는 가장 쉬운 습관</h1>
          <Icon
            name="logo-title"
            width={20.4}
            height={4.2}
            className="text-primary"
          />
        </div>
        <Icon name="complete-order" className="animate-float" size={20.4} />
      </div>

      <div className="flex-col-center w-full gap-[1.6rem] px-[3.2rem]">
        <button
          type="button"
          onClick={wakeAndGoGoogle}
          disabled={busy}
          aria-busy={busy}
          className="flex-row-center w-full cursor-pointer gap-[1.6rem] rounded-[100px] border border-gray-300 px-[1.2rem] py-[1.25rem] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon name="google" size={1.6} />
          <span className="body4">{'Google 계정으로 시작하기'}</span>
        </button>

        <button
          type="button"
          className="caption1 cursor-pointer text-gray-500 hover:underline"
          onClick={() => {}}
        >
          기업 로그인/회원가입
        </button>
      </div>
    </div>
  );
}
