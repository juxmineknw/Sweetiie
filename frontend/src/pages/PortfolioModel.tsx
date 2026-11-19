import { Plus, Save, Trash2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ProfileData } from "./AboutSection";
import type { Project, ProjectCategory } from "./PortfolioSection";

interface PortfolioModelProps {
  isOpen: boolean;
  profile: ProfileData;
  projects: Project[];
  initialProjectId?: string | null;
  onSave: (profile: ProfileData, projects: Project[]) => void;
  onClose: () => void;
}

type EditorTab = "profile" | "projects";

const PROJECT_CATEGORIES: ProjectCategory[] = ["Web App", "Full-Stack", "System Design"];

function createEmptyProject(index: number): Project {
  return {
    id: `project-${Date.now()}`,
    indexLabel: String(index).padStart(2, "0"),
    title: "New Project",
    summary: "Describe what this project does and the problem it solves.",
    category: "Web App",
    year: String(new Date().getFullYear()),
    roleLabel: "Designer & Developer",
    techStack: ["React", "TypeScript"],
    githubUrl: "",
    liveUrl: "",
    accentColor: "#d4d4d8",
    deliverables: ["Responsive UI"],
  };
}

export function PortfolioModel({
  isOpen,
  profile,
  projects,
  initialProjectId,
  onSave,
  onClose,
}: PortfolioModelProps) {
  const [draftProfile, setDraftProfile] = useState<ProfileData>(() => structuredClone(profile));
  const [draftProjects, setDraftProjects] = useState<Project[]>(() => structuredClone(projects));
  const [activeTab, setActiveTab] = useState<EditorTab>(initialProjectId ? "projects" : "profile");
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId ?? projects[0]?.id ?? "");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeProject = draftProjects.find((project) => project.id === selectedProjectId) ?? draftProjects[0];

  const updateProfile = (patch: Partial<ProfileData>) => {
    setDraftProfile((current) => ({ ...current, ...patch }));
  };

  const updateActiveProject = (patch: Partial<Project>) => {
    if (!activeProject) return;
    setDraftProjects((current) =>
      current.map((project) => (project.id === activeProject.id ? { ...project, ...patch } : project)),
    );
  };

  const addProject = () => {
    const project = createEmptyProject(draftProjects.length + 1);
    setDraftProjects((current) => [...current, project]);
    setSelectedProjectId(project.id);
  };

  const removeProject = () => {
    if (!activeProject) return;
    const remainingProjects = draftProjects.filter((project) => project.id !== activeProject.id);
    setDraftProjects(remainingProjects);
    setSelectedProjectId(remainingProjects[0]?.id ?? "");
  };

  const handleImageUpload = (file?: File) => {
    if (!file) return;
    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file.");
      return;
    }
    if (file.size > 1_500_000) {
      setImageError("Image file must be smaller than 1.5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") updateProfile({ avatarUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-950/10";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Customize Portfolio"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-zinc-300 bg-[#F7F7F5] shadow-2xl">
        <header className="flex items-center justify-between gap-4 border-b border-zinc-200 bg-white px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-bold text-zinc-950 sm:text-lg">Portfolio Manager</h2>
            <p className="text-xs text-zinc-500">Edit your profile and projects, then publish the changes.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close Portfolio Manager" className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950">
            <X className="h-5 w-5" />
          </button>
        </header>

        <nav className="flex items-center gap-6 overflow-x-auto border-b border-zinc-200 bg-white px-5 pt-3 text-xs font-semibold sm:px-6 sm:text-sm">
          <button type="button" onClick={() => setActiveTab("profile")} className={`shrink-0 border-b-2 pb-3 transition-colors ${activeTab === "profile" ? "border-zinc-950 text-zinc-950" : "border-transparent text-zinc-500 hover:text-zinc-900"}`}>
            About Me &amp; Badge
          </button>
          <button type="button" onClick={() => setActiveTab("projects")} className={`shrink-0 border-b-2 pb-3 transition-colors ${activeTab === "projects" ? "border-zinc-950 text-zinc-950" : "border-transparent text-zinc-500 hover:text-zinc-900"}`}>
            Projects ({draftProjects.length})
          </button>
        </nav>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 gap-5 rounded-xl border border-zinc-200 bg-white p-5 md:grid-cols-2">
              <EditorField label="Brand / Navbar Name">
                <input className={inputClass} value={draftProfile.brandName} onChange={(event) => updateProfile({ brandName: event.target.value })} />
              </EditorField>
              <EditorField label="Full Name">
                <input className={inputClass} value={draftProfile.fullName} onChange={(event) => updateProfile({ fullName: event.target.value })} />
              </EditorField>
              <EditorField label="Role / Title">
                <input className={inputClass} value={draftProfile.role} onChange={(event) => updateProfile({ role: event.target.value })} />
              </EditorField>
              <EditorField label="Badge ID">
                <input className={inputClass} value={draftProfile.badgeId} onChange={(event) => updateProfile({ badgeId: event.target.value })} />
              </EditorField>
              <EditorField label="Location">
                <input className={inputClass} value={draftProfile.location} onChange={(event) => updateProfile({ location: event.target.value })} />
              </EditorField>
              <EditorField label="Hero Headline">
                <textarea rows={3} className={inputClass} value={draftProfile.heroHeadline ?? ""} onChange={(event) => updateProfile({ heroHeadline: event.target.value })} />
              </EditorField>
              <EditorField label="Hero Tagline">
                <textarea rows={3} className={inputClass} value={draftProfile.heroTagline} onChange={(event) => updateProfile({ heroTagline: event.target.value })} />
              </EditorField>
              <EditorField label="About Me Bio" wide>
                <textarea rows={4} className={inputClass} value={draftProfile.aboutBio} onChange={(event) => updateProfile({ aboutBio: event.target.value })} />
              </EditorField>
              <EditorField label="Skills (comma separated)" wide>
                <input className={inputClass} value={draftProfile.skills.join(", ")} onChange={(event) => updateProfile({ skills: event.target.value.split(",").map((skill) => skill.trim()).filter(Boolean) })} />
              </EditorField>
              <EditorField label="Contact Email">
                <input type="email" className={inputClass} value={draftProfile.email} onChange={(event) => updateProfile({ email: event.target.value })} />
              </EditorField>
              <EditorField label="GitHub URL">
                <input type="url" className={inputClass} value={draftProfile.githubUrl} onChange={(event) => updateProfile({ githubUrl: event.target.value })} />
              </EditorField>
              <EditorField label="LinkedIn URL">
                <input type="url" className={inputClass} value={draftProfile.linkedinUrl ?? ""} onChange={(event) => updateProfile({ linkedinUrl: event.target.value })} />
              </EditorField>
              <EditorField label="Instagram URL">
                <input type="url" className={inputClass} value={draftProfile.instagramUrl ?? ""} onChange={(event) => updateProfile({ instagramUrl: event.target.value })} />
              </EditorField>
              <EditorField label="X URL">
                <input type="url" className={inputClass} value={draftProfile.xUrl ?? ""} onChange={(event) => updateProfile({ xUrl: event.target.value })} />
              </EditorField>
              <EditorField label="Badge Photo">
                <div className="flex items-center gap-3">
                  <img src={draftProfile.avatarUrl} alt="Badge preview" className="h-12 w-12 rounded-lg border border-zinc-200 object-cover" />
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50">
                    <Upload className="h-3.5 w-3.5" /> Upload
                    <input type="file" accept="image/*" className="sr-only" onChange={(event) => handleImageUpload(event.target.files?.[0])} />
                  </label>
                </div>
                {imageError && <p className="mt-2 text-xs font-medium text-red-600">{imageError}</p>}
              </EditorField>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
              <aside className="h-fit rounded-xl border border-zinc-200 bg-white p-3">
                <button type="button" onClick={addProject} className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-950 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-zinc-800">
                  <Plus className="h-3.5 w-3.5" /> Add Project
                </button>
                <div className="space-y-1">
                  {draftProjects.map((project) => (
                    <button key={project.id} type="button" onClick={() => setSelectedProjectId(project.id)} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${project.id === activeProject?.id ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"}`}>
                      <span className="block truncate font-semibold">{project.title}</span>
                      <span className={`mt-0.5 block text-[11px] ${project.id === activeProject?.id ? "text-zinc-300" : "text-zinc-400"}`}>{project.category}</span>
                    </button>
                  ))}
                </div>
              </aside>

              {activeProject ? (
                <div className="grid grid-cols-1 gap-5 rounded-xl border border-zinc-200 bg-white p-5 md:grid-cols-2">
                  <div className="flex items-center justify-between gap-3 md:col-span-2">
                    <h3 className="font-bold text-zinc-950">Project details</h3>
                    <button type="button" onClick={removeProject} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50">
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                  <EditorField label="Project Title" wide>
                    <input className={inputClass} value={activeProject.title} onChange={(event) => updateActiveProject({ title: event.target.value })} />
                  </EditorField>
                  <EditorField label="Category">
                    <select className={inputClass} value={activeProject.category} onChange={(event) => updateActiveProject({ category: event.target.value as ProjectCategory })}>
                      {PROJECT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </EditorField>
                  <EditorField label="Year">
                    <input className={inputClass} value={activeProject.year} onChange={(event) => updateActiveProject({ year: event.target.value })} />
                  </EditorField>
                  <EditorField label="Role">
                    <input className={inputClass} value={activeProject.roleLabel} onChange={(event) => updateActiveProject({ roleLabel: event.target.value })} />
                  </EditorField>
                  <EditorField label="Accent Color">
                    <div className="flex gap-2">
                      <input type="color" value={activeProject.accentColor ?? "#d4d4d8"} onChange={(event) => updateActiveProject({ accentColor: event.target.value })} className="h-10 w-12 rounded border border-zinc-300 bg-white p-1" />
                      <input className={inputClass} value={activeProject.accentColor ?? ""} onChange={(event) => updateActiveProject({ accentColor: event.target.value })} />
                    </div>
                  </EditorField>
                  <EditorField label="Summary" wide>
                    <textarea rows={4} className={inputClass} value={activeProject.summary} onChange={(event) => updateActiveProject({ summary: event.target.value })} />
                  </EditorField>
                  <EditorField label="Tech Stack (comma separated)" wide>
                    <input className={inputClass} value={activeProject.techStack.join(", ")} onChange={(event) => updateActiveProject({ techStack: event.target.value.split(",").map((tech) => tech.trim()).filter(Boolean) })} />
                  </EditorField>
                  <EditorField label="GitHub URL">
                    <input type="url" className={inputClass} value={activeProject.githubUrl ?? ""} onChange={(event) => updateActiveProject({ githubUrl: event.target.value })} />
                  </EditorField>
                  <EditorField label="Live Demo URL">
                    <input type="url" className={inputClass} value={activeProject.liveUrl ?? ""} onChange={(event) => updateActiveProject({ liveUrl: event.target.value })} />
                  </EditorField>
                  <EditorField label="Deliverables (comma separated)" wide>
                    <input className={inputClass} value={activeProject.deliverables?.join(", ") ?? ""} onChange={(event) => updateActiveProject({ deliverables: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} />
                  </EditorField>
                </div>
              ) : (
                <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-zinc-300 text-sm text-zinc-500">Add a project to begin editing.</div>
              )}
            </div>
          )}
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-zinc-200 bg-white px-5 py-4 sm:px-6">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-zinc-600 transition hover:text-zinc-950">Cancel</button>
          <button type="button" onClick={() => { onSave(draftProfile, draftProjects); onClose(); }} className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-zinc-800">
            <Save className="h-3.5 w-3.5" /> Save &amp; Publish
          </button>
        </footer>
      </div>
    </div>
  );
}

function EditorField({ label, wide = false, children }: { label: string; wide?: boolean; children: ReactNode }) {
  return (
    <label className={`space-y-1.5 text-xs font-semibold text-zinc-700 ${wide ? "md:col-span-2" : ""}`}>
      <span className="block">{label}</span>
      {children}
    </label>
  );
}

export { PortfolioModel as PortfolioEditorModal };
