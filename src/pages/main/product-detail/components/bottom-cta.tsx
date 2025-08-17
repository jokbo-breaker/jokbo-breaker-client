function BottomCTA({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="mx-auto w-full bg-white px-5 py-3">
      <button
        type="button"
        onClick={onClick}
        className="h-[54px] w-full rounded-[16px] bg-gray-900 text-[16px] font-semibold text-white"
      >
        {label}
      </button>
    </div>
  );
}

export default BottomCTA;
