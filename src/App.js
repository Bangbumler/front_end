import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main/Main';
// import FindHousePage from './pages/map/FindHousePage';
import MapLayout from './pages/map/MapLayout';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} /> 
        <Route path="/map" element={<MapLayout />}/>
      </Routes>
    </Router>
  );
};

export default App;
