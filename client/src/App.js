import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import ContactForm from './pages/Contact';
import OrderHistory from './pages/OrderHistory';
import Home from './pages/Home';
import Nav from './components/nav';
import Footer from './components/footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import Detail from './pages/Detail';
import Menu from './pages/Menu';
import { StoreProvider } from './utils/GlobalState';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
              path="/menu" 
              element={<Menu />} />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
               <Route 
              path="/orderHistory" 
              element={<OrderHistory />} />
              <Route 
                path="/success" 
                element={<Success />} 
              />
              <Route 
              path="/items/:id" 
              element={<Detail />} />
               <Route 
              path="/contact" 
              element={<ContactForm />} />
              
            </Routes>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
