import React from 'react';

import ContactUs from './pages/Contact';
import Nav from './components/Nav';
import Home from './pages/Home';
import Footer from './components/footer'
// import Login from './pages/Login';


function App(){
  return (
    <div>
    <Nav />
    <Home />
    <ContactUs />
    <Footer/>
    </div>
  )
}


export default App;
