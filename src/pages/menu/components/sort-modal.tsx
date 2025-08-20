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
      <div className="bottom-modal rounded-t-[2.4rem] bg-white">
        <div className="mx-auto mt-[1.2rem] h-[0.4rem] w-[4rem] rounded-[10px] bg-gray-200" />
        <h2 className="py-[1.2rem] text-center text-[1.6rem] font-medium">
          정렬
        </h2>
        <ul className="mt-[0.4rem]">
          {SORT_OPTIONS.map((opt) => (
            <li key={opt.key}>
              <button
                className={cn(
                  'block w-full cursor-pointer px-[2rem] py-[1.6rem] text-left text-[1.5rem]',
                  value === opt.key && 'bg-gray-100 font-medium',
                )}
                onClick={() => {
                  onChange(opt.key);
                  onClose();
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
