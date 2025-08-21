function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary caption4 pointer-events-none absolute top-[1.2rem] left-[1.2rem] rounded-[4px] px-[0.6rem] py-[0.45rem] text-white">
      {children}
    </div>
  );
}

export default Badge;
