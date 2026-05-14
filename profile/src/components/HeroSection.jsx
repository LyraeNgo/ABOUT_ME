
import ApiCard from "./Cards/ApiCard";
import TerminalCard from "./Cards/TerminalCard";
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:items-stretch">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              <span className="font-mono text-cyan-600 dark:text-cyan-300">v1</span>
              <span>Backend Developer Portfolio</span>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="my-2">
              <ApiCard method="GET" path="/api/v1/getMe" summary="Quick intro endpoint" />
            </div>
            <TerminalCard />
          </div>

          {/* avatar */}
          <div className="h-[85%] overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
            <img
              src="https://res.cloudinary.com/dqdmgz59k/image/upload/v1778738713/avatar_edfqwn.jpg"
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
