import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main-page.css';
import { NavLink, Routes, Route } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid m-2">
        <NavLink className="navbar-brand" to="/" >Workout Split Creator</NavLink>
           
        <div className="dropdown">
            <button className="navbar-toggler dropdown-toggler" type="button" data-bs-toggle="dropdown" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" id="navbardropdown" aria-labelledby="dropdownMenuButton">
              <li><NavLink className="dropdown-item bg-light" to="/Exercises">All Exercises</NavLink></li>
              <li><NavLink className="dropdown-item bg-light" to="/Scientific">Scientific Research</NavLink></li>
              <li><NavLink className="dropdown-item bg-light" to="/Weekly">Weekly Routine</NavLink></li>
            </ul>
        </div>              
    </div>
    </nav>
  
  );

};
  
export default Navbar;