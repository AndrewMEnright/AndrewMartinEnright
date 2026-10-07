import { useState, useEffect } from "react";
import "./Portfolio.css";

// Put your photo in the "public" folder as me.jpg (or change this path).
const PHOTO = "/me.jpg";

// Edit this list: one entry per project tile.
const projects = [
  { title: "Project One", tag: "Weather app for hikers", color: "#3552E8",
    body: "Describe the problem, what you built, and what you learned.",
    tech: ["React", "Node.js", "REST API"], points: ["What it does", "Your role", "The result"], link: "#" },
  { title: "Project Two", tag: "Budget tracker", color: "#1F7A6B",
    body: "Replace this with the story of the project.",
    tech: ["Python", "SQLite"], points: ["Feature one", "Feature two"], link: "#" },
  { title: "Project Three", tag: "Class scheduling tool", color: "#B4456B",
    body: "Replace this with the story of the project.",
    tech: ["JavaScript", "CSS"], points: ["Feature one", "Feature two"], link: "#" },
  { title: "Project Four", tag: "Recipe sharing site", color: "#7A4FD0",
    body: "Replace this with the story of the project.",
    tech: ["React", "Firebase"], points: ["Feature one", "Feature two"], link: "#" },
  { title: "Project Five", tag: "Photo gallery", color: "#A9551A",
    body: "Replace this with the story of the project.",
    tech: ["HTML", "CSS"], points: ["Feature one", "Feature two"], link: "#" },
  { title: "Project Six", tag: "Study group finder", color: "#2A6FA8",
    body: "Replace this with the story of the project.",
    tech: ["TypeScript", "Postgres"], points: ["Feature one", "Feature two"], link: "#" },
];

function ProjectSheet({ project, rect, onClosed }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const expanded = open && !closing;

  // Start at the tile's position, then grow to full screen on the next frame.
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  // Lock page scroll while a project is open.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClosed, 460); // matches the CSS transition time
  };

  // Close with the Escape key.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const style = expanded
    ? { top: 0, left: 0, width: "100%", height: "100%", borderRadius: 0 }
    : { top: rect.top, left: rect.left, width: rect.width, height: rect.height, borderRadius: 20 };

  return (
    <>
      <div className={`sheet ${expanded ? "open" : ""}`}
           style={{ background: project.color, ...style }}
           role="dialog" aria-modal="true">
        <div className="inner">
          <h2>{project.title}</h2>
          <p className="tag">{project.tag}</p>
          <p>{project.body}</p>
          <ul className="chips">
            {project.tech.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <ul>
            {project.points.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <p><a href={project.link}>View project</a></p>
        </div>
      </div>
      {!closing && (
        <button className="close" aria-label="Close project" onClick={close} autoFocus>
          &times;
        </button>
      )}
    </>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState(null); // { project, rect }

  const openProject = (project, e) =>
    setActive({ project, rect: e.currentTarget.getBoundingClientRect() });

  return (
    <div className="portfolio">
      <header className="wrap hero">
        <img className="photo" src={PHOTO} alt="Portrait of Your Name" />
        <div>
          <h1>Hi, I'm Your Name.</h1>
          <p className="lead">I build things for the web and care about making them simple to use.</p>
          <p>Write two or three sentences here about your background and what you want to do next.</p>
          <div className="links">
            <a href="mailto:you@example.com">Email</a>
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </header>

      <main className="wrap">
        <h2>Projects</h2>
        <div className="grid">
          {projects.map((p) => (
            <button key={p.title} className="tile" style={{ background: p.color }}
                    onClick={(e) => openProject(p, e)}>
              <h3>{p.title}</h3>
              <span>{p.tag}</span>
            </button>
          ))}
        </div>
      </main>

      {active && (
        <ProjectSheet project={active.project} rect={active.rect}
                      onClosed={() => setActive(null)} />
      )}
    </div>
  );
}
