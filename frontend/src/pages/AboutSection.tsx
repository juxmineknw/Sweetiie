import { ArrowDown, ArrowUpRight, Check, Code2, Copy, Palette, Search } from "lucide-react";
import { SiFigma, SiGit, SiReact, SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";
import { useState } from "react";

export interface ProfileData {
  brandName: string;
  fullName: string;
  role: string;
  badgeId: string;
  avatarUrl: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  xUrl?: string;
  heroHeadline?: string;
  heroTagline: string;
  aboutBio: string;
  education?: Array<{
    degree: string;
    institution: string;
    period: string;
    description?: string;
  }>;
  skills: string[];
  focusAreas?: Array<{
    title: string;
    description: string;
  }>;
}

interface AboutSectionProps {
  profile: ProfileData;
  projectCount: number;
  onExplorePortfolio: () => void;
}

interface LanyardBadgeProps {
  fullName: string;
  role: string;
  badgeId: string;
  avatarUrl: string;
  onAboutClick: () => void;
}

function SkillIcon({ skill }: { skill: string }) {
  const normalizedSkill = skill.toLowerCase();
  const className = "h-5 w-5 shrink-0";

  if (normalizedSkill.includes("typescript")) {
    return <SiTypescript className={`${className} text-[#3178C6]`} aria-hidden="true" />;
  }
  if (normalizedSkill === "react") {
    return <SiReact className={`${className} text-[#61DAFB]`} aria-hidden="true" />;
  }
  if (normalizedSkill.includes("tailwind")) {
    return <SiTailwindcss className={`${className} text-[#06B6D4]`} aria-hidden="true" />;
  }
  if (normalizedSkill === "figma") {
    return <SiFigma className={`${className} text-[#F24E1E]`} aria-hidden="true" />;
  }
  if (normalizedSkill === "vite") {
    return <SiVite className={`${className} text-[#646CFF]`} aria-hidden="true" />;
  }
  if (normalizedSkill === "git") {
    return <SiGit className={`${className} text-[#F05032]`} aria-hidden="true" />;
  }
  if (normalizedSkill.includes("ui")) {
    return <Palette className={`${className} text-violet-600`} aria-hidden="true" />;
  }
  if (normalizedSkill.includes("ux")) {
    return <Search className={`${className} text-emerald-600`} aria-hidden="true" />;
  }

  return <Code2 className={`${className} text-zinc-500`} aria-hidden="true" />;
}
// การ์ด
function LanyardBadge({
  fullName,
  role,
  badgeId,
  avatarUrl,
  onAboutClick,
}: LanyardBadgeProps) {
  return (
    <div className="flex w-full max-w-[330px] flex-col items-center">
      <div className="h-24 w-5 bg-zinc-950 sm:h-28" aria-hidden="true" />
      <div className="-mt-2 h-6 w-12 rounded-md border-4 border-zinc-800 bg-zinc-500" aria-hidden="true" />

      <article className="w-full origin-center rotate-[1.5deg] rounded-xl border border-zinc-300 bg-white p-4 shadow-[0_20px_45px_rgba(24,24,27,0.14)] transition-transform duration-300 hover:rotate-0">
        <div className="mb-4 flex items-center justify-between border-b border-zinc-200 pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
          <span>Developer</span>
          <span>{badgeId}</span>
        </div>

        <img
          src={avatarUrl}
          alt={`Portrait of ${fullName}`}
          className="aspect-[4/3] w-full rounded-md bg-zinc-100 object-cover grayscale"
        />

        <div className="pt-4">
          <h2 className="text-xl font-extrabold tracking-tight text-zinc-950">
            {fullName}
          </h2>
          <p className="mt-1 text-sm text-zinc-600">{role}</p>
          <button
            type="button"
            onClick={onAboutClick}
            className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-700 transition-colors hover:text-zinc-950"
          >
            Read profile
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  );
}
// ช่วงแบ่ง section
export function AboutSection({
  profile,
  projectCount,
  onExplorePortfolio,
}: AboutSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const scrollToBio = () => {
    document.getElementById("about-details")?.scrollIntoView({ behavior: "smooth" });
  };

  const headlineLines = (profile.heroHeadline || "DESIGN.\nCODE.\nBUILD.")
    .split("\n")
    .filter(Boolean);

  return (
    <section
      id="about"
      aria-label="About Me"
      className="mx-auto max-w-[1200px] scroll-mt-16 px-5 pb-20 sm:px-8"
    >
      <div className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-4 pt-8">
        <span className="font-mono text-xs tracking-wider text-zinc-500">01 / ABOUT ME</span>
        <div className="flex items-center gap-3 text-xs text-zinc-500 sm:gap-4">
          <span>{profile.location}</span>
          <span aria-hidden="true">/</span>
          <span className="tabular-nums">{projectCount} Case Studies</span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-10 border-b border-zinc-200 pb-16 pt-8 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col justify-between gap-10 lg:col-span-7">
          <div className="space-y-8">
            <h1 className="text-balance font-display text-[clamp(3.75rem,8vw,6.25rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-zinc-950">
              {headlineLines.map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <div className="max-w-md space-y-4">
              <p className="text-sm font-semibold uppercase leading-relaxed tracking-wide text-zinc-800 sm:text-base">
                {profile.heroTagline}
              </p>
              <div className="h-0.5 w-40 bg-zinc-900" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onExplorePortfolio}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            >
              Explore Portfolio
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>

          </div>
        </div>

        <div className="flex items-start justify-center overflow-hidden rounded-2xl border border-zinc-200/70 bg-gradient-to-b from-zinc-200/45 via-zinc-100/40 to-transparent px-8 pb-10 lg:col-span-5">
          <LanyardBadge
            fullName={profile.fullName}
            role={profile.role}
            badgeId={profile.badgeId}
            avatarUrl={profile.avatarUrl}
            onAboutClick={scrollToBio}
          />
        </div>
      </div>

      <div id="about-details" className="divide-y divide-zinc-200">
        <div className="grid grid-cols-1 items-start gap-4 py-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">About Me</h2>
          </div>
          <div className="md:col-span-9">
            <p className="max-w-2xl text-base leading-relaxed text-zinc-800 sm:text-lg">{profile.aboutBio}</p>
          </div>
        </div>

        {profile.education && profile.education.length > 0 && (
          <div className="grid grid-cols-1 items-start gap-4 py-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Education
              </h2>
            </div>
            <div className="space-y-8 md:col-span-9">
              {profile.education.map((item) => (
                <article
                  key={`${item.institution}-${item.degree}`}
                  className="grid gap-3 sm:grid-cols-[1fr_auto] sm:gap-8"
                >
                  <div>
                    <h3 className="text-base font-semibold text-zinc-950 sm:text-lg">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-zinc-600">
                      {item.institution}
                    </p>
                    {item.description && (
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <p className="font-mono text-xs tabular-nums text-zinc-500 sm:pt-1">
                    {item.period}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-4 py-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">Skills &amp; Stack</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 md:col-span-9">
            {profile.skills.map((skill, index) => (
              <div key={`${skill}-${index}`} className="flex items-center justify-between gap-3 border-b border-zinc-200 pb-3">
                <span className="flex min-w-0 items-center gap-2.5">
                  <SkillIcon skill={skill} />
                  <span className="truncate text-sm font-medium text-zinc-900">{skill}</span>
                </span>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-zinc-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div id="contact" className="grid scroll-mt-20 grid-cols-1 items-center gap-4 py-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">Contact</h2>
          </div>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center md:col-span-9">
            <div className="flex flex-wrap items-center gap-4">
              <a href={`mailto:${profile.email}`} className="text-base font-semibold text-zinc-950 hover:underline sm:text-lg">
                {profile.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-950"
              >
                {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-700" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedEmail ? "Copied" : "Copy email"}
              </button>
            </div>

            <div className="flex items-center gap-5 text-sm font-medium text-zinc-700">
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-zinc-950">
                GitHub <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-zinc-950">
                  LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
