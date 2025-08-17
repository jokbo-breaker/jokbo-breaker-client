import { cn } from '@/shared/libs/cn';

type Props = {
  /** 전체 점 개수 */
  total: number;
  /** 현재 활성 인덱스 (0-base) */
  index: number;
  /** 점 클릭/키보드 선택 시 호출 */
  onSelect?: (i: number) => void;
  /** 확장 클래스 (컨테이너) */
  className?: string;
};

export default function Indicator({
  total,
  index,
  onSelect,
  className,
}: Props) {
  if (total <= 0) return null;

  return (
    <div
      className={cn('flex items-center justify-center gap-[0.6rem]', className)}
      role="tablist"
      aria-label="이미지 인디케이터"
    >
      {Array.from({ length: total }).map((_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`${i + 1}번 이미지`}
            onClick={() => onSelect?.(i)}
            className={cn(
              'h-[0.8rem] w-[0.8rem] rounded-full transition-colors',
              active ? 'bg-gray-500' : 'bg-gray-300',
            )}
          />
        );
      })}
    </div>
  );
}
