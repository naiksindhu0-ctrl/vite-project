import { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────── */
const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Contact"];

const DISHES = [
  { name: "Saffron Lobster Bisque", desc: "House-smoked cream, micro herbs, caviar pearls", tag: "Chef's Signature", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80" },
  { name: "Wagyu Tenderloin A5", desc: "Truffle jus, pomme purée, seasonal greens", tag: "Most Loved", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80" },
  { name: "Black Truffle Risotto", desc: "Aged parmesan, wild mushrooms, gold leaf", tag: "Vegetarian", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80" },
  { name: "Miso Glazed Sea Bass", desc: "Dashi broth, pickled radish, yuzu foam", tag: "Seasonal", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80" },
];

const USPS = [
  { icon: "🌿", title: "Farm-to-Table Ingredients", desc: "Every ingredient is sourced fresh daily from certified organic farms and local artisan producers." },
  { icon: "🏆", title: "Award-Winning Chefs", desc: "Our team holds 3 Michelin stars and has been recognized by the World's 50 Best Restaurants." },
  { icon: "✨", title: "Unmatched Ambience", desc: "Every corner of crunch cafe is designed to transport you — from the lighting to the table linens." },
  { icon: "🍷", title: "Curated Wine Cellar", desc: "Over 800 labels selected by our resident sommelier from the finest vineyards worldwide." },
];

const TESTIMONIALS = [
  { name: "Priya Mehta", role: "Food Critic, Condé Nast", quote: "crunch cafe doesn't just serve food — it orchestrates an entire sensory performance. A transcendent evening every single time.", stars: 5 },
  { name: "James Whitfield", role: "CEO, Whitfield Group", quote: "We've hosted board dinners at crunch cafe for three years. The consistency of excellence is simply unmatched anywhere in the city.", stars: 5 },
  { name: "Aisha Kapoor", role: "Travel Blogger", quote: "If I could only eat at one restaurant for the rest of my life, it would be Aurum. Bold claim — absolutely meant.", stars: 5 },
];

const SERVICES = [
  { icon: "🍽️", title: "Fine Dining Experience", desc: "An intimate à la carte journey through seasonal tasting menus, crafted fresh each evening by Chef Laurent and his brigade." },
  { icon: "🥂", title: "Private Events & Dining", desc: "Exclusive private rooms for up to 40 guests. Perfect for anniversaries, proposals, corporate celebrations, and bespoke occasions." },
  { icon: "🚐", title: "Luxury Catering", desc: "Bring the crunch cafe experience to your venue. Our catering team delivers the same Michelin-starred quality, wherever you are." },
  { icon: "📅", title: "Online Reservations", desc: "Secure your table instantly via our seamless booking system. Personalise your visit with dietary notes and special requests." },
];

const PORTFOLIO_ITEMS = [
  { category: "Food", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", title: "Wagyu Elegance" },
  { category: "Interior", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80", title: "The Main Hall" },
  { category: "Food", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", title: "Dessert Architecture" },
  { category: "Events", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80", title: "Private Gala Evening" },
  { category: "Interior", img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80", title: "Wine Cellar" },
  { category: "Food", img: "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=600&q=80", title: "Garden Harvest" },
  { category: "Events", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80", title: "Corporate Dinner" },
  { category: "Interior", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", title: "The Lounge Bar" },
  { category: "Food", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80", title: "Seasonal Plating" },


  { category: "Food", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=781&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&q=80", title: "corn pizza" },
  { category: "Food", img: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&q=80", title: "burger" },
  { category: "Interior", img: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&q=80", title: "Party table Evening" },
  { category: "Interior", img: "https://plus.unsplash.com/premium_photo-1680351370944-c938d9fc4dad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGludGVyaW9yc3xlbnwwfHwwfHx8MA%3D%3D?w=600&q=80", title: "balcony" },
  { category: "Food", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&q=80", title: "straberry cake" },
  { category: "Interior", img: "https://images.unsplash.com/photo-1615875474908-f403116f5287?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW50ZXJpb3JzfGVufDB8fDB8fHww", title: "party hall" },
  { category: "Interior", img: "https://media.istockphoto.com/id/154953122/photo/modern-villa-living-room.webp?a=1&b=1&s=612x612&w=0&k=20&c=TaVBb1ZfyL0TsKHD67dtvFdnKA06nk-5b1-FDgTOEMA=?w=600&q=80", title: "The main hall" },
  { category: "Food", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&q=80", title: "chicken tikka" },
  { category:  "events",img:"https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&q=80", title: "party hall" },
  { category:  "events",img:"https://images.unsplash.com/photo-1561912774-79769a0a0a7a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&q=80", title: "candle light dinner Hall" },
  { category:  "events",img:"https://images.unsplash.com/photo-1665672051874-a1d1541b452c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&q=80", title: "dinner Hall" },
  { category:  "events",img:"https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW50ZXJpb3JzfGVufDB8fDB8fHww?w=600&q=80", title: "The Main Hall" },
];

const TIMELINE = [
  { year: "2008", title: "The Beginning", desc: "Chef Laurent Moreau opens crunch cafe as a 30-seat bistro in South Mumbai with a single vision: honest luxury." },
  { year: "2012", title: "First Michelin Star", desc: "Four years of relentless refinement earns crunch cafe its first Michelin star — the first in Maharashtra." },
  { year: "2017", title: "The Grand Expansion", desc: "A full renovation transforms crunch cafe into a 120-seat temple of fine dining, with a private event wing." },
  { year: "2022", title: "Third Star Awarded", desc: "crunch cafe joins a rarefied group of three-star establishments in Asia, cementing its global reputation." },
];

/* ─── HELPERS ───────────────────────────────────────── */
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]" />
    </div>
  );
}

function SectionLabel({ label }) {
  return (
    <p className="text-[#C9A84C] text-[0.65rem] tracking-[0.3em] uppercase font-medium font-sans mb-2">
      {label}
    </p>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────── */
function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
  className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
    scrolled
      ? "py-3 bg-gradient-to-r from-[#b76e79] via-[#e6a8a1] to-[#b76e79] backdrop-blur-xl border-b border-[#e6c5c3]/30 shadow-xl"
      : "py-5 bg-gradient-to-r from-[#b76e79] via-[#d9989b] to-[#b76e79] border-b border-[#e6c5c3]/20"
  }`}
>
  {/* GLITTER OVERLAY */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.05),transparent_40%)]"></div>

  {/* LOGO */}
  <button
    onClick={() => setActivePage("Home")}
    className="relative font-serif text-xl font-bold text-[#FDE2E4] tracking-widest"
  >
    Crunch Cafe☕
    <span className="italic font-light text-[#FFD7D9]">.</span>
  </button>

  {/* DESKTOP LINKS */}
  <ul className="hidden md:flex items-center gap-8 relative">
    {NAV_LINKS.map((p) => (
      <li key={p}>
        <button
          onClick={() => setActivePage(p)}
          className={`text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-300 ${
            activePage === p
              ? "text-[#fff5f5]"
              : "text-[#F3D1D4] hover:text-[#fff5f5]"
          }`}
        >
          {p}
        </button>
      </li>
    ))}
  </ul>

  {/* BOOK BUTTON */}
  <button
    onClick={() => setActivePage("Contact")}
    className="hidden md:block text-[0.65rem] tracking-[0.18em] uppercase border border-[#FFD1D4] text-[#FDE2E4] px-5 py-2 hover:bg-[#FFD1D4] hover:text-[#b76e79] transition-all duration-300 font-medium rounded relative"
  >
    Book a Table
  </button>

  {/* MOBILE MENU BUTTON */}
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="md:hidden text-[#FDE2E4] text-2xl relative"
  >
    {menuOpen ? "✕" : "☰"}
  </button>

  {/* MOBILE MENU */}
  {menuOpen && (
    <div className="absolute top-full left-0 right-0 bg-gradient-to-r from-[#b76e79] via-[#e6a8a1] to-[#b76e79] backdrop-blur-xl border-t border-[#e6c5c3]/30 py-6 flex flex-col items-center gap-5">

      {NAV_LINKS.map((p) => (
        <button
          key={p}
          onClick={() => {
            setActivePage(p);
            setMenuOpen(false);
          }}
          className={`text-[0.7rem] tracking-[0.2em] uppercase transition-colors ${
            activePage === p
              ? "text-[#fff5f5]"
              : "text-[#F3D1D4]"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => {
          setActivePage("Contact");
          setMenuOpen(false);
        }}
        className="mt-2 text-[0.65rem] tracking-[0.18em] uppercase border border-[#FFD1D4] text-[#FDE2E4] px-6 py-2 hover:bg-[#FFD1D4] hover:text-[#b76e79] transition-all duration-300 rounded"
      >
        Book a Table
      </button>
    </div>
  )}
</nav>
  );
}

/* ─── HOME PAGE ──────────────────────────────────────── */
function Home({ setActivePage }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeDish, setActiveDish] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#F5EBDD]">
      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden 
  bg-[#F5EBDD] dark:bg-[#3E2723]">

  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1078&auto=format&fit=crop"
      alt="Fine dining"
      className="w-full h-full object-cover opacity-20 dark:opacity-40"
      loading="lazy"
    />

    {/* Cafe Style Overlay */}
    <div className="absolute inset-0 
      bg-gradient-to-b 
      from-[#F5EBDD]/90 via-[#F5EBDD]/60 to-[#E6D3B3]
      dark:from-[#3E2723]/80 dark:via-transparent dark:to-[#2A1B17]" />
  </div>

  <div className="relative text-center px-6 max-w-4xl mx-auto">
    
    <SectionLabel label="Established 2008 · Mumbai" />

    {/* DARKER HEADING */}
    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold 
      text-[#2B1B12] dark:text-[#F5EDD6] leading-[1.1] mb-6">
      Where Taste<br />
      <em className="text-[#6B3E26] dark:text-[#D4A373] font-normal">
        Meets Luxury
      </em>
    </h1>

    /* DARKER PARAGRAPH */
    <p className="font-light text-[#3B2A20] dark:text-[#D6BFA7] text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      A culinary experience beyond expectations — three Michelin stars, one unforgettable evening.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">

      <button
        onClick={() => setActivePage("Contact")}
        className="px-8 py-4 
        bg-[#6B3E26] text-white 
        dark:bg-[#D4A373] dark:text-[#2A1B17]
        text-[0.7rem] tracking-[0.2em] uppercase font-medium 
        hover:bg-[#4E2E1F] dark:hover:bg-[#E6B98C] transition-all duration-300">
        Reserve a Table
      </button>

      <button
        onClick={() => setActivePage("Services")}
        className="px-8 py-4 
        border border-[#6B3E26] text-[#6B3E26] 
        dark:border-[#D4A373]/50 dark:text-[#D4A373]
        text-[0.7rem] tracking-[0.2em] uppercase font-medium 
        hover:bg-[#EAD7C0] dark:hover:bg-[#D4A373]/10 
        transition-all duration-300">
        View Menu
      </button>

    </div>
  </div>

  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
    <div className="w-px h-10 bg-gradient-to-b from-[#6B3E26] dark:from-[#D4A373] to-transparent" />
    <p className="text-[#6B3E26] dark:text-[#D4A373] text-[0.6rem] tracking-[0.3em] uppercase">
      Scroll
    </p>
  </div>

</section>
      /* ── FEATURED DISHES ── */
      <section className="py-28 px-6 max-w-7xl mx-auto bg-[#F7E1D7]">
  <div className="text-center mb-16">
    <SectionLabel label="Our Creations" />

    <h2 className="font-serif text-4xl md:text-5xl text-[#4A2C2A] mb-4 tracking-wide">
      Featured Dishes
    </h2>

    <GoldDivider />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {DISHES.map((dish, i) => (
      <div
        key={i}
        onClick={() => setActiveDish(i)}
        className="group relative overflow-hidden cursor-pointer 
        border border-[#E6B8A2] hover:border-[#C0846A] 
        transition-all duration-500 
        bg-[#FFF5F0] shadow-sm hover:shadow-xl rounded-lg"
      >
        <div className="overflow-hidden h-72">
          <img
            src={dish.img}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Rose Gold Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#6E3B3B]/70 via-transparent to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="text-[0.6rem] tracking-[0.2em] uppercase 
            bg-[#C0846A] text-white px-3 py-1 font-medium rounded">
            {dish.tag}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-serif text-lg text-[#FFF1EB] mb-1 tracking-wide">
            {dish.name}
          </h3>

          <p className="text-[#F3D5C8] text-sm font-light">
            {dish.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>
/* ── WHY CHOOSE US ── */
<section className="py-24 bg-[#F7E1D7] border-y border-[#E6B8A2]">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <SectionLabel label="The Aurum Promise" />

      <h2 className="font-serif text-4xl md:text-5xl text-[#4A2C2A] mb-4 tracking-wide">
        Why Choose Us
      </h2>

      <GoldDivider />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {USPS.map((u, i) => (
        <div
          key={i}
          className="group text-center p-8 
          border border-[#E6B8A2] 
          hover:border-[#C0846A] 
          hover:bg-[#FFF5F0] 
          transition-all duration-500 
          rounded-lg shadow-sm hover:shadow-lg"
        >
          <div className="text-4xl mb-5">{u.icon}</div>

          <h3 className="font-serif text-lg text-[#5A2E2E] mb-3 tracking-wide">
            {u.title}
          </h3>

          <p className="text-[#6E4A3A] text-sm leading-relaxed font-light">
            {u.desc}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>
  
      <section className="py-28 max-w-7xl mx-auto px-6 bg-[#F7E1D7]">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

    /* IMAGE */
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=85"
        alt="Chef Laurent"
        className="w-full h-[600px] object-cover rounded-lg shadow-lg"
        loading="lazy"
      />
      <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[#C0846A]/40 rounded-lg" />
      <div className="absolute -top-6 -left-6 w-32 h-32 border border-[#E6B8A2]/30 rounded-lg" />
    </div>

    /* CONTENT */
    <div>
      <SectionLabel label="Meet the Maestro" />

      <h2 className="font-serif text-4xl md:text-5xl text-[#4A2C2A] leading-tight mb-2 tracking-wide">
        Chef Laurent<br />
        <em className="text-[#C0846A] not-italic font-normal">Moreau</em>
      </h2>

      <GoldDivider />

      <p
        className="text-[#5A3A2E] leading-relaxed mb-6 font-light"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.15rem",
        }}
      >
        With over 18 years of mastery across Paris, Tokyo, and New York, Chef Laurent brings a philosophy that food is emotion — plated. His menus are seasonal, instinctive, and deeply personal.
      </p>

      <p
        className="text-[#6E4A3A] leading-relaxed mb-10 italic"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.2rem",
        }}
      >
        "Cooking is not a profession — it is a conversation between the earth and the soul. Every dish I create is a sentence in that story."
      </p>

      <div className="flex gap-10">
        {[["18+", "Years of Mastery"], ["3", "Michelin Stars"], ["12", "Global Awards"]].map(([num, label]) => (
          <div key={label} className="text-center">
            <p className="font-serif text-3xl text-[#C0846A]">{num}</p>
            <p className="text-[#6E4A3A] text-xs tracking-[0.2em] uppercase mt-1">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>
    
      <section className="py-24 bg-[#F7E1D7] border-y border-[#E6B8A2]">
  <div className="max-w-3xl mx-auto px-6 text-center">

    <SectionLabel label="Guest Voices" />

    <h2 className="font-serif text-4xl text-[#4A2C2A] mb-4 tracking-wide">
      What They Say
    </h2>

    <GoldDivider />

    <div className="mt-12 min-h-[180px] transition-all duration-500">

      <p
        className="text-[#5A3A2E] text-xl md:text-2xl font-light leading-relaxed mb-8 italic"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        "{TESTIMONIALS[activeTestimonial].quote}"
      </p>

      <div className="text-[#C0846A] text-lg mb-3">
        {"★".repeat(TESTIMONIALS[activeTestimonial].stars)}
      </div>

      <p className="text-[#4A2C2A] font-medium text-sm tracking-wide">
        {TESTIMONIALS[activeTestimonial].name}
      </p>

      <p className="text-[#6E4A3A] text-xs tracking-widest uppercase mt-1">
        {TESTIMONIALS[activeTestimonial].role}
      </p>

    </div>

    <div className="flex justify-center gap-2 mt-10">
      {TESTIMONIALS.map((_, i) => (
        <button
          key={i}
          onClick={() => setActiveTestimonial(i)}
          className={`h-[2px] transition-all duration-300 ${
            i === activeTestimonial
              ? "bg-[#C0846A] w-10"
              : "bg-[#E6B8A2] w-6"
          }`}
        />
      ))}
    </div>

  </div>
</section>
      /* ── GALLERY PREVIEW ---─ */
      <section className="py-28 max-w-7xl mx-auto px-6 bg-[#F7E1D7]">
  <div className="text-center mb-16">
    <SectionLabel label="The crunch cafe World" />

    <h2 className="font-serif text-4xl md:text-5xl text-[#4A2C2A] mb-4 tracking-wide">
      Gallery Preview
    </h2>

    <GoldDivider />
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {PORTFOLIO_ITEMS.slice(0, 6).map((item, i) => (
      <div key={i} className="group relative overflow-hidden aspect-square rounded-lg shadow-sm hover:shadow-lg transition-all duration-500">
        
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Rose Gold Overlay */}
        <div className="absolute inset-0 bg-[#C0846A]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="font-serif text-white text-sm tracking-wide">
            {item.title}
          </p>
        </div>

      </div>
    ))}
  </div>

  <div className="text-center mt-10">
    <button
      onClick={() => setActivePage("Portfolio")}
      className="text-[0.65rem] tracking-[0.25em] uppercase 
      border border-[#C0846A] text-[#C0846A] 
      px-8 py-3 
      hover:bg-[#C0846A] hover:text-white 
      transition-all duration-300 rounded">
      View Full Portfolio
    </button>
  </div>
</section>
    </div>
  );
}

/* ─── ABOUT PAGE ─────────────────────────────────────── */
function About() {
  return (
    <div className="bg-gradient-to-b from-[#FDE2E4] via-[#FFD7D9] to-[#FADBD8] pt-28">
      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel label="Our Story" />
          <h2 className="font-serif text-5xl md:text-6xl text-[#5A2E2B] leading-tight mb-6">
            Born from<br />
            <em className="text-[#C9A84C]">Passion.</em><br />
            Refined by Time.
          </h2>
          <GoldDivider />
          <div
            className="space-y-5 mt-8"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
          >
            <p className="text-[#7A4C4B] leading-relaxed">
              Aurum was never meant to be just a restaurant. When Chef Laurent Moreau arrived in Mumbai in 2008 with nothing but two suitcases and an obsession with honest flavour, he found a city hungry for something different — something that honoured tradition while embracing the bold.
            </p>
            <p className="text-[#7A4C4B] leading-relaxed">
              What began as a 30-seat bistro in Colaba has grown into one of Asia's most celebrated dining destinations. Three Michelin stars, countless memories, and an unwavering commitment to the idea that dining is theatre — and every guest deserves a front-row seat.
            </p>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=85"
            alt="Aurum interior"
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
          <div className="absolute -bottom-5 -left-5 bg-[#C9A84C] p-6 rounded-lg shadow-md">
            <p className="font-serif text-4xl text-[#FDE2E4] font-bold">2008</p>
            <p className="text-[#FDE2E4] text-xs tracking-widest uppercase mt-1">Est. Mumbai</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-[#FBE8E7] border-y border-[#C9A84C]/20 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel label="Our Journey" />
            <h2 className="font-serif text-4xl text-[#5A2E2B]">Milestones</h2>
            <GoldDivider />
          </div>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#C9A84C]/30" />
            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-8 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div
                    className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} pl-16 md:pl-0`}
                  >
                    <span className="font-serif text-[#C9A84C] text-2xl block mb-2">{item.year}</span>
                    <h3 className="font-serif text-xl text-[#5A2E2B] mb-2">{item.title}</h3>
                    <p className="text-[#7A4C4B] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="relative flex-shrink-0 hidden md:block">
                    <div className="w-3 h-3 rounded-full bg-[#C9A84C] ring-4 ring-[#C9A84C]/20" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
/* ───────── AWARDS ───────── */
<section className="py-24 max-w-7xl mx-auto px-6 bg-[#F7E1D7]">

  <div className="text-center mb-16">
    <SectionLabel label="Recognition" />

    <h2 className="font-serif text-4xl text-[#4A2C2A]">
      Awards & Acclaim
    </h2>

    <GoldDivider />
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      ["⭐⭐⭐", "Michelin Stars", "2022–Present"],
      ["🥇", "Asia's Best Restaurant", "World's 50 Best, 2023"],
      ["🍷", "Best Wine Programme", "James Beard, 2021"],
      ["🏛️", "Luxury Dining Award", "Condé Nast, 2024"],
    ].map(([icon, award, org]) => (
      <div
        key={award}
        className="text-center p-8 border border-[#E6B8A2] hover:border-[#C0846A] 
        bg-[#FFF5F0] rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="text-3xl mb-4">{icon}</div>

        <p className="font-serif text-[#5A2E2E] text-sm mb-1">
          {award}
        </p>

        <p className="text-[#6E4A3A] text-xs tracking-widest">
          {org}
        </p>
      </div>
    ))}
  </div>

</section>


/* ───────── AMBIENCE ───────── */
<section className="pb-28 max-w-7xl mx-auto px-6 bg-[#F7E1D7]">

  <div className="grid grid-cols-3 gap-3 h-[400px] md:h-[500px] rounded-lg overflow-hidden">

    <img
      src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=85"
      alt="Ambience 1"
      className="col-span-2 w-full h-full object-cover"
      loading="lazy"
    />

    <div className="flex flex-col gap-3">
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=85"
        alt="Ambience 2"
        className="w-full h-1/2 object-cover"
        loading="lazy"
      />
      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=85"
        alt="Ambience 3"
        className="w-full h-1/2 object-cover"
        loading="lazy"
      />
    </div>

  </div>

</section>
    </div>
  );
}

/* ─── SERVICES PAGE ──────────────────────────────────── */
function Services({ setActivePage }) {
  return (
    <div className="bg-[#0D0B08] pt-28">
      /* ───────── SERVICES HEADER ───────── */
<section className="max-w-3xl mx-auto px-6 py-20 text-center bg-[#F7E1D7]">

  <SectionLabel label="What We Offer" />

  <h2 className="font-serif text-5xl md:text-6xl text-[#4A2C2A] leading-tight mb-4 tracking-wide">
    Our <em className="text-[#C0846A] not-italic">Services</em>
  </h2>

  <GoldDivider />

  <p
    className="text-[#5A3A2E] mt-6 leading-relaxed"
    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
  >
    Every service at crunch cafe is curated with the same exacting standard — an obsessive attention to detail that transforms any occasion into an extraordinary memory.
  </p>

</section>


/* ───────── SERVICES CARDS ───────── */
<section className="max-w-7xl mx-auto px-6 pb-28 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#F7E1D7]">

  {SERVICES.map((s, i) => (
    <div
      key={i}
      className="group relative p-10 
      border border-[#E6B8A2] 
      hover:border-[#C0846A] 
      bg-[#FFF5F0] 
      hover:bg-[#FDEAE4] 
      transition-all duration-500 
      overflow-hidden rounded-lg shadow-sm hover:shadow-lg"
    >

      {/* Top line animation */}
      <div className="absolute top-0 left-0 w-full h-0.5 
        bg-gradient-to-r from-transparent via-[#C0846A] to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
      />

      <div className="text-5xl mb-6">{s.icon}</div>

      <h3 className="font-serif text-2xl text-[#4A2C2A] mb-3 group-hover:text-[#C0846A] transition-colors duration-300">
        {s.title}
      </h3>

      <p className="text-[#6E4A3A] leading-relaxed font-light">
        {s.desc}
      </p>

      <button
        onClick={() => setActivePage("Contact")}
        className="mt-8 text-[0.6rem] tracking-[0.2em] uppercase 
        text-[#C0846A] border-b border-[#C0846A]/40 pb-0.5 
        hover:border-[#C0846A] transition-all duration-300"
      >
        Enquire Now →
      </button>

    </div>
  ))}

</section>


/* ───────── PRIVATE DINING PROMO ───────── */
<section className="relative h-80 flex items-center justify-center overflow-hidden">

  <img
    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1800&q=80"
    alt="Private dining"
    className="absolute inset-0 w-full h-full object-cover opacity-30"
    loading="lazy"
  />

  {/* Rose Gold Overlay */}
  <div className="absolute inset-0 bg-[#C0846A]/60" />

  <div className="relative text-center px-6">

    <p className="font-serif text-3xl md:text-4xl text-white mb-4 italic">
      Planning something special?
    </p>

    <button
      onClick={() => setActivePage("Contact")}
      className="px-8 py-4 
      bg-white text-[#C0846A] 
      text-[0.7rem] tracking-[0.2em] uppercase font-medium 
      hover:bg-[#FFF5F0] 
      transition-all duration-300 rounded"
    >
      Talk to Our Events Team
    </button>

  </div>

</section>
    </div>
  );
}

/* ─── PORTFOLIO PAGE ─────────────────────────────────── */
function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const FILTERS = ["All", "Food", "Interior", "Events"];
  const filtered = filter === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(i => i.category === filter);

  return (
    <div className="bg-[#0D0B08] pt-28">
      /* ───────── SERVICES HEADER ───────── */
<section className="max-w-3xl mx-auto px-6 py-20 text-center bg-[#F7E1D7]">

  <SectionLabel label="What We Offer" />

  <h2 className="font-serif text-5xl md:text-6xl text-[#4A2C2A] leading-tight mb-4 tracking-wide">
    Our <em className="text-[#C0846A] not-italic">Services</em>
  </h2>

  <GoldDivider />

  <p
    className="text-[#5A3A2E] mt-6 leading-relaxed"
    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
  >
    Every service at crunch cafe is curated with the same exacting standard — an obsessive attention to detail that transforms any occasion into an extraordinary memory.
  </p>

</section>


/* ───────── SERVICES CARDS ───────── */
<section className="max-w-7xl mx-auto px-6 pb-28 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#F7E1D7]">

  {SERVICES.map((s, i) => (
    <div
      key={i}
      className="group relative p-10 
      border border-[#E6B8A2] 
      hover:border-[#C0846A] 
      bg-[#FFF5F0] 
      hover:bg-[#FDEAE4] 
      transition-all duration-500 
      overflow-hidden rounded-lg shadow-sm hover:shadow-lg"
    >

      {/* Top line animation */}
      <div className="absolute top-0 left-0 w-full h-0.5 
        bg-gradient-to-r from-transparent via-[#C0846A] to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
      />

      <div className="text-5xl mb-6">{s.icon}</div>

      <h3 className="font-serif text-2xl text-[#4A2C2A] mb-3 group-hover:text-[#C0846A] transition-colors duration-300">
        {s.title}
      </h3>

      <p className="text-[#6E4A3A] leading-relaxed font-light">
        {s.desc}
      </p>

      <button
        onClick={() => setActivePage("Contact")}
        className="mt-8 text-[0.6rem] tracking-[0.2em] uppercase 
        text-[#C0846A] border-b border-[#C0846A]/40 pb-0.5 
        hover:border-[#C0846A] transition-all duration-300"
      >
        Enquire Now →
      </button>

    </div>
  ))}

</section>


/* ───────── PRIVATE DINING PROMO ───────── */
<section className="relative h-80 flex items-center justify-center overflow-hidden">

  <img
    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1800&q=80"
    alt="Private dining"
    className="absolute inset-0 w-full h-full object-cover opacity-30"
    loading="lazy"
  />

  {/* Rose Gold Overlay */}
  <div className="absolute inset-0 bg-[#C0846A]/60" />

  <div className="relative text-center px-6">

    <p className="font-serif text-3xl md:text-4xl text-white mb-4 italic">
      Planning something special?
    </p>

    <button
      onClick={() => setActivePage("Contact")}
      className="px-8 py-4 
      bg-white text-[#C0846A] 
      text-[0.7rem] tracking-[0.2em] uppercase font-medium 
      hover:bg-[#FFF5F0] 
      transition-all duration-300 rounded"
    >
      Talk to Our Events Team
    </button>

  </div>

</section>

      {/* Filters */}
      <div className="flex justify-center gap-6 mb-12 px-6 flex-wrap">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-[0.65rem] tracking-[0.2em] uppercase pb-1 border-b transition-all duration-300 ${filter === f ? "border-[#C9A84C] text-[#C9A84C]" : "border-transparent text-[#A89878] hover:text-[#F5EDD6]"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Masonry-style grid */}
      <div className="max-w-7xl mx-auto px-6 pb-28">
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div key={`${filter}-${i}`} onClick={() => setLightbox(item)}
              className="group relative break-inside-avoid overflow-hidden cursor-zoom-in">
              <img src={item.img} alt={item.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-[#0D0B08]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#C9A84C]">{item.category}</span>
                <p className="font-serif text-[#F5EDD6] text-base">{item.title}</p>
                <p className="text-[#A89878] text-xl">⊕</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-[#0D0B08]/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-8 text-[#C9A84C] text-2xl hover:text-white transition-colors">✕</button>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="w-full max-h-[80vh] object-contain" />
            <div className="mt-4 text-center">
              <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#C9A84C]">{lightbox.category}</span>
              <p className="font-serif text-xl text-[#F5EDD6] mt-1">{lightbox.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── CONTACT PAGE ───────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", phone: "", date: "", message: "" });
  };

  const inputClass = "w-full bg-transparent border-b border-[#C9A84C]/20 focus:border-[#C9A84C] outline-none py-3 text-[#F2EBD9] text-sm placeholder-[#A89878]/50 transition-colors duration-300 font-light";

  return (
    <div className="bg-[#0D0B08] pt-28">
      <section className="max-w-3xl mx-auto px-6 py-20 text-center bg-gradient-to-br from-[#F3D5CC] via-[#E6B8AF] to-[#D89C8C] rounded-xl shadow-xl">

  {/* LABEL */}
  <SectionLabel label="Get In Touch" />

  {/* HEADING */}
  <h2 className="font-serif text-5xl md:text-6xl text-[#4A2C2A] mb-4">
    Make a <em className="text-[#A14F5C]">Reservation</em>
  </h2>

  {/* DIVIDER */}
  <GoldDivider />

  {/* DESCRIPTION */}
  <p className="mt-6 text-[#5D4037] text-sm md:text-base leading-relaxed max-w-xl mx-auto">
    Experience fine dining with a touch of elegance. Reserve your table and enjoy a luxurious atmosphere, 
    curated menu, and unforgettable moments.
  </p>

  {/* BUTTON */}
  <button className="mt-8 px-8 py-3 bg-[#A14F5C] text-white text-sm tracking-widest uppercase rounded hover:bg-[#7A3540] transition-all duration-300 shadow-md">
    Book Now
  </button>

  {/* FORM */}
  <div className="bg-[#FFF5F0] border border-[#E6B8A2] p-10 rounded-lg shadow-sm">
    
    <h3 className="font-serif text-2xl text-[#4A2C2A] mb-8 tracking-wide">
      Reserve Your Table
    </h3>

    {sent && (
      <div className="mb-6 p-4 border border-[#C0846A]/40 bg-[#FDEAE4] text-[#C0846A] text-sm tracking-wide rounded">
        ✓ Your reservation request has been received. We'll confirm within 24 hours.
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A] block mb-2">
            Full Name
          </label>
          <input type="text" required placeholder="Priya Mehta"
            className="w-full border-b border-[#E6B8A2] bg-transparent py-2 text-[#4A2C2A] focus:outline-none focus:border-[#C0846A]"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A] block mb-2">
            Email
          </label>
          <input type="email" required placeholder="hello@example.com"
            className="w-full border-b border-[#E6B8A2] bg-transparent py-2 text-[#4A2C2A] focus:outline-none focus:border-[#C0846A]"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A] block mb-2">
            Phone
          </label>
          <input type="tel" placeholder="+91 98765 43210"
            className="w-full border-b border-[#E6B8A2] bg-transparent py-2 text-[#4A2C2A] focus:outline-none focus:border-[#C0846A]"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A] block mb-2">
            Preferred Date
          </label>
          <input type="date"
            className="w-full border-b border-[#E6B8A2] bg-transparent py-2 text-[#4A2C2A] focus:outline-none focus:border-[#C0846A]"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A] block mb-2">
          Special Requests
        </label>
        <textarea rows={4}
          placeholder="Dietary requirements, occasion details..."
          className="w-full border-b border-[#E6B8A2] bg-transparent py-2 text-[#4A2C2A] focus:outline-none focus:border-[#C0846A] resize-none"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-[#C0846A] text-white 
        text-[0.7rem] tracking-[0.25em] uppercase font-medium 
        hover:bg-[#A86A55] transition-all duration-300 rounded"
      >
        Confirm Reservation
      </button>

    </form>
  </div>


  {/* INFO SIDE */}
  <div className="space-y-10">

    {/* MAP */}
    <div className="relative overflow-hidden h-56 bg-[#FDEAE4] border border-[#E6B8A2] flex items-center justify-center rounded-lg">
      <div className="text-center">
        <p className="text-[#C0846A] text-3xl mb-2">📍</p>
        <p className="font-serif text-[#4A2C2A]">crunch cafe Fine Dining</p>
        <p className="text-[#6E4A3A] text-sm mt-1">12, Napean Sea Road, Malabar Hill</p>
        <p className="text-[#6E4A3A] text-sm">Mumbai, Maharashtra 400 006</p>

        <a href="https://maps.google.com" target="_blank" rel="noreferrer"
          className="inline-block mt-4 text-[0.6rem] tracking-[0.2em] uppercase 
          text-[#C0846A] border-b border-[#C0846A]/40 hover:border-[#C0846A] transition-all duration-300">
          Open in Maps →
        </a>
      </div>
    </div>

    {/* HOURS */}
    <div className="p-8 border border-[#E6B8A2] bg-[#FFF5F0] rounded-lg shadow-sm">
      <h3 className="font-serif text-xl text-[#5A2E2E] mb-6">Opening Hours</h3>

      {[["Monday – Friday", "12:00 PM – 11:00 PM"], ["Saturday", "11:00 AM – 11:30 PM"], ["Sunday", "11:00 AM – 10:00 PM"]].map(([day, time]) => (
        <div key={day} className="flex justify-between py-3 border-b border-[#E6B8A2] last:border-0">
          <span className="text-[#6E4A3A] text-sm">{day}</span>
          <span className="text-[#4A2C2A] text-sm font-light">{time}</span>
        </div>
      ))}
    </div>

    {/* CONTACT */}
    <div className="space-y-5">
      {[["📞", "Reservations", "+91 22 4001 9999"], ["✉️", "Email", "reserve@crunch cafe.in"], ["📸", "Instagram", "@aurum.mumbai"]].map(([icon, label, val]) => (
        <div key={label} className="flex items-center gap-4">
          <div className="w-10 h-10 border border-[#E6B8A2] flex items-center justify-center text-sm flex-shrink-0 rounded">
            {icon}
          </div>
          <div>
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A]">
              {label}
            </p>
            <p className="text-[#4A2C2A] text-sm mt-0.5">
              {val}
            </p>
          </div>
        </div>
      ))}
    </div>

  </div>

</section>
    </div>
  );
}

/* ─── FOOTER ─────────────────────────────────────────── */
function Footer({ setActivePage }) {
  return (
    <footer className="bg-[#D6A79B] border-t border-[#C48F84] py-16 px-6">
  <div className="max-w-7xl mx-auto">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

      {/* BRAND */}
      <div>
        <p className="font-serif text-2xl font-bold text-[#A14F5C] tracking-widest mb-4">
          crunch cafe<span className="italic font-light text-[#2F1B18]">.</span>
        </p>

        <p className="text-[#4E342E] text-sm leading-relaxed font-light max-w-xs"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Three Michelin stars. One unforgettable evening. Mumbai's temple of fine dining since 2008.
        </p>
      </div>

      {/* NAVIGATION */}
      <div>
        <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#A14F5C] mb-5">
          Navigation
        </p>

        <ul className="space-y-3">
          {NAV_LINKS.map(p => (
            <li key={p}>
              <button
                onClick={() => setActivePage(p)}
                className="text-[#4E342E] text-sm hover:text-[#2F1B18] transition-colors">
                {p}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* CONTACT */}
      <div>
        <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#A14F5C] mb-5">
          Contact
        </p>

        <div className="space-y-2 text-[#4E342E] text-sm font-light">
          <p>12, Napean Sea Road, Malabar Hill</p>
          <p>Mumbai, Maharashtra 400 006</p>

          <p className="mt-4">+91 22 4001 9999</p>
          <p>reserve@crunch cafe.in</p>
        </div>
      </div>

    </div>

    {/* BOTTOM */}
    <div className="border-t border-[#C48F84] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

      <p className="text-[#4E342E] text-xs tracking-widest">
        © 2025 crunch cafe Fine Dining. All rights reserved.
      </p>

      <p className="text-[#4E342E] text-xs tracking-widest">
        Crafted with passion in Mumbai
      </p>

    </div>

  </div>
</footer>
  );
}

/* ─── APP ROOT ───────────────────────────────────────── */
export default function App() {
  const [activePage, setActivePage] = useState("Home");

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PAGE = { Home, About, Services, Portfolio, Contact };
  const PageComponent = PAGE[activePage];

  return (
    <div className="min-h-screen bg-[#0D0B08]">
      <Navbar activePage={activePage} setActivePage={navigate} />
      <main>
        <PageComponent setActivePage={navigate} />
      </main>
      <Footer setActivePage={navigate} />
    </div>
  );
}