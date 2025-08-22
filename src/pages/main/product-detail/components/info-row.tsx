import Icon from '@/shared/components/icon';

type InfoRowProps = {
  icon?: 'location' | 'clock' | 'cart' | 'phone';
  iconSizeRem?: number;
  text: React.ReactNode;
  trailing?: React.ReactNode;
};

function InfoRow({ icon, iconSizeRem = 2.4, text, trailing }: InfoRowProps) {
  const boxSize = `${iconSizeRem}rem`;

  return (
    <div className="flex items-center justify-start gap-[1.2rem]">
      <div className="body4 flex items-center gap-[0.4rem] text-black">
        <span
          className="inline-flex flex-shrink-0 items-center justify-center"
          style={{ width: boxSize, height: boxSize }}
          aria-hidden
        >
          {icon ? <Icon name={icon} size={iconSizeRem} /> : null}
        </span>
        <span>{text}</span>
      </div>
      {trailing}
    </div>
  );
}

export default InfoRow;
