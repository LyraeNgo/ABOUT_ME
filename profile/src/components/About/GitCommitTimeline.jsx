import { useMemo, useState } from "react";
import GitCommitDetails from "./GitCommitDetails";
import GitCommitRow from "./GitCommitRow";

const GitCommitTimeline = ({ commits }) => {
  const list = useMemo(() => (Array.isArray(commits) ? commits : []), [commits]);
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const toggle = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (list.length === 0) return null;


  return (
    <div className="rounded-2xl border  border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between gap-4">
        <div className="font-mono text-sm text-cyan-600 dark:text-cyan-300">
          GRAPH
        </div>
        <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          git log --oneline
        </div>
      </div>

      <div className="mt-4">
        <ol>
          {list.map((commit) => (
            <li key={commit.id} className="py-1">
              <GitCommitRow
                commit={commit}
                expanded={expandedIds.has(commit.id)}
                onToggle={() => toggle(commit.id)}
              />
              {expandedIds.has(commit.id) ? (
                <GitCommitDetails commit={commit} />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default GitCommitTimeline;
