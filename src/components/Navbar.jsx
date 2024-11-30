import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/Logo.png'; 

function Navbar() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/map');
  };

  const handleCommunityClick = () => {
    navigate('/community');
  };

  const navbarStyle = {
    background: '#FFFFFF', 
    borderBottom: '1px solid #e0e0e0', 
    padding: '1rem 2rem', // 높이 유지
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const navListStyle = {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
    gap: '10rem', // 메뉴 간 간격을 살짝 넓힘
  };

  const navItemStyle = {
    color: '#4A4A4A', 
    textDecoration: 'none',
    fontSize: '1.3rem', // 글자 크기 살짝 키움
    fontWeight: '500',
    cursor: 'pointer',
  };

  const loginStyle = {
    color: '#4A4A4A',
    textDecoration: 'none',
    fontSize: '1rem', // 로그인/회원가입 크기도 살짝 키움
  };

  const logoStyle = {
    height: '40px', // 로고 높이는 그대로 유지
    width: 'auto', 
  };

  return (
    <header style={navbarStyle}>
      <div>
        <Link to="/">
          <img src={Logo} alt="방범러 로고" style={logoStyle} />
        </Link>
      </div>
      
      <nav>
        <ul style={navListStyle}>
          <li>
            <Link to="/" style={navItemStyle}>Home</Link>
          </li>
          <li>
            <span style={navItemStyle} onClick={handleSearchClick}>
              Search
            </span>
          </li>
          <li>
            <span style={navItemStyle} onClick={handleCommunityClick}>
              Community
            </span>
          </li>
          <li>
            <Link to="/mypage" style={navItemStyle}>MyPage</Link>
          </li>
        </ul>
      </nav>
      
      <div>
        <Link to="/login" style={loginStyle}>로그인/회원가입</Link>
      </div>
    </header>
  );
}

export default Navbar;
