// App.jsx
import './App.css';
import React from 'react';
import About from './components/About.jsx';
import Login from './components/Login.jsx';
import Body from './components/Body.jsx';
import Feed from './components/Feed.jsx';   // ✅ IMPORTANT
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore.js';

import Connection from './components/Connection.jsx';
import Request from './components/Request.jsx';

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/request" element={<Request/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
