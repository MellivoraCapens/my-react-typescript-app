import "../App.css";
import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/todo-list">Todo List</NavLink>
        </li>
        <li>
          <NavLink to="/galery">Galery</NavLink>
        </li>
        <li>
          <NavLink to="/all">All</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/calculator">Calculator</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
