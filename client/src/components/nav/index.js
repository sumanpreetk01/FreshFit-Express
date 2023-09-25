import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Freshlogo from "../../assets/FreshFitExpressLogo.png"


function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
            <ul className="flex-row">
                <li className="mx-1">
                    <Link to="/menu">Menu</Link>
                </li>
                <li className="mx-1">
                    <Link to="/orderHistory">Order History</Link>
                </li>
                <li className="mx-1">
                    <Link to="/cart">Cart</Link>
                </li>
                <li className="mx-1">
                    <Link to="/contact">Contact Us</Link>
                </li>
                <li className="mx-1">
                    <a href="/" onClick={() => Auth.logout()}>Logout</a>
                </li>
            </ul>
            );
        } else {
            return (
                <ul>
                    <li className="mx-1">
                        <Link to="/menu">Menu</Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/signUp">Sign Up</Link>
                    </li>
                    <li className="mx-1">
                       <Link to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header className="flex-row px-1">
        <h1>
          <Link to="/">
            <img
            src={Freshlogo} 
            alt="Fresh Fit Express Logo"
            style={{
             height: '40px', 
             marginRight: '10px' 
                }}
            />
            Fresh Fit Express
          </Link>
        </h1>
  
        <nav>{showNavigation()}</nav>
      </header>
    );
}

export default Nav;