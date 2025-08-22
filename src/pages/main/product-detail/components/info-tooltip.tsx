import Tooltip, { Side, Align } from './tooltip';
import Icon from '@/shared/components/icon';

export default function InfoTooltipButton({
  text = '구성이 궁금해요',
  content,
  side = 'bottom',
  align = 'end',
  offset = 8,
  maxWidth = 320,
  className = '',
}: {
  text?: string;
  content: React.ReactNode;
  side?: Side;
  align?: Align;
  offset?: number;
  maxWidth?: number;
  className?: string;
}) {
  return (
    <Tooltip
      content={content}
      side={side}
      align={align}
      offset={offset}
      maxWidth={maxWidth}
      trigger="click"
      className={className}
      lockToTriggerRight
    >
      <button
        type="button"
        aria-label={text}
        className="caption4 flex cursor-pointer touch-manipulation items-center gap-[0.2rem] rounded-[4px] bg-gray-100 py-[0.45rem] pr-[0.6rem] pl-[0.2rem] text-gray-600 hover:bg-gray-200/90"
      >
        <Icon name="info" size={1.6} className="text-gray-500" />
        <span>{text}</span>
      </button>
    </Tooltip>
  );
}
