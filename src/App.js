import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main/Main';
// import FindHousePage from './pages/map/FindHousePage';
import MapLayout from './pages/map/MapLayout';
import CommunityMain from './pages/community/CommunityMain';
import CommunityDetail from "./pages/community/Communitydetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} /> 
        <Route path="/map" element={<MapLayout />}/>
        <Route path="/community" element={<CommunityMain />} /> 
        <Route path="/community-detail/:saleNumber" element={<CommunityDetail />} />

      </Routes>
    </Router>
  );
};

export default App;
