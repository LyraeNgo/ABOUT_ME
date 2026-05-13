import ApiCard from "../components/Cards/ApiCard";

const services = [
  {
    name: "billing-service",
    desc: "Idempotency + outbox pattern for payments",
    routes: [
      { method: "POST", path: "/v1/invoices", meta: { status: "201", auth: "jwt" } },
      { method: "POST", path: "/v1/payments", meta: { status: "202", auth: "jwt" } },
    ],
  },
  {
    name: "notification-service",
    desc: "Queue-based email/SMS with retries",
    routes: [
      { method: "POST", path: "/v1/messages", meta: { status: "202", auth: "api-key" } },
      { method: "GET", path: "/v1/messages/{id}", meta: { status: "200", auth: "api-key" } },
    ],
  },
];

const Projects = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-300">
        Mình trình bày project như các “services” với endpoints tiêu biểu (giống API catalog).
      </p>

      <div className="mt-8 grid gap-6">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-2xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-mono text-sm text-cyan-600 dark:text-cyan-300">
                  {service.name}
                </div>
                <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {service.desc}
                </div>
              </div>
              <div className="rounded-xl border border-black/10 bg-white/60 px-3 py-2 font-mono text-xs text-zinc-700 dark:border-white/10 dark:bg-black/20 dark:text-zinc-300">
                env: prod-like
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {service.routes.map((route) => (
                <ApiCard
                  key={`${service.name}:${route.method}:${route.path}`}
                  method={route.method}
                  path={route.path}
                  summary={service.name}
                  meta={route.meta}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
