import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>상호 : (주)직방  |  대표 : 안성우  |  사업자등록번호 : 120-87-61559</p>
      <p>주소 : 서울특별시 강남구 영동대로 731, 지하 2층 (청담동, 신영빌딩) (우 : 06072)</p>
      <p>통신판매업 신고번호 : 제2021-서울강남-06358호</p>
      <p>이메일 : mailto:cs@zigbang.com |  서비스제휴문의 : mailto:partnership@zigbang.com |  분양광고 문의 : mailto:ad@zigbang.com</p>
      <p>팩스 : 02-568-4908</p>
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
