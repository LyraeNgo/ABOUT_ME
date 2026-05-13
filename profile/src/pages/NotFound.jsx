import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-2xl border border-black/10 bg-white/70 p-8 dark:border-white/10 dark:bg-white/5">
        <div className="font-mono text-sm text-zinc-500 dark:text-zinc-400">404</div>
        <h1 className="mt-2 text-2xl font-semibold">Route not found</h1>
        <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
          Endpoint bạn gọi không tồn tại. Quay về trang chủ để xem API catalog.
        </p>
        <NavLink
          to="/"
          className="mt-6 inline-flex rounded-lg border border-black/10 bg-white/60 px-4 py-2 text-sm text-zinc-800 hover:bg-white/80 dark:border-white/10 dark:bg-black/30 dark:text-zinc-200 dark:hover:bg-black/40"
        >
          GET /
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
