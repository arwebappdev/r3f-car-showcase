// ResponsiveHeader.jsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import bmwLogo from "../assets/bmw-logo.png";
import MLogo from "../assets/MLogo.png";
export default function ResponsiveHeader({ className = "" }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <header
      className={`${className} fixed top-0 left-0 w-full z-50 bg-black text-white px-4 py-3 flex items-center justify-between ring-2`}
      style={{
        background: "linear-gradient( #1a1a1a, #2c2c2c, #2c2c2c, #1a1a1a)",
      }}
    >
      {/* BMW Logo */}
      <div className="flex items-center gap-2">
        <img src={bmwLogo} alt="BMW" className="h-10 w-10" />
        <img src={MLogo} alt="BMW" className="h-10 w-20" />
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex gap-5 items-center">
        <button className="hover:text-gray-300 transition">Home</button>
        <button className="hover:text-gray-300 transition">Models</button>
        <button className="hover:text-gray-300 transition">Gallery</button>

        {["Services", "Technology", "Company"].map((label, i) => (
          <div key={i} className="relative">
            <button
              onClick={() => toggleDropdown(i)}
              className="flex items-center gap-1 hover:text-gray-300 transition"
            >
              {label}
              <ChevronDown size={16} />
            </button>

            {dropdownOpen === i && (
              <div className="absolute top-full mt-2 left-0 bg-white text-black rounded shadow-lg min-w-[150px] p-2 z-50">
                <a href="#" className="block px-3 py-1 hover:bg-gray-100">
                  Option 1
                </a>
                <a href="#" className="block px-3 py-1 hover:bg-gray-100">
                  Option 2
                </a>
                <a href="#" className="block px-3 py-1 hover:bg-gray-100">
                  Option 3
                </a>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Right Side: Search + Mobile Menu Button */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative pt-1" ref={searchRef}>
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <Search size={20} />
          </button>
          {searchOpen && (
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className="absolute right-0 top-0 h-full p-3 pt-3 pb-4 bg-black text-white rounded-lg w-48 transition-all duration-300"
              style={{
                background:
                  "linear-gradient( #1a1a1a, #2a2a2a, #2a2a2a, #1a1a1a)",
              }}
            />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden z-[51] duration-100 active:rotate-180"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Slide Menu for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden p-6 pt-10 flex flex-col gap-4 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {["Home", "Models", "Gallery"].map((item, i) => (
          <button
            key={i}
            className="text-left text-lg hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </button>
        ))}

        {["Services", "Technology", "Company"].map((label, i) => (
          <div key={i}>
            <span className="text-sm text-gray-400 mb-1 block">{label}</span>
            <div className="flex flex-col gap-1">
              <a href="#" className="hover:text-gray-300 text-base">
                Option 1
              </a>
              <a href="#" className="hover:text-gray-300 text-base">
                Option 2
              </a>
              <a href="#" className="hover:text-gray-300 text-base">
                Option 3
              </a>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
