const ApiCard = ({ method, path, summary, meta }) => {
  const methodColor = {
    GET: "text-green-400 bg-green-500/10",
    POST: "text-blue-400 bg-blue-500/10",
    PUT: "text-yellow-400 bg-yellow-500/10",
    DELETE: "text-red-400 bg-red-500/10",
  };

  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-zinc-950/60 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] py-2">
      <div className="flex items-center gap-4">
        <div
          className={`rounded-md px-3 py-1 text-center text-xs font-bold ${methodColor[method]}`}
        >
          {method}
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate font-mono text-sm text-zinc-900 dark:text-zinc-100">
            {path}
          </div>
          {summary ? (
            <div className="mt-1 text-xs text-zinc-400">{summary}</div>
          ) : null}
        </div>

        {meta ? (
          <div className="hidden items-center gap-3 text-xs text-zinc-400 sm:flex">
            {meta.status ? <span className="px-2 rounded-lg bg-green-300 text-green-600">{meta.status}</span> : null}
            {meta.latency ? <span>{meta.latency}</span> : null}
            {meta.auth ? <span>{meta.auth}</span> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ApiCard;
