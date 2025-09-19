import React from "react";
import "./navbar.css";

type NavbarProps = {
  search: string;
};
const Navbar: React.FC<NavbarProps> = ({ search }) => {
   
  return (
    <nav className="navbar">
      <h2>Books</h2>
      <input
        type="text"
        placeholder="Search for Books..."
        value={search}
      />
    </nav>
  );
};
export default Navbar;


    