import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/images/Logo.png';
import { Helmet } from 'react-helmet';

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

const LogoImage = styled.img`
  height: 40px; 
  width: auto;
`;

function Navbar() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/map');
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
          <LogoImage src={Logo} alt="방범러 로고" />
        <NavList>
          <NavItem to="/" end>
            Home
          </NavItem>
          <NavItem to="/map" onClick={handleSearchClick}>
            Search
          </NavItem>
          <NavItem to="/community">
            Community
          </NavItem>
          <NavItem to="/mypage">
            MyPage
          </NavItem>
        </NavList>
        <NavItem to="/login">로그인/회원가입</NavItem>
      </HeaderContent>
    </Header>
  );
}

export default Navbar;
