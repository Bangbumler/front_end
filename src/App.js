import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home'; 
import MyPage from './pages/mypage';
import MapLayout from './pages/map/MapLayout';
import CommunityMain from './pages/community/CommunityMain';
import CommunityDetail from "./pages/community/Communitydetail";
import Main from './Main/Main';
const App = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Main />} /> 
          <Route path="/map" element={<MapLayout />} />
          <Route path="/community" element={<CommunityMain />} />
          <Route path="/community-detail/:saleNumber" element={<CommunityDetail />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </main>
      {location.pathname !== '/mypage' && <Footer />}
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
