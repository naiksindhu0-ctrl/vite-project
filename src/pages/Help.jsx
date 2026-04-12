import { useState } from "react";
import GoldDivider from "../components/GoldDivider";
import SectionLabel from "../components/SectionLabel";
import { FAQS } from "../data/constants";

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-[#F7E1D7] pt-28 min-h-screen">

      {/* ── HEADER ── */}
      <section className="text-center px-6 mb-16">
        <SectionLabel label="Support" />
        <h2 className="font-serif text-5xl text-[#4A2C2A] mb-4">Help & FAQs</h2>
        <GoldDivider />
        <p className="text-[#6E4A3A] max-w-xl mx-auto mt-4">
          Find answers to common questions about our services, bookings, and experience.
        </p>
      </section>

      {/* ── FAQ LIST ── */}
      <div className="max-w-3xl mx-auto px-6 space-y-4 pb-20">
        {FAQS.map((faq, i) => (
          <div key={i} className="border border-[#E6B8A2] bg-[#FFF5F0] rounded-lg overflow-hidden">
            <button
              onMouseEnter={() => setOpenIndex(i)}
              onMouseLeave={() => setOpenIndex(null)}
              className="w-full text-left px-6 py-4 flex justify-between items-center"
            >
              <span className="text-[#4A2C2A] font-medium">{faq.q}</span>
              <span className="text-[#C0846A] text-xl">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4 text-[#6E4A3A] text-sm">{faq.a}</div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
