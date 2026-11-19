import type { Project } from "../../pages/PortfolioSection";

interface GalleryProps {
  project: Project;
}

export function Gallery({ project }: GalleryProps) {
  const panels = ["Dashboard", "Workspace", "Responsive view"];

  return (
    <section aria-labelledby="gallery-title">
      <div className="mb-8 max-w-2xl">
        <h2 id="gallery-title" className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Project gallery
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Key interface views from {project.title}. Replace these preview panels with final screenshots when they are ready.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {panels.map((panel, index) => (
          <article key={panel} className={index === 0 ? "md:col-span-2" : ""}>
            <div
              className={`overflow-hidden rounded-2xl border border-zinc-200 p-4 ${index === 0 ? "min-h-80" : "min-h-64"}`}
              style={{ backgroundColor: project.accentColor || "#e4e4e7" }}
            >
              <div className="mx-auto h-full min-h-[inherit] max-w-4xl overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl">
                <div className="flex h-9 items-center gap-1.5 border-b border-zinc-200 bg-zinc-100 px-3" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-zinc-300" />
                  <span className="h-2 w-2 rounded-full bg-zinc-300" />
                  <span className="h-2 w-2 rounded-full bg-zinc-300" />
                </div>
                <div className="grid min-h-56 grid-cols-[72px_1fr]">
                  <div className="border-r border-zinc-200 bg-zinc-950 p-3">
                    <div className="h-5 rounded bg-white/25" />
                    <div className="mt-8 space-y-3">
                      <div className="h-2 rounded bg-white/30" />
                      <div className="h-2 rounded bg-white/15" />
                      <div className="h-2 rounded bg-white/15" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="h-6 w-2/5 rounded bg-zinc-900" />
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      <div className="h-20 rounded-lg bg-zinc-100" />
                      <div className="h-20 rounded-lg bg-zinc-100" />
                      <div className="h-20 rounded-lg bg-zinc-100" />
                    </div>
                    <div className="mt-4 h-20 rounded-lg border border-zinc-200" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-zinc-900">{panel}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
