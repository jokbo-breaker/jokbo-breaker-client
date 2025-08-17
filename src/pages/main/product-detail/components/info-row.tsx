import Icon from '@/shared/components/icon';

function InfoRow({
  icon,
  text,
  trailing,
}: {
  icon: 'pin' | 'clock' | 'cart' | 'phone';
  text: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 text-[14px] text-gray-800">
        <Icon name={icon} size={1.6} />
        <span>{text}</span>
      </div>
      {trailing}
    </div>
  );
}

export default InfoRow;
