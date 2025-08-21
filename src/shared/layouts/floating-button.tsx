interface FloatingButtonProps {
  onClick?: () => void;
}

function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <div className="flex justify-end px-4">
      <button
        type="button"
        onClick={onClick}
        aria-label="button"
        className="hover:bg-gray-80 bg-primary flex h-[60px] w-[60px] items-center gap-2 rounded-full px-4 py-2 text-white transition"
      ></button>
    </div>
  );
}

export default FloatingButton;
