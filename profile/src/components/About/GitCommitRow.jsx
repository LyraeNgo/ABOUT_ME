import {   Circle, CircleDashed } from "lucide-react";

const shortHash = (hash) => {
  if (!hash) return "";
  return String(hash).slice(0, 7);
};

const GitCommitRow = ({ commit, expanded, onToggle }) => {
  const dateLabel = commit?.date ?? "";
  const hash = commit?.id ?? "";
  const title = commit?.title ?? "";
  const tags = Array.isArray(commit?.tags) ? commit.tags : [];

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className="group flex w-[70%] items-center gap-3 rounded-xl border border-transparent px-3 pt-2 pb-1 text-left hover:border-black/10 hover:bg-black/5 dark:hover:border-white/10 dark:hover:bg-white/5 my-1"
    >
      <span className="text-zinc-500 transition group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200">
        {expanded ? <CircleDashed size={16} /> : <Circle  size={16} />}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </span>
          {hash ? (
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {shortHash(hash)}
            </span>
          ) : null}
          {tags.length ? (
            <span className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[11px] font-mono text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </span>
          ) : null}
        </div>
      </div>

      {dateLabel ? (
        <span className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
          {dateLabel}
        </span>
      ) : null}
    </button>
  );
};

export default GitCommitRow;

