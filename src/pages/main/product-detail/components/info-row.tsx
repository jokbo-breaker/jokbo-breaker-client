import Icon from '@/shared/components/icon';

function InfoRow({
  icon,
  text,
  trailing,
}: {
  icon: 'location' | 'clock' | 'cart' | 'phone';
  text: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-start gap-[1.2rem]">
      <div className="text-body4 flex items-center gap-[0.4rem] text-black">
        <Icon name={icon} size={2.4} />
        <span>{text}</span>
      </div>
      {trailing}
    </div>
  );
}

export default InfoRow;
