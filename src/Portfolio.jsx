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
    desc: "Delivered 450+ posts across multiple platforms, helping grow audiences by 150K+ followers. Built operational workflows in Notion for sprints, task management, and content approvals, and created automations across Slack, Notion, Telegram, and Jira that significantly reduced manual reporting by 80%.",
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
    logo: "/logos/southernlabs.jpg",
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
  { title: "Surgence Labs", sub: "Marketing Agency", color: "#3b82f6", link: "https://x.com/surgence_io", logo: "/logos/surgence.jpg" },
  { title: "Shards", sub: "Marketing & Ops", color: "#f59e0b", link: "https://x.com/shardsofficial", logo: "/logos/shards.jpg" },
  { title: "Southern Labs", sub: "Community Platform", color: "#10b981", link: "https://www.instagram.com/southernlabsxyz", logo: "/logos/southernlabs.jpg" },
  { title: "Extsy", sub: "DeFi Platform", color: "#06b6d4", link: "https://x.com/extsyplatform", logo: "/logos/extsy.jpg" },
  { title: "Mey Real", sub: "Real Estate Tokenization", color: "#a855f7", link: "https://x.com/meyreal_io", logo: "/logos/meyreal.jpg" },
  { title: "Mey Network", sub: "Layer 1 Blockchain", color: "#ec4899", link: "https://x.com/mey_network", logo: "/logos/meynetwork.jpg" },
  { title: "Verse8", sub: "Gaming Platform", color: "#f43f5e", link: "https://x.com/verse_eight", logo: "/logos/verse8.jpg" },
  { title: "RewardsHQ", sub: "Rewards Platform", color: "#eab308", link: "https://x.com/RewardsHQ", logo: "/logos/rewardshq.jpg" },
  { title: "Aura", sub: "Tech Platform", color: "#14b8a6", link: "https://aura.tech/", logo: "/logos/aura.jpg" },
  { title: "Dininho Adventures", sub: "Web3 Game", color: "#8b5cf6", link: "https://x.com/DininhoNFT", logo: "/logos/dininho.jpg" },
  { title: "South Locker", sub: "Clothing Brand", color: "#f97316", link: "https://www.instagram.com/southlocker", logo: "/logos/southlocker.jpg" },
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
          <a key={s.title} href={s.link} target="_blank" rel="noopener noreferrer" title={s.title} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", background: hovered === i ? t.accentGlow : t.cardBg, border: `1px solid ${hovered === i ? t.accent + "40" : t.border}`, transition: "all 0.25s ease", transform: hovered === i ? "translateY(-3px)" : "none" }}>
            <img src={s.icon} alt={s.title} style={{ width: "18px", height: "18px", opacity: hovered === i ? 1 : 0.5, transition: "opacity 0.25s ease", filter: theme === "dark" ? "brightness(0) invert(1)" : "brightness(0)" }} />
          </a>
        ))}
      </div>
      <a href="https://www.flaticon.com/authors/freepik" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", color: t.textDim, textDecoration: "none", opacity: 0.4, letterSpacing: "0.3px" }}>
        Icons by Freepik — Flaticon
      </a>
    </div>
  );
}

function Nav({ active, onNavigate, theme, toggleTheme, t, isMobile }) {
  const tabs = ["Timeline", "Projects", "Contact"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "12px 16px" : "16px 32px", background: `linear-gradient(to bottom, ${t.gradientTop} 50%, transparent)`, backdropFilter: "blur(12px)" }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: isMobile ? "15px" : "18px", fontWeight: 500, color: t.text, letterSpacing: "-0.3px", minWidth: isMobile ? "auto" : "180px" }}>
        Basti De Luna
      </div>
      <div style={{ display: "flex", gap: "2px", background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: "40px", padding: "3px" }}>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => onNavigate(tab.toLowerCase())} style={{ padding: isMobile ? "7px 12px" : "8px 22px", borderRadius: "36px", border: "none", cursor: "pointer", fontSize: isMobile ? "11px" : "12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "0.3px", transition: "all 0.35s cubic-bezier(0.33, 1, 0.68, 1)", background: active === tab.toLowerCase() ? t.accent : "transparent", color: active === tab.toLowerCase() ? "#ffffff" : t.textMuted }}>
            {tab}
          </button>
        ))}
      </div>
      <div style={{ minWidth: isMobile ? "auto" : "180px", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={toggleTheme} style={{ width: isMobile ? "34px" : "40px", height: isMobile ? "34px" : "40px", borderRadius: "50%", border: `1px solid ${t.border}`, background: t.cardBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: t.textMuted, transition: "all 0.3s ease" }} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </div>
    </nav>
  );
}

// Mobile Timeline: vertical scrolling cards
function TimelineMobile({ t }) {
  return (
    <div style={{ minHeight: "100vh", padding: "80px 16px 100px" }}>
      {/* Hero */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "20px" }}>
          <img src="/me.png" alt="Basti De Luna" style={{ width: "80px", height: "80px", borderRadius: "14px", objectFit: "cover", flexShrink: 0, border: `1px solid ${t.border}` }} />
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
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: t.textDim, margin: 0, letterSpacing: "0.5px" }}>{label}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: t.textMuted, margin: "16px 0 0", lineHeight: 1.75 }}>
          I've spent 3+ years helping teams grow through content, community, and operations, working across early NFT communities, marketing agencies, and emerging protocols. Always building something on the side.
        </p>
      </div>

      {/* Timeline cards */}
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
    <div style={{ height: "100vh", display: "flex", position: "relative", overflow: "hidden" }}>
      <div style={{ width: "42%", flexShrink: 0, display: "flex", alignItems: "center", padding: "0 clamp(12px, 2vw, 36px) 0 clamp(20px, 3vw, 56px)", position: "relative", zIndex: 3, overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "clamp(10px, 1.2vw, 20px)", alignItems: "flex-start", width: "100%", minWidth: 0 }}>
          <img src="/me.webp" alt="Basti De Luna" style={{ width: "clamp(100px, 13vw, 210px)", height: "clamp(100px, 13vw, 210px)", borderRadius: "16px", objectFit: "cover", flexShrink: 0, border: `1px solid ${t.border}` }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 600, color: t.text, margin: "0 0 8px", lineHeight: 1.05, letterSpacing: "-1.2px" }}>
              Basti De Luna
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: t.accent, margin: "0 0 10px", fontWeight: 500, letterSpacing: "-0.2px" }}>
              Marketing, Operations & Tech
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: t.textMuted, margin: "0 0 14px", lineHeight: 1.6 }}>
              Building brands from the ground up.
            </p>
            <div style={{ display: "flex", gap: "20px", marginBottom: "16px" }}>
              <div>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(20px, 2.2vw, 32px)", fontWeight: 600, color: t.text, margin: 0 }}>3+</p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: t.textDim, margin: 0, letterSpacing: "0.5px" }}>Years</p>
              </div>
              <div style={{ width: "1px", background: t.border }} />
              <div>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(20px, 2.2vw, 32px)", fontWeight: 600, color: t.text, margin: 0 }}>10+</p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: t.textDim, margin: 0, letterSpacing: "0.5px" }}>Brands</p>
              </div>
              <div style={{ width: "1px", background: t.border }} />
              <div>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(20px, 2.2vw, 32px)", fontWeight: 600, color: t.text, margin: 0 }}>50M+</p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: t.textDim, margin: 0, letterSpacing: "0.5px" }}>Impressions</p>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: t.textMuted, margin: 0, lineHeight: 1.75 }}>
              I've spent 3+ years helping teams grow through content, community, and operations, working across early NFT communities, marketing agencies, and emerging protocols. Always building something on the side..
            </p>
          </div>
        </div>
      </div>
      <div style={{ width: "60px", flexShrink: 0, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "100px 0 60px" }}>
        <div style={{ position: "absolute", left: "50%", top: "100px", bottom: "60px", width: "1.5px", background: t.border, transform: "translateX(-50%)" }}>
          <div style={{ width: "100%", height: `${progress}%`, background: `linear-gradient(to bottom, ${t.accent}, ${t.accentDim})`, transition: "height 0.6s cubic-bezier(0.33, 1, 0.68, 1)", borderRadius: "1px", boxShadow: `0 0 16px ${t.accentGlowStrong}` }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
          {TIMELINE_DATA.map((item, i) => (
            <div key={i} onClick={() => { setActiveIndex(i); scrollTo(i); }} style={{ cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: i === activeIndex ? "12px" : "6px", height: i === activeIndex ? "12px" : "6px", borderRadius: "50%", background: i <= activeIndex ? t.accent : t.textDim, transition: "all 0.4s cubic-bezier(0.33, 1, 0.68, 1)", boxShadow: i === activeIndex ? `0 0 20px ${t.accentGlowStrong}, 0 0 40px ${t.accentGlow}` : "none", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
      <div ref={containerRef} style={{ flex: 1, overflowY: "auto", scrollSnapType: "y mandatory", scrollbarWidth: "none", position: "relative" }}>
        <div style={{ position: "fixed", top: 0, right: 0, width: "calc(58% - 60px)", height: "100vh", background: `radial-gradient(ellipse at 80% 50%, ${activeItem.glowColor}, transparent 60%)`, pointerEvents: "none", zIndex: 0, transition: "background 0.8s ease" }} />
        {activeItem.logo && (
          <div style={{ position: "fixed", top: "50%", right: "2%", transform: "translateY(-50%)", width: "120px", height: "120px", borderRadius: "20px", overflow: "hidden", opacity: 0.25, pointerEvents: "none", zIndex: 0, transition: "opacity 0.6s ease" }}>
            <img src={activeItem.logo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        {TIMELINE_DATA.map((item, i) => (
          <div key={i} style={{ height: "100vh", display: "flex", alignItems: "center", padding: "0 clamp(24px, 4vw, 60px)", scrollSnapAlign: "start", position: "relative", zIndex: 1 }}>
            <div style={{ opacity: i === activeIndex ? 1 : 0.12, transform: `translateY(${i === activeIndex ? 0 : 24}px)`, transition: "all 0.6s cubic-bezier(0.33, 1, 0.68, 1)", maxWidth: "500px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "5px 10px", borderRadius: "4px", background: t.accentGlow, border: `1px solid ${t.accent}30`, color: t.accent, fontSize: "10px", fontFamily: "'DM Mono', monospace", fontWeight: 500, letterSpacing: "1.5px", marginBottom: "16px", lineHeight: 1 }}>
                {item.tag}
              </div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: t.silver, margin: "0 0 12px" }}>{item.date}</p>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, color: t.text, margin: "0 0 6px", lineHeight: 1.1, letterSpacing: "-0.8px", textDecoration: "none", display: "inline-flex", alignItems: "baseline", gap: "8px" }}>
                  {item.title}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="2" style={{ flexShrink: 0, position: "relative", top: "2px" }}>
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              ) : (
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, color: t.text, margin: "0 0 6px", lineHeight: 1.1, letterSpacing: "-0.8px" }}>
                  {item.title}
                </h2>
              )}
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: t.accent, margin: "0 0 16px", fontWeight: 500 }}>{item.subtitle}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: t.textMuted, margin: 0, lineHeight: 1.75, maxWidth: "440px" }}>{item.desc}</p>
              {item.products.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "18px" }}>
                  {item.products.map((p) => (
                    <span key={p} style={{ padding: "5px 12px", borderRadius: "6px", fontSize: "11px", fontFamily: "'DM Mono', monospace", background: t.cardBg, border: `1px solid ${t.border}`, color: t.textSecondary, letterSpacing: "0.3px" }}>{p}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: "28px", left: "calc(42% + 60px + clamp(24px, 4vw, 60px))", display: "flex", alignItems: "center", gap: "8px", opacity: activeIndex === 0 ? 0.8 : 0.2, transition: "opacity 0.4s ease", animation: "pulseLeft 2s ease-in-out infinite", zIndex: 10 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: t.textMuted, letterSpacing: "0.5px" }}>Scroll to explore</span>
      </div>
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

  const ContactList = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {CONTACTS.map((c, i) => (
        <a key={c.platform} href={c.link} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredContact(i)} onMouseLeave={() => setHoveredContact(null)} style={{ padding: "14px 18px", borderRadius: "10px", background: hoveredContact === i ? t.accentGlow : t.cardBg, border: `1px solid ${hoveredContact === i ? t.accent + "30" : t.border}`, display: "flex", alignItems: "center", gap: "14px", textDecoration: "none", transition: "all 0.3s ease", transform: hoveredContact === i ? "translateX(4px)" : "none" }}>
          <span style={{ fontSize: "16px", width: "24px", textAlign: "center", color: hoveredContact === i ? t.accent : t.textDim }}>{c.icon}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: t.text, margin: 0, fontWeight: 500 }}>{c.platform}</p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: t.textMuted, margin: 0 }}>{c.value}</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hoveredContact === i ? t.accent : t.textDim} strokeWidth="2" style={{ transition: "all 0.3s ease", transform: hoveredContact === i ? "translateX(2px)" : "none" }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ minHeight: "100vh", padding: "80px 16px 100px" }}>
        {/* Card stack - smaller on mobile */}
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
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `linear-gradient(145deg, ${card.color}20, ${t.surface})` }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: card.color, opacity: 0.3, marginBottom: "8px" }} />
                      <p style={{ fontFamily: "'Fraunces', serif", fontSize: "12px", fontWeight: 500, color: t.text, margin: 0, textAlign: "center", padding: "0 12px" }}>{card.title}</p>
                    </div>
                  )}
                </div>
              );
              return card.link ? (
                <a key={i} href={card.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{cardEl}</a>
              ) : (
                <div key={i}>{cardEl}</div>
              );
            })}
          </div>
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", fontWeight: 500, color: t.text, margin: "0 0 4px", letterSpacing: "-0.6px", textAlign: "center" }}>
          Brands I've worked with.
        </h2>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: t.textDim, textAlign: "center", letterSpacing: "0.5px", marginBottom: "32px" }}>
          Basti De Luna — Portfolio
        </p>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: t.textDim, letterSpacing: "2px", marginBottom: "12px" }}>GET IN TOUCH</p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", fontWeight: 500, color: t.text, margin: "0 0 8px", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
          Let's work together.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: t.textMuted, lineHeight: 1.7, margin: "0 0 20px" }}>
          Marketing & ops professional with 3+ years experience. Currently studying CS and open to new opportunities.
        </p>
        <ContactList />
        {/* Social icons on mobile at bottom */}
        <div style={{ marginTop: "28px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {SOCIALS.map((s) => (
            <a key={s.title} href={s.link} target="_blank" rel="noopener noreferrer" title={s.title} style={{ width: "44px", height: "44px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", background: t.cardBg, border: `1px solid ${t.border}` }}>
              <img src={s.icon} alt={s.title} style={{ width: "18px", height: "18px", opacity: 0.7, filter: theme === "dark" ? "brightness(0) invert(1)" : "brightness(0)" }} />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", position: "relative" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 48px", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "relative", width: "220px", height: "460px" }}>
          {Array.from({ length: VISIBLE }).map((_, i) => {
            const stackPos = VISIBLE - 1 - i;
            const cardFloat = (offset + stackPos) % PORTFOLIO_CARDS.length;
            const cardIdx = Math.floor(cardFloat) % PORTFOLIO_CARDS.length;
            const card = PORTFOLIO_CARDS[cardIdx < 0 ? cardIdx + PORTFOLIO_CARDS.length : cardIdx];
            const frac = offset % 1;
            const pos = stackPos + (1 - frac);
            const yShift = pos * 28;
            const scale = 1.08 - pos * 0.05;
            const blur = Math.max(0, (pos - 1) * 3);
            const cardOpacity = pos > VISIBLE - 1.5 ? Math.max(0, (VISIBLE - pos) * 2) : pos < 0.3 ? Math.max(0, pos * 3.3) : 1;
            const cardEl = (
              <div style={{ position: "absolute", top: "50%", left: "50%", width: "200px", height: "200px", borderRadius: "20px", overflow: "hidden", background: card.logo ? "none" : `linear-gradient(145deg, ${card.color}20, ${t.surface})`, border: `1px solid ${card.logo ? "rgba(255,255,255,0.1)" : card.color + "30"}`, transform: `translate(-50%, -50%) translateY(${yShift}px) scale(${scale})`, opacity: cardOpacity, filter: blur > 0.1 ? `blur(${blur}px)` : "none", zIndex: VISIBLE - stackPos, willChange: "transform, opacity, filter", cursor: card.link ? "pointer" : "default" }}>
                {card.logo ? (
                  <img src={card.logo} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `linear-gradient(145deg, ${card.color}20, ${t.surface})` }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: card.color, opacity: 0.3, marginBottom: "10px" }} />
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: "14px", fontWeight: 500, color: t.text, margin: 0, textAlign: "center", padding: "0 16px" }}>{card.title}</p>
                  </div>
                )}
              </div>
            );
            return card.link ? (
              <a key={i} href={card.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{cardEl}</a>
            ) : (
              <div key={i}>{cardEl}</div>
            );
          })}
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 500, color: t.text, margin: "24px 0 8px", letterSpacing: "-0.8px", textAlign: "center" }}>
          Brands I've worked with.
        </h2>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: t.textDim, textAlign: "center", letterSpacing: "0.5px" }}>
          Basti De Luna — Portfolio
        </p>
      </div>
      <div style={{ width: "360px", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 32px", borderLeft: `1px solid ${t.border}` }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: t.textDim, letterSpacing: "2px", marginBottom: "20px" }}>GET IN TOUCH</p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "34px", fontWeight: 500, color: t.text, margin: "0 0 10px", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
          Let's work<br />together.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: t.textMuted, lineHeight: 1.7, margin: "0 0 36px" }}>
          Marketing & ops professional with 3+ years experience. Currently studying CS and open to new opportunities.
        </p>
        <ContactList />
      </div>
    </div>
  );
}

function ProjectsSection({ t, isMobile }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "80px 16px 100px" : "120px clamp(32px, 5vw, 60px) 80px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${t.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${t.gridColor} 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none", maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)" }} />
      <div style={{ maxWidth: "1060px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: isMobile ? "32px" : "56px" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: t.textDim, letterSpacing: "2px", marginBottom: "14px" }}>SELECTED WORK</p>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: isMobile ? "32px" : "clamp(34px, 4.5vw, 52px)", fontWeight: 500, color: t.text, margin: 0, lineHeight: 1.1, letterSpacing: "-1px" }}>
            <span style={{ color: t.textDim, fontStyle: "italic" }}>A few</span> more things.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
          {PROJECTS.map((project, i) => {
            const card = (
              <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ borderRadius: "14px", background: hovered === i ? `linear-gradient(150deg, ${project.color}08, ${t.cardBg})` : t.cardBg, border: `1px solid ${hovered === i ? project.color + "35" : t.border}`, cursor: project.link ? "pointer" : "default", transition: "all 0.4s cubic-bezier(0.33, 1, 0.68, 1)", transform: hovered === i ? "translateY(-3px)" : "none", display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}>
                {project.banner && (
                  <div style={{ width: "100%", aspectRatio: "3/1", overflow: "hidden", flexShrink: 0 }}>
                    <img src={project.banner} alt={project.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease", transform: hovered === i ? "scale(1.05)" : "scale(1)" }} />
                  </div>
                )}
                <div style={{ padding: "24px 26px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 500, color: t.text, margin: 0, flex: 1 }}>{project.name}</h3>
                    {project.link && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={hovered === i ? project.color : t.textDim} strokeWidth="2" style={{ transition: "all 0.3s ease", transform: hovered === i ? "translate(2px, -2px)" : "none", flexShrink: 0 }}>
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    )}
                  </div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: project.color, margin: "0 0 12px", letterSpacing: "0.3px", opacity: 0.8 }}>{project.position}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: t.textMuted, lineHeight: 1.65, margin: "0 0 16px" }}>{project.desc}</p>
                  {project.stats.length > 0 && (
                    <div style={{ marginTop: "auto", borderTop: `1px solid ${t.border}`, paddingTop: "14px", display: "grid", gridTemplateColumns: `repeat(${Math.min(project.stats.length, 4)}, 1fr)`, gap: "8px" }}>
                      {project.stats.map((stat) => (
                        <div key={stat.label}>
                          <p style={{ fontFamily: "'Fraunces', serif", fontSize: "16px", fontWeight: 600, color: t.text, margin: "0 0 2px" }}>{stat.value}</p>
                          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: t.textDim, margin: 0, letterSpacing: "0.3px" }}>{stat.label}</p>
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
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
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
        <div key={`${activeSection}-${theme}`} style={{ animation: "fadeSection 0.45s cubic-bezier(0.33, 1, 0.68, 1)", position: "relative", zIndex: 2 }}>
          {activeSection === "timeline" && <TimelineSection t={t} isMobile={isMobile} />}
          {activeSection === "projects" && <ProjectsSection t={t} isMobile={isMobile} />}
          {activeSection === "contact" && <ContactSection t={t} isMobile={isMobile} theme={theme} />}
        </div>
      </div>
    </>
  );
}