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
    textSecondary: "#d0d0d0",
    textMuted: "#aaaaaa",
    textDim: "#888888",
    border: "#2a2a2a",
    cardBg: "rgba(255,255,255,0.04)",
    gradientTop: "#050505",
    silver: "#c0c0c0",
    blobColor: "rgba(59, 130, 246, 0.07)",
    gridColor: "rgba(255,255,255,0.03)",
    navInactive: "#bbbbbb",
    attribution: "#999999",
  },
  light: {
    bg: "#f5f5f5",
    surface: "#ffffff",
    accent: "#2563eb",
    accentDim: "#1d4ed8",
    accentGlow: "rgba(37, 99, 235, 0.08)",
    accentGlowStrong: "rgba(37, 99, 235, 0.18)",
    text: "#111111",
    textSecondary: "#333333",
    textMuted: "#555555",
    textDim: "#666666",
    border: "#d8d8d8",
    cardBg: "rgba(0,0,0,0.025)",
    gradientTop: "#f5f5f5",
    silver: "#444444",
    blobColor: "rgba(37, 99, 235, 0.06)",
    gridColor: "rgba(0,0,0,0.04)",
    navInactive: "#444444",
    attribution: "#555555",
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
    logo: "/logos/surgence.webp",
  },
  {
    date: "Apr 2024 – Oct 2025",
    title: "Shards",
    subtitle: "Social Media & Operations Associate",
    desc: "Delivered 450+ posts across multiple platforms, helping grow audiences by 150K+ followers. Built operational workflows in Notion for sprints, task management, and content approvals, and created automations across Slack, Notion, Telegram, and Jira that significantly reduced manual reporting by 80%.",
    tag: "BLOCKCHAIN",
    products: ["Shards Guilds", "RewardsHQ"],
    link: "https://x.com/shardsofficial",
    glowColor: "rgba(239, 68, 68, 0.2)",
    logo: "/logos/shards.webp",
  },
  {
    date: "Feb 2024 – Apr 2024",
    title: "Midnight Labs",
    subtitle: "Social Media & Content",
    desc: "Handled content creation and community management for two Web3 gaming projects. Wrote copy, scheduled posts, managed engagement, and coordinated with the team on campaign timelines and deliverables.",
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
    desc: "Produced content for multiple content creators. Managed social accounts, wrote updates, and built community through consistent output and direct engagement.",
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
    desc: "Led and scaled a 2,000+ member community that generated $5.8M in 2023. Ran growth campaigns and monetization experiments, including educational webinars.",
    tag: "COMMUNITY",
    products: [],
    link: "https://x.com/southernlabs",
    glowColor: "rgba(59, 130, 246, 0.2)",
    logo: "/logos/southern.jpg",
  },
];

const PROJECTS = [
  {
    name: "RewardsHQ",
    desc: "Ran the campaign engine for Shards' Telegram rewards platform, from quest design to distribution. Managed everything end-to-end across 10+ campaigns.",
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
    desc: "Owned the entire content pipeline: writing, scheduling, reporting, while building the ops backbone in Notion and automating everything I could across Slack, Telegram, and Jira.",
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
  {
    name: "Mey Investor Card Campaign",
    desc: "Led the social push for Mey Real's investor card launch. The campaign blew up with 20K+ sign-ups in under two days with zero paid ads.",
    position: "Marketing Associate",
    stats: [
      { label: "Participants", value: "20K+" },
      { label: "Timeframe", value: "48 hrs" },
    ],
    color: "#a855f7",
    banner: "/banners/meyreal.jpg",
    link: "https://x.com/meyreal_io",
  },
  {
    name: "Verse8 X CROSS Game Jam",
    desc: "Helped market and coordinate a game jam where the community actually shipped: 253 games and 266 tokens launched in a single campaign cycle.",
    position: "Marketing Associate",
    stats: [
      { label: "Prize Pool", value: "150K $CROSS" },
      { label: "Games Created", value: "250+" },
      { label: "Tokens Launched", value: "260+" },
    ],
    color: "#ec4899",
    banner: "/banners/verse8.jpg",
    link: "https://x.com/verse_eight",
  },
  {
    name: "South Locker",
    desc: "Designed everything visual for a sneaker reselling page: product shots, promo graphics, social content. Two years of consistent output that built the brand's entire visual identity.",
    position: "Social Media & Graphic Design",
    stats: [
      { label: "Duration", value: "2+ yrs" },
      { label: "Assets Produced", value: "230+" },
    ],
    color: "#f97316",
    banner: "/banners/southlocker.jpg",
    link: "https://www.instagram.com/southlocker",
  },
  {
    name: "Clothing Distribution",
    desc: "Started this at 17. I built the logistics from scratch, handling ordering, fulfillment, and customer ops. Was moving 30K+ items a week and clearing $4K/month before I turned 19.",
    position: "Co-Founder",
    stats: [
      { label: "Items/Week", value: "30K+" },
      { label: "Monthly Revenue", value: "$4K+" },
    ],
    color: "#10b981",
    banner: null,
    link: null,
  },
  {
    name: "Bit by Brick",
    desc: "My personal brand where I document everything I'm into: homelabs, PC builds, keyboard mods, car stuff, travel. Building in public, one post at a time.",
    position: "Personal",
    stats: [],
    color: "#3b82f6",
    banner: null,
    link: null,
  },
  {
    name: "Homelab ARC",
    desc: "Designing a self-hosted family server system themed around Iron Man. Proxmox base, containers named JARVIS, ULTRON, VISION. Full architecture plan with a phased budget so I can actually build it.",
    position: "Personal",
    stats: [],
    color: "#06b6d4",
    banner: null,
    link: null,
  },
];

const CONTACTS = [
  { platform: "Twitter / X", value: "@bonksti", icon: "𝕏", link: "https://x.com/bonksti" },
  { platform: "LinkedIn", value: "Basti De Luna", icon: "in", link: "https://www.linkedin.com/in/bonksti/" },
  { platform: "Email", value: "bastidluna@gmail.com", icon: "✉", link: "mailto:bastidluna@gmail.com" },
  { platform: "Telegram", value: "@bonksti", icon: "✈", link: "https://t.me/bonksti" },
  { platform: "Instagram", value: "@bonksti", icon: "◎", link: "https://instagram.com/bonksti" },
];

const SOCIALS = [
  { icon: "/icons/twitter.png", link: "https://x.com/bonksti", title: "Twitter / X" },
  { icon: "/icons/linkedin.png", link: "https://www.linkedin.com/in/bonksti/", title: "LinkedIn" },
  { icon: "/icons/telegram.png", link: "https://t.me/bonksti", title: "Telegram" },
  { icon: "/icons/instagram.png", link: "https://instagram.com/bonksti", title: "Instagram" },
  { icon: "/icons/github.png", link: "https://github.com/bonksti", title: "GitHub" },
  { icon: "/icons/mail.png", link: "mailto:bastidluna@gmail.com", title: "Mail" },
];

const PORTFOLIO_CARDS = [
  { title: "Surgence Labs", sub: "Marketing Agency", color: "#3b82f6", link: "https://x.com/surgence_io", logo: "/logos/surgence.webp" },
  { title: "Shards", sub: "Marketing & Ops", color: "#f59e0b", link: "https://x.com/shardsofficial", logo: "/logos/shards.webp" },
  { title: "Southern Labs", sub: "Community Platform", color: "#10b981", link: "https://www.instagram.com/southernlabsxyz", logo: "/logos/southern.webp" },
  { title: "Extsy", sub: "DeFi Platform", color: "#06b6d4", link: "https://x.com/extsyplatform", logo: "/logos/extsy.webp" },
  { title: "Mey Real", sub: "Real Estate Tokenization", color: "#a855f7", link: "https://x.com/meyreal_io", logo: "/logos/meyreal.webp" },
  { title: "Mey Network", sub: "Layer 1 Blockchain", color: "#ec4899", link: "https://x.com/mey_network", logo: "/logos/meynet.webp" },
  { title: "Verse8", sub: "Gaming Platform", color: "#f43f5e", link: "https://x.com/verse_eight", logo: "/logos/verse8.webp" },
  { title: "RewardsHQ", sub: "Rewards Platform", color: "#eab308", link: "https://x.com/RewardsHQ", logo: "/logos/rewardshq.webp" },
  { title: "Aura", sub: "Tech Platform", color: "#14b8a6", link: "https://aura.tech/", logo: "/logos/aura.webp" },
  { title: "Dininho Adventures", sub: "Web3 Game", color: "#8b5cf6", link: "https://x.com/DininhoNFT", logo: "/logos/dininho.webp" },
  { title: "South Locker", sub: "Clothing Brand", color: "#f97316", link: "https://www.instagram.com/southlocker", logo: "/logos/southlocker.webp" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") return window.innerWidth < 768;
    return false;
  });
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
  const animate = useCallback(() => {
    pos.current.x += (target.current.x - pos.current.x) * 0.08;
    pos.current.y += (target.current.y - pos.current.y) * 0.08;
    if (blobRef.current) {
      blobRef.current.style.transform = `translate(${pos.current.x - 300}px, ${pos.current.y - 300}px)`;
    }
    raf.current = requestAnimationFrame(animate);
  }, []);
  useEffect(() => {
    const handleMove = (e) => { target.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", handleMove);
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", handleMove); cancelAnimationFrame(raf.current); };
  }, [animate]);
  return (
    <div ref={blobRef} style={{ position: "fixed", top: 0, left: 0, width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${t.blobColor}, transparent 65%)`, pointerEvents: "none", zIndex: 1, transition: "background 0.4s ease", willChange: "transform" }} />
  );
}

function SocialBar({ t, theme, isMobile }) {
  const [hovered, setHovered] = useState(null);
  if (isMobile) return null;
  return (
    <div style={{ position: "fixed", bottom: "28px", left: "32px", display: "flex", flexDirection: "column", gap: "6px", zIndex: 50 }}>
      <div style={{ display: "flex", gap: "8px" }}>
        {SOCIALS.map((s, i) => (
          <a
            key={s.title}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            title={s.title}
            aria-label={s.title}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              background: hovered === i ? t.accentGlow : t.cardBg,
              border: `1px solid ${hovered === i ? t.accent + "40" : t.border}`,
              transition: "all 0.25s ease",
              transform: hovered === i ? "translateY(-3px)" : "none"
            }}
          >
            <img src={s.icon} alt="" aria-hidden="true" style={{ width: "20px", height: "20px", opacity: hovered === i ? 1 : 0.7, transition: "opacity 0.25s ease", filter: theme === "dark" ? "brightness(0) invert(1)" : "brightness(0)" }} />
          </a>
        ))}
      </div>
      <a
        href="https://www.flaticon.com/authors/freepik"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: t.attribution, textDecoration: "none", letterSpacing: "0.3px" }}
      >
        Icons by Freepik — Flaticon
      </a>
    </div>
  );
}

function Nav({ active, onNavigate, theme, toggleTheme, t, isMobile }) {
  const tabs = ["Timeline", "Projects", "Contact"];
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "12px 16px" : "16px 32px",
        background: `linear-gradient(to bottom, ${t.gradientTop} 50%, transparent)`,
        backdropFilter: "blur(12px)"
      }}
    >
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: isMobile ? "15px" : "clamp(16px, 1.4vw, 22px)", fontWeight: 500, color: t.text, letterSpacing: "-0.3px", minWidth: isMobile ? "auto" : "180px" }}>
        Basti De Luna
      </div>
      <div style={{ display: "flex", gap: "2px", background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: "40px", padding: "3px" }}>
        {tabs.map((tab) => {
          const isActive = active === tab.toLowerCase();
          return (
            <button
              key={tab}
              onClick={() => onNavigate(tab.toLowerCase())}
              aria-current={isActive ? "page" : undefined}
              style={{
                padding: isMobile ? "8px 14px" : "9px 24px",
                borderRadius: "36px",
                border: "none",
                cursor: "pointer",
                fontSize: isMobile ? "12px" : "clamp(12px, 1vw, 15px)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.3px",
                transition: "all 0.35s cubic-bezier(0.33, 1, 0.68, 1)",
                background: isActive ? t.accent : "transparent",
                color: isActive ? "#ffffff" : t.navInactive,
                minHeight: "44px",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
      <div style={{ minWidth: isMobile ? "auto" : "180px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            width: "44px", height: "44px",
            borderRadius: "50%",
            border: `1px solid ${t.border}`,
            background: t.cardBg,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px",
            color: t.navInactive,
            transition: "all 0.3s ease"
          }}
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </div>
    </nav>
  );
}

function TimelineMobile({ t }) {
  return (
    <div style={{ minHeight: "100vh", padding: "80px 16px 100px" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "20px" }}>
          <img src="/me.webp" alt="Basti De Luna" fetchPriority="high" style={{ width: "80px", height: "80px", borderRadius: "14px", objectFit: "cover", flexShrink: 0, border: `1px solid ${t.border}` }} />
          <div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", fontWeight: 600, color: t.text, margin: "0 0 4px", lineHeight: 1.1, letterSpacing: "-0.8px" }}>
              Basti De Luna
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: t.accent, margin: "0 0 4px", fontWeight: 500 }}>
              Marketing, Operations & Tech
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: t.textMuted, margin: 0 }}>
              Building brands from the ground up.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0", background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: "12px", overflow: "hidden" }}>
          {[["3+", "Years"], ["10+", "Brands"], ["50M+", "Impressions"]].map(([val, label], i) => (
            <div key={label} style={{ flex: 1, padding: "14px 0", textAlign: "center", borderRight: i < 2 ? `1px solid ${t.border}` : "none" }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: 600, color: t.text, margin: "0 0 2px" }}>{val}</p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: t.textMuted, margin: 0, letterSpacing: "0.5px" }}>{label}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: t.textMuted, margin: "16px 0 12px", lineHeight: 1.75 }}>
          I've spent 3+ years helping teams grow through content, community, and operations, working across early NFT communities, marketing agencies, and emerging protocols. Always building something on the side.
        </p>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 18px", borderRadius: "8px", border: `1px solid ${t.accent}40`, background: t.accentGlow, color: t.accent, fontFamily: "'DM Mono', monospace", fontSize: "12px", letterSpacing: "0.5px", textDecoration: "none" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          View Resume
        </a>
      </div>

      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: t.textDim, letterSpacing: "2px", marginBottom: "16px" }}>EXPERIENCE</p>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: "7px", top: 0, bottom: 0, width: "1.5px", background: t.border }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {TIMELINE_DATA.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "20px", paddingBottom: "24px" }}>
              <div style={{ flexShrink: 0, width: "16px", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                <div style={{ width: "15px", height: "15px", borderRadius: "50%", background: t.accent, border: `2px solid ${t.bg}`, flexShrink: 0, boxShadow: `0 0 12px ${t.accentGlow}` }} />
              </div>
              <div style={{ flex: 1, background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: "12px", padding: "16px" }}>
                <div style={{ display: "inline-flex", padding: "3px 8px", borderRadius: "4px", background: t.accentGlow, border: `1px solid ${t.accent}30`, color: t.accent, fontSize: "9px", fontFamily: "'DM Mono', monospace", letterSpacing: "1.2px", marginBottom: "10px" }}>
                  {item.tag}
                </div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: t.silver, margin: "0 0 6px" }}>{item.date}</p>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 600, color: t.text, margin: "0 0 4px", lineHeight: 1.1, textDecoration: "none", display: "inline-flex", alignItems: "baseline", gap: "6px" }}>
                    {item.title}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="2" style={{ flexShrink: 0, position: "relative", top: "1px" }}>
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                ) : (
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 600, color: t.text, margin: "0 0 4px", lineHeight: 1.1 }}>
                    {item.title}
                  </h2>
                )}
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: t.accent, margin: "0 0 10px", fontWeight: 500 }}>{item.subtitle}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: t.textMuted, margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
                {item.products.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
                    {item.products.map((p) => (
                      <span key={p} style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "10px", fontFamily: "'DM Mono', monospace", background: t.cardBg, border: `1px solid ${t.border}`, color: t.textSecondary }}>{p}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineSection({ t, isMobile }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sectionHeight = container.clientHeight;
      const idx = Math.floor((scrollTop + sectionHeight * 0.3) / sectionHeight);
      setActiveIndex(Math.max(0, Math.min(idx, TIMELINE_DATA.length - 1)));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const scrollTo = (i) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({ top: containerRef.current.clientHeight * i, behavior: "smooth" });
  };

  if (isMobile) return <TimelineMobile t={t} />;

  const progress = ((activeIndex + 1) / TIMELINE_DATA.length) * 100;
  const activeItem = TIMELINE_DATA[activeIndex];

  return (
    <div style={{ height: "100vh", display: "flex", position: "relative", overflow: "hidden", justifyContent: "center" }}>
      <div style={{ width: "100%", display: "flex", position: "relative" }}>

        <div style={{
          width: "42%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 clamp(16px, 2vw, 48px) 0 clamp(24px, 3.5vw, 80px)",
          position: "relative",
          zIndex: 3,
        }}>
          <div style={{ display: "flex", gap: "clamp(14px, 1.5vw, 28px)", alignItems: "flex-start", width: "100%" }}>
            <img
              src="/me.webp"
              alt="Basti De Luna"
              fetchPriority="high"
              style={{
                width: "clamp(120px, 14vw, 260px)",
                height: "clamp(120px, 14vw, 260px)",
                borderRadius: "clamp(14px, 1.2vw, 24px)",
                objectFit: "cover",
                flexShrink: 0,
                border: `1px solid ${t.border}`,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(36px, 3.5vw, 72px)", fontWeight: 600, color: t.text, margin: "0 0 clamp(6px, 0.6vw, 14px)", lineHeight: 1.05, letterSpacing: "-1.2px" }}>
                Basti De Luna
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.3vw, 22px)", color: t.accent, margin: "0 0 clamp(8px, 0.7vw, 16px)", fontWeight: 500, letterSpacing: "-0.2px" }}>
                Marketing, Operations & Tech
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(12px, 1vw, 18px)", color: t.textMuted, margin: "0 0 clamp(12px, 1.1vw, 22px)", lineHeight: 1.6 }}>
                Building brands from the ground up.
              </p>
              <div style={{ display: "flex", gap: "clamp(16px, 2vw, 40px)", marginBottom: "clamp(14px, 1.3vw, 28px)", alignItems: "flex-end" }}>
                {[["3+", "Years"], ["10+", "Brands"], ["50M+", "Impressions"]].map(([val, label], i, arr) => (
                  <div key={label} style={{ display: "flex", gap: "clamp(16px, 2vw, 40px)", alignItems: "flex-end" }}>
                    <div>
                      <p style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(28px, 2.8vw, 72px)", fontWeight: 600, color: t.text, margin: 0, lineHeight: 1 }}>{val}</p>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(11px, 0.95vw, 18px)", color: t.textMuted, margin: "clamp(2px, 0.2vw, 6px) 0 0", letterSpacing: "0.5px" }}>{label}</p>
                    </div>
                    {i < arr.length - 1 && <div style={{ width: "1px", background: t.border, height: "clamp(36px, 3.5vw, 72px)", alignSelf: "flex-start" }} />}
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(12px, 1vw, 18px)", color: t.textMuted, margin: "0 0 clamp(12px, 1.2vw, 24px)", lineHeight: 1.75 }}>
                I've spent 3+ years helping teams grow through content, community, and operations, working across early NFT communities, marketing agencies, and emerging protocols. Always building something on the side.
              </p>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "clamp(8px, 0.7vw, 14px) clamp(14px, 1.2vw, 24px)",
                  borderRadius: "8px",
                  border: `1px solid ${t.accent}40`,
                  background: t.accentGlow,
                  color: t.accent,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "clamp(11px, 0.9vw, 16px)",
                  letterSpacing: "0.5px",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  minHeight: "44px",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = t.accentGlowStrong; e.currentTarget.style.borderColor = t.accent; }}
                onMouseLeave={e => { e.currentTarget.style.background = t.accentGlow; e.currentTarget.style.borderColor = t.accent + "40"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                View Resume
              </a>
            </div>
          </div>
        </div>

        <div style={{ width: "clamp(50px, 4vw, 80px)", flexShrink: 0, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "100px 0 60px" }}>
          <div style={{ position: "absolute", left: "50%", top: "100px", bottom: "60px", width: "1.5px", background: t.border, transform: "translateX(-50%)" }}>
            <div style={{ width: "100%", height: `${progress}%`, background: `linear-gradient(to bottom, ${t.accent}, ${t.accentDim})`, transition: "height 0.6s cubic-bezier(0.33, 1, 0.68, 1)", borderRadius: "1px", boxShadow: `0 0 16px ${t.accentGlowStrong}` }} />
          </div>
          <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
            {TIMELINE_DATA.map((item, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); scrollTo(i); }}
                aria-label={`Go to ${item.title}`}
                style={{ cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", minHeight: "44px", minWidth: "44px" }}
              >
                <div style={{ width: i === activeIndex ? "clamp(10px, 0.9vw, 16px)" : "clamp(6px, 0.55vw, 10px)", height: i === activeIndex ? "clamp(10px, 0.9vw, 16px)" : "clamp(6px, 0.55vw, 10px)", borderRadius: "50%", background: i <= activeIndex ? t.accent : t.textDim, transition: "all 0.4s cubic-bezier(0.33, 1, 0.68, 1)", boxShadow: i === activeIndex ? `0 0 20px ${t.accentGlowStrong}, 0 0 40px ${t.accentGlow}` : "none", flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>

        <div ref={containerRef} style={{ flex: 1, overflowY: "auto", scrollSnapType: "y mandatory", scrollbarWidth: "none", position: "relative" }}>
          <div style={{ position: "fixed", top: 0, right: 0, width: "58%", height: "100vh", background: `radial-gradient(ellipse at 80% 50%, ${activeItem.glowColor}, transparent 60%)`, pointerEvents: "none", zIndex: 0, transition: "background 0.8s ease" }} />

          {TIMELINE_DATA.map((item, i) => (
            <div key={i} style={{ height: "100vh", display: "flex", alignItems: "center", padding: "0 clamp(28px, 4vw, 80px)", scrollSnapAlign: "start", position: "relative", zIndex: 1 }}>
              <div style={{ opacity: i === activeIndex ? 1 : 0.12, transform: `translateY(${i === activeIndex ? 0 : 24}px)`, transition: "all 0.6s cubic-bezier(0.33, 1, 0.68, 1)", maxWidth: "900px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "clamp(4px, 0.4vw, 8px) clamp(8px, 0.8vw, 16px)", borderRadius: "4px", background: t.accentGlow, border: `1px solid ${t.accent}30`, color: t.accent, fontSize: "clamp(10px, 0.85vw, 14px)", fontFamily: "'DM Mono', monospace", fontWeight: 500, letterSpacing: "1.5px", marginBottom: "clamp(12px, 1.2vw, 24px)", lineHeight: 1 }}>
                  {item.tag}
                </div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(11px, 0.95vw, 18px)", color: t.silver, margin: "0 0 clamp(10px, 1vw, 20px)" }}>{item.date}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 1.2vw, 24px)", marginBottom: "clamp(6px, 0.6vw, 12px)" }}>
                  {item.logo && (
                    <div style={{ width: "clamp(48px, 5vw, 96px)", height: "clamp(48px, 5vw, 96px)", borderRadius: "clamp(10px, 0.9vw, 18px)", overflow: "hidden", border: `1px solid ${t.border}`, flexShrink: 0 }}>
                      <img src={item.logo} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(32px, 4vw, 80px)", fontWeight: 600, color: t.text, lineHeight: 1.05, letterSpacing: "-0.8px", textDecoration: "none", display: "inline-flex", alignItems: "baseline", gap: "10px" }}>
                      {item.title}
                      <svg width="clamp(16px, 1.6vw, 28px)" height="clamp(16px, 1.6vw, 28px)" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="2" style={{ flexShrink: 0, position: "relative", top: "2px" }}>
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  ) : (
                    <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(32px, 4vw, 80px)", fontWeight: 600, color: t.text, lineHeight: 1.05, letterSpacing: "-0.8px", margin: 0 }}>
                      {item.title}
                    </h2>
                  )}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.3vw, 24px)", color: t.accent, margin: "0 0 clamp(12px, 1.2vw, 24px)", fontWeight: 500 }}>{item.subtitle}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.1vw, 20px)", color: t.textMuted, margin: 0, lineHeight: 1.8, maxWidth: "600px" }}>{item.desc}</p>
                {item.products.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(4px, 0.5vw, 10px)", marginTop: "clamp(14px, 1.4vw, 28px)" }}>
                    {item.products.map((p) => (
                      <span key={p} style={{ padding: "clamp(4px, 0.4vw, 8px) clamp(10px, 0.9vw, 18px)", borderRadius: "6px", fontSize: "clamp(11px, 0.9vw, 16px)", fontFamily: "'DM Mono', monospace", background: t.cardBg, border: `1px solid ${t.border}`, color: t.textSecondary, letterSpacing: "0.3px" }}>{p}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "28px", left: "calc(42% + clamp(50px, 4vw, 80px) + clamp(28px, 4vw, 80px))", display: "flex", alignItems: "center", gap: "8px", opacity: activeIndex === 0 ? 1 : 0.3, transition: "opacity 0.4s ease", animation: "pulseLeft 2s ease-in-out infinite", zIndex: 10 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(11px, 0.9vw, 16px)", color: t.textMuted, letterSpacing: "0.5px" }}>Scroll to explore</span>
      </div>
    </div>
  );
}

function ContactList({ t, hoveredContact, setHoveredContact }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {CONTACTS.map((contact, i) => (
        <a key={contact.platform} href={contact.link} target="_blank" rel="noopener noreferrer"
          onMouseEnter={() => setHoveredContact(i)}
          onMouseLeave={() => setHoveredContact(null)}
          style={{ padding: "clamp(12px, 1.1vw, 20px) clamp(14px, 1.3vw, 24px)", borderRadius: "10px", background: hoveredContact === i ? t.accentGlow : t.cardBg, border: `1px solid ${hoveredContact === i ? t.accent + "30" : t.border}`, display: "flex", alignItems: "center", gap: "clamp(10px, 1vw, 18px)", textDecoration: "none", transition: "all 0.3s ease", transform: hoveredContact === i ? "translateX(4px)" : "none", minHeight: "44px" }}>
          <span style={{ fontSize: "clamp(14px, 1.2vw, 20px)", width: "clamp(20px, 1.8vw, 32px)", textAlign: "center", color: hoveredContact === i ? t.accent : t.silver }}>{contact.icon}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1vw, 18px)", color: t.text, margin: 0, fontWeight: 500 }}>{contact.platform}</p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(11px, 0.85vw, 15px)", color: t.textMuted, margin: 0 }}>{contact.value}</p>
          </div>
          <svg width="clamp(14px, 1.1vw, 20px)" height="clamp(14px, 1.1vw, 20px)" viewBox="0 0 24 24" fill="none" stroke={hoveredContact === i ? t.accent : t.silver} strokeWidth="2" style={{ transition: "all 0.3s ease", transform: hoveredContact === i ? "translateX(2px)" : "none" }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      ))}
    </div>
  );
}

function ContactSection({ t, isMobile, theme }) {
  const [hoveredContact, setHoveredContact] = useState(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  useEffect(() => {
    const speed = 0.0008;
    const animate = (time) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        setOffset((prev) => (prev + delta * speed) % PORTFOLIO_CARDS.length);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
  const VISIBLE = 8;

  const cardSize = "clamp(180px, 16vw, 280px)";

  if (isMobile) {
    return (
      <div style={{ minHeight: "100vh", padding: "80px 16px 100px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <div style={{ position: "relative", width: "160px", height: "320px" }}>
            {Array.from({ length: Math.min(VISIBLE, 6) }).map((_, i) => {
              const stackPos = Math.min(VISIBLE, 6) - 1 - i;
              const cardFloat = (offset + stackPos) % PORTFOLIO_CARDS.length;
              const cardIdx = Math.floor(cardFloat) % PORTFOLIO_CARDS.length;
              const card = PORTFOLIO_CARDS[cardIdx < 0 ? cardIdx + PORTFOLIO_CARDS.length : cardIdx];
              const frac = offset % 1;
              const pos = stackPos + (1 - frac);
              const yShift = pos * 22;
              const scale = 1.08 - pos * 0.05;
              const blur = Math.max(0, (pos - 1) * 3);
              const cardOpacity = pos > 5.5 ? Math.max(0, (6 - pos) * 2) : pos < 0.3 ? Math.max(0, pos * 3.3) : 1;
              const cardEl = (
                <div style={{ position: "absolute", top: "50%", left: "50%", width: "150px", height: "150px", borderRadius: "18px", overflow: "hidden", background: card.logo ? "none" : `linear-gradient(145deg, ${card.color}20, ${t.surface})`, border: `1px solid ${card.logo ? "rgba(255,255,255,0.1)" : card.color + "30"}`, transform: `translate(-50%, -50%) translateY(${yShift}px) scale(${scale})`, opacity: cardOpacity, filter: blur > 0.1 ? `blur(${blur}px)` : "none", zIndex: Math.min(VISIBLE, 6) - stackPos, willChange: "transform, opacity, filter", cursor: card.link ? "pointer" : "default" }}>
                  {card.logo ? (
                    <img src={card.logo} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: card.color, opacity: 0.3, marginBottom: "8px" }} />
                      <p style={{ fontFamily: "'Fraunces', serif", fontSize: "12px", fontWeight: 500, color: t.text, margin: 0, textAlign: "center", padding: "0 12px" }}>{card.title}</p>
                    </div>
                  )}
                </div>
              );
              return card.link ? (
                <a key={i} href={card.link} target="_blank" rel="noopener noreferrer" aria-label={card.title} style={{ textDecoration: "none" }}>{cardEl}</a>
              ) : (
                <div key={i}>{cardEl}</div>
              );
            })}
          </div>
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", fontWeight: 500, color: t.text, margin: "0 0 4px", letterSpacing: "-0.6px", textAlign: "center" }}>
          Brands I've worked with.
        </h2>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: t.textMuted, textAlign: "center", letterSpacing: "0.5px", marginBottom: "32px" }}>
          Basti De Luna — Portfolio
        </p>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: t.textDim, letterSpacing: "2px", marginBottom: "12px" }}>GET IN TOUCH</p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", fontWeight: 500, color: t.text, margin: "0 0 8px", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
          Let's work together.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: t.textMuted, lineHeight: 1.7, margin: "0 0 20px" }}>
          Marketing & ops professional with 3+ years experience. Currently studying CS and open to new opportunities.
        </p>
        <ContactList t={t} hoveredContact={hoveredContact} setHoveredContact={setHoveredContact} />
      </div>
    );
  }

  const stackCardW = "clamp(180px, 16vw, 280px)";
  const stackCardH = "clamp(180px, 16vw, 280px)";
  const stackContainerH = `calc(${stackCardH} + clamp(180px, 16vw, 280px))`;

  return (
    <div style={{ height: "100vh", display: "flex", position: "relative" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 48px", overflow: "hidden" }}>
        <div style={{ position: "relative", width: stackCardW, height: stackContainerH }}>
          {Array.from({ length: VISIBLE }).map((_, i) => {
            const stackPos = VISIBLE - 1 - i;
            const cardFloat = (offset + stackPos) % PORTFOLIO_CARDS.length;
            const cardIdx = Math.floor(cardFloat) % PORTFOLIO_CARDS.length;
            const card = PORTFOLIO_CARDS[cardIdx < 0 ? cardIdx + PORTFOLIO_CARDS.length : cardIdx];
            const frac = offset % 1;
            const pos = stackPos + (1 - frac);
            const yShift = pos * 32;
            const scale = 1.08 - pos * 0.05;
            const blur = Math.max(0, (pos - 1) * 3);
            const cardOpacity = pos > VISIBLE - 1.5 ? Math.max(0, (VISIBLE - pos) * 2) : pos < 0.3 ? Math.max(0, pos * 3.3) : 1;
            const cardEl = (
              <div style={{ position: "absolute", top: "50%", left: "50%", width: stackCardW, height: stackCardH, borderRadius: "clamp(16px, 1.4vw, 28px)", overflow: "hidden", background: card.logo ? "none" : `linear-gradient(145deg, ${card.color}20, ${t.surface})`, border: `1px solid ${card.logo ? "rgba(255,255,255,0.1)" : card.color + "30"}`, transform: `translate(-50%, -50%) translateY(${yShift}px) scale(${scale})`, opacity: cardOpacity, filter: blur > 0.1 ? `blur(${blur}px)` : "none", zIndex: VISIBLE - stackPos, willChange: "transform, opacity, filter", cursor: card.link ? "pointer" : "default" }}>
                {card.logo ? (
                  <img src={card.logo} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "clamp(32px, 3vw, 56px)", height: "clamp(32px, 3vw, 56px)", borderRadius: "clamp(8px, 0.8vw, 14px)", background: card.color, opacity: 0.3, marginBottom: "clamp(8px, 0.8vw, 14px)" }} />
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(13px, 1.1vw, 20px)", fontWeight: 500, color: t.text, margin: 0, textAlign: "center", padding: "0 16px" }}>{card.title}</p>
                  </div>
                )}
              </div>
            );
            return card.link ? (
              <a key={i} href={card.link} target="_blank" rel="noopener noreferrer" aria-label={card.title} style={{ textDecoration: "none" }}>{cardEl}</a>
            ) : (
              <div key={i}>{cardEl}</div>
            );
          })}
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(28px, 3vw, 52px)", fontWeight: 500, color: t.text, margin: "clamp(20px, 2vw, 40px) 0 clamp(6px, 0.6vw, 12px)", letterSpacing: "-0.8px", textAlign: "center" }}>
          Brands I've worked with.
        </h2>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(11px, 0.9vw, 16px)", color: t.textMuted, textAlign: "center", letterSpacing: "0.5px" }}>
          Basti De Luna — Portfolio
        </p>
      </div>

      <div style={{ width: "clamp(300px, 28vw, 480px)", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px clamp(24px, 2.5vw, 48px)", borderLeft: `1px solid ${t.border}` }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(10px, 0.85vw, 14px)", color: t.textDim, letterSpacing: "2px", marginBottom: "clamp(16px, 1.5vw, 28px)" }}>GET IN TOUCH</p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 3vw, 56px)", fontWeight: 500, color: t.text, margin: "0 0 clamp(8px, 0.8vw, 16px)", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
          Let's work<br />together.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.05vw, 18px)", color: t.textMuted, lineHeight: 1.7, margin: "0 0 clamp(24px, 2.5vw, 48px)" }}>
          Marketing & ops professional with 3+ years experience. Currently studying CS and open to new opportunities.
        </p>
        <ContactList t={t} hoveredContact={hoveredContact} setHoveredContact={setHoveredContact} />
      </div>
    </div>
  );
}

function ProjectsSection({ t, isMobile }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "80px 16px 100px" : "clamp(80px, 8vw, 140px) clamp(32px, 5vw, 80px)", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${t.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${t.gridColor} 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none", maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)" }} />
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: isMobile ? "32px" : "clamp(36px, 4vw, 72px)" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(10px, 0.85vw, 14px)", color: t.textDim, letterSpacing: "2px", marginBottom: "clamp(10px, 1vw, 20px)" }}>SELECTED WORK</p>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: isMobile ? "32px" : "clamp(36px, 4.5vw, 72px)", fontWeight: 500, color: t.text, margin: 0, lineHeight: 1.1, letterSpacing: "-1px" }}>
            <span style={{ color: t.textDim, fontStyle: "italic" }}>A few</span> more things.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(clamp(280px, 22vw, 400px), 1fr))", gap: "clamp(10px, 1vw, 20px)" }}>
          {PROJECTS.map((project, i) => {
            const card = (
              <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ borderRadius: "clamp(12px, 1vw, 20px)", background: hovered === i ? `linear-gradient(150deg, ${project.color}08, ${t.cardBg})` : t.cardBg, border: `1px solid ${hovered === i ? project.color + "35" : t.border}`, cursor: project.link ? "pointer" : "default", transition: "all 0.4s cubic-bezier(0.33, 1, 0.68, 1)", transform: hovered === i ? "translateY(-3px)" : "none", display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}>
                {project.banner && (
                  <div style={{ width: "100%", aspectRatio: "3/1", overflow: "hidden", flexShrink: 0 }}>
                    <img src={project.banner} alt={project.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease", transform: hovered === i ? "scale(1.05)" : "scale(1)" }} />
                  </div>
                )}
                <div style={{ padding: "clamp(18px, 1.8vw, 36px) clamp(20px, 2vw, 40px) clamp(22px, 2.2vw, 44px)", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "clamp(4px, 0.4vw, 8px)" }}>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(18px, 1.6vw, 28px)", fontWeight: 500, color: t.text, margin: 0, flex: 1 }}>{project.name}</h3>
                    {project.link && (
                      <svg width="clamp(14px, 1.2vw, 22px)" height="clamp(14px, 1.2vw, 22px)" viewBox="0 0 24 24" fill="none" stroke={hovered === i ? project.color : t.textDim} strokeWidth="2" style={{ transition: "all 0.3s ease", transform: hovered === i ? "translate(2px, -2px)" : "none", flexShrink: 0 }}>
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    )}
                  </div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(10px, 0.85vw, 14px)", color: project.color, margin: "0 0 clamp(10px, 0.9vw, 18px)", letterSpacing: "0.3px", opacity: 0.9 }}>{project.position}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(12px, 1vw, 17px)", color: t.textMuted, lineHeight: 1.65, margin: "0 0 clamp(12px, 1.1vw, 20px)" }}>{project.desc}</p>
                  {project.stats.length > 0 && (
                    <div style={{ marginTop: "auto", borderTop: `1px solid ${t.border}`, paddingTop: "clamp(10px, 1vw, 20px)", display: "grid", gridTemplateColumns: `repeat(${Math.min(project.stats.length, 4)}, 1fr)`, gap: "8px" }}>
                      {project.stats.map((stat) => (
                        <div key={stat.label}>
                          <p style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(16px, 1.4vw, 24px)", fontWeight: 600, color: t.text, margin: "0 0 2px" }}>{stat.value}</p>
                          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(9px, 0.78vw, 13px)", color: t.textDim, margin: 0, letterSpacing: "0.3px" }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
            return project.link ? (
              <a key={i} href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex" }}>{card}</a>
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
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${t.bg}; transition: background 0.4s ease; }
        ::-webkit-scrollbar { display: none; }
        @keyframes fadeSection { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseLeft { 0%, 100% { opacity: 1; transform: translateY(0); } 50% { opacity: 0.5; transform: translateY(4px); } }
      `}</style>
      <div style={{ background: t.bg, minHeight: "100vh", color: t.text, position: "relative", transition: "background 0.4s ease, color 0.4s ease" }}>
        {!isMobile && <MouseBlob t={t} />}
        <Nav active={activeSection} onNavigate={setActiveSection} theme={theme} toggleTheme={toggleTheme} t={t} isMobile={isMobile} />
        <SocialBar t={t} theme={theme} isMobile={isMobile} />
        <main>
          <div key={`${activeSection}-${theme}`} style={{ animation: "fadeSection 0.45s cubic-bezier(0.33, 1, 0.68, 1)", position: "relative", zIndex: 2 }}>
            {activeSection === "timeline" && <TimelineSection t={t} isMobile={isMobile} />}
            {activeSection === "projects" && <ProjectsSection t={t} isMobile={isMobile} />}
            {activeSection === "contact" && <ContactSection t={t} isMobile={isMobile} theme={theme} />}
          </div>
        </main>
      </div>
    </>
  );
}