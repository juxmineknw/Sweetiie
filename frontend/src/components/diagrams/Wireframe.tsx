import { useState } from "react";
import type { Project, WireframeScreen } from "../../pages/PortfolioSection";

interface WireframeProps {
  project: Project;
}

function getDefaultScreens(project: Project): WireframeScreen[] {
  const itemLabel = project.id === "portfolio" ? "project" : project.id === "design-system" ? "component" : "task";

  return [
    {
      id: "landing",
      screenName: "Landing",
      description: `Entry screen and primary value proposition for ${project.title}.`,
      layout: "landing",
      annotations: [
        { code: "01", label: "Global navigation", detail: "Keeps the brand and primary destinations visible." },
        { code: "02", label: "Hero content", detail: "Communicates the main value and directs users to the primary action." },
        { code: "03", label: "Identity card", detail: "Provides visual context and supporting project information." },
      ],
    },
    {
      id: "dashboard",
      screenName: "Dashboard",
      description: `Workspace overview for browsing and managing each ${itemLabel}.`,
      layout: "dashboard",
      annotations: [
        { code: "01", label: "Workspace navigation", detail: "Groups features into predictable destinations." },
        { code: "02", label: "Context toolbar", detail: "Shows the page title and most important action." },
        { code: "03", label: "Content list", detail: `Presents each ${itemLabel} with status and supporting information.` },
      ],
    },
    {
      id: "detail",
      screenName: "Detail",
      description: `Detailed view for reviewing the selected ${itemLabel} and related information.`,
      layout: "detail",
      annotations: [
        { code: "01", label: "Record header", detail: "Combines identity, supporting metadata, and actions." },
        { code: "02", label: "Section navigation", detail: "Switches between related information without leaving the page." },
        { code: "03", label: "Primary workspace", detail: "Displays the content or diagram selected by the user." },
      ],
    },
  ];
}

function Callout({ children }: { children: string }) {
  return <span className="absolute -top-2.5 left-2 rounded bg-zinc-950 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">{children}</span>;
}

function WireframeCanvas({ layout, codes }: { layout: WireframeScreen["layout"]; codes: string[] }) {
  const [c0 = "01", c1 = "02", c2 = "03"] = codes;

  if (layout === "dashboard") {
    return (
      <div className="space-y-4 rounded-xl border-2 border-zinc-900 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-dashed border-zinc-300 pb-3">
          <div className="h-3 w-24 rounded-sm bg-zinc-900" />
          <div className="flex gap-2"><div className="h-2.5 w-12 rounded-sm bg-zinc-300" /><div className="h-2.5 w-12 rounded-sm bg-zinc-300" /></div>
        </div>
        <div className="grid min-h-[220px] grid-cols-12 gap-4">
          <div className="relative col-span-4 space-y-2.5 rounded-lg border border-dashed border-zinc-400 bg-zinc-50 p-3">
            <Callout>{c0}</Callout>
            <div className="mt-2 h-3 w-4/5 rounded-sm bg-zinc-800" />
            <div className="h-2.5 w-3/4 rounded-sm bg-zinc-300" /><div className="h-2.5 w-2/3 rounded-sm bg-zinc-300" /><div className="h-2.5 w-3/5 rounded-sm bg-zinc-300" />
          </div>
          <div className="col-span-8 space-y-3">
            <div className="relative flex items-center justify-between rounded-lg border border-dashed border-zinc-400 p-2.5">
              <span className="absolute -top-2.5 right-2 rounded bg-zinc-950 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">{c1}</span>
              <div className="h-3 w-24 rounded-sm bg-zinc-800" /><div className="h-5 w-16 rounded-sm bg-zinc-900" />
            </div>
            <div className="relative space-y-2 rounded-lg border border-dashed border-zinc-400 p-3">
              <Callout>{c2}</Callout>
              {[1, 2, 3].map((row) => <div key={row} className="flex items-center gap-3 rounded border border-zinc-200 p-2"><div className="h-3.5 w-3.5 shrink-0 rounded-sm border border-zinc-800" /><div className="h-2.5 flex-1 rounded-sm bg-zinc-300" /><div className="h-2.5 w-10 rounded-sm bg-zinc-200" /></div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "detail") {
    return (
      <div className="space-y-4 rounded-xl border-2 border-zinc-900 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-dashed border-zinc-300 pb-3"><div className="h-2.5 w-20 rounded-sm bg-zinc-400" /><div className="flex gap-3"><div className="h-2.5 w-10 rounded-sm bg-zinc-300" /><div className="h-2.5 w-10 rounded-sm bg-zinc-300" /></div></div>
        <div className="relative flex items-center justify-between gap-4 rounded-lg border border-dashed border-zinc-400 p-3">
          <span className="absolute -top-2.5 right-2 rounded bg-zinc-950 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">{c0}</span>
          <div className="flex-1 space-y-2"><div className="h-5 w-44 rounded-sm bg-zinc-900" /><div className="h-2.5 w-60 max-w-full rounded-sm bg-zinc-300" /></div>
          <div className="flex gap-2"><div className="h-6 w-16 rounded border border-zinc-800" /><div className="h-6 w-16 rounded bg-zinc-900" /></div>
        </div>
        <div className="relative flex gap-2 rounded-lg border border-dashed border-zinc-400 bg-zinc-50 p-2"><Callout>{c1}</Callout>{[1, 2, 3, 4, 5].map((tab) => <div key={tab} className={`h-5 flex-1 rounded ${tab === 3 ? "bg-zinc-900" : "bg-zinc-200"}`} />)}</div>
        <div className="relative flex items-center justify-between gap-3 rounded-lg border border-dashed border-zinc-400 bg-zinc-50 p-4"><Callout>{c2}</Callout><div className="h-16 flex-1 rounded border border-zinc-700 bg-white" /><div className="w-6 border-t border-zinc-900" /><div className="h-16 flex-1 rounded border border-zinc-700 bg-white" /><div className="w-6 border-t border-zinc-900" /><div className="h-16 flex-1 rounded border border-zinc-700 bg-white" /></div>
      </div>
    );
  }

  if (layout === "checkout") {
    return (
      <div className="space-y-4 rounded-xl border-2 border-zinc-900 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-dashed border-zinc-300 pb-3"><div className="h-3 w-28 rounded-sm bg-zinc-900" /><div className="h-2.5 w-16 rounded-sm bg-zinc-300" /></div>
        <div className="grid min-h-[200px] grid-cols-12 gap-4">
          <div className="relative col-span-7 space-y-2.5 rounded-lg border border-dashed border-zinc-400 p-3"><Callout>{c0}</Callout>{[1, 2, 3].map((item) => <div key={item} className="mt-1 flex items-center justify-between rounded border border-zinc-200 p-2.5"><div className="flex items-center gap-2.5"><div className="h-8 w-8 rounded bg-zinc-200" /><div className="space-y-1"><div className="h-2.5 w-24 rounded-sm bg-zinc-800" /><div className="h-2 w-14 rounded-sm bg-zinc-300" /></div></div><div className="h-3 w-10 rounded-sm bg-zinc-700" /></div>)}</div>
          <div className="relative col-span-5 flex flex-col justify-between rounded-lg border border-dashed border-zinc-400 bg-zinc-50 p-3"><span className="absolute -top-2.5 right-2 rounded bg-zinc-950 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">{c1}</span><div className="mt-2 space-y-2"><div className="h-3 w-24 rounded-sm bg-zinc-800" /><div className="h-2 w-full rounded-sm bg-zinc-300" /><div className="h-2 w-3/4 rounded-sm bg-zinc-300" /></div><div className="h-8 w-full rounded bg-zinc-950" /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border-2 border-zinc-900 bg-white p-4 sm:p-5">
      <div className="relative flex items-center justify-between rounded-lg border border-dashed border-zinc-400 p-2.5"><Callout>{c0}</Callout><div className="h-3 w-20 rounded-sm bg-zinc-900" /><div className="flex gap-3"><div className="h-2.5 w-10 rounded-sm bg-zinc-300" /><div className="h-2.5 w-10 rounded-sm bg-zinc-300" /><div className="h-4 w-12 rounded-sm bg-zinc-900" /></div></div>
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="relative col-span-7 space-y-2.5 rounded-lg border border-dashed border-zinc-400 p-4"><Callout>{c1}</Callout><div className="mt-1 h-5 w-4/5 rounded-sm bg-zinc-900" /><div className="h-5 w-3/5 rounded-sm bg-zinc-900" /><div className="mt-3 h-2.5 w-full rounded-sm bg-zinc-300" /><div className="h-2.5 w-2/3 rounded-sm bg-zinc-300" /><div className="mt-4 h-6 w-24 rounded-sm bg-zinc-950" /></div>
        <div className="relative col-span-5 flex min-h-[155px] flex-col items-center justify-center rounded-lg border border-dashed border-zinc-400 bg-zinc-50 p-4"><span className="absolute -top-2.5 right-2 rounded bg-zinc-950 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">{c2}</span><div className="mb-3 h-12 w-12 rounded-full border-2 border-zinc-800 bg-zinc-200" /><div className="mb-1.5 h-3 w-20 rounded-sm bg-zinc-900" /><div className="h-2 w-14 rounded-sm bg-zinc-400" /></div>
      </div>
    </div>
  );
}

export function Wireframe({ project }: WireframeProps) {
  const screens = project.wireframeScreens?.length ? project.wireframeScreens : getDefaultScreens(project);
  const [activeId, setActiveId] = useState(screens[0]?.id ?? "");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const activeScreen = screens.find((screen) => screen.id === activeId) ?? screens[0];

  if (!activeScreen) {
    return <div className="rounded-xl border border-dashed border-zinc-300 py-12 text-center text-sm text-zinc-500">No wireframes added for this project yet.</div>;
  }

  return (
    <section aria-labelledby="wireframe-title" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <h2 id="wireframe-title" className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">Wireframe blueprints</h2>
          <p className="text-sm leading-6 text-zinc-600">{activeScreen.description}</p>
        </div>
        {screens.length > 1 && (
          <div className="flex flex-wrap gap-1.5 rounded-lg bg-zinc-200/75 p-1" role="tablist" aria-label="Wireframe screens">
            {screens.map((screen) => <button key={screen.id} type="button" role="tab" aria-selected={screen.id === activeScreen.id} onClick={() => setActiveId(screen.id)} className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${screen.id === activeScreen.id ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"}`}>{screen.screenName}</button>)}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border border-zinc-200 bg-[#EFEFE9] p-4 sm:p-6 lg:col-span-7">
          {activeScreen.imageUrl && !imageErrors[activeScreen.id] ? (
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white"><img src={activeScreen.imageUrl} alt={activeScreen.screenName} referrerPolicy="no-referrer" onError={() => setImageErrors((current) => ({ ...current, [activeScreen.id]: true }))} className="h-auto w-full object-contain" /></div>
          ) : (
            <WireframeCanvas layout={activeScreen.layout} codes={activeScreen.annotations.map((annotation) => annotation.code)} />
          )}
        </div>

        <aside className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3"><span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">Screen annotations</span><span className="font-mono text-xs tabular-nums text-zinc-400">{activeScreen.annotations.length} Callouts</span></div>
          <div className="divide-y divide-zinc-200">
            {activeScreen.annotations.map((annotation) => (
              <div key={annotation.code} className="flex items-start gap-3 py-3.5 first:pt-1 last:pb-1">
                <span className="shrink-0 rounded bg-zinc-950 px-2 py-0.5 font-mono text-[11px] font-bold text-white">{annotation.code}</span>
                <div className="space-y-1"><p className="text-sm font-semibold text-zinc-950">{annotation.label}</p><p className="text-xs leading-relaxed text-zinc-600">{annotation.detail}</p></div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
