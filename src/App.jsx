// App.jsx
import './App.css';
import React from 'react';
import About from './components/about.jsx';
  import Login from './components/Login.jsx';
import Body from './components/Body.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          
          <Route path="login" element={<Login/>}/> 
          <Route path="about" element={<About/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;