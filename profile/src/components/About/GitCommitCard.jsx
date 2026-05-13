const GitCommitCard = ({ commit }) => {
  const dateLabel = commit?.date ?? "";
  const hash = commit?.id ?? "";
  const title = commit?.title ?? "";
  const body = commit?.body ?? "";
  const tags = Array.isArray(commit?.tags) ? commit.tags : [];
  const links = Array.isArray(commit?.links) ? commit.links : [];
  const bullets = Array.isArray(commit?.bullets) ? commit.bullets : [];

  return (
    <div className="rounded-2xl  max-w-[50%] border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-black/20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              commit{" "}
              <span className="text-zinc-800 dark:text-zinc-200">{hash}</span>
            </div>
            {dateLabel ? (
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                {dateLabel}
              </div>
            ) : null}
          </div>
          <div className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </div>
        </div>

        {tags.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-mono text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {body ? (
        <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{body}</p>
      ) : null}

      {bullets.length ? (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          {bullets.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}

      {links.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {links.map((link) => (
            <a
              key={`${link.href}-${link.label}`}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-lg border border-black/10 bg-white/60 px-3 py-2 text-xs font-mono text-zinc-800 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default GitCommitCard;

