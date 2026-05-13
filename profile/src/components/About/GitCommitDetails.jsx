const isInternalHref = (href) =>
  typeof href === "string" &&
  href.startsWith("/");

const GitCommitDetails = ({ commit }) => {
  const body = commit?.body ?? "";
  const links = Array.isArray(commit?.links)
    ? commit.links
    : [];

  const bullets = Array.isArray(commit?.bullets)
    ? commit.bullets
    : [];

  if (
    !body &&
    bullets.length === 0 &&
    links.length === 0
  ) {
    return null;
  }

  return (
    <div className="flex gap-1 max-w-[70%]">

      {/* LEFT */}
      <div className="flex flex-col items-center pl-5">
        <div className="
           w-[4px] flex-1 bg-green-600 " />
      </div>

      {/* RIGHT  */}
      <div className="
        flex-1 rounded-2xl
        border border-black/10
        hover:bg-gray-100/60 
        p-5
        dark:border-white/10
        dark:bg-black/20
        shadow-sm
      ">

        {body ? (
          <p className="
            text-sm text-zinc-700
            dark:text-zinc-300
          ">
            {body}
          </p>
        ) : null}

        {bullets.length ? (
          <ul className="
            mt-3 list-disc
            space-y-1 pl-5
            text-sm text-zinc-700
            dark:text-zinc-300
          ">
            {bullets.map((line) => (
              <li key={line}>
                {line}
              </li>
            ))}
          </ul>
        ) : null}

        {links.length ? (
          <div className="
            mt-4 flex flex-wrap gap-2
          ">
            {links.map((link) => (
              <a
                key={`${link.href}-${link.label}`}
                href={link.href}
                target={
                  isInternalHref(link.href)
                    ? undefined
                    : "_blank"
                }
                rel={
                  isInternalHref(link.href)
                    ? undefined
                    : "noreferrer"
                }
                className="
                  inline-flex items-center
                  rounded-lg border
                  border-black/10
                  bg-white/60
                  px-3 py-2
                  text-xs font-mono
                  text-zinc-800
                  hover:bg-black/5
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-zinc-200
                  dark:hover:bg-white/10
                "
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GitCommitDetails;