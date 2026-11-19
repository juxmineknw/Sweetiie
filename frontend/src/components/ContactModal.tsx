import { ArrowUpRight, Check, Copy, Mail, X } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { useEffect, useState } from "react";
import type { ProfileData } from "../pages/AboutSection";

interface ContactModalProps {
  isOpen: boolean;
  profile: ProfileData;
  onClose: () => void;
}

export function ContactModal({ isOpen, profile, onClose }: ContactModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const linkedinUrl = profile.linkedinUrl || "https://www.linkedin.com/in/juxmineknw";
  const instagramUrl = profile.instagramUrl || "https://www.instagram.com/juxmineknw";
  const xUrl = profile.xUrl || "https://x.com/juxmineknw";

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-[#F7F7F5] shadow-2xl">
        <header className="flex items-start justify-between gap-6 border-b border-zinc-200 px-5 py-5 sm:px-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">Let&apos;s connect</span>
            <h2 id="contact-modal-title" className="mt-1 text-2xl font-extrabold tracking-tight text-zinc-950">Contact Me</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Choose the channel that works best for you.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close contact dialog" className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-950">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="space-y-3 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="rounded-lg bg-zinc-100 p-2.5 text-zinc-800"><Mail className="h-5 w-5" /></span>
              <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Email</p><a href={`mailto:${profile.email}`} className="block truncate text-sm font-semibold text-zinc-950 hover:underline">{profile.email}</a></div>
            </div>
            <button type="button" onClick={handleCopyEmail} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950">
              {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedEmail ? "Copied" : "Copy"}
            </button>
          </div>

          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400">
              <span className="flex min-w-0 items-center gap-3"><span className="rounded-lg bg-zinc-100 p-2.5 text-zinc-800"><SiGithub className="h-5 w-5" /></span><span><span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">GitHub</span><span className="block text-sm font-semibold text-zinc-950">View my repositories</span></span></span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-950" />
          </a>

          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400">
            <span className="flex min-w-0 items-center gap-3"><span className="rounded-lg bg-zinc-100 p-2.5 text-zinc-800"><FaLinkedin className="h-5 w-5" /></span><span><span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">LinkedIn</span><span className="block text-sm font-semibold text-zinc-950">Connect professionally</span></span></span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-950" />
          </a>

          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400">
            <span className="flex min-w-0 items-center gap-3"><span className="rounded-lg bg-zinc-100 p-2.5 text-zinc-800"><FaInstagram className="h-5 w-5" /></span><span><span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Instagram</span><span className="block text-sm font-semibold text-zinc-950">Follow my updates</span></span></span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-950" />
          </a>

          <a href={xUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400">
            <span className="flex min-w-0 items-center gap-3"><span className="rounded-lg bg-zinc-100 p-2.5 text-zinc-800"><FaXTwitter className="h-5 w-5" /></span><span><span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">X</span><span className="block text-sm font-semibold text-zinc-950">Follow the conversation</span></span></span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-950" />
          </a>
        </div>
      </section>
    </div>
  );
}
