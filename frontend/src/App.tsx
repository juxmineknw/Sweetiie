import { useState } from "react";
import { ContactModal } from "./components/ContactModal";
import { Footer } from "./components/Footer";
import { Navbar, type ActiveView } from "./components/Navbar";
import { AboutSection, type ProfileData } from "./pages/AboutSection";
import { PortfolioSection, type Project } from "./pages/PortfolioSection";
import { ProjectModel } from "./pages/ProjectModel";
import profileImage from "./assets/sweetiie.png";

const initialProfile: ProfileData = {
  brandName: "Sweetiie",
  fullName: "Kanokwan Boonyo",
  role: "Developer & Designer",
  badgeId: "2003-10-16",
  avatarUrl: profileImage,
  location: "Thailand",
  email: "jusmine2003@gmail.com",
  githubUrl: "https://github.com/juxmineknw",
  linkedinUrl: "https://www.linkedin.com/in/juxmineknw",
  instagramUrl: "https://www.instagram.com/juxmineknw",
  xUrl: "https://x.com/juxmineknw",
  heroHeadline: "NO BUGS\nJUST\nFEATURES",
  heroTagline: "I build thoughtful digital experiences. Bugs? Never heard of them.",
  aboutBio:
    "I’m a recent graduate who loves designing and building digital experiences..",
  education: [
    {
      degree: "Bachelor's Degree in Computer Science",
      institution: "Naresuan University, Thailand",
      period: "2022 — 2026",
      description:
        "Focused on software development, interaction design, and building user-centered digital products.",
    },
    {
      degree: "Mathematics & Science",
      institution: "Lansakwitthaya School, Thailand",
      period: "2019 — 2021",
      description:
        "Studied advanced mathematics, computer science, and design principles, laying the foundation for a career in technology and design.",
    }
  ],
  skills: ["TypeScript", "React", "Tailwind CSS", "Figma", "UI Design", "UX Research", "Vite", "Git"],
  focusAreas: [
    {
      title: "Understand",
      description: "Clarify the problem, user needs, and constraints before shaping a solution.",
    },
    {
      title: "Design",
      description: "Build a clear visual system and test the interaction through focused prototypes.",
    },
    {
      title: "Deliver",
      description: "Turn the approved direction into responsive, maintainable frontend code.",
    },
  ],
};

const initialProjects: Project[] = [
  {
    id: "workhub",
    title: "WorkHub Management System",
    summary:
      "A centralized workspace for managing team tasks, daily operations, equipment, and progress visibility.",
    category: "Full-Stack",
    year: "2026",
    roleLabel: "Product Design & Development",
    techStack: ["React", "TypeScript", "Node.js", "MySQL"],
    githubUrl: "https://github.com/juxmineknw",
    accentColor: "#c7d2fe",
    deliverables: ["UX Flow", "Responsive UI", "Database Design"],
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    summary:
      "An editorial portfolio experience designed to present selected work, skills, and professional background clearly.",
    category: "Web App",
    year: "2026",
    roleLabel: "UI Design & Frontend",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/juxmineknw",
    accentColor: "#fde68a",
    deliverables: ["Visual System", "Responsive UI", "Frontend Build"],
  },
  {
    id: "design-system",
    title: "Scalable Design System",
    summary:
      "A reusable component and token system that keeps product interfaces consistent while accelerating delivery.",
    category: "System Design",
    year: "2025",
    roleLabel: "System Design",
    techStack: ["Figma", "React", "Storybook"],
    accentColor: "#bbf7d0",
    deliverables: ["Design Tokens", "Component Library", "Documentation"],
  },
];

function App() {
  const [activeView, setActiveView] = useState<ActiveView>("about");
  const [caseStudyProjectId, setCaseStudyProjectId] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const profile = initialProfile;
  const projects = initialProjects;

  const openProjectModel = (projectId: string) => {
    setCaseStudyProjectId(projectId);
  };

  const backToPortfolio = () => {
    setCaseStudyProjectId(null);
    window.requestAnimationFrame(() => {
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    setCaseStudyProjectId(null);

    window.requestAnimationFrame(() => {
      document.getElementById(view)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const activeCaseStudy = projects.find((project) => project.id === caseStudyProjectId);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F7F5] text-zinc-950">
      <Navbar
        brandTitle={profile.brandName}
        githubUrl={profile.githubUrl}
        activeView={activeView}
        onNavigate={handleNavigate}
        onContact={() => setContactModalOpen(true)}
      />

      <main className="flex-1">
        {activeCaseStudy ? (
          <ProjectModel
            key={activeCaseStudy.id}
            project={activeCaseStudy}
            allProjects={projects}
            profile={profile}
            onBackToPortfolio={backToPortfolio}
            onSelectProject={openProjectModel}
          />
        ) : (
          <>
            <AboutSection
              profile={profile}
              projectCount={projects.length}
              onExplorePortfolio={() => handleNavigate("portfolio")}
            />

            <PortfolioSection
              profile={profile}
              projects={projects}
              onSelectProject={openProjectModel}
            />
          </>
        )}
      </main>

      <Footer
        ownerName={profile.fullName}
        githubUrl={profile.githubUrl}
        onNavigate={handleNavigate}
      />

      <ContactModal
        isOpen={contactModalOpen}
        profile={profile}
        onClose={() => setContactModalOpen(false)}
      />

    </div>
  );
}

export default App;
