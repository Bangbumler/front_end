import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import MyPage from "./pages/mypage";
import MapLayout from "./pages/map/MapLayout";
import CommunityMain from "./pages/community/CommunityMain";
import CommunityDetail from "./pages/community/Communitydetail";
import Login from "./pages/login";
import Signup from "./pages/signup";

const App = () => {
  const location = useLocation();

  // 중앙에서 찜 상태 관리
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const hideFooterPaths = ["/mypage", "/community", "/community-detail", "/map"];
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default App;
