import './App.css';
import React, { useState } from 'react';
import { getCategories } from './fetcher';
import ProductDetial from './components/ProductDetial';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Category from './components/Category';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/Home';
import OrderConfirmation from './components/OrderConfirmation';
import SearchResult from './components/SearchResult';


function App() {
  const[categories, setCategories] = useState({errorMessage: '', data: []});

  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    }
    fetchData();
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
              element={<Layout 
                categories={categories}
                />
                }
            >
            <Route index element={<Home/>} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/orderconfirmation' element={<OrderConfirmation />} />
            <Route path='/search' element={<SearchResult />} />

            <Route 
            path='/category/:categoryId' 
            element={<Category/>} />

            <Route 
            path='/products/:productId' 
            element={<ProductDetial/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
