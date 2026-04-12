import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../data/constants";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (page) => {
    navigate(`/${page === "Home" ? "" : page.toLowerCase()}`);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-gradient-to-r from-[#b76e79] via-[#e6a8a1] to-[#b76e79] backdrop-blur-xl border-b border-[#e6c5c3]/30 shadow-xl"
          : "py-5 bg-gradient-to-r from-[#b76e79] via-[#d9989b] to-[#b76e79] border-b border-[#e6c5c3]/20"
      }`}
    >
      {/* GLITTER OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.05),transparent_40%)]" />

      {/* LOGO */}
      <button
        onClick={() => handleNavigate("Home")}
        className="relative flex items-center gap-2"
      >
        <img src="/src/assets/logo.png" alt="Crunch Cafe" className="h-10 w-28 w-auto object-contain" />
      </button>

      {/* DESKTOP LINKS */}
      <ul className="hidden md:flex items-center gap-8 relative">
        {NAV_LINKS.map((p) => (
          <li key={p}>
            <NavLink
              to={`/${p === "Home" ? "" : p.toLowerCase()}`}
              className={({ isActive }) =>
                `text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                  isActive ? "text-[#5C1A2A] font-bold" : "text-[#8B3A47] hover:text-[#5C1A2A]"
                }`
              }
            >
              {p}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* BOOK BUTTON */}
      <button
        onClick={() => handleNavigate("Contact")}
        className="hidden md:block text-[0.65rem] tracking-[0.18em] uppercase border border-[#8B3A47] text-[#8B3A47] px-5 py-2 hover:bg-[#8B3A47] hover:text-white transition-all duration-300 font-medium rounded relative"
      >
        Book a Table
      </button>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-[#5C1A2A] text-2xl relative"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gradient-to-r from-[#b76e79] via-[#e6a8a1] to-[#b76e79] backdrop-blur-xl border-t border-[#e6c5c3]/30 py-6 flex flex-col items-center gap-5">
          {NAV_LINKS.map((p) => (
            <button
              key={p}
              onClick={() => handleNavigate(p)}
              className="text-[0.7rem] tracking-[0.2em] uppercase transition-colors text-[#8B3A47] hover:text-[#5C1A2A]"
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => handleNavigate("Contact")}
            className="mt-2 text-[0.65rem] tracking-[0.18em] uppercase border border-[#8B3A47] text-[#8B3A47] px-6 py-2 hover:bg-[#8B3A47] hover:text-white transition-all duration-300 rounded"
          >
            Book a Table
          </button>
        </div>
      )}
    </nav>
  );
}