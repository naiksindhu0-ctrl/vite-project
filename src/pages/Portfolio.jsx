import { useState } from "react";
import GoldDivider from "../components/GoldDivider";
import SectionLabel from "../components/SectionLabel";
import { PORTFOLIO_ITEMS } from "../data/constants";

const FILTERS = ["All", "Food", "Interior", "Events"];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    filter === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="bg-[#F7E1D7] pt-28">

      {/* ── HEADER ── */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <SectionLabel label="Our Gallery" />
        <h2 className="font-serif text-5xl md:text-6xl text-[#4A2C2A] leading-tight mb-4 tracking-wide">
          Our <em className="text-[#C0846A] not-italic">Portfolio</em>
        </h2>
        <GoldDivider />
        <p className="text-[#5A3A2E] mt-6 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}>
          A visual journey through our food, interiors, and events — each image a memory of moments crafted with care.
        </p>
      </section>

      {/* ── FILTERS ── */}
      <div className="flex justify-center gap-6 mb-12 px-6 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[0.65rem] tracking-[0.2em] uppercase pb-1 border-b transition-all duration-300 ${
              filter === f
                ? "border-[#C9A84C] text-[#C9A84C]"
                : "border-transparent text-[#6E4A3A] hover:text-[#4A2C2A]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── MASONRY GRID ── */}
      <div className="max-w-7xl mx-auto px-6 pb-28">
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={`${filter}-${i}`}
              onClick={() => setLightbox(item)}
              className="group relative break-inside-avoid overflow-hidden cursor-zoom-in rounded-lg"
            >
              <img src={item.img} alt={item.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-[#0D0B08]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#C9A84C]">{item.category}</span>
                <p className="font-serif text-[#F5EDD6] text-base">{item.title}</p>
                <p className="text-[#A89878] text-xl">⊕</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-[#0D0B08]/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="w-full max-h-[80vh] object-contain rounded-lg" />
            <div className="text-center mt-4">
              <p className="font-serif text-[#F5EDD6] text-lg">{lightbox.title}</p>
              <p className="text-[#A89878] text-xs tracking-widest uppercase mt-1">{lightbox.category}</p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-[#F5EDD6] text-2xl hover:text-[#C9A84C] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}