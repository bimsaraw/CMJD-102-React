import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import SingleProduct from './pages/SingleProduct';

const App = () => { //Main Component
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
