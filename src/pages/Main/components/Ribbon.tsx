function Ribbon({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute top-2 left-2 rounded-md bg-rose-500 px-2 py-1 text-[11px] font-semibold text-white shadow-sm">
      {children}
    </div>
  );
}

export default Ribbon;
