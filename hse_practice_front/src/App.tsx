import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SolanaPage from 'pages/solanaPage';
import TronPage from 'pages/tronPage';
import RootPage from 'pages/rootPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<RootPage />} />
        <Route path={'/solana'} element={<SolanaPage />} />
        <Route path={'/tron'} element={<TronPage />} />
      </Routes>
    </Router>
  );
}

export default App;
