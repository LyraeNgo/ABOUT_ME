const AboutPanel = ({ title, children, right }) => {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-4">
        <div className="font-mono text-sm text-cyan-600 dark:text-cyan-300">
          {title}
        </div>
        {right ? (
          <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {right}
          </div>
        ) : null}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
};

export default AboutPanel;

