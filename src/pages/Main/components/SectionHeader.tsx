function SectionHeader({
  title,
  onMoreClick,
}: {
  title: string;
  onMoreClick?: () => void;
}) {
  return (
    <div className="flex items-center justify-between pr-[2rem]">
      <h2 className="text-body1 text-black">{title}</h2>
      <button
        type="button"
        onClick={onMoreClick}
        className="text-caption2 text-gray-300 underline"
        aria-label={`${title} 더보기`}
      >
        더보기
      </button>
    </div>
  );
}

export default SectionHeader;
