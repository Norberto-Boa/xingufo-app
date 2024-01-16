export default function NonAuth({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen w-screen flex justify-center items-center gap-8 flex-col overflow-x-hidden">
      <div className="text-center">
        <h4 className="text-3xl font-bold uppercase">
          Xingufo <span className="text-emerald-500">APP</span>
        </h4>
      </div>
      {children}
    </section>
  );
}
