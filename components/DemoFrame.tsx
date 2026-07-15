// Sandboxed live demo of the actual offline app, served from /public/demos.
// allow-scripts + allow-modals only — no same-origin, no top navigation.
export function DemoFrame({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-demo">
      <div className="flex items-center gap-2.5 border-b border-line bg-card px-4 py-2.5 text-[13.5px] text-ink-soft">
        <div className="flex gap-[5px]">
          <span className="h-[9px] w-[9px] rounded-full bg-line" />
          <span className="h-[9px] w-[9px] rounded-full bg-line" />
          <span className="h-[9px] w-[9px] rounded-full bg-line" />
        </div>
        Live demo — a fictional sample plan
      </div>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-modals"
        className="block h-[640px] w-full border-0"
      />
    </div>
  );
}
