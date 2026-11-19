import type { Project } from "../../pages/PortfolioSection";

interface OverviewProps {
  project: Project;
}

export function Overview({ project }: OverviewProps) {
  return (
    <section aria-labelledby="overview-title" className="grid gap-x-12 gap-y-10 md:grid-cols-2">
      <div>
        <h2 id="overview-title" className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
          01. What it solves
        </h2>
        <p className="mt-4 text-base leading-7 text-zinc-800">
          {project.summary}
        </p>
      </div>

      <div>
        <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
          02. Architecture &amp; approach
        </h2>
        <p className="mt-4 text-base leading-7 text-zinc-800">
          Built as a maintainable {project.category.toLowerCase()} experience with a clear component structure,
          reusable interface patterns, and a responsive layout.
        </p>
      </div>

      <div className="border-t border-zinc-200 pt-8">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
          03. Role
        </h2>
        <p className="mt-4 text-lg font-semibold text-zinc-950">{project.roleLabel}</p>
        <p className="mt-2 text-sm leading-6 text-zinc-600">Designed and delivered in {project.year}.</p>
      </div>

      <div className="border-t border-zinc-200 pt-8">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
          04. Deliverables
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {(project.deliverables?.length ? project.deliverables : project.techStack).map((item) => (
            <span key={item} className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
