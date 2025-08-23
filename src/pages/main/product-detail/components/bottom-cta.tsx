import { cn } from '@/shared/libs/cn';

function BottomCTA({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="mx-auto w-full bg-white px-[2rem] py-[1rem]">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-disabled={disabled}
        className={cn(
          'body3 w-full rounded-[10px] py-[1.6rem] transition-colors',
          disabled
            ? 'cursor-not-allowed bg-gray-100 text-gray-400'
            : 'cursor-pointer bg-gray-900 text-white',
        )}
      >
        {label}
      </button>
    </div>
  );
}

export default BottomCTA;
