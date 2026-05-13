import GitCommitCard from "./GitCommitCard";

const GitCommitTimeline = ({ commits }) => {
  if (!Array.isArray(commits) || commits.length === 0) return null;


  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between gap-4">
        <div className="font-mono text-sm text-cyan-600 dark:text-cyan-300">
          Life log
        </div>
        <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          git log --oneline
        </div>
      </div>

      <div className="mt-4">
        <ol>
          {commits.map((commit) => (
            <li key={commit.id} className="flex gap-4 py-4">
              <div className="min-w-0 flex-1">
                <GitCommitCard commit={commit} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default GitCommitTimeline;
