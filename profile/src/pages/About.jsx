
import GitCommitTimeline from "../components/About/GitCommitTimeline";
import ApiCard from "../components/Cards/ApiCard";

const About = () => {
  const metaStatus = { status: "200" };

  const lifeCommits = [
    {
      id: "6215ad2",
      date: "1/2026",
      title: "Completed a first full project",
      body: "Chat and call website with scalable system",
      tags: ["projects"],
      bullets: ["Highlighted: a completed project"],
      links:[{
        label:"Project",
        href:"https://github.com/LyraeNgo/ChatCallWebsite-CallUs"
      }]
    },
    {
      id: "9febe07",
      date: "10/2025",
      title: "Achievement: it's research time w/ LabAI!",
      body: "Have a new chap in life",
      tags: ["research"],
      bullets: ["Highlighted: start doing a research w/ my friends"],    
    },
    {
      id: "6d2b081",
      date: "8/2025",
      title: "Achievement: Junior now, time for raising",
      body: "Studied hard",
      tags: ["study"],
    },
    {
      id: "84bbc11",
      date: "5/2025",
      title: "Achievement: Completed my second year with GPA 8.67!",
      body: "A first UI project in my life",
      tags: ["projects"],
      bullets: ["Highlighted: Learned and programmed UI for a small vegetable shop"],    
    },
    {
      id: "f44bca3",
      date: "8/2024",
      title: "Achievement: I am a Sophomore now",
      body: "Second year at University, first time learning to code web",
      tags: ["study"],
      bullets: ["Highlighted: Database System - 9.2"],
    },
    {
      id: "efead8b",
      date: "5/2024",
      title: "Achievement: Completed my first year!",
      body: "Complete first year with GPA 8.70/10",
      tags: ["study"],
      bullets:["Got first scholarship ","Highlighted: OOP - 8.8"]

    },
    {
      id: "df83278",
      date: "8/2023",
      title: "A new journey",
      body: "Freshman at Ton Duc Thang University",
      bullets:["Major: Software Engineer","Highlighted: Programming Methodology - 9.0"],
      tags: ["study"],
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

      <h1 className="text-2xl font-semibold">ABOUT ME</h1>
      <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-300">
       Software Engineering student with experience in fullstack web development <br></br> Growing focus on backend engineering. <br></br>
       Currently doing a research about LLM. 
      </p>


      <div className="mt-6">
        <GitCommitTimeline commits={lifeCommits} />
      </div>
    </div>
  );
};

export default About;

