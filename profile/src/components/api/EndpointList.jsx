import ApiCard from "../Cards/ApiCard";

const groups = [
  {
    title: "Identity",
    items: [
      {
        method: "GET",
        path: "/v1/me",
        summary: "Profile + social links",
        meta: { status: "200", latency: "~35ms", auth: "public" },
      },
      {
        method: "POST",
        path: "/v1/auth/sessions",
        summary: "Login (session-based)",
        meta: { status: "201", latency: "~60ms", auth: "public" },
      },
    ],
  },
  {
    title: "Projects",
    items: [
      {
        method: "GET",
        path: "/v1/projects",
        summary: "List projects",
        meta: { status: "200", latency: "~45ms", auth: "public" },
      },
      {
        method: "GET",
        path: "/v1/projects/{id}",
        summary: "Project detail",
        meta: { status: "200", latency: "~40ms", auth: "public" },
      },
    ],
  },
  {
    title: "Ops",
    items: [
      {
        method: "GET",
        path: "/v1/health",
        summary: "Health checks",
        meta: { status: "200", latency: "~10ms", auth: "public" },
      },
      {
        method: "POST",
        path: "/v1/jobs/send-email",
        summary: "Enqueue background job",
        meta: { status: "202", latency: "~20ms", auth: "api-key" },
      },
    ],
  },
];

const EndpointList = () => {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.title}>
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              {group.title}
            </div>
            <div className="font-mono text-[11px] text-zinc-500">
              {group.items.length} routes
            </div>
          </div>
          <div className="space-y-3">
            {group.items.map((item) => (
              <ApiCard key={`${item.method}:${item.path}`} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EndpointList;
