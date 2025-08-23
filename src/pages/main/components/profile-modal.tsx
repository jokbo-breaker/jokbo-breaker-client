import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/shared/components/icon';

export function ProfileModal({
  user,
  onLogout,
  isAuthed, // ★ 추가
  loginPath = '/login', // ★ 커스터마이즈 가능
}: {
  user: { name: string; email: string };
  onLogout?: () => void;
  isAuthed?: boolean;
  loginPath?: string;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 명시 prop 우선, 없으면 email 값으로 추정
  const authed = isAuthed ?? (user?.email && user.email !== '로그인 전');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || cardRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const handleClickPrimary = () => {
    setOpen(false);
    if (authed) {
      onLogout?.();
    } else {
      navigate(loginPath);
    }
  };

  return (
    <div className="relative">
      <button
        ref={btnRef}
        aria-label="프로필"
        aria-haspopup="menu"
        aria-expanded={open}
        className="cursor-pointer text-gray-200"
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="header-profile" width={2.4} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[30]"
            onClick={() => setOpen(false)}
          />
          <div
            ref={cardRef}
            role="menu"
            aria-label="프로필 메뉴"
            className="absolute top-[calc(100%+0.8rem)] right-0 z-[40] min-w-[12rem] rounded-2xl bg-white px-[1.2rem] py-[1rem] shadow-[0_8px_24px_rgba(0,0,0,0.14)] ring-1 ring-black/5"
          >
            <div className="relative z-10 flex-col gap-[0.4rem]">
              <div className="flex-col">
                <div className="caption1 text-black">{user.name}</div>
                <div className="caption2 text-gray-500">{user.email}</div>
              </div>
              <div className="h-px bg-gray-200" />

              <button
                className="caption4 flex w-full cursor-pointer items-center gap-[0.4rem] rounded-[0.8rem] text-gray-600 hover:bg-gray-100"
                onClick={handleClickPrimary}
              >
                <Icon name={authed ? 'logout' : 'google'} size={1.7} />
                <span>{authed ? '로그아웃' : '로그인'}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
