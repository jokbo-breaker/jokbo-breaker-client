import Icon from '@/shared/components/icon';

type Props = {
  title?: string;
  subtitle?: string;
  iconName?: string;
  className?: string;
};

export default function EmptyRecommend({
  title = '취향에 맞는 준비된 메뉴가 없어요',
  subtitle = '다시 추천받아 볼까요?',
  iconName = 'empty-recommend',
  className,
}: Props) {
  return (
    <div className={`flex-col-center gap-[2.8rem] ${className ?? ''}`}>
      <Icon name={iconName} size={25} />
      <div className="flex-col-center gap-[0.8rem] text-black">
        <span className="head3">{title}</span>
        <span className="body2">{subtitle}</span>
      </div>
    </div>
  );
}
