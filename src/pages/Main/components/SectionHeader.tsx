function SectionHeader({
  title,
  onMoreClick,
}: {
  title: string;
  onMoreClick?: () => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[15px] font-semibold">{title}</h2>
      <button
        type="button"
        onClick={onMoreClick}
        className="text-[12px] text-neutral-500 underline-offset-2 hover:underline"
        aria-label={`${title} 더보기`}
      >
        더보기
      </button>
    </div>
  );
}

export default SectionHeader;
