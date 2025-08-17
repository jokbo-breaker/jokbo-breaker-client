function BottomCTA({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[var(--z-bottom-nav)] bg-white/90 backdrop-blur">
      <div className="mx-auto w-full max-w-[420px] px-5 py-3">
        <button
          type="button"
          onClick={onClick}
          className="h-[54px] w-full rounded-[16px] bg-gray-900 text-[16px] font-semibold text-white"
        >
          {label}
        </button>
        <div className="mt-2 flex justify-center">
          <div className="h-1 w-24 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default BottomCTA;
