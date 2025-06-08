import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import URLShortener from './components/URLShortener';
import Redirect from './components/Redrect'; // Your expired page


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLShortener />} />
        <Route path="/expired" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
