function BottomCTA({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="mx-auto w-full bg-white px-[2rem] py-[1rem]">
      <button
        type="button"
        onClick={onClick}
        className="body3 w-full cursor-pointer rounded-[10px] bg-gray-900 py-[1.6rem] text-white"
      >
        {label}
      </button>
    </div>
  );
}

export default BottomCTA;
