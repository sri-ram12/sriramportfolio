import { useEffect, useRef } from "react";
import "./styles/DevOpsBackground.css";

// Inline SVG path data for DevOps icons (no external CDN dependency)
const devopsIcons = [
  {
    name: "Docker",
    color: "#2496ED",
    svg: `<svg viewBox="0 0 128 128" fill="#2496ED"><path d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.7 3.1-3.5 8.3-3.1 12.3.3 2.9 1.2 5.9 3 8.3-1.4.8-2.9 1.4-4.3 1.8-2.7.8-5.6 1.3-8.5 1.3H1.4l-.2 2.1c-.8 10.8 1.5 21.7 7.2 30.6 6.3 9.6 15.6 14.8 27.3 14.8 20.4 0 37.6-9.4 50.5-28.1 4.3.2 8.8-.5 12.8-2.7 3.1-1.7 5.8-4.2 7.4-7.2l1-1.9-1.6-1.3zM29 58.8H18.7c-.6 0-1 .5-1 1v9.5c0 .6.5 1 1 1H29c.6 0 1-.5 1-1v-9.5c0-.6-.5-1-1-1zm13.3 0H32c-.6 0-1 .5-1 1v9.5c0 .6.5 1 1 1h10.3c.6 0 1-.5 1-1v-9.5c0-.6-.5-1-1-1zm13.4 0H45.4c-.6 0-1 .5-1 1v9.5c0 .6.5 1 1 1h10.3c.6 0 1-.5 1-1v-9.5c0-.6-.5-1-1-1zm13.3 0H58.7c-.6 0-1 .5-1 1v9.5c0 .6.5 1 1 1H69c.6 0 1-.5 1-1v-9.5c0-.6-.5-1-1-1zm-39.9-13H45.4c-.6 0-1 .5-1 1v9.5c0 .6.5 1 1 1h10.3c.6 0 1-.5 1-1v-9.5c0-.6-.5-1-1-1zm13.3 0H58.7c-.6 0-1 .5-1 1v9.5c0 .6.5 1 1 1H69c.6 0 1-.5 1-1v-9.5c0-.6-.5-1-1-1zm13.4 0H72c-.6 0-1 .5-1 1v9.5c0 .6.5 1 1 1h10.3c.6 0 1-.5 1-1v-9.5c0-.6-.5-1-1-1zM69 32.5H58.7c-.6 0-1 .5-1 1V43c0 .6.5 1 1 1H69c.6 0 1-.5 1-1v-9.5c0-.6-.5-1-1-1zM82.3 45.8H72c-.6 0-1 .5-1 1v9.5c0 .6.5 1 1 1h10.3c.6 0 1-.5 1-1v-9.5c0-.6-.5-1-1-1zm13.4 13H85.4c-.6 0-1 .5-1 1v9.5c0 .6.5 1 1 1h10.3c.6 0 1-.5 1-1v-9.5c0-.6-.5-1-1-1z"/></svg>`,
  },
  {
    name: "AWS",
    color: "#FF9900",
    svg: `<svg viewBox="0 0 128 128" fill="#FF9900"><path d="M38.089 77.466l-11.4 4.896 10.559 4.514 12.241-4.514-11.4-4.896zm-17.138 6.12l-.382 22.034 16.679 7.345V90.089l-16.297-6.503zm34.276 0l-15.073 5.739V110.9l15.073-6.963V83.586zm29.2-22.032l-11.4 4.896 10.559 4.514 12.241-4.514-11.4-4.896zm-17.139 6.12l-.382 22.034 16.679 7.345V74.177l-16.297-6.503zm34.277 0l-15.073 5.739v21.575l15.073-6.963V67.674zM19.6 46.222L8.2 51.118l10.559 4.514 12.241-4.514L19.6 46.222zM2.461 52.342l-.382 22.034 16.679 7.345V58.845L2.461 52.342zm34.277 0L21.665 58.08v21.575l15.073-6.963V52.342z"/></svg>`,
  },
  {
    name: "K8s",
    color: "#326CE5",
    svg: `<svg viewBox="0 0 128 128" fill="#326CE5"><path d="M64.002 1.246a7.47 7.47 0 00-3.473.842L15.05 27.456a7.478 7.478 0 00-3.727 6.475v50.141a7.478 7.478 0 003.727 6.477l45.479 25.365a7.478 7.478 0 006.945 0l45.479-25.365a7.478 7.478 0 003.727-6.477V33.931a7.478 7.478 0 00-3.727-6.475L67.474 2.088a7.47 7.47 0 00-3.472-.842zM64 14.2c.186 0 .372.048.537.144l38.4 21.4c.33.185.537.533.537.912v42.8c0 .379-.207.727-.537.912l-38.4 21.4a1.073 1.073 0 01-1.074 0l-38.4-21.4c-.33-.185-.537-.533-.537-.912v-42.8c0-.379.207-.727.537-.912l38.4-21.4A1.068 1.068 0 0164 14.2z"/></svg>`,
  },
  {
    name: "Jenkins",
    color: "#D24939",
    svg: `<svg viewBox="0 0 24 24" fill="#D24939"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>`,
  },
  {
    name: "Terraform",
    color: "#7B42BC",
    svg: `<svg viewBox="0 0 128 128" fill="#7B42BC"><path d="M44.5 0v47.4L85.8 23.7V0zm0 52.6v47.4l41.3-23.7V28.9zm45.3-28.9v47.4L131.1 47.4V0zM0 23.7v47.4l41.3-23.7V0z"/></svg>`,
  },
  {
    name: "Linux",
    color: "#FCC624",
    svg: `<svg viewBox="0 0 24 24" fill="#FCC624"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
  },
  {
    name: "Git",
    color: "#F05032",
    svg: `<svg viewBox="0 0 24 24" fill="#F05032"><path d="M21.62 11.108l-8.731-8.729a1.292 1.292 0 00-1.828 0L9.376 4.064l2.309 2.309a1.534 1.534 0 011.94 1.955l2.224 2.224a1.535 1.535 0 011.589 2.578 1.536 1.536 0 01-2.164-.093 1.534 1.534 0 01-.248-1.565L12.87 9.316v5.396a1.534 1.534 0 01.387 2.523 1.535 1.535 0 11-.912-2.78V9.053a1.534 1.534 0 01-.832-2.013l-2.276-2.276-6.013 6.012a1.292 1.292 0 000 1.828l8.731 8.729a1.292 1.292 0 001.828 0l8.637-8.637a1.293 1.293 0 00.2-1.588z"/></svg>`,
  },
  {
    name: "Python",
    color: "#3776AB",
    svg: `<svg viewBox="0 0 24 24" fill="#3776AB"><path d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.68H3.23l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l10.02.02zm-4.63 1.1c-.56 0-1.01.45-1.01 1.01 0 .56.45 1.01 1.01 1.01s1.01-.45 1.01-1.01c0-.56-.45-1.01-1.01-1.01z"/></svg>`,
  },
  {
    name: "Prometheus",
    color: "#E6522C",
    svg: `<svg viewBox="0 0 24 24" fill="#E6522C"><circle cx="12" cy="12" r="10"/><path fill="#fff" d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 2.5c.69 0 1.25.56 1.25 1.25S12.69 8 12 8s-1.25-.56-1.25-1.25S11.31 5.5 12 5.5zm3.5 10h-7v-1.5h1.75v-4.25L8.5 10v-1h3v5h1.75v-5h3v1l-1.75.25V14h1.75v1.5z"/></svg>`,
  },
  {
    name: "Grafana",
    color: "#F46800",
    svg: `<svg viewBox="0 0 24 24" fill="#F46800"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L4.7 11.7a.996.996 0 111.41-1.41L9 13.17l8.59-8.59a.996.996 0 111.41 1.41l-9.3 9.3a.996.996 0 01-1.41 0z"/></svg>`,
  },
  {
    name: "Ansible",
    color: "#EE0000",
    svg: `<svg viewBox="0 0 24 24" fill="#EE0000"><circle cx="12" cy="12" r="10"/><path fill="#fff" d="M13.49 10.15l-3.14 5.21 5.03-3.79-1.89-1.42zM12 3a9 9 0 100 18 9 9 0 000-18zm2.62 13.98L9.4 12.36l-.02-.07L12 6.22l.36.17 2.81 6.63-3.05 2.3 4.78 3.59-.28.07z"/></svg>`,
  },
  {
    name: "S3",
    color: "#569A31",
    svg: `<svg viewBox="0 0 24 24" fill="#569A31"><path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3 3h8v2H8V8zm0 4h8v2H8v-2z"/></svg>`,
  },
  {
    name: "EC2",
    color: "#FF9900",
    svg: `<svg viewBox="0 0 24 24" fill="#FF9900"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8z"/></svg>`,
  },
  {
    name: "IAM",
    color: "#DD344C",
    svg: `<svg viewBox="0 0 24 24" fill="#DD344C"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`,
  },
  {
    name: "VPC",
    color: "#8C4FFF",
    svg: `<svg viewBox="0 0 24 24" fill="#8C4FFF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
  },
  {
    name: "CloudWatch",
    color: "#FF4F8B",
    svg: `<svg viewBox="0 0 24 24" fill="#FF4F8B"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>`,
  },
];

const DevOpsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const elements: HTMLDivElement[] = [];

    devopsIcons.forEach((icon, i) => {
      const el = document.createElement("div");
      el.className = "bg-icon";

      // Size: large and dominant
      const size = 50 + Math.random() * 70;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;

      // Spread across full viewport
      el.style.left = `${3 + Math.random() * 90}%`;
      el.style.top = `${3 + Math.random() * 90}%`;

      // Animation timing
      const dur = 20 + Math.random() * 25;
      el.style.animationDuration = `${dur}s`;
      el.style.animationDelay = `${i * 0.6}s`;

      // Set the SVG as innerHTML
      el.innerHTML = icon.svg;

      // Label below the icon
      const label = document.createElement("div");
      label.className = "bg-icon-label";
      label.textContent = icon.name;
      label.style.color = icon.color;
      el.appendChild(label);

      container.appendChild(el);
      elements.push(el);
    });

    // Create duplicate layer for more density 
    devopsIcons.slice(0, 8).forEach((icon, i) => {
      const el = document.createElement("div");
      el.className = "bg-icon bg-icon-secondary";

      const size = 35 + Math.random() * 45;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${10 + Math.random() * 80}%`;
      el.style.top = `${10 + Math.random() * 80}%`;

      const dur = 30 + Math.random() * 20;
      el.style.animationDuration = `${dur}s`;
      el.style.animationDelay = `${(i + 16) * 0.5}s`;

      el.innerHTML = icon.svg;
      container.appendChild(el);
      elements.push(el);
    });

    return () => { elements.forEach((e) => e.remove()); };
  }, []);

  return (
    <div className="devops-bg" ref={containerRef}>
      <div className="pipeline-line p1"></div>
      <div className="pipeline-line p2"></div>
      <div className="pipeline-line p3"></div>
      <div className="grid-overlay"></div>
      <div className="ambient-glow g1"></div>
      <div className="ambient-glow g2"></div>
      <div className="ambient-glow g3"></div>
    </div>
  );
};

export default DevOpsBackground;
