type Props = { visible: boolean; onFinish?: () => void };

export default function RecommendLoading({ visible }: Props) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 grid place-items-center bg-white">
      <div className="w-[28rem] flex-col gap-[4rem]">
        <div className="h-[0.8rem] w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-[40%] animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-gray-900" />
        </div>
        <p className="body1 text-center text-black">
          AI가 주문 기록을 바탕으로
          <br />
          000님이 좋아하실 만한
          <br />
          상품을 고르고 있어요
        </p>
      </div>
    </div>
  );
}
