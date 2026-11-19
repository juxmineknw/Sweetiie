import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  FolderGit2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ERDiagram } from "../components/diagrams/ERDiagram";
import { Flowchart } from "../components/diagrams/Flowchart";
import { Gallery } from "../components/diagrams/Gallery";
import { Overview } from "../components/diagrams/Overview";
import { Wireframe } from "../components/diagrams/Wireframe";
import type { ProfileData } from "./AboutSection";
import { ProjectMockup, type Project } from "./PortfolioSection";

type ProjectTab = "overview" | "gallery" | "flowchart" | "wireframe" | "erd";

const PROJECT_TABS: Array<{ id: ProjectTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "gallery", label: "Gallery" },
  { id: "flowchart", label: "Flowchart" },
  { id: "wireframe", label: "Wireframe" },
  { id: "erd", label: "ERD" },
];

interface ProjectModelProps {
  project: Project;
  allProjects: Project[];
  profile: ProfileData;
  onBackToPortfolio: () => void;
  onSelectProject: (projectId: string) => void;
}

export function ProjectModel({
  project,
  allProjects,
  profile,
  onBackToPortfolio,
  onSelectProject,
}: ProjectModelProps) {
  const [copiedRepo, setCopiedRepo] = useState(false);
  const [activeTab, setActiveTab] = useState<ProjectTab>("overview");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project.id]);

  const currentIndex = allProjects.findIndex((item) => item.id === project.id);
  const nextProject = allProjects.length > 1 ? allProjects[(currentIndex + 1) % allProjects.length] : null;

  const handleCopyGithub = async () => {
    if (!project.githubUrl) return;
    try {
      await navigator.clipboard.writeText(project.githubUrl);
      setCopiedRepo(true);
      window.setTimeout(() => setCopiedRepo(false), 1800);
    } catch {
      window.open(project.githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article aria-label={`${project.title} Case Study`} className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4 pt-8">
        <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
          <span>03 / CASE STUDY</span>
          <span aria-hidden="true">/</span>
          <button type="button" onClick={onBackToPortfolio} className="underline-offset-4 hover:text-zinc-950 hover:underline">Portfolio</button>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-zinc-950">{project.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={onBackToPortfolio} className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950">
            <ArrowLeft className="h-3.5 w-3.5" /> All Projects
          </button>
        </div>
      </div>

      <header className="grid grid-cols-1 items-end gap-8 pb-8 pt-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500">
            <span>{project.indexLabel ?? String(currentIndex + 1).padStart(2, "0")}</span>
            <span aria-hidden="true">/</span><span>{project.category}</span>
            <span aria-hidden="true">/</span><span>{project.year}</span>
            <span aria-hidden="true">/</span><span>{project.roleLabel}</span>
          </div>
          <h1 className="text-balance font-display text-[clamp(3rem,6.5vw,5.25rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-zinc-950">
            {project.title}
          </h1>
        </div>

        <div className="space-y-5 lg:col-span-5">
          <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">{project.summary}</p>
          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-zinc-900 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white">
                <FolderGit2 className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-zinc-950 bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800">
                Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <button type="button" onClick={handleCopyGithub} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-xs font-medium text-zinc-600 hover:text-zinc-950">
                {copiedRepo ? <Check className="h-3.5 w-3.5 text-emerald-700" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedRepo ? "Repo Copied" : "Copy Repo"}
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="mb-10 rounded-2xl border border-zinc-200 bg-[#EFEFE9] p-4 sm:p-8">
        <div className="mx-auto max-w-3xl">
          <ProjectMockup project={project} ownerName={profile.fullName} />
        </div>
      </div>

      <div className="border-y border-zinc-200 py-3">
        <nav aria-label="Project case study sections" className="grid grid-cols-2 gap-1 rounded-xl bg-zinc-200/80 p-1 sm:grid-cols-5">
          {PROJECT_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${
                activeTab === tab.id
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "text-zinc-600 hover:bg-white/60 hover:text-zinc-950"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="py-10 sm:py-12">
        {activeTab === "overview" && <Overview project={project} />}
        {activeTab === "gallery" && <Gallery project={project} />}
        {activeTab === "flowchart" && <Flowchart project={project} />}
        {activeTab === "wireframe" && <Wireframe project={project} />}
        {activeTab === "erd" && <ERDiagram project={project} />}
      </div>

      {nextProject && (
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-zinc-200 pt-8 sm:flex-row sm:items-center">
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">Next Case Study</span>
          <button type="button" onClick={() => onSelectProject(nextProject.id)} className="inline-flex items-center gap-3 text-lg font-bold text-zinc-950 transition-opacity hover:opacity-70 sm:text-xl">
            <span className="font-mono text-sm text-zinc-400">{nextProject.indexLabel ?? String(((currentIndex + 1) % allProjects.length) + 1).padStart(2, "0")}</span>
            {nextProject.title}<ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </article>
  );
}

export { ProjectModel as CaseStudyView };
