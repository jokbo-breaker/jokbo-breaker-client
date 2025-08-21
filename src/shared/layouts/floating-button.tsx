import Icon from '@/shared/components/icon';

interface FloatingButtonProps {
  onClick?: () => void;
}

function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onClick}
        aria-label="button"
        className="flex cursor-pointer items-center gap-2 rounded-full text-white transition"
      >
        <Icon name="floating" size={7} />
      </button>
    </div>
  );
}

export default FloatingButton;
