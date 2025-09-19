import React from "react";
import "./navbar.css";
import { useRef, useEffect } from "react";


type NavbarProps = {
  search: string;
  setSearch: (value: string) => void;

};
const Navbar: React.FC<NavbarProps> = ({ search, setSearch }) => {
    const inputRef = useRef<HTMLInputElement>(null);
useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <nav className="navbar">
      <h2>The Curiosity Corner</h2>
      <input
        type="text"
        placeholder="Search for Books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={inputRef}
      />
    </nav>
  );
};
export default Navbar;


    