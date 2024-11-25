import styled from 'styled-components';


const interpolateColor = (color1, color2, factor) => {
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const rgbToHex = (r, g, b) =>
    `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return rgbToHex(r, g, b);
};


const getDynamicGradient = (scrollY) => {
  const maxScroll = 1000; 
  const factor = Math.min(scrollY / maxScroll, 1); 

  const startColor1 = '#615CEE';
  const endColor1 = '#7F7EFF';

  const startColor2 = '#D9D9FF';
  const endColor2 = '#ECAFFF';

  const color1 = interpolateColor(startColor1, endColor1, factor);
  const color2 = interpolateColor(startColor2, endColor2, factor);

  return `linear-gradient(to bottom, ${color1}, ${color2})`;
};


export const Wrapper = styled.div`
  background: ${(props) => getDynamicGradient(props.scrollY)};
  transition: background 0.1s ease-in-out; /* 부드러운 전환 */
  min-height: 200vh; /* 스크롤 길이 */
  padding: 0;
  margin: 0;
`;


export const FirstSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90vh;
  padding: 0 5rem;
  color: #fff;

  .text-content {
    max-width: 100%;
    text-align: left;

    p {
      font-size: 1.3rem;
      margin: 5.5rem 0;
      margin-left:200px;

    }

    h1 {
      font-size: 3rem;
      margin: 0.5rem 0;
      margin-left:200px;
      margin-bottom:10px;
    }

    h2 {
      font-size: 3rem;
      margin: 0.5rem 0 2rem 0;
      margin-left:200px;
    }
    
    h3{
        font-size:7rem;
        margin: 0.5rem 0;
        margin-left:200px;
        
    }

    .sub-text {
      font-size: 1rem;
      margin-bottom: 1rem;
      
    }

    button {
      margin-left:200px;
      background: D9D9FF;
      color: #615CEE;
      padding: 0.8rem 2rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;

      &:hover {
        background: #e0dfff;
      }
    }
  }

  .image-content {
    max-width: 40%;
    text-align: right;
    margin-right:250px;

    img {
      width: 100%;
      max-width: 500px;
      height: auto;
      
    }
  }
`;


export const SecondSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 13rem;
  padding: 4rem 2rem;
  position: relative; /* 제목 배치를 위한 기준점 설정 */
  background: ${(props) => getDynamicGradient(props.scrollY)};
  transition: background 0.1s ease-in-out; /* 배경색 부드러운 전환 */

  .card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 3rem;
    max-width: 400px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    .card-header {
      font-size: 1.5rem;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(to right, rgba(236, 175, 255, 0.9), rgba(217, 217, 255, 0.9)); /* 투명한 배경 */
      padding: 1rem;
      border-radius: 10px;
      position: absolute;
      top: -1.5rem; /* 카드 상단으로 이동 */
      left: 50%; /* 수평 중앙 정렬 */
      transform: translateX(-50%); /* 수평 중앙 정렬 보정 */
      width: 80%; /* 제목 너비 설정 */
      text-align: center;
      box-shadow: inset 0 -2px 5px rgba(0, 0, 0, 0.1);
      z-index: 2; /* 카드 위로 배치 */
      animation: shimmer 2s infinite; /* 반짝이는 효과 */
    }

    .card-content {
      color: #333;
      font-size: 1rem;
      line-height: 1.5;
      margin-top: 4rem; /* 제목 아래 내용 간격 조정 */

      p:first-child {
        font-weight: bold;
        color: #615cee;
        margin-bottom: 1rem;
        font-size:1.5rem;
      }

      button {
        margin-top: 1rem;
        background: #7f7eff;
        color: #fff;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 1rem;
        width: 70%;

        &:hover {
          background: #6e6eff;
        }
      }
    }

    .card-footer {
      margin-top: 1rem;

      .img1 {
        width: 124%;
        height: auto;
        border-radius: 10px;
        margin-left: -48px; 
        border: none;
        box-shadow: none;
      }

      .img2 {
        width: 150%;
        height: auto;
        border-radius: 10px;
        margin-left: -86px;
        margin-top:50px;
        border: none;
        box-shadow: none;
      }
    }
  }

  
  @keyframes shimmer {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;
