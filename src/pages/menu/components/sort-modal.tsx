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

  return (
    <div className="fixed inset-0 z-[var(--z-bottom-modal)]">
      <button
        aria-label="닫기"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="bottom-modal flex-col gap-[0.8rem] rounded-t-[2.4rem] bg-white pt-[1.6rem]">
        <div className="mx-auto h-[0.3rem] w-[5rem] rounded-[10px] bg-gray-200" />
        <div className="flex-col gap-[1.2rem]">
          <h2 className="body1 text-center text-black">정렬</h2>

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
    </div>
  );
}
