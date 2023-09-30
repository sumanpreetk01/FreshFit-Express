import React from 'react';
import './footer.css'
import Freshlogo from "../../assets/FreshFitExpressLogo.png"
import facebookLogo from "../../assets/facebooklogo.png"
import instagramLogo from "../../assets/instagramlogo.png"
import twitterLogo from "../../assets/twitterlogo.png"
// import { Box, Typography } from '@mui/material'





function Footer() {
    return(

        
        <footer className='Footer'>
            <a href='/' className='footer-logo'>
            <img src={Freshlogo} alt="FreshFit Express Logo"/>
            <div className='logo-text'>
            <h2>
            FreshFit <br />
            Express <br />
            </h2>
            </div>
            </a>
                 <div className='social-media-links'>
                <a href='https://instagram.c om'><img src={instagramLogo} alt="Follow us on Instagram"/></a>
                <a href='https://facebook.com'><img src={facebookLogo} alt="Follow us on Facebook"/></a>
                <a href='https://www.twitter.com'><img src={twitterLogo} alt="Follow us on Twitter"/></a>
                </div>

           <div className='copyright'>
               <p>&copy; FreshFit Express 2023</p>
           </div>
        </footer>
    );
}

export default Footer;