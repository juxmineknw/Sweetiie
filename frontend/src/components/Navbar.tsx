import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

export type ActiveView = 'about' | 'portfolio';

interface NavbarProps {
  brandTitle: string;
  githubUrl: string;
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onContact: () => void;
}

export function Navbar({
  brandTitle,
  githubUrl,
  activeView,
  onNavigate,
  onContact,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (target: ActiveView) => {
    setMobileOpen(false);
    onNavigate(target);
  };

  const handleContact = () => {
    setMobileOpen(false);
    onContact();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F7F5]/95 backdrop-blur-sm border-b border-zinc-200/80">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={() => handleNav('about')}
          aria-label="Go to About Me"
          className="flex shrink-0 cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-lg text-zinc-950 transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          <span className="text-base font-extrabold uppercase tracking-tight sm:text-lg">
            {brandTitle || 'YOUR NAME'}
          </span>
        </button>

        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
        >
          <button
            type="button"
            onClick={() => handleNav('about')}
            className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors py-1 border-b-2 ${
              activeView === 'about'
                ? 'text-zinc-950 border-zinc-950'
                : 'border-transparent hover:text-zinc-950 hover:border-zinc-300'
            }`}
          >
            About Me
          </button>
          <button
            type="button"
            onClick={() => handleNav('portfolio')}
            className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors py-1 border-b-2 ${
              activeView === 'portfolio'
                ? 'text-zinc-950 border-zinc-950'
                : 'border-transparent hover:text-zinc-950 hover:border-zinc-300'
            }`}
          >
            Portfolio
          </button>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:text-zinc-950 hover:border-zinc-300 transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </nav>

        <div className="hidden md:flex items-center shrink-0">
          <button
            type="button"
            onClick={handleContact}
            className="px-4 py-2 text-xs font-semibold tracking-wide bg-zinc-950 text-white rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
          >
            Contact Me
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          className="md:hidden p-2 -mr-2 text-zinc-900 hover:bg-zinc-200/60 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-[#F7F7F5] px-5 py-4 space-y-2">
          <button
            type="button"
            onClick={() => handleNav('about')}
            className="w-full text-left py-2.5 text-sm font-semibold text-zinc-900 border-b border-zinc-200/70"
          >
            About Me
          </button>
          <button
            type="button"
            onClick={() => handleNav('portfolio')}
            className="w-full text-left py-2.5 text-sm font-semibold text-zinc-900 border-b border-zinc-200/70"
          >
            Portfolio
          </button>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between py-2.5 text-sm font-semibold text-zinc-900 border-b border-zinc-200/70"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleContact}
              className="w-full py-2.5 px-4 text-xs font-semibold bg-zinc-950 text-white rounded-lg"
            >
              Contact Me
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
