import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoldDivider from "../components/GoldDivider";
import SectionLabel from "../components/SectionLabel";
import { DISHES, USPS, TESTIMONIALS, PORTFOLIO_ITEMS } from "../data/constants";

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeDish, setActiveDish] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#F5EBDD]">

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F5EBDD]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1078&auto=format&fit=crop"
            alt="Fine dining"
            className="w-full h-full object-cover opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5EBDD]/50via-[#F5EBDD]/40 to-[#E6D3B3]/30" />
        </div>

        <div className="relative text-center px-6 max-w-4xl mx-auto animate-fadeIn">
  <p className="text-white text-[0.65rem] tracking-[0.3em] uppercase font-medium font-sans mb-2">
    Established 2008 · Mumbai
  </p>
 <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6 text-[#4A2C1A] drop-shadow-2xl cursor-pointer hover:text-[#6B3A2A] transition-all duration-700">
  Where Taste<br />
  <em className="text-[#6B3A2A] hover:text-[#4A2C1A] transition-all duration-700 not-italic">Meets Luxury</em>
</h1>
   <p
            className="font-light text-white/90 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            A culinary experience beyond expectations — three Michelin stars, one unforgettable evening.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => goTo("/contact")}
              className="px-8 py-4 bg-[#6B3E26] text-white text-[0.7rem] tracking-[0.2em] uppercase font-medium hover:bg-[#4E2E1F] transition-all duration-300"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => goTo("/services")}
              className="px-8 py-4 border border-[#6B3E26] text-[#6B3E26] text-[0.7rem] tracking-[0.2em] uppercase font-medium hover:bg-[#EAD7C0] transition-all duration-300"
            >
              View Menu
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-[#6B3E26] to-transparent" />
          <p className="text-[#6B3E26] text-[0.6rem] tracking-[0.3em] uppercase">Scroll</p>
        </div>
      </section>

      {/* ── FEATURED DISHES ── */}
      <section className="py-28 px-6 max-w-7xl mx-auto bg-[#F7E1D7]">
        <div className="text-center mb-16">
          <SectionLabel label="Our Creations" />
          <h2 className="font-serif text-4xl md:text-5xl text-[#4A2C2A] mb-4 tracking-wide">Featured Dishes</h2>
          <GoldDivider />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DISHES.map((dish, i) => (
            <div
              key={i}
              onClick={() => setActiveDish(i)}
              className="group relative overflow-hidden cursor-pointer border border-[#E6B8A2] hover:border-[#C0846A] transition-all duration-500 bg-[#FFF5F0] shadow-sm hover:shadow-xl rounded-lg"
            >
              <div className="overflow-hidden h-72">
                <img src={dish.img} alt={dish.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#6E3B3B]/70 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-[0.6rem] tracking-[0.2em] uppercase bg-[#C0846A] text-white px-3 py-1 font-medium rounded">
                  {dish.tag}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-lg text-[#FFF1EB] mb-1 tracking-wide">{dish.name}</h3>
                <p className="text-[#F3D5C8] text-sm font-light">{dish.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-[#F7E1D7] border-y border-[#E6B8A2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel label="The Aurum Promise" />
            <h2 className="font-serif text-4xl md:text-5xl text-[#4A2C2A] mb-4 tracking-wide">Why Choose Us</h2>
            <GoldDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {USPS.map((u, i) => (
              <div key={i} className="group text-center p-8 border border-[#E6B8A2] hover:border-[#C0846A] hover:bg-[#FFF5F0] transition-all duration-500 rounded-lg shadow-sm hover:shadow-lg">
                <div className="text-4xl mb-5">{u.icon}</div>
                <h3 className="font-serif text-lg text-[#5A2E2E] mb-3 tracking-wide">{u.title}</h3>
                <p className="text-[#6E4A3A] text-sm leading-relaxed font-light">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHEF SECTION ── */}
      <section className="py-28 max-w-7xl mx-auto px-6 bg-[#F7E1D7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
          <div>
            <SectionLabel label="Meet the Maestro" />
            <h2 className="font-serif text-4xl md:text-5xl text-[#4A2C2A] leading-tight mb-2 tracking-wide">
              Chef Laurent<br />
              <em className="text-[#C0846A] not-italic font-normal">Moreau</em>
            </h2>
            <GoldDivider />
            <div className="space-y-5 mt-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
              <p className="text-[#6E4A3A] leading-relaxed">
                With over two decades of culinary mastery across Paris, Tokyo, and New York, Chef Laurent Moreau brought his singular vision to Mumbai in 2008 — and the city has never dined the same way since.
              </p>
              <p className="text-[#6E4A3A] leading-relaxed">
                A graduate of Le Cordon Bleu and apprentice to three Michelin-starred kitchens, Chef Laurent believes that every dish must tell a story. At crunch cafe, that story is one of passion, provenance, and perfection.
              </p>
            </div>
            <button
              onClick={() => goTo("/about")}
              className="mt-8 text-[0.65rem] tracking-[0.25em] uppercase border border-[#C0846A] text-[#C0846A] px-8 py-3 hover:bg-[#C0846A] hover:text-white transition-all duration-300 rounded"
            >
              Our Story →
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-[#F7E1D7] border-t border-[#E6B8A2]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionLabel label="Guest Voices" />
          <h2 className="font-serif text-4xl text-[#4A2C2A] mb-4">What Our Guests Say</h2>
          <GoldDivider />
          <div className="mt-12">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`transition-all duration-700 ${i === activeTestimonial ? "opacity-100" : "opacity-0 hidden"}`}>
                <p className="font-serif text-xl md:text-2xl text-[#5A3A2E] leading-relaxed italic mb-8">
                  "{t.quote}"
                </p>
                <div className="text-[#C0846A] text-sm mb-2">{"★".repeat(t.stars)}</div>
                <p className="font-serif text-[#4A2C2A] font-medium">{t.name}</p>
                <p className="text-[#6E4A3A] text-xs tracking-widest uppercase mt-1">{t.role}</p>
              </div>
            ))}
            <div className="flex justify-center gap-2 mt-10">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? "bg-[#C0846A] w-6" : "bg-[#E6B8A2]"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-28 max-w-7xl mx-auto px-6 bg-[#F7E1D7]">
        <div className="text-center mb-16">
          <SectionLabel label="The crunch cafe World" />
          <h2 className="font-serif text-4xl md:text-5xl text-[#4A2C2A] mb-4 tracking-wide">Gallery Preview</h2>
          <GoldDivider />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PORTFOLIO_ITEMS.slice(0, 6).map((item, i) => (
            <div key={i} className="group relative overflow-hidden aspect-square rounded-lg shadow-sm hover:shadow-lg transition-all duration-500">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-[#C0846A]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="font-serif text-white text-sm tracking-wide">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => goTo("/portfolio")}
            className="text-[0.65rem] tracking-[0.25em] uppercase border border-[#C0846A] text-[#C0846A] px-8 py-3 hover:bg-[#C0846A] hover:text-white transition-all duration-300 rounded"
          >
            View Full Portfolio
          </button>
        </div>
      </section>
    </div>
  );
}
