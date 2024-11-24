import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '/Users/hongserin/Documents/GitHub/front_end/src/assets/images/Logo.png'; 

function Navbar() {
  const navbarStyle = {
    background: '#FFFFFF', 
    borderBottom: '1px solid #e0e0e0', 
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const navListStyle = {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
    gap: '2rem',
  };

  const navItemStyle = {
    color: '#4A4A4A', 
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
  };

  const loginStyle = {
    color: '#4A4A4A',
    textDecoration: 'none',
    fontSize: '0.9rem',
  };

  const logoStyle = {
    height: '40px', 
    width: 'auto', 
  }

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
            <Link to="/search" style={navItemStyle}>Search</Link>
          </li>
          <li>
            <Link to="/community" style={navItemStyle}>Community</Link>
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
