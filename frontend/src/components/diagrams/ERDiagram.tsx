import { Check, Code2, Copy } from "lucide-react";
import { useState } from "react";
import type { ErdRelation, ErdTable, Project } from "../../pages/PortfolioSection";

interface ERDiagramProps {
  project: Project;
}

const TABLE_WIDTH = 240;
const HEADER_HEIGHT = 34;
const ROW_HEIGHT = 26;

function getTableHeight(table: ErdTable) {
  return HEADER_HEIGHT + Math.max(1, table.columns.length) * ROW_HEIGHT + 10;
}

function getDefaultSchema(project: Project): { tables: ErdTable[]; relations: ErdRelation[] } {
  if (project.id === "portfolio") {
    return {
      tables: [
        { id: "profiles", name: "profiles", x: 20, y: 30, columns: [
          { name: "id", type: "INT", isPK: true },
          { name: "full_name", type: "VARCHAR(120)" },
          { name: "role", type: "VARCHAR(120)" },
          { name: "email", type: "VARCHAR(180)" },
        ] },
        { id: "projects", name: "projects", x: 360, y: 30, columns: [
          { name: "id", type: "INT", isPK: true },
          { name: "profile_id", type: "INT", isFK: true },
          { name: "title", type: "VARCHAR(180)" },
          { name: "category", type: "VARCHAR(80)" },
          { name: "summary", type: "TEXT", nullable: true },
        ] },
        { id: "project_media", name: "project_media", x: 700, y: 30, columns: [
          { name: "id", type: "INT", isPK: true },
          { name: "project_id", type: "INT", isFK: true },
          { name: "media_type", type: "VARCHAR(40)" },
          { name: "url", type: "VARCHAR(500)" },
        ] },
      ],
      relations: [
        { id: "profile-projects", fromTableId: "profiles", toTableId: "projects", fromCardinality: "1", toCardinality: "N" },
        { id: "project-media", fromTableId: "projects", toTableId: "project_media", fromCardinality: "1", toCardinality: "N" },
      ],
    };
  }

  if (project.id === "design-system") {
    return {
      tables: [
        { id: "tokens", name: "design_tokens", x: 20, y: 30, columns: [
          { name: "id", type: "INT", isPK: true },
          { name: "name", type: "VARCHAR(120)" },
          { name: "value", type: "VARCHAR(255)" },
          { name: "category", type: "VARCHAR(80)" },
        ] },
        { id: "components", name: "components", x: 360, y: 30, columns: [
          { name: "id", type: "INT", isPK: true },
          { name: "name", type: "VARCHAR(120)" },
          { name: "status", type: "VARCHAR(40)" },
          { name: "version", type: "VARCHAR(20)" },
        ] },
        { id: "variants", name: "component_variants", x: 700, y: 30, columns: [
          { name: "id", type: "INT", isPK: true },
          { name: "component_id", type: "INT", isFK: true },
          { name: "name", type: "VARCHAR(120)" },
          { name: "properties", type: "JSON", nullable: true },
        ] },
      ],
      relations: [
        { id: "token-components", fromTableId: "tokens", toTableId: "components", fromCardinality: "N", toCardinality: "N" },
        { id: "component-variants", fromTableId: "components", toTableId: "variants", fromCardinality: "1", toCardinality: "N" },
      ],
    };
  }

  return {
    tables: [
      { id: "users", name: "users", x: 20, y: 30, columns: [
        { name: "id", type: "INT", isPK: true },
        { name: "role_id", type: "INT", isFK: true },
        { name: "full_name", type: "VARCHAR(120)" },
        { name: "email", type: "VARCHAR(180)" },
      ] },
      { id: "projects", name: "projects", x: 350, y: 30, columns: [
        { name: "id", type: "INT", isPK: true },
        { name: "owner_id", type: "INT", isFK: true },
        { name: "title", type: "VARCHAR(180)" },
        { name: "status", type: "VARCHAR(40)" },
        { name: "due_date", type: "DATE", nullable: true },
      ] },
      { id: "tasks", name: "tasks", x: 680, y: 30, columns: [
        { name: "id", type: "INT", isPK: true },
        { name: "project_id", type: "INT", isFK: true },
        { name: "assignee_id", type: "INT", isFK: true },
        { name: "title", type: "VARCHAR(180)" },
        { name: "status", type: "VARCHAR(40)" },
      ] },
      { id: "daily_work", name: "daily_work", x: 350, y: 260, columns: [
        { name: "id", type: "INT", isPK: true },
        { name: "user_id", type: "INT", isFK: true },
        { name: "work_date", type: "DATE" },
        { name: "description", type: "TEXT" },
      ] },
    ],
    relations: [
      { id: "user-projects", fromTableId: "users", toTableId: "projects", fromCardinality: "1", toCardinality: "N" },
      { id: "project-tasks", fromTableId: "projects", toTableId: "tasks", fromCardinality: "1", toCardinality: "N" },
      { id: "user-daily-work", fromTableId: "users", toTableId: "daily_work", fromCardinality: "1", toCardinality: "N" },
    ],
  };
}

function generateSql(tables: ErdTable[]) {
  return tables.map((table) => {
    const primaryKeys = table.columns.filter((column) => column.isPK).map((column) => column.name);
    const columnLines = table.columns.map((column) => {
      const parts = [`  \`${column.name}\` ${column.type}`];
      if (!column.nullable || column.isPK) parts.push("NOT NULL");
      if (column.isPK && primaryKeys.length === 1 && column.type.toUpperCase().startsWith("INT")) parts.push("AUTO_INCREMENT");
      return parts.join(" ");
    });
    if (primaryKeys.length > 0) columnLines.push(`  PRIMARY KEY (${primaryKeys.map((name) => `\`${name}\``).join(", ")})`);
    return `CREATE TABLE \`${table.name}\` (\n${columnLines.join(",\n")}\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;
  }).join("\n\n");
}

export function ERDiagram({ project }: ERDiagramProps) {
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [showSql, setShowSql] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const fallbackSchema = getDefaultSchema(project);
  const tables = project.erdTables?.length ? project.erdTables : fallbackSchema.tables;
  const relations = project.erdRelations?.length ? project.erdRelations : fallbackSchema.relations;
  const sql = generateSql(tables);
  const maxX = Math.max(920, ...tables.map((table) => table.x + TABLE_WIDTH + 40));
  const maxY = Math.max(280, ...tables.map((table) => table.y + getTableHeight(table) + 40));

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopiedSql(true);
      window.setTimeout(() => setCopiedSql(false), 1800);
    } catch {
      setCopiedSql(false);
    }
  };

  if (tables.length === 0) {
    return <div className="rounded-xl border border-dashed border-zinc-300 py-12 text-center text-sm text-zinc-500">No database ERD tables defined for this project yet.</div>;
  }

  return (
    <section aria-labelledby="erd-title" className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl space-y-2">
          <h2 id="erd-title" className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500">Database ERD</h2>
          <p className="text-sm leading-6 text-zinc-600">{project.erdSummary || `Interactive data model for ${project.title}. Select a table to highlight its relationships.`}</p>
        </div>
        <button type="button" onClick={() => setShowSql((current) => !current)} aria-expanded={showSql} className="inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-900 transition-colors hover:border-zinc-950 sm:self-auto">
          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
          {showSql ? "Hide SQL DDL" : "View SQL DDL"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-[#EFEFE9] p-4 sm:p-6">
        <div className="relative mx-auto" style={{ width: `${maxX}px`, height: `${maxY}px` }}>
          <svg width={maxX} height={maxY} className="pointer-events-none absolute inset-0" aria-hidden="true">
            {relations.map((relation) => {
              const fromTable = tables.find((table) => table.id === relation.fromTableId);
              const toTable = tables.find((table) => table.id === relation.toTableId);
              if (!fromTable || !toTable) return null;
              const fromIsLeft = fromTable.x <= toTable.x;
              const x1 = fromIsLeft ? fromTable.x + TABLE_WIDTH : fromTable.x;
              const x2 = fromIsLeft ? toTable.x : toTable.x + TABLE_WIDTH;
              const y1 = fromTable.y + getTableHeight(fromTable) / 2;
              const y2 = toTable.y + getTableHeight(toTable) / 2;
              const midX = (x1 + x2) / 2;
              const highlighted = selectedTableId === relation.fromTableId || selectedTableId === relation.toTableId;

              return (
                <g key={relation.id}>
                  <path d={`M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`} fill="none" stroke={highlighted ? "#09090b" : "#71717a"} strokeWidth={highlighted ? 2.5 : 1.5} />
                  <circle cx={x1} cy={y1} r="3.5" fill="#09090b" />
                  <circle cx={x2} cy={y2} r="3.5" fill="#09090b" />
                  <text x={fromIsLeft ? x1 + 15 : x1 - 15} y={y1 - 9} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="#09090b">{relation.fromCardinality}</text>
                  <text x={fromIsLeft ? x2 - 15 : x2 + 15} y={y2 - 9} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="#09090b">{relation.toCardinality}</text>
                </g>
              );
            })}
          </svg>

          {tables.map((table) => {
            const selected = selectedTableId === table.id;
            const related = selectedTableId !== null && relations.some((relation) =>
              (relation.fromTableId === selectedTableId && relation.toTableId === table.id) ||
              (relation.toTableId === selectedTableId && relation.fromTableId === table.id),
            );

            return (
              <button key={table.id} type="button" onClick={() => setSelectedTableId((current) => current === table.id ? null : table.id)} aria-pressed={selected} style={{ left: `${table.x}px`, top: `${table.y}px`, width: `${TABLE_WIDTH}px` }} className={`absolute overflow-hidden rounded-lg border bg-white text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 ${selected ? "border-zinc-950 ring-2 ring-zinc-950/20 shadow-md" : related ? "border-zinc-800 shadow" : "border-zinc-400 hover:border-zinc-900"}`}>
                <span className="flex items-center justify-between bg-zinc-950 px-3 py-2 text-white">
                  <span className="truncate text-xs font-bold tracking-tight">{table.name}</span>
                  <span className="font-mono text-[10px] tabular-nums text-zinc-400">{table.columns.length} cols</span>
                </span>
                <span className="block divide-y divide-zinc-100 py-0.5">
                  {table.columns.map((column) => (
                    <span key={column.name} className="flex items-center justify-between gap-2 px-3 py-1 font-mono text-[11px]">
                      <span className="truncate font-medium text-zinc-900">{column.name}</span>
                      <span className="flex shrink-0 items-center gap-1.5 text-zinc-500">
                        <span>{column.type}</span>
                        {(column.isPK || column.isFK) && <span className="font-bold text-zinc-950">{[column.isPK ? "PK" : "", column.isFK ? "FK" : ""].filter(Boolean).join(",")}</span>}
                      </span>
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {showSql && (
        <div className="space-y-3 rounded-xl border border-zinc-800 bg-[#141416] p-5 text-zinc-100">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Generated SQL Schema (DDL)</span>
            <button type="button" onClick={handleCopySql} className="inline-flex items-center gap-1.5 rounded border border-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white">
              {copiedSql ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedSql ? "Copied SQL" : "Copy SQL"}
            </button>
          </div>
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-zinc-200"><code>{sql}</code></pre>
        </div>
      )}
    </section>
  );
}
