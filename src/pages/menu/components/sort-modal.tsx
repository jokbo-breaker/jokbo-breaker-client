import { createPortal } from 'react-dom';
import { SORT_OPTIONS, type SortKey } from '@/pages/menu/constants/sort';
import { cn } from '@/shared/libs/cn';

type Props = {
  open: boolean;
  value: SortKey;
  onChange: (v: SortKey) => void;
  onClose: () => void;
};

export default function SortModal({ open, value, onChange, onClose }: Props) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <button
        aria-label="닫기"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        type="button"
      />

      {/* ⬇️ 바텀시트 래퍼: 가운데 정렬 + 최대 43rem */}
      <div className="fixed inset-x-0 bottom-0">
        <div className="mx-auto w-full max-w-[43rem] rounded-t-[2.4rem] bg-white pt-[1.6rem] pb-[max(env(safe-area-inset-bottom),1.2rem)]">
          <div className="mx-auto mb-[0.8rem] h-[0.3rem] w-[5rem] rounded-[10px] bg-gray-200" />
          <h2 className="body1 mb-[1.2rem] text-center text-black">정렬</h2>

          <ul className="space-y-[0.3rem]">
            {SORT_OPTIONS.map((opt) => {
              const selected = value === opt.key;
              return (
                <li key={opt.key}>
                  <button
                    className={cn(
                      'block w-full cursor-pointer px-[1.6rem] py-[1.8rem] text-left hover:bg-gray-100',
                      selected && 'bg-secondary',
                    )}
                    onClick={() => {
                      onChange(opt.key);
                      onClose();
                    }}
                    type="button"
                  >
                    <span
                      className={cn(
                        'body3 text-black',
                        selected && 'font-medium',
                      )}
                    >
                      {opt.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}
