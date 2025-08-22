import { BASE_URL, END_POINT } from '@/shared/apis/constants/endpoints';
import {
  useMeQuery,
  useAuthStatusQuery,
} from '@/shared/apis/auth/auth-queries';
import { useLogoutMutation } from '@/shared/apis/auth/auth-mutations';

export default function LoginPage() {
  const {
    data: meData,
    refetch: refetchMe,
    isFetching: meLoading,
  } = useMeQuery();
  const {
    data: statusData,
    refetch: refetchStatus,
    isFetching: statusLoading,
  } = useAuthStatusQuery();
  const { mutate: logout, isPending: logoutLoading } = useLogoutMutation();

  const googleStartUrl = `${BASE_URL}${END_POINT.AUTH_GOOGLE_START}`;

  const wakeAndGoGoogle = async () => {
    try {
      const health = BASE_URL.replace(/\/api$/, '') + '/health';
      await fetch(health, { mode: 'no-cors' });
    } catch {}
    window.location.assign(googleStartUrl);
  };

  return (
    <div className="mx-auto max-w-[40rem] px-[1.6rem] py-[2.4rem]">
      <h1 className="mb-[1.2rem] text-[2.4rem] font-semibold">
        임시 로그인 페이지
      </h1>

      <section className="mb-[2.4rem] rounded-xl border p-[1.6rem]">
        <h2 className="mb-[1.2rem] text-[1.8rem] font-medium">
          1) 소셜 로그인
        </h2>
        <div className="flex flex-col gap-[1.2rem]">
          <button
            type="button"
            onClick={wakeAndGoGoogle}
            className="rounded-lg border px-[1.2rem] py-[0.8rem]"
          >
            Google로 로그인
          </button>

          <p className="text-[1.2rem] text-gray-500">
            Google 시작 URL: <code>{googleStartUrl}</code>
          </p>
        </div>
      </section>

      <section className="mb-[2.4rem] rounded-xl border p-[1.6rem]">
        <h2 className="mb-[1.2rem] text-[1.8rem] font-medium">
          2) 상태/세션 확인
        </h2>
        <div className="flex gap-[0.8rem]">
          <button
            type="button"
            onClick={() => refetchStatus()}
            disabled={statusLoading}
            className="rounded-lg border px-[1.2rem] py-[0.8rem]"
          >
            인증 상태 확인
          </button>
          <button
            type="button"
            onClick={() => refetchMe()}
            disabled={meLoading}
            className="rounded-lg border px-[1.2rem] py-[0.8rem]"
          >
            내 정보 조회(/auth/me)
          </button>
          <button
            type="button"
            onClick={() => logout()}
            disabled={logoutLoading}
            className="rounded-lg border px-[1.2rem] py-[0.8rem]"
          >
            로그아웃
          </button>
        </div>

        <div className="mt-[1.2rem] grid gap-[1.2rem]">
          <pre className="overflow-auto rounded-lg border p-[1.2rem] text-[1.2rem]">
            {JSON.stringify(statusData ?? {}, null, 2)}
          </pre>
          <pre className="overflow-auto rounded-lg border p-[1.2rem] text-[1.2rem]">
            {JSON.stringify(meData ?? {}, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
}
