import type { ActiveView } from "./Navbar";

interface FooterProps {
  ownerName: string;
  githubUrl: string;
  onNavigate: (view: ActiveView) => void;
}

export function Footer({ ownerName, githubUrl, onNavigate }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-[#F7F7F5]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between md:py-9">
        <p className="font-mono text-[11px] leading-relaxed text-zinc-500 sm:text-xs">
          © {new Date().getFullYear()} <span className="uppercase">{ownerName}</span>. Public Portfolio &amp; Case Study Archive.
        </p>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-zinc-600">
          <button type="button" onClick={() => onNavigate("about")} className="transition-colors hover:text-zinc-950">
            About Me
          </button>
          <button type="button" onClick={() => onNavigate("portfolio")} className="transition-colors hover:text-zinc-950">
            Portfolio
          </button>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-zinc-950">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
