function AuthRightPanel({ children }) {
  return (
    <section className="flex items-center justify-center bg-[#F8FAFC] px-8 py-10">
      <div
        className="
          w-full
          max-w-[760px]
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-12
          shadow-sm
        "
      >
        {children}
      </div>
    </section>
  );
}

export default AuthRightPanel;
