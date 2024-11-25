import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home';
import MyPage from './pages/mypage';
import MapLayout from './pages/map/MapLayout';
import CommunityMain from './pages/community/CommunityMain';
import CommunityDetail from './pages/community/Communitydetail';
import Search from './pages/search';

const App = () => {
  const location = useLocation();

  // 중앙에서 찜 상태 관리
  const [favorites, setFavorites] = useState([]);

  // 찜 상태를 업데이트하는 함수
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const hideFooterPaths = ['/mypage', '/community', '/community-detail'];
  const shouldHideFooter = hideFooterPaths.some((path) => location.pathname.startsWith(path));

  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/map"
            element={<MapLayout favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/mypage"
            element={<MyPage favorites={favorites} />}
          />
          <Route path="/community" element={<CommunityMain />} />
          <Route path="/community-detail/:saleNumber" element={<CommunityDetail />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
