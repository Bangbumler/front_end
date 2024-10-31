import React from 'react';
import Main from './Main/Main';
import FindHousePage from './pages/map/FindHousePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
