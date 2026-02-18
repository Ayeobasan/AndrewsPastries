"use client"

import { useState, useEffect, useRef } from "react";
import {
  Star, Clock, MapPin, Heart, Sparkles, Users, DollarSign,
  Coffee, Sun, ChevronRight, Navigation, MessageCircle,
  Cookie, Cake, Leaf, Award, ThumbsUp, Sunrise, ShoppingBag,
} from "lucide-react";

// ─── Intersection observer hook ────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Fade-up animation wrapper ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Star rating ───────────────────────────────────────────────────────────
function StarRating({ count = 5, size = 16, color = "#f59e0b" }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < count ? color : "none"} stroke={color} strokeWidth={1.5} />
      ))}
    </span>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────
const PASTRIES = [
  {
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
    name: "Classic Glazed Donut",
    tag: "Fan Favorite",
    tagColor: "bg-sky-100 text-sky-600",
    desc: "Cloud-soft dough dipped in a shimmering glaze that shatters gently at first bite. Pulled fresh every single morning.",
  },
  {
    img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80",
    name: "Long John – Chocolate Iced",
    tag: "Marion Classic",
    tagColor: "bg-amber-100 text-amber-700",
    desc: "A generously long, pillowy bar crowned with rich, glossy chocolate icing. Simple. Perfect. Iconic.",
  },
  {
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80",
    name: "Cream, Jelly & Custard Filled",
    tag: "Perfectly Filled",
    tagColor: "bg-pink-100 text-pink-600",
    desc: "Plump donuts bursting with silky cream, bright jelly, or velvety custard. Every bite is a little surprise.",
  },
  {
    img: "https://images.unsplash.com/photo-1568051243858-533a607809a5?w=600&q=80",
    name: "Apple Fritter",
    tag: "Crispy & Warm",
    tagColor: "bg-emerald-100 text-emerald-700",
    desc: "Chunky apple pieces tucked into hand-twisted dough, fried golden, and drizzled with sweet glaze. Pure comfort.",
  },
  {
    img: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=600&q=80",
    name: "Mini Cheesecake",
    tag: "Made From Scratch",
    tagColor: "bg-violet-100 text-violet-600",
    desc: "Perfectly portioned, impossibly creamy. A buttery crust, a cloud-like filling — our guests can't stop at one.",
  },
  {
    img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80",
    name: "Carrot Cake Muffin",
    tag: "Bakery Fresh",
    tagColor: "bg-orange-100 text-orange-600",
    desc: "Warmly spiced, tenderly crumbed, and generously sized. A morning treat that feels like a hug.",
  },
  {
    img: "https://images.unsplash.com/photo-1615655406736-b37887a35264?w=600&q=80",
    name: "Cannoli",
    tag: "Handcrafted",
    tagColor: "bg-teal-100 text-teal-700",
    desc: "A crisp shell filled with sweet, smooth ricotta cream. Handcrafted the old-fashioned way — because shortcuts show.",
  },
];

const BENEFITS = [
  { Icon: Sparkles, color: "text-sky-500", bg: "bg-sky-50", title: "Made From Scratch", body: "No shortcuts, no mixes. Every pastry starts from real ingredients mixed and shaped right here in our kitchen." },
  { Icon: Sun, color: "text-amber-500", bg: "bg-amber-50", title: "Fresh Donuts Daily", body: "We bake every morning so what you grab at 6 AM is as fresh as it gets. Never day-old, never frozen." },
  { Icon: Heart, color: "text-pink-500", bg: "bg-pink-50", title: "Generously Filled", body: "Our filled donuts are packed — not just barely kissed. You'll taste the filling in every single bite." },
  { Icon: Users, color: "text-teal-500", bg: "bg-teal-50", title: "Genuinely Kind Staff", body: "Our team knows regulars by name. Come in once and you'll feel like you've been coming for years." },
  { Icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50", title: "Priced for Everyone", body: "Great pastries shouldn't be a special occasion. Everything on our menu is $1–$10, because this bakery is for the whole town." },
  { Icon: Clock, color: "text-violet-500", bg: "bg-violet-50", title: "Open at 6 AM", body: "Whether heading to work or starting your morning slow, we're here with fresh trays ready at 6." },
];

const REVIEWS = [
  { name: "Sarah M.", quote: "The freshest donuts I've ever had — and I've been to a lot of bakeries. Andrew's is the real thing.", location: "Marion, OH", initial: "S", grad: "from-sky-400 to-teal-400" },
  { name: "David R.", quote: "The mini cheesecakes are absolutely perfect. Dense, creamy, not overly sweet. I bring a half-dozen every Friday.", location: "Marion, OH", initial: "D", grad: "from-violet-400 to-pink-400" },
  { name: "Tasha W.", quote: "The staff genuinely makes you feel welcome the moment you walk in. It's that rare place that still feels like community.", location: "Marion, OH", initial: "T", grad: "from-teal-400 to-emerald-400" },
  { name: "Greg & Linda", quote: "Made from scratch means something here. You can taste the difference. Their apple fritters alone are worth the trip.", location: "Marion, OH", initial: "G", grad: "from-amber-400 to-orange-400" },
  { name: "Jamie P.", quote: "So many incredible choices — we can never pick just one. Every visit ends with us saying 'we should've gotten more.'", location: "Marion, OH", initial: "J", grad: "from-pink-400 to-rose-400" },
];

const VISIT_INFO = [
  { Icon: MapPin, label: "Address", value: "1282 Delaware Ave\nMarion, OH" },
  { Icon: Clock, label: "Opens Daily", value: "6:00 AM" },
  { Icon: DollarSign, label: "Pricing", value: "$1 – $10\nAffordable for all" },
  { Icon: ShoppingBag, label: "Options", value: "Dine-in & Takeaway" },
];

// ─── Main Component ────────────────────────────────────────────────────────
export default function AndrewsPastries() {
  const [activeCard, setActiveCard] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Inject Google Fonts without @import (avoids Turbopack resolver issues)
  useEffect(() => {
    if (document.getElementById("ap-fonts")) return;
    const pc1 = Object.assign(document.createElement("link"), { rel: "preconnect", href: "https://fonts.googleapis.com" });
    const pc2 = Object.assign(document.createElement("link"), { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" });
    const lk = Object.assign(document.createElement("link"), {
      id: "ap-fonts", rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@300;400;600;700;800&display=swap",
    });
    [pc1, pc2, lk].forEach(el => document.head.appendChild(el));
  }, []);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-amber-50 overflow-x-hidden" style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>

      {/* Keyframe animations */}
      <style>{`
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        .float-1 { animation: float 3.6s ease-in-out infinite; }
        .float-2 { animation: float 4.3s ease-in-out 0.8s infinite; }
        .float-3 { animation: float 3.9s ease-in-out 1.5s infinite; }
        .float-4 { animation: float 4.8s ease-in-out 0.4s infinite; }
        .anim-1  { animation: fadeDown 0.85s ease both; }
        .anim-2  { animation: fadeDown 0.85s ease 0.15s both; }
        .anim-3  { animation: fadeDown 0.85s ease 0.30s both; }
        .anim-4  { animation: fadeDown 0.85s ease 0.45s both; }
        .display { font-family: 'Playfair Display', Georgia, serif; }
        .card-lift { transition: all 0.28s ease; }
        .card-lift:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.10); }
      `}</style>

      {/* ── NAV ───────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${navScrolled || mobileMenuOpen ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-sky-100" : "bg-transparent"}`}>

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 md:px-8 py-4">
          <span className="display text-xl font-bold italic text-slate-800">Andrew's Pastries</span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {[["Favorites", "favorites"], ["Reviews", "reviews"], ["Visit Us", "visit-us"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-slate-500 hover:text-sky-500 font-semibold text-sm transition-colors duration-200">
                {label}
              </button>
            ))}
            <button onClick={() => scrollTo("visit-us")}
              className="flex items-center gap-1.5 bg-gradient-to-r from-sky-400 to-teal-400 text-white text-sm font-bold px-5 py-2 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              <MapPin size={14} /> Find Us
            </button>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-sky-50 transition-colors"
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col px-6 pb-6 gap-0 border-t border-sky-100">
            {[["Favorites", "favorites"], ["Reviews", "reviews"], ["Visit Us", "visit-us"]].map(([label, id]) => (
              <button key={id}
                onClick={() => { scrollTo(id); setMobileMenuOpen(false); }}
                className="text-left text-slate-600 hover:text-sky-500 font-semibold text-base py-3.5 border-b border-slate-100 last:border-0 transition-colors duration-200">
                {label}
              </button>
            ))}
            <button
              onClick={() => { scrollTo("visit-us"); setMobileMenuOpen(false); }}
              className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold px-6 py-3.5 rounded-full shadow-md active:scale-95 transition-all duration-200">
              <MapPin size={15} /> Find Us
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(155deg, #e0f2fe 0%, #fffbf0 45%, #fce7f3 100%)" }}
      >
        {/* Background blobs */}
        <div className="absolute top-20 right-16 w-72 h-72 rounded-full bg-sky-200/20 pointer-events-none" />
        <div className="absolute bottom-24 left-10 w-56 h-56 rounded-full bg-pink-200/20 pointer-events-none" />
        <div className="absolute top-1/3 right-6 w-40 h-40 rounded-full bg-teal-200/15 pointer-events-none" />

        {/* Floating icon cards */}
        <div className="float-1 absolute top-[18%] left-[7%] p-4 bg-white/70 rounded-2xl shadow-lg backdrop-blur-sm pointer-events-none">
          <Cookie size={36} className="text-sky-400" />
        </div>
        <div className="float-2 absolute top-[26%] right-[9%] p-4 bg-white/70 rounded-2xl shadow-lg backdrop-blur-sm pointer-events-none">
          <Cake size={30} className="text-pink-400" />
        </div>
        <div className="float-3 absolute bottom-[22%] left-[11%] p-3.5 bg-white/70 rounded-2xl shadow-lg backdrop-blur-sm pointer-events-none">
          <Sparkles size={28} className="text-teal-500" />
        </div>
        <div className="float-4 absolute bottom-[20%] right-[8%] p-3.5 bg-white/70 rounded-2xl shadow-lg backdrop-blur-sm pointer-events-none">
          <Coffee size={28} className="text-amber-500" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl text-center">
          <p className="anim-1 display flex items-center justify-center gap-2 text-xs font-bold tracking-[3px] uppercase text-teal-500 mb-5">
            <Sunrise size={14} /> Marion, Ohio's Favorite Bakery
          </p>

          <h1 className="anim-2 display text-slate-800 leading-[1.05] mb-7 font-black"
            style={{ fontSize: "clamp(48px,7.5vw,90px)" }}>
            Baked Fresh<br />
            <span className="italic text-sky-500">Every Single Morning.</span>
          </h1>

          <p className="anim-3 text-slate-500 leading-relaxed max-w-lg mx-auto mb-10 font-light"
            style={{ fontSize: "clamp(17px,2.2vw,21px)" }}>
            Made-from-scratch donuts, cheesecakes, and pastries —{" "}
            served warm with the kind of friendliness that keeps Marion coming back.
          </p>

          <div className="anim-3 flex flex-wrap gap-4 justify-center mb-14">
            <button onClick={() => scrollTo("favorites")}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
              <Cookie size={18} /> See Today's Favorites
            </button>
            <button onClick={() => scrollTo("visit-us")}
              className="flex items-center gap-2 bg-white text-sky-500 border-2 border-sky-400 font-bold px-7 py-3.5 rounded-full hover:bg-sky-500 hover:text-white transition-all duration-200">
              <Clock size={16} /> Stop By at 6 AM
            </button>
          </div>

          {/* Trust strip */}
          <div className="anim-4 inline-flex flex-wrap justify-center items-center bg-white rounded-full px-6 py-3 shadow-xl">
            <div className="flex items-center gap-2.5 px-5 border-r border-sky-100">
              <StarRating count={5} size={16} />
              <span className="font-bold text-slate-800 text-base">4.8</span>
              <span className="text-slate-400 text-sm">Stars</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 border-r border-sky-100">
              <MessageCircle size={18} className="text-sky-400" />
              <span className="font-bold text-slate-800 text-base">400+</span>
              <span className="text-slate-400 text-sm">Reviews</span>
            </div>
            <div className="flex items-center gap-2.5 px-5">
              <Sun size={18} className="text-amber-400" />
              <span className="font-bold text-slate-800 text-base">Open</span>
              <span className="text-slate-400 text-sm">from 6 AM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden -mt-1" style={{ background: "#fffbf0" }}>
        <svg viewBox="0 0 1440 60" className="block w-full" style={{ background: "#e0f2fe" }}>
          <path d="M0,60 C360,0 1080,80 1440,20 L1440,0 L0,0 Z" fill="#fffbf0" />
        </svg>
      </div>

      {/* ── WHY MARION LOVES ──────────────────────────────────────── */}
      <section className="bg-sky-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="text-xs font-bold tracking-[3px] uppercase text-teal-500 mb-3">Why Locals Keep Coming Back</p>
              <h2 className="display font-black text-slate-800 leading-tight" style={{ fontSize: "clamp(30px,5vw,52px)" }}>
                What Makes Andrew's<br />
                <span className="italic text-sky-500">Special</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(({ Icon, color, bg, title, body }, i) => (
              <FadeUp key={title} delay={i * 80}>
                <div className="card-lift bg-white rounded-2xl p-8 shadow-sm border border-sky-50 h-full">
                  <div className={`inline-flex p-3.5 rounded-xl ${bg} mb-5`}>
                    <Icon size={24} className={color} />
                  </div>
                  <h3 className="display font-bold text-slate-800 text-lg mb-3">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="overflow-hidden -mt-1 bg-amber-50">
        <svg viewBox="0 0 1440 60" className="block w-full" style={{ background: "#e0f2fe" }}>
          <path d="M0,0 C360,70 1080,-20 1440,40 L1440,60 L0,60 Z" fill="#fffbf0" />
        </svg>
      </div>

      {/* ── SIGNATURE FAVORITES ───────────────────────────────────── */}
      <section id="favorites" className="bg-amber-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="text-xs font-bold tracking-[3px] uppercase text-pink-400 mb-3">The Display Case</p>
              <h2 className="display font-black text-slate-800 leading-tight" style={{ fontSize: "clamp(30px,5vw,52px)" }}>
                Our Signature<span className="italic text-sky-500"> Favorites</span>
              </h2>
              <p className="text-slate-500 mt-4 max-w-md mx-auto text-base font-light">
                Handcrafted daily. Loaded with flavor. These are the treats Marion drives across town for.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PASTRIES.map(({ img, name, tag, tagColor, desc }, i) => (
              <FadeUp key={name} delay={i * 60}>
                <div
                  onClick={() => setActiveCard(activeCard === i ? null : i)}
                  className={`card-lift cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-300 h-full flex flex-col bg-white
                    ${activeCard === i
                      ? "border-sky-400 shadow-2xl"
                      : "border-transparent shadow-md hover:border-sky-200 hover:shadow-xl"}`}
                >
                  {/* Photo */}
                  <div className="relative overflow-hidden" style={{ height: 200 }}>
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={e => { e.target.style.display = "none"; e.target.parentNode.classList.add("bg-sky-50"); }}
                    />
                    {/* Tag pill overlaid on photo */}
                    <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm ${tagColor}`}>
                      {tag}
                    </span>
                    {/* Subtle gradient scrim at bottom for text legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/30 to-transparent" />
                  </div>

                  {/* Text content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="display font-bold text-slate-800 text-base leading-snug mb-2">{name}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed flex-1">{desc}</p>
                    {/* Active indicator */}
                    {activeCard === i && (
                      <div className="mt-4 flex items-center gap-1.5 text-sky-500 text-xs font-bold">
                        <Heart size={13} className="fill-sky-400 text-sky-400" /> A crowd favorite
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="text-center mt-14">
              <p className="text-slate-400 text-sm mb-5">All pastries $1–$10 · Menu changes daily · Made fresh every morning</p>
              <button onClick={() => scrollTo("visit-us")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                Visit Us to See Today's Full Selection <ChevronRight size={18} />
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────── */}
      <section id="reviews" className="relative py-24 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e3040 0%, #0f2230 100%)" }}>

        {/* Blobs */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none" style={{ background: "rgba(56,189,248,0.06)" }} />
        <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(252,231,243,0.05)" }} />

        {/* Floating accent icons */}
        <div className="float-1 absolute top-10 right-10 opacity-10 pointer-events-none">
          <Cookie size={80} className="text-sky-300" />
        </div>
        <div className="float-3 absolute bottom-10 left-8 opacity-10 pointer-events-none">
          <Star size={60} className="text-amber-300" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="text-xs font-bold tracking-[3px] uppercase text-sky-400 mb-4">Real Words from Real Neighbors</p>
              <h2 className="display font-black text-white leading-tight mb-5" style={{ fontSize: "clamp(28px,4.5vw,48px)" }}>
                Marion Has Spoken.<br />
                <span className="italic text-sky-300">4.8 Stars · 400+ Reviews.</span>
              </h2>
              {/* Big rating */}
              <div className="inline-flex items-center gap-5 backdrop-blur-sm rounded-full px-8 py-4 mb-4 border border-white/10"
                style={{ background: "rgba(255,255,255,0.07)" }}>
                <span className="display text-5xl font-black text-white">4.8</span>
                <div className="text-left">
                  <StarRating count={5} size={20} />
                  <p className="text-sky-300 text-xs mt-1 font-medium">400+ verified reviews</p>
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map(({ name, quote, location, initial, grad }, i) => (
              <FadeUp key={name} delay={i * 80}>
                <div className="card-lift backdrop-blur-sm border border-white/10 rounded-2xl p-7 h-full"
                  style={{ background: "rgba(255,255,255,0.06)" }}>
                  <StarRating count={5} size={14} />
                  <p className="text-sky-100/80 text-sm leading-relaxed italic mt-4 mb-5 font-light">"{quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                      {initial}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{name}</p>
                      <p className="text-sky-400 text-xs">{location}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── MORNING EXPERIENCE ────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "linear-gradient(160deg,#fce7f3 0%,#fffbf0 50%,#e0f2fe 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="text-xs font-bold tracking-[3px] uppercase text-teal-500 mb-4">The 6 AM Ritual</p>
            <h2 className="display font-black text-slate-800 leading-tight mb-8" style={{ fontSize: "clamp(30px,5vw,54px)" }}>
              There's Nothing Quite Like<br />
              <span className="italic text-sky-500">a Fresh-Baked Morning.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={120}>
            <div className="relative bg-white rounded-3xl p-10 md:p-14 shadow-xl text-left overflow-hidden border border-sky-50">
              {/* Decorative bg icon */}
              <div className="absolute -top-6 -right-6 opacity-[0.04] pointer-events-none">
                <Cookie size={160} className="text-sky-500" />
              </div>

              {[
                <>The doors unlock at <strong className="text-sky-500">6 AM sharp</strong>. The first thing you notice is the smell — warm, sweet, and unmistakably real. Not a candle, not a diffuser. Just fresh glazed donuts coming off the line.</>,
                <>The display case glows. Glazed donuts. Long Johns with their ribbon of chocolate icing. Plump filled donuts packed with cream and custard. Apple fritters glistening at the edges. Mini cheesecakes lined up perfectly. Cannoli resting in rows, crisp and waiting.</>,
                <>Then one of our team members looks up, smiles like they've been waiting just for you, and says good morning. And somehow, the day already feels a little better.</>,
                <><em>That's</em> what we mean when we say <strong className="text-teal-500">made with heart.</strong></>,
              ].map((text, i) => (
                <p key={i} className={`text-slate-600 leading-relaxed font-light ${i > 0 ? "mt-5" : ""}`}
                  style={{ fontSize: "clamp(15px,1.9vw,18px)" }}>
                  {text}
                </p>
              ))}

              {/* Icon badges */}
              <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-slate-100">
                {[
                  { Icon: Sunrise, label: "Opens 6 AM", color: "text-amber-500", bg: "bg-amber-50" },
                  { Icon: Cookie, label: "Fresh Daily", color: "text-sky-500", bg: "bg-sky-50" },
                  { Icon: Heart, label: "Made with Care", color: "text-pink-500", bg: "bg-pink-50" },
                  { Icon: Users, label: "Friendly Team", color: "text-teal-500", bg: "bg-teal-50" },
                ].map(({ Icon, label, color, bg }) => (
                  <div key={label} className={`flex items-center gap-2 ${bg} px-4 py-2 rounded-full`}>
                    <Icon size={15} className={color} />
                    <span className={`text-xs font-bold ${color}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── VISIT / CTA ───────────────────────────────────────────── */}
      <section id="visit-us" className="relative py-24 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#38bdf8 0%,#2dd4bf 100%)" }}>

        {/* Blobs */}
        <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.08)" }} />
        <div className="absolute -bottom-16 -right-8 w-72 h-72 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Floating accent icons */}
        <div className="float-2 absolute top-[12%] right-[6%] opacity-15 pointer-events-none">
          <Cookie size={90} className="text-white" />
        </div>
        <div className="float-4 absolute bottom-[12%] left-[4%] opacity-10 pointer-events-none">
          <Sparkles size={70} className="text-white" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeUp>
            <div className="flex items-center justify-center gap-2 text-white/70 text-xs font-bold tracking-[3px] uppercase mb-5">
              <MapPin size={13} /> Come See Us
            </div>
            <h2 className="display font-black text-white leading-tight mb-5" style={{ fontSize: "clamp(32px,5.5vw,60px)" }}>
              Make Andrew's Your<br />
              <span className="italic">Morning Stop.</span>
            </h2>
            <p className="text-white/85 text-lg leading-relaxed max-w-xl mx-auto mb-12 font-light">
              Everything is made from scratch, priced for everyone, and ready the moment we open. Your perfect morning is just a drive away.
            </p>
          </FadeUp>

          {/* Info cards */}
          <FadeUp delay={100}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {VISIT_INFO.map(({ Icon, label, value }) => (
                <div key={label} className="backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                  style={{ background: "rgba(255,255,255,0.12)" }}>
                  <div className="flex justify-center mb-3">
                    <Icon size={26} className="text-white" />
                  </div>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-white font-bold text-sm leading-snug whitespace-pre-line">{value}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={180}>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => window.open("https://maps.google.com/?q=1282+Delaware+Ave,+Marion,+OH", "_blank")}
                className="flex items-center gap-2 bg-white text-sky-500 font-extrabold text-base px-9 py-4 rounded-full shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-200">
                <Navigation size={18} /> Get Directions
              </button>
              <button className="flex items-center gap-2 border-2 border-white/60 text-white font-bold px-8 py-4 rounded-full hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.12)" }}>
                <ThumbsUp size={16} /> Leave a Review
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 px-6 pt-12 pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="display text-2xl italic font-bold text-white mb-2">Andrew's Pastries</p>
          <p className="text-slate-400 text-sm mb-8">1282 Delaware Ave, Marion, OH &nbsp;·&nbsp; Open from 6 AM</p>

          <div className="flex justify-center gap-5 mb-8">
            {[Cookie, Cake, Heart, Leaf, Award, Coffee, Sparkles].map((Icon, i) => (
              <Icon key={i} size={20} className="text-slate-600" />
            ))}
          </div>

          <p className="text-slate-600 text-xs flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Andrew's Pastries · Made with
            <Heart size={11} className="text-pink-500 fill-pink-500 mx-0.5" />
            in Marion, Ohio
          </p>
        </div>
      </footer>
    </div>
  );
}