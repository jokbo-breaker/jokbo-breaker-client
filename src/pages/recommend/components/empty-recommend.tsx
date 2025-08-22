import Icon from '@/shared/components/icon';

export default function EmptyRecommend() {
  return (
    <div className="flex-col-center gap-[2.8rem]">
      <Icon name="empty-recommend" size={25} />
      <div className="flex-col-center gap-[0.8rem] text-black">
        <span className="head3">취향에 맞는 준비된 메뉴가 없어요</span>
        <span className="body2">다시 추천받아 볼까요?</span>
      </div>
    </div>
  );
}
