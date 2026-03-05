import { useState, useEffect, useRef, useCallback } from "react";

const THEMES = {
  dark: {
    bg: "#050505",
    surface: "#111111",
    accent: "#3b82f6",
    accentDim: "#2563eb",
    accentGlow: "rgba(59, 130, 246, 0.12)",
    accentGlowStrong: "rgba(59, 130, 246, 0.25)",
    text: "#f0f0f0",
    textSecondary: "#c0c0c0",
    textMuted: "#777777",
    textDim: "#444444",
    border: "#1a1a1a",
    cardBg: "rgba(255,255,255,0.025)",
    gradientTop: "#050505",
    silver: "#a8a8a8",
    blobColor: "rgba(59, 130, 246, 0.07)",
    gridColor: "rgba(255,255,255,0.03)",
  },
  light: {
    bg: "#f5f5f5",
    surface: "#ffffff",
    accent: "#3b82f6",
    accentDim: "#2563eb",
    accentGlow: "rgba(59, 130, 246, 0.08)",
    accentGlowStrong: "rgba(59, 130, 246, 0.18)",
    text: "#111111",
    textSecondary: "#333333",
    textMuted: "#666666",
    textDim: "#aaaaaa",
    border: "#e0e0e0",
    cardBg: "rgba(0,0,0,0.02)",
    gradientTop: "#f5f5f5",
    silver: "#666666",
    blobColor: "rgba(59, 130, 246, 0.06)",
    gridColor: "rgba(0,0,0,0.04)",
  },
};

const TIMELINE_DATA = [
  {
    date: "Dec 2025 – Feb 2026",
    title: "Surgence Labs",
    subtitle: "Marketing Associate",
    desc: "Managed content pipelines and campaign execution for 4 clients simultaneously. Planned social calendars, wrote copy, coordinated with product and partnerships teams, and delivered weekly reports across all accounts.",
    tag: "MARKETING AGENCY",
    products: ["Extsy", "Verse8", "Mey Real", "Mey Network"],
    link: "https://x.com/surgence_io",
    glowColor: "rgba(0, 255, 170, 0.2)",
    logo: "/logos/surgence.jpg",
  },
  {
    date: "Apr 2024 – Oct 2025",
    title: "Shards",
    subtitle: "Social Media & Operations Associate",
    desc: "Delivered 450+ posts across multiple platforms, helping grow audiences by 150K+ followers. Built operational workflows in Notion and automated reporting across tools.",
    tag: "BLOCKCHAIN",
    products: ["Shards Guilds", "RewardsHQ"],
    link: "https://x.com/shardsofficial",
    glowColor: "rgba(239, 68, 68, 0.2)",
    logo: "/logos/shards.jpg",
  },
  {
    date: "Feb 2024 – Apr 2024",
    title: "Midnight Labs",
    subtitle: "Social Media & Content",
    desc: "Handled content creation and community management for two Web3 gaming projects.",
    tag: "MARKETING AGENCY",
    products: ["Dininho Adventures", "Xphere"],
    link: null,
    glowColor: "rgba(168, 85, 247, 0.2)",
    logo: null,
  },
  {
    date: "May 2023 – Dec 2023",
    title: "MyNFTV",
    subtitle: "Content & Marketing",
    desc: "Produced content for multiple creators and built community through consistent engagement.",
    tag: "MARKETING AGENCY",
    products: [],
    link: null,
    glowColor: "rgba(34, 197, 94, 0.2)",
    logo: null,
  },
  {
    date: "Jan 2022 – Jan 2025",
    title: "SL Notify",
    subtitle: "Community Manager & Content Creator",
    desc: "Scaled a 2,000+ member community that generated $5.8M in 2023.",
    tag: "COMMUNITY",
    products: [],
    link: "https://x.com/southernlabs",
    glowColor: "rgba(59, 130, 246, 0.2)",
    logo: "/logos/southernlabs.jpg",
  },
];

const PROJECTS = [
  {
    name: "RewardsHQ",
    desc: "Ran campaign engine end-to-end across 10+ campaigns.",
    position: "Social Media & Operations Associate",
    stats: [
      { label: "Campaigns", value: "10+" },
      { label: "Campaign Value", value: "$20K+" },
      { label: "Avg Views/Post", value: "7.4K+" },
      { label: "Tasks Coordinated", value: "200+" },
    ],
    color: "#eab308",
    banner: "/banners/rewardshq.jpg",
    link: "https://x.com/RewardsHQ",
  },
  {
    name: "Shards",
    desc: "Owned content pipeline and automation across tools.",
    position: "Social Media & Operations Associate",
    stats: [
      { label: "Posts Delivered", value: "450+" },
      { label: "Followers Grown", value: "150K+" },
      { label: "Avg Views/Post", value: "17.8K+" },
      { label: "Reporting Time Cut", value: "80%" },
    ],
    color: "#f59e0b",
    banner: "/banners/shards.jpg",
    link: "https://x.com/shardsofficial",
  },
];

const CONTACTS = [
  { platform: "Twitter / X", value: "@bonksti", icon: "𝕏", link: "https://x.com/bonksti" },
  { platform: "LinkedIn", value: "Basti De Luna", icon: "in", link: "https://www.linkedin.com/in/bonksti/" },
  { platform: "Email", value: "bastidluna@gmail.com", icon: "✉", link: "mailto:bastidluna@gmail.com" },
];

const SOCIALS = [
  { icon: "/icons/twitter.png", link: "https://x.com/bonksti", title: "Twitter / X" },
  { icon: "/icons/linkedin.png", link: "https://www.linkedin.com/in/bonksti/", title: "LinkedIn" },
  { icon: "/icons/telegram.png", link: "https://t.me/bonksti", title: "Telegram" },
];

const PORTFOLIO_CARDS = [
  { title: "Surgence Labs", sub: "Marketing Agency", color: "#3b82f6", link: "https://x.com/surgence_io", logo: "/logos/surgence.jpg" },
  { title: "Shards", sub: "Marketing & Ops", color: "#f59e0b", link: "https://x.com/shardsofficial", logo: "/logos/shards.jpg" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function MouseBlob({ t }) {
  const blobRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const isMobile = useIsMobile();

  const animate = useCallback(() => {
    pos.current.x += (target.current.x - pos.current.x) * 0.08;
    pos.current.y += (target.current.y - pos.current.y) * 0.08;

    if (blobRef.current) {
      blobRef.current.style.transform =
        `translate(${pos.current.x - 300}px, ${pos.current.y - 300}px)`;
    }

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf.current);
    };
  }, [animate, isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={blobRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${t.blobColor}, transparent 65%)`,
        pointerEvents: "none",
        zIndex: 1,
        transition: "background 0.4s ease",
        willChange: "transform",
      }}
    />
  );
}

function TimelineSection({ t, theme, isMobile }) {
  if (isMobile) {
    return (
      <div style={{ padding: "72px 20px 100px" }}>
        <MobileTimelineSection t={t} theme={theme} />
      </div>
    );
  }

  return <DesktopTimelineSection t={t} />;
}

function ProjectsSection({ t, isMobile }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: isMobile
          ? "72px 16px 100px"
          : "120px clamp(32px, 5vw, 60px) 80px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            `linear-gradient(${t.gridColor} 1px, transparent 1px),
             linear-gradient(90deg, ${t.gridColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
        }}
      />

      <div style={{ maxWidth: "1060px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: isMobile ? "32px" : "56px" }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              color: t.textDim,
              letterSpacing: "2px",
              marginBottom: "14px",
            }}
          >
            SELECTED WORK
          </p>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: isMobile ? "32px" : "clamp(34px, 4.5vw, 52px)",
              fontWeight: 500,
              color: t.text,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            <span style={{ color: t.textDim, fontStyle: "italic" }}>A few</span> more things.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "12px",
          }}
        >
          {PROJECTS.map((project, i) => {
            const card = (
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: "14px",
                  background:
                    hovered === i
                      ? `linear-gradient(150deg, ${project.color}08, ${t.cardBg})`
                      : t.cardBg,
                  border:
                    `1px solid ${
                      hovered === i ? project.color + "35" : t.border
                    }`,
                  cursor: project.link ? "pointer" : "default",
                  transition: "all 0.4s cubic-bezier(0.33,1,0.68,1)",
                  transform: hovered === i ? "translateY(-3px)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {project.banner && (
                  <div style={{ width: "100%", aspectRatio: "3/1" }}>
                    <img
                      src={project.banner}
                      alt={project.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                        transform: hovered === i ? "scale(1.05)" : "scale(1)",
                      }}
                    />
                  </div>
                )}

                <div style={{ padding: "20px 22px 24px", flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "18px",
                      fontWeight: 500,
                      color: t.text,
                      marginBottom: "6px",
                    }}
                  >
                    {project.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      color: t.textMuted,
                      lineHeight: 1.65,
                      marginBottom: "14px",
                    }}
                  >
                    {project.desc}
                  </p>
                </div>
              </div>
            );

            return project.link ? (
              <a key={i} href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex" }}>
                {card}
              </a>
            ) : (
              <div key={i}>{card}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("timeline");
  const [theme, setTheme] = useState("dark");
  const isMobile = useIsMobile();
  const t = THEMES[theme];

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;0,700&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background:${t.bg}; transition:background 0.4s ease; }
        ::-webkit-scrollbar { display:none; }
      `}</style>

      <div style={{ background: t.bg, minHeight: "100vh", color: t.text }}>
        <MouseBlob t={t} />
        <Nav
          active={activeSection}
          onNavigate={setActiveSection}
          theme={theme}
          toggleTheme={toggleTheme}
          t={t}
          isMobile={isMobile}
        />

        {!isMobile && <SocialBar t={t} theme={theme} isMobile={false} />}

        <div>
          {activeSection === "timeline" && (
            <TimelineSection t={t} theme={theme} isMobile={isMobile} />
          )}
          {activeSection === "projects" && (
            <ProjectsSection t={t} isMobile={isMobile} />
          )}
          {activeSection === "contact" && (
            <ContactSection t={t} isMobile={isMobile} />
          )}
        </div>
      </div>
    </>
  );
}