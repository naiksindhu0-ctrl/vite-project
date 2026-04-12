import { useState } from "react";
import GoldDivider from "../components/GoldDivider";
import SectionLabel from "../components/SectionLabel";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", phone: "", date: "", message: "" });
  };

  return (
    <div className="bg-[#F7E1D7] pt-28">

      {/* ── HEADER ── */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center bg-gradient-to-br from-[#F3D5CC] via-[#E6B8AF] to-[#D89C8C] rounded-xl shadow-xl">
        <SectionLabel label="Get In Touch" />
        <h2 className="font-serif text-5xl md:text-6xl text-[#4A2C2A] mb-4">
          Make a <em className="text-[#A14F5C]">Reservation</em>
        </h2>
        <GoldDivider />
        <p className="mt-6 text-[#5D4037] text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Experience fine dining with a touch of elegance. Reserve your table and enjoy a luxurious atmosphere, curated menu, and unforgettable moments.
        </p>
        <button className="mt-8 px-8 py-3 bg-[#A14F5C] text-white text-sm tracking-widest uppercase rounded hover:bg-[#7A3540] transition-all duration-300 shadow-md">
          Book Now
        </button>

        {/* ── RESERVATION FORM ── */}
        <div className="bg-[#FFF5F0] border border-[#E6B8A2] p-10 rounded-lg shadow-sm mt-10 text-left">
          <h3 className="font-serif text-2xl text-[#4A2C2A] mb-8 tracking-wide">Reserve Your Table</h3>

          {sent && (
            <div className="mb-6 p-4 border border-[#C0846A]/40 bg-[#FDEAE4] text-[#C0846A] text-sm tracking-wide rounded">
              ✓ Your reservation request has been received. We'll confirm within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A] block mb-2">Full Name</label>
                <input type="text" required placeholder="Priya Mehta"
                  className="w-full border-b border-[#E6B8A2] bg-transparent py-2 text-[#4A2C2A] focus:outline-none focus:border-[#C0846A]"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A] block mb-2">Email</label>
                <input type="email" required placeholder="hello@example.com"
                  className="w-full border-b border-[#E6B8A2] bg-transparent py-2 text-[#4A2C2A] focus:outline-none focus:border-[#C0846A]"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A] block mb-2">Phone</label>
                <input type="tel" placeholder="+91 98765 43210"
                  className="w-full border-b border-[#E6B8A2] bg-transparent py-2 text-[#4A2C2A] focus:outline-none focus:border-[#C0846A]"
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A] block mb-2">Preferred Date</label>
                <input type="date"
                  className="w-full border-b border-[#E6B8A2] bg-transparent py-2 text-[#4A2C2A] focus:outline-none focus:border-[#C0846A]"
                  value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A] block mb-2">Special Requests</label>
              <textarea rows={4} placeholder="Dietary requirements, occasion details..."
                className="w-full border-b border-[#E6B8A2] bg-transparent py-2 text-[#4A2C2A] focus:outline-none focus:border-[#C0846A] resize-none"
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button type="submit"
              className="w-full py-4 bg-[#C0846A] text-white text-[0.7rem] tracking-[0.25em] uppercase font-medium hover:bg-[#A86A55] transition-all duration-300 rounded"
            >
              Confirm Reservation
            </button>
          </form>
        </div>

        {/* ── CONTACT INFO ── */}
        <div className="space-y-10 mt-10 text-left">
          {/* MAP */}
          <div className="relative overflow-hidden h-56 bg-[#FDEAE4] border border-[#E6B8A2] flex items-center justify-center rounded-lg">
            <div className="text-center">
              <p className="text-[#C0846A] text-3xl mb-2">📍</p>
              <p className="font-serif text-[#4A2C2A]">crunch cafe Fine Dining</p>
              <p className="text-[#6E4A3A] text-sm mt-1">12, Napean Sea Road, Malabar Hill</p>
              <p className="text-[#6E4A3A] text-sm">Mumbai, Maharashtra 400 006</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                className="inline-block mt-4 text-[0.6rem] tracking-[0.2em] uppercase text-[#C0846A] border-b border-[#C0846A]/40 hover:border-[#C0846A] transition-all duration-300"
              >
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

          {/* CONTACT DETAILS */}
          <div className="space-y-5">
            {[["📞", "Reservations", "+91 22 4001 9999"], ["✉️", "Email", "reserve@crunchcafe.in"], ["📸", "Instagram", "@crunchcafe.mumbai"]].map(([icon, label, val]) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 border border-[#E6B8A2] flex items-center justify-center text-sm flex-shrink-0 rounded">{icon}</div>
                <div>
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#6E4A3A]">{label}</p>
                  <p className="text-[#4A2C2A] text-sm mt-0.5">{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-20" />
    </div>
  );
}