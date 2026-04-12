import { useNavigate } from "react-router-dom";
import GoldDivider from "../components/GoldDivider";
import SectionLabel from "../components/SectionLabel";
import { SERVICES } from "../data/constants";

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F7E1D7] pt-28">

      {/* ── HEADER ── */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <SectionLabel label="What We Offer" />
        <h2 className="font-serif text-5xl md:text-6xl text-[#4A2C2A] leading-tight mb-4 tracking-wide">
          Our <em className="text-[#C0846A] not-italic">Services</em>
        </h2>
        <GoldDivider />
        <p className="text-[#5A3A2E] mt-6 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}>
          Every service at crunch cafe is curated with the same exacting standard — an obsessive attention to detail that transforms any occasion into an extraordinary memory.
        </p>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="max-w-7xl mx-auto px-6 pb-28 grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES.map((s, i) => (
          <div key={i} className="group relative p-10 border border-[#E6B8A2] hover:border-[#C0846A] bg-[#FFF5F0] hover:bg-[#FDEAE4] transition-all duration-500 overflow-hidden rounded-lg shadow-sm hover:shadow-lg">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#C0846A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-5xl mb-6">{s.icon}</div>
            <h3 className="font-serif text-2xl text-[#4A2C2A] mb-3 group-hover:text-[#C0846A] transition-colors duration-300">
              {s.title}
            </h3>
            <p className="text-[#6E4A3A] leading-relaxed font-light">{s.desc}</p>
            <button
              onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="mt-8 text-[0.6rem] tracking-[0.2em] uppercase text-[#C0846A] border-b border-[#C0846A]/40 pb-0.5 hover:border-[#C0846A] transition-all duration-300"
            >
              Enquire Now →
            </button>
          </div>
        ))}
      </section>

      {/* ── PRIVATE DINING PROMO ── */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1800&q=80" alt="Private dining" className="absolute inset-0 w-full h-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-[#C0846A]/60" />
        <div className="relative text-center px-6">
          <p className="font-serif text-3xl md:text-4xl text-white mb-4 italic">Planning something special?</p>
          <button
            onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="px-8 py-4 bg-white text-[#C0846A] text-[0.7rem] tracking-[0.2em] uppercase font-medium hover:bg-[#FFF5F0] transition-all duration-300 rounded"
          >
            Talk to Our Events Team
          </button>
        </div>
      </section>

    </div>
  );
}