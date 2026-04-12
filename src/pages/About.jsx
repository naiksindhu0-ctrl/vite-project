import GoldDivider from "../components/GoldDivider";
import SectionLabel from "../components/SectionLabel";
import { TIMELINE } from "../data/constants";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-[#FDE2E4] via-[#FFD7D9] to-[#FADBD8] pt-28">

      {/* ── STORY SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel label="Our Story" />
          <h2 className="font-serif text-5xl md:text-6xl text-[#5A2E2B] leading-tight mb-6">
            Born from<br />
            <em className="text-[#C9A84C]">Passion.</em><br />
            Refined by Time.
          </h2>
          <GoldDivider />
          <div className="space-y-5 mt-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
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

      {/* ── TIMELINE ── */}
      <section className="bg-[#FBE8E7] border-y border-[#C9A84C]/20 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel label="Our Journey" />
            <h2 className="font-serif text-4xl text-[#5A2E2B]">Milestones</h2>
            <GoldDivider />
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#C9A84C]/30" />
            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <div key={i} className={`flex gap-8 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} pl-16 md:pl-0`}>
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

      {/* ── AWARDS ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 bg-[#F7E1D7]">
        <div className="text-center mb-16">
          <SectionLabel label="Recognition" />
          <h2 className="font-serif text-4xl text-[#4A2C2A]">Awards & Acclaim</h2>
          <GoldDivider />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["⭐⭐⭐", "Michelin Stars", "2022–Present"],
            ["🥇", "Asia's Best Restaurant", "World's 50 Best, 2023"],
            ["🍷", "Best Wine Programme", "James Beard, 2021"],
            ["🏛️", "Luxury Dining Award", "Condé Nast, 2024"],
          ].map(([icon, award, org]) => (
            <div key={award} className="text-center p-8 border border-[#E6B8A2] hover:border-[#C0846A] bg-[#FFF5F0] rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">{icon}</div>
              <p className="font-serif text-[#5A2E2E] text-sm mb-1">{award}</p>
              <p className="text-[#6E4A3A] text-xs tracking-widest">{org}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AMBIENCE ── */}
      <section className="pb-28 max-w-7xl mx-auto px-6 bg-[#F7E1D7]">
        <div className="grid grid-cols-3 gap-3 h-[400px] md:h-[500px] rounded-lg overflow-hidden">
          <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=85" alt="Ambience 1" className="col-span-2 w-full h-full object-cover" loading="lazy" />
          <div className="flex flex-col gap-3">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=85" alt="Ambience 2" className="w-full h-1/2 object-cover" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=85" alt="Ambience 3" className="w-full h-1/2 object-cover" loading="lazy" />
          </div>
        </div>
      </section>

    </div>
  );
}