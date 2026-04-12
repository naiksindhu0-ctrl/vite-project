import { useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../data/constants";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(`/${page === "Home" ? "" : page.toLowerCase()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#D6A79B] border-t border-[#C48F84] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* BRAND */}
          <div>
            <p className="font-serif text-2xl font-bold text-[#A14F5C] tracking-widest mb-4">
              crunch cafe☕<span className="italic font-light text-[#2F1B18]">.</span>
            </p>
            <p
              className="text-[#4E342E] text-sm leading-relaxed font-light max-w-xs"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Three Michelin stars. One unforgettable evening. Mumbai's temple of fine dining since 2008.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#A14F5C] mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((p) => (
                <li key={p}>
                  <button
                    onClick={() => handleNavigate(p)}
                    className="text-[#4E342E] text-sm hover:text-[#2F1B18] transition-colors"
                  >
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
              <p> 📍12, Napean Sea Road, Malabar Hill</p>
              <p>Mumbai, Maharashtra 400 006</p>
              <p className="mt-4">📞+91 22 4001 9999</p>
              <p>📸reserve@crunchcafe.in</p>
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