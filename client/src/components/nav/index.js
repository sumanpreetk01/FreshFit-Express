import React from "react";
import './header.css'
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Freshlogo from "../../assets/FreshFitExpressLogo.png"


function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
            <ul className="nav-bar">
                <li className="nav-links">
                    <Link to="/menu">Menu</Link>
                </li>
                <li className="nav-links">
                    <Link to="/orderHistory">Order History</Link>
                </li>
                {/* <li className="nav-links">
                    <Link to="/cart">Cart</Link>
                </li> */}
                <li className="nav-links">
                    <Link to="/contact">Contact Us</Link>
                </li>
                <li className="nav-links">
                    <a href="/" onClick={() => Auth.logout()}>Logout</a>
                </li>
            </ul>
            );
        } else {
            return (
                <ul className="nav-bar">
                    <li className="nav-links">
                        <Link to="/menu">Menu</Link>
                    </li>
                    <li className="nav-links">
                        <Link to="/signUp">Sign Up</Link>
                    </li>
                    <li className="nav-links">
                       <Link to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header className="nav-bar">
       
          <Link to="/">
            <img
            src={Freshlogo} 
            alt="Fresh Fit Express Logo"
            // style={{
            //  height: '40px', 
            //  marginRight: '10px' 
            //     }}
            />
             <h1>FreshFit Express </h1>
          </Link>
       
  
        <nav>{showNavigation()}</nav>
      </header>
    );
}

export default Nav;