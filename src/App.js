import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main/Main';
import FindHousePage from './pages/map/FindHousePage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} /> 
        <Route path="/map" element={<FindHousePage />}/>
      </Routes>
    </Router>
  );
};

export default App;
