import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyPage from "./pages/mypage";
import MapLayout from "./pages/map/MapLayout";
import CommunityMain from "./pages/community/CommunityMain";
import CommunityDetail from "./pages/community/Communitydetail";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Main from "./Main/Main";
import styled from "styled-components";

const App = () => {
  const location = useLocation();
  const isLogined = !!sessionStorage.getItem("userID"); // 로그인 여부 확인
  const [favorites, setFavorites] = useState([]); // 찜 상태 관리

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  // Footer 숨길 경로 추가
  const hideFooterPaths = ["/", "/mypage", "/community", "/community-detail", "/map"];
  const shouldHideFooter = hideFooterPaths.some((path) => location.pathname.startsWith(path));

  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          {/* 누구나 접근 가능한 경로 */}
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 로그인된 사용자만 접근 가능한 경로 */}
          <Route
            path="/map"
            element={
              isLogined ? (
                <MapLayout favorites={favorites} toggleFavorite={toggleFavorite} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/mypage"
            element={
              isLogined ? (
                <MyPage favorites={favorites} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/community"
            element={
              isLogined ? <CommunityMain /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/community-detail/:saleNumber"
            element={
              isLogined ? <CommunityDetail /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </main>
      {/* Main 화면 및 특정 경로에서 Footer 숨기기 */}
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

const Content = styled.div`
  flex-grow: 1;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
