import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analyze/:sessionId" element={<AnalyzePage />} />
    </Routes>
  );
}

export default App;