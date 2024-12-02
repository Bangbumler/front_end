import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/images/Logo.png";
import { Helmet } from "react-helmet";

const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: #FFF;
  color: var(--main, #5B59FC);
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 700;
`;

const HeaderContent = styled.div`
  width: 79%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled.div`
  display: flex;
  gap: 10rem; 
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  white-space: nowrap;
  position: relative;

  &.active {
    font-weight: bold; 
    
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 3px; 
      background-color: currentColor; 
      position: absolute;
      bottom: -5px;
      left: 0;
    }
  }
`;

const LogoutButton = styled.button`
  background-color: #8271ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6E5FD9; 
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  }
`;

const LogoImage = styled.img`
  height: 40px; 
  width: auto;
  cursor: pointer; /* 클릭 가능하도록 커서 스타일 추가 */
`;

function Navbar() {
  const navigate = useNavigate();
  const [logined, setLogined] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const email = sessionStorage.getItem("userID");
    setLogined(!!email); // 이메일이 있으면 true, 없으면 false
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem("userID"); 
    setLogined(false); 
    navigate("/"); 
  };

  const handleLogoClick = () => {
    navigate("/"); // 메인 화면으로 이동
  };

  return (
    <Header>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Edu+QLD+Beginner&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <HeaderContent>
        <LogoImage src={Logo} alt="방범러 로고" onClick={handleLogoClick} />
        <NavList>
          <NavItem to="/" end>
            Home
          </NavItem>
          <NavItem to="/map">
            Search
          </NavItem>
          <NavItem to="/community">
            Community
          </NavItem>
          <NavItem to="/mypage">
            MyPage
          </NavItem>
        </NavList>
        {logined ? (
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        ) : (
          <NavItem to="/login">로그인/회원가입</NavItem>
        )}
      </HeaderContent>
    </Header>
  );
}

export default Navbar;
