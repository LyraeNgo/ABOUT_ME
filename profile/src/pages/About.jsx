import AboutPanel from "../components/About/AboutPanel";
import GitCommitTimeline from "../components/About/GitCommitTimeline";
import ApiCard from "../components/Cards/ApiCard";

const About = () => {
  const metaStatus = { status: "200" };

  const lifeCommits = [
    {
      id: "a1b2c3d",
      date: "2023",
      title: "Started the journey",
      body: "Bắt đầu học và làm quen với tư duy xây dựng hệ thống.",
      tags: ["init"],
      bullets: ["Kỷ luật học tập", "Nền tảng CS + web basics"],
    },
    {
      id: "d4e5f6a",
      date: "2024",
      title: "Backend focus",
      body: "Tập trung vào API design, database, và reliability.",
      tags: ["backend"],
      bullets: ["Contract-first", "Logging + monitoring", "Performance profiling"],
    },
    {
      id: "9aa12fe",
      date: "2025",
      title: "Build real projects",
      body: "Đóng gói thành các dự án end-to-end và portfolio.",
      tags: ["ship"],
      links: [
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-11">
      <div className="grid grid-cols-2">
        <ApiCard
          method="GET"
          path="/api/v1/getMe/about"
          summary="This is about me"
          meta={metaStatus}
        />
      </div>

      <h1 className="text-2xl font-semibold">ABOUT</h1>
      <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-300">
       I am 
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <AboutPanel title="Principles">
          <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Contract-first (OpenAPI/DTO validation)</li>
            <li>Observability by default</li>
            <li>Secure-by-design (authn/authz, secrets, rate limit)</li>
            <li>Performance with profiling</li>
          </ul>
        </AboutPanel>

        <AboutPanel title="Toolbox">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {["Node.js", "PostgreSQL", "Redis", "Docker"].map((t) => (
              <span
                key={t}
                className="rounded-lg border border-black/10 bg-white/60 px-3 py-2 font-mono text-zinc-800 dark:border-white/10 dark:bg-black/20 dark:text-zinc-200"
              >
                {t}
              </span>
            ))}
          </div>
        </AboutPanel>
      </div>

      <div className="mt-6">
        <GitCommitTimeline commits={lifeCommits} />
      </div>
    </div>
  );
};

export default About;

