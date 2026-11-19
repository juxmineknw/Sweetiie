import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { ProfileData } from "./AboutSection";

export type ProjectCategory = "Web App" | "Full-Stack" | "System Design";

export interface ErdColumn {
  name: string;
  type: string;
  isPK?: boolean;
  isFK?: boolean;
  nullable?: boolean;
}

export interface ErdTable {
  id: string;
  name: string;
  x: number;
  y: number;
  columns: ErdColumn[];
}

export interface ErdRelation {
  id: string;
  fromTableId: string;
  toTableId: string;
  fromCardinality: string;
  toCardinality: string;
}

export type FlowNodeType = "start" | "process" | "decision" | "database" | "end";

export interface FlowNode {
  id: string;
  label: string;
  details: string;
  type: FlowNodeType;
  x: number;
  y: number;
}

export interface FlowEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export type WireframeLayout = "landing" | "dashboard" | "detail" | "checkout";

export interface WireframeAnnotation {
  code: string;
  label: string;
  detail: string;
}

export interface WireframeScreen {
  id: string;
  screenName: string;
  description: string;
  layout: WireframeLayout;
  imageUrl?: string;
  annotations: WireframeAnnotation[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  year: string;
  roleLabel: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  indexLabel?: string;
  accentColor?: string;
  deliverables?: string[];
  erdSummary?: string;
  erdTables?: ErdTable[];
  erdRelations?: ErdRelation[];
  flowSummary?: string;
  flowNodes?: FlowNode[];
  flowEdges?: FlowEdge[];
  wireframeScreens?: WireframeScreen[];
}

interface PortfolioSectionProps {
  profile: ProfileData;
  projects: Project[];
  onSelectProject?: (projectId: string) => void;
}

const CATEGORIES = ["All", "Web App", "Full-Stack", "System Design"] as const;

export function ProjectMockup({ project, ownerName }: { project: Project; ownerName: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-300 bg-white shadow-[0_18px_40px_rgba(24,24,27,0.12)]">
      <div className="flex h-9 items-center justify-between border-b border-zinc-200 bg-zinc-100 px-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-zinc-300" />
          <span className="h-2 w-2 rounded-full bg-zinc-300" />
          <span className="h-2 w-2 rounded-full bg-zinc-300" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">Project preview</span>
      </div>

      <div className="grid min-h-64 grid-cols-12 sm:min-h-72">
        <div className="col-span-8 flex flex-col justify-between p-5 sm:p-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
              {project.category} / {project.year}
            </span>
            <h3 className="mt-4 max-w-sm text-2xl font-extrabold uppercase leading-none tracking-tight text-zinc-950 sm:text-4xl">
              {project.title}
            </h3>
          </div>
          <div>
            <div className="mb-3 h-1 w-12" style={{ backgroundColor: project.accentColor || "#18181b" }} />
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Designed by {ownerName}</p>
          </div>
        </div>

        <div
          className="col-span-4 flex items-center justify-center border-l border-zinc-200 p-3"
          style={{ backgroundColor: project.accentColor || "#e4e4e7" }}
          aria-hidden="true"
        >
          <div className="grid w-full gap-2">
            <span className="h-16 rounded-md bg-white/85 shadow-sm sm:h-20" />
            <span className="h-8 rounded-md bg-white/60" />
            <span className="h-8 rounded-md bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioSection({ profile, projects, onSelectProject }: PortfolioSectionProps) {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  return (
    <section id="portfolio" aria-label="Portfolio Projects" className="mx-auto max-w-[1200px] scroll-mt-16 px-5 pb-24 sm:px-8">
      <div className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-4 pt-8">
        <span className="font-mono text-xs tracking-wider text-zinc-500">02 / PORTFOLIO</span>
      </div>

      <div className="flex flex-col justify-between gap-8 border-b border-zinc-200 pb-10 pt-10 lg:flex-row lg:items-end">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-balance font-display text-[clamp(3.25rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-zinc-950">Selected Work</h1>
          <p className="max-w-lg text-sm leading-relaxed text-zinc-600 sm:text-base">
            A selection of products and systems shaped through research, thoughtful interface design, and maintainable frontend code.
          </p>
        </div>

        <div role="group" aria-label="Filter projects by category" className="inline-flex flex-wrap items-center gap-1 self-start rounded-lg bg-zinc-200/75 p-1 lg:self-auto">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={`shrink-0 whitespace-nowrap rounded-md px-3.5 py-2 text-xs font-semibold transition-colors ${filter === category ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="space-y-3 border-b border-zinc-200 py-16 text-center">
          <p className="text-base font-medium text-zinc-700">No projects in {filter} yet.</p>
          <button type="button" onClick={() => setFilter("All")} className="text-sm font-semibold text-zinc-950 underline underline-offset-4">Show all projects</button>
        </div>
      ) : (
        <div className="divide-y divide-zinc-200">
          {filteredProjects.map((project, index) => {
            const displayIndex = project.indexLabel || String(index + 1).padStart(2, "0");
            const projectUrl = project.liveUrl || project.githubUrl;

            return (
              <article key={project.id} className="group py-10 sm:py-12">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-sm font-semibold tabular-nums text-zinc-950">{displayIndex}</span>
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <span>{project.category}</span><span aria-hidden="true">/</span>
                    <span className="tabular-nums">{project.year}</span><span aria-hidden="true">/</span>
                    <span>{project.roleLabel}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="space-y-5 lg:col-span-5">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">{project.title}</h2>
                    <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">{project.summary}</p>

                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-zinc-500">
                      {project.techStack.map((tech, techIndex) => (
                        <span key={`${tech}-${techIndex}`} className="inline-flex items-center gap-2.5">
                          <span className="text-zinc-800">{tech}</span>
                          {techIndex < project.techStack.length - 1 && <span aria-hidden="true" className="text-zinc-300">/</span>}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-5 pt-2">
                      {onSelectProject ? (
                        <button type="button" onClick={() => onSelectProject(project.id)} className="inline-flex items-center gap-1.5 border-b-2 border-zinc-950 pb-0.5 text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-70">
                          View case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      ) : projectUrl ? (
                        <a
                          href={projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border-b-2 border-zinc-950 pb-0.5 text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-70"
                        >
                          View case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 border-b-2 border-zinc-300 pb-0.5 text-sm font-semibold text-zinc-400">
                          Case study coming soon
                        </span>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950">
                          GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>

                    {project.deliverables && project.deliverables.length > 0 && (
                      <p className="pt-2 text-xs leading-relaxed text-zinc-500">Includes: {project.deliverables.join(" / ")}</p>
                    )}
                  </div>

                  <div className="lg:col-span-7">
                    {projectUrl ? (
                      <a href={projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`} className="block w-full rounded-2xl border border-zinc-200/80 bg-[#EFEFE9] p-3 transition-colors hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 sm:p-5">
                        <ProjectMockup project={project} ownerName={profile.fullName} />
                      </a>
                    ) : (
                      <div className="rounded-2xl border border-zinc-200/80 bg-[#EFEFE9] p-3 sm:p-5">
                        <ProjectMockup project={project} ownerName={profile.fullName} />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
