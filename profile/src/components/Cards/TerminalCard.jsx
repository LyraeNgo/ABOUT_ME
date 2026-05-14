import { useState } from "react";
import TechCard from "./TechCard";
import {  Mail, Phone, Link as LinkIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
const defaultResponse = {
  name: "Ngo Minh Tam",
  role: "Backend Developer",
  location: "VN",
  education: "Ton Duc Thang University",
  status: "undergraduate",
  stack: ["Node.js", "Postgres", "Reactjs"],
  contact:{
     github:"https://github.com/LyraeNgo",
     email:"ngominhtam26112005@gmail.com",
     phone:"0708963561",
     linkedin:"linkedin.com/in/minh-tam-ngo-631911301/"
  }
  
};

const toHttpUrl = (value) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
};

const INDENT_SIZE = 2;
const pad = (count) => " ".repeat(count);

const JsonView = ({ value, level = 0 }) => {
  if (value === null) {
    return <span className="text-zinc-500 dark:text-zinc-400">null</span>;
  }

  const type = typeof value;

  if (type === "string") {
    return (
      <span className="text-amber-700 dark:text-amber-300">
        {JSON.stringify(value)}
      </span>
    );
  }

  if (type === "number") {
    return <span className="text-violet-700 dark:text-violet-300">{value}</span>;
  }

  if (type === "boolean") {
    return (
      <span className="text-rose-700 dark:text-rose-300">
        {value ? "true" : "false"}
      </span>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return <span>[]</span>;

    return (
      <span>
        {"["}
        {"\n"}
        {value.map((item, index) => (
          <span key={index}>
            {pad((level + 1) * INDENT_SIZE)}
            <JsonView value={item} level={level + 1} />
            {index < value.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {pad(level * INDENT_SIZE)}
        {"]"}
      </span>
    );
  }

  if (type === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) return <span>{"{}"}</span>;

    return (
      <span>
        {"{"}
        {"\n"}
        {entries.map(([key, val], index) => (
          <span key={key}>
            {pad((level + 1) * INDENT_SIZE)}
            <span className="text-cyan-700 dark:text-cyan-300">
              {JSON.stringify(key)}
            </span>
            <span>: </span>
            <JsonView value={val} level={level + 1} />
            {index < entries.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {pad(level * INDENT_SIZE)}
        {"}"}
      </span>
    );
  }

  return <span className="text-zinc-500 dark:text-zinc-400">{String(value)}</span>;
};

const TerminalCard = ({ response = defaultResponse }) => {
  const [mode, setMode] = useState("raw"); // "raw" | "visualize"

  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-zinc-950/60 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Response card</div>
          <div className="mt-1 truncate font-mono text-xs text-zinc-500">GET /api/v1/getMe</div>
        </div>

        <div className="flex items-center rounded-xl border border-black/10 bg-white/60 p-1 text-xs dark:border-white/10 dark:bg-black/30">
          <button
            type="button"
            aria-pressed={mode === "raw"}
            onClick={() => setMode("raw")}
            className={`rounded-lg px-3 py-1 font-medium transition ${
              mode === "raw"
                ? "bg-black/10 text-zinc-900 dark:bg-white/10 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            }`}
          >
            Raw
          </button>
          <button
            type="button"
            aria-pressed={mode === "visualize"}
            onClick={() => setMode("visualize")}
            className={`rounded-lg px-3 py-1 font-medium transition ${
              mode === "visualize"
                ? "bg-black/10 text-zinc-900 dark:bg-white/10 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            }`}
          >
            Visualize
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-black/30">
        {mode === "raw" ? (
          <div className="font-mono text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
            <div className="flex items-center justify-between text-black dark:text-zinc-400">
              <div className="bg-green-200 text-green-600 px-3 rounded-lg py-1 text-md">200 OK</div>
              <div className="font-mono">application/json</div>
            </div>
            <pre className="mt-3 overflow-auto whitespace-pre">
              <JsonView value={response} />
            </pre>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Hi, I am{" "}
              <span className="text-cyan-600 dark:text-cyan-300">{response?.name}</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm text-zinc-700 dark:text-zinc-300">
              Studying at {response?.education}.
              <br />I am a {response?.role}.
            </p>

            {Array.isArray(response?.stack) && response.stack.length ? (
              <div className="mt-5 flex flex-col gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <div>Here&apos;s my stack</div>
                <div className="flex flex-wrap gap-3">
                  {response.stack.map((tech) => (
                    <TechCard key={tech}>{tech}</TechCard>
                  ))}
                </div>
              </div>
            ) : null}

            {response?.contact ? (
              <div className="mt-5 flex flex-col gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <div>Contact</div>
                <div className="flex flex-wrap gap-3">
                  {response.contact.email ? (
                    <a
                      className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/60 px-3 py-2 font-mono text-zinc-800 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
                      href={`mailto:${response.contact.email}`}
                    >
                      <Mail size={14} />
                      {response.contact.email}
                    </a>
                  ) : null}

                  {response.contact.phone ? (
                    <a
                      className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/60 px-3 py-2 font-mono text-zinc-800 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
                      href={`tel:${response.contact.phone}`}
                    >
                      <Phone size={14} />
                      {response.contact.phone}
                    </a>
                  ) : null}

                  {response.contact.github ? (
                    <a
                      className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/60 px-3 py-2 font-mono text-zinc-800 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
                      href={toHttpUrl(response.contact.github)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGithub />
                      GitHub
                    </a>
                  ) : null}

                  {response.contact.linkedin ? (
                    <a
                      className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/60 px-3 py-2 font-mono text-zinc-800 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
                      href={toHttpUrl(response.contact.linkedin)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      
                      LinkedIn
                    </a>
                  ) : null}

                  {response.contact.website ? (
                    <a
                      className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/60 px-3 py-2 font-mono text-zinc-800 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
                      href={toHttpUrl(response.contact.website)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LinkIcon size={14} />
                      Website
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

    </div>
  );
};

export default TerminalCard;
