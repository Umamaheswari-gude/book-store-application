import React from "react";
import "./navbar.css";

type NavbarProps = {
  search: string;
  setSearch: (value: string) => void;

};
const Navbar: React.FC<NavbarProps> = ({ search, setSearch }) => {
   
  return (
    <nav className="navbar">
      <h2>Books</h2>
      <input
        type="text"
        placeholder="Search for Books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}

      />
    </nav>
  );
};
export default Navbar;


    