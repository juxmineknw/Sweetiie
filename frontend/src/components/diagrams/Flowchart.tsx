import { useState } from "react";
import type { FlowEdge, FlowNode, Project } from "../../pages/PortfolioSection";

interface FlowchartProps {
  project: Project;
}

const NODE_WIDTH = 152;
const NODE_HEIGHT = 56;

function getDefaultFlow(project: Project): { nodes: FlowNode[]; edges: FlowEdge[] } {
  const noun = project.id === "portfolio" ? "project" : project.id === "design-system" ? "component" : "task";

  return {
    nodes: [
      { id: "start", label: "Open application", details: `The user enters ${project.title}.`, type: "start", x: 30, y: 135 },
      { id: "authenticate", label: "Authenticate user", details: "The system verifies the active user session.", type: "process", x: 240, y: 135 },
      { id: "valid", label: "Session valid?", details: "Choose the next path based on authentication status.", type: "decision", x: 450, y: 135 },
      { id: "dashboard", label: "Load workspace", details: `Load the ${noun} workspace and available actions.`, type: "database", x: 680, y: 55 },
      { id: "login", label: "Show sign in", details: "Request credentials before returning to validation.", type: "process", x: 450, y: 260 },
      { id: "action", label: `Manage ${noun}`, details: `Create, update, or review the selected ${noun}.`, type: "process", x: 900, y: 55 },
      { id: "end", label: "Confirm result", details: "Persist the change and show feedback to the user.", type: "end", x: 900, y: 230 },
    ],
    edges: [
      { id: "start-auth", from: "start", to: "authenticate" },
      { id: "auth-valid", from: "authenticate", to: "valid" },
      { id: "valid-dashboard", from: "valid", to: "dashboard", label: "Yes" },
      { id: "valid-login", from: "valid", to: "login", label: "No" },
      { id: "login-valid", from: "login", to: "valid", label: "Retry" },
      { id: "dashboard-action", from: "dashboard", to: "action" },
      { id: "action-end", from: "action", to: "end", label: "Save" },
    ],
  };
}

export function Flowchart({ project }: FlowchartProps) {
  const defaultFlow = getDefaultFlow(project);
  const nodes = project.flowNodes?.length ? project.flowNodes : defaultFlow.nodes;
  const edges = project.flowEdges?.length ? project.flowEdges : defaultFlow.edges;
  const [selectedNodeId, setSelectedNodeId] = useState(nodes[0]?.id ?? "");
  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? nodes[0];
  const maxX = Math.max(880, ...nodes.map((node) => node.x + NODE_WIDTH + 60));
  const maxY = Math.max(330, ...nodes.map((node) => node.y + NODE_HEIGHT + 60));

  const renderEdge = (edge: FlowEdge) => {
    const fromNode = nodes.find((node) => node.id === edge.from);
    const toNode = nodes.find((node) => node.id === edge.to);
    if (!fromNode || !toNode) return null;

    const fromCenter = { x: fromNode.x + NODE_WIDTH / 2, y: fromNode.y + NODE_HEIGHT / 2 };
    const toCenter = { x: toNode.x + NODE_WIDTH / 2, y: toNode.y + NODE_HEIGHT / 2 };
    const dx = toCenter.x - fromCenter.x;
    const dy = toCenter.y - fromCenter.y;
    let startX = fromCenter.x;
    let startY = fromCenter.y;
    let endX = toCenter.x;
    let endY = toCenter.y;

    if (Math.abs(dx) >= Math.abs(dy)) {
      startX = dx >= 0 ? fromNode.x + NODE_WIDTH : fromNode.x;
      endX = dx >= 0 ? toNode.x : toNode.x + NODE_WIDTH;
    } else {
      startY = dy >= 0 ? fromNode.y + NODE_HEIGHT : fromNode.y;
      endY = dy >= 0 ? toNode.y : toNode.y + NODE_HEIGHT;
    }

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const path = Math.abs(dx) >= Math.abs(dy)
      ? `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`
      : `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
    const highlighted = selectedNode && (edge.from === selectedNode.id || edge.to === selectedNode.id);

    return (
      <g key={edge.id}>
        <path d={path} fill="none" stroke={highlighted ? "#09090b" : "#71717a"} strokeWidth={highlighted ? 2.2 : 1.5} markerEnd={highlighted ? "url(#flow-arrow-active)" : "url(#flow-arrow)"} />
        {edge.label && (
          <g transform={`translate(${midX}, ${midY})`}>
            <rect x={-edge.label.length * 3.5 - 8} y="-10" width={edge.label.length * 7 + 16} height="20" rx="4" fill="#ffffff" stroke="#d4d4d8" />
            <text textAnchor="middle" dominantBaseline="central" fontSize="10" fontFamily="monospace" fontWeight="600" fill="#18181b">{edge.label}</text>
          </g>
        )}
      </g>
    );
  };

  if (nodes.length === 0) {
    return <div className="rounded-xl border border-dashed border-zinc-300 py-12 text-center text-sm text-zinc-500">No flowchart nodes defined for this project yet.</div>;
  }

  return (
    <section aria-labelledby="flowchart-title" className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl space-y-2">
          <h2 id="flowchart-title" className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">System flowchart</h2>
          <p className="text-sm leading-6 text-zinc-600">{project.flowSummary || `Primary system flow for ${project.title}. Select a node to inspect its purpose.`}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-zinc-500" aria-label="Flowchart shape legend">
          <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-3 rounded-full border border-zinc-900 bg-white" />Start / End</span>
          <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-3 border border-zinc-900 bg-white" />Process</span>
          <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rotate-45 border border-zinc-900 bg-zinc-100" />Decision</span>
          <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-3 bg-zinc-950" />DB / Output</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-[#EFEFE9] p-4 sm:p-6">
        <svg viewBox={`0 0 ${maxX} ${maxY}`} className="h-auto min-w-[680px] w-full select-none" role="img" aria-label={`System flowchart for ${project.title}`}>
          <defs>
            <marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#71717a" /></marker>
            <marker id="flow-arrow-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="#09090b" /></marker>
            <pattern id="flow-grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#d4d4d8" /></pattern>
          </defs>
          <rect width={maxX} height={maxY} fill="url(#flow-grid)" rx="12" />
          {edges.map(renderEdge)}
          {nodes.map((node) => {
            const selected = selectedNode?.id === node.id;
            const centerX = node.x + NODE_WIDTH / 2;
            const centerY = node.y + NODE_HEIGHT / 2;
            const darkNode = node.type === "database" || node.type === "end";

            return (
              <g key={node.id} onClick={() => setSelectedNodeId(node.id)} className="cursor-pointer" role="button" tabIndex={0} aria-label={`${node.label}: ${node.details}`} onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedNodeId(node.id);
                }
              }}>
                {node.type === "decision" ? (
                  <polygon points={`${centerX},${node.y - 8} ${node.x + NODE_WIDTH + 8},${centerY} ${centerX},${node.y + NODE_HEIGHT + 8} ${node.x - 8},${centerY}`} fill={selected ? "#18181b" : "#ffffff"} stroke="#09090b" strokeWidth={selected ? 2.5 : 1.5} />
                ) : (
                  <rect x={node.x} y={node.y} width={NODE_WIDTH} height={NODE_HEIGHT} rx={node.type === "start" || node.type === "end" ? 28 : 8} fill={selected || darkNode ? "#18181b" : "#ffffff"} stroke="#09090b" strokeWidth={selected ? 2.5 : 1.5} />
                )}
                <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="600" fontFamily="sans-serif" fill={selected || darkNode ? "#ffffff" : "#09090b"}>
                  {node.label.length > 20 ? `${node.label.slice(0, 19)}…` : node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {selectedNode && (
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase text-zinc-500"><span>Node inspector</span><span aria-hidden="true">•</span><span>{selectedNode.type}</span></div>
            <p className="text-base font-bold text-zinc-950">{selectedNode.label}</p>
            <p className="text-sm text-zinc-600">{selectedNode.details}</p>
          </div>
          <span className="shrink-0 font-mono text-xs text-zinc-400">Click any node to inspect</span>
        </div>
      )}
    </section>
  );
}
