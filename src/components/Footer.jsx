import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>상호 : (주)방범러  |  대표 : 코딩감자 </p>
      <p>주소 : 서울특별시 성북구 삼선교로 16길(삼선동2가) 116 한성대학교 (우 : 02876)</p>
      
      <p>이메일 : 214392@hansung.com |  서비스제휴문의 : 214392@hansung.com |  분양광고 문의 : 214392@hansung.com</p>
      <p>팩스 : 02-760-5800</p>
    </footer>
  );
}

const footerStyle = {
  background: 'linear-gradient(to bottom, #ECAFFF, #FFFFFF)', 
  color: 'black',
  padding: '2rem 1rem',
  textAlign: 'center',
  fontFamily: 'Inter, sans-serif',
};

export default Footer;
