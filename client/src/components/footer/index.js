import React from 'react';
import logo from "../../../public/images/FreshFitExpressLogo.png"
import facebookLogo from "../../../public/images/facebooklogo.png"
import instagramLogo from "../../../public/images/instagramlogo.png"
import twitterLogo from "../../../public/images/twitterlogo.png"

function Footer() {
    return(
        <footer>
            <a href='#' className='footer_logo'>
            <img
            src={logo} 
            alt="Fresh Fit Express Logo"
            />
            </a>

            <div className='socialMedias'>
                <a href='https://instagram.com'><img src={instagramLogo} alt="Follow us on Instagram"/></a>
                <a href='https://facebook.com'><img src={facebookLogo} alt="Follow us on Facebook"/></a>
                <a href='https://www.twitter.com'><img src={twitterLogo} alt="Follow us on Twitter"/></a>
           </div>

           <div className='copyright'>
               <small>&copy; Fresh Fit Express 2023</small>
           </div>

        </footer>
    );
}