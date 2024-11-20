import React from 'react';
import styled from 'styled-components';
import infraIcon from "../../assets/icons/infra.png";
import safetyIcon from "../../assets/icons/safety.png";
import heartIcon from "../../assets/icons/heart.png";
// 전체 버튼 컨테이너
const FloatingButtonContainer = styled.div`
  position: absolute; /* 부모 요소에 겹치기 */
  bottom: 20px; /* 아래에서 간격 */
  right: 20px; /* 오른쪽에서 간격 */
  display: flex;
  flex-direction: column;
  gap: 10px; /* 버튼 간격 */
  z-index: 10; /* 지도 위에 위치하도록 z-index 설정 */
`;

// 개별 버튼 스타일
const FloatingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  padding: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px); /* 살짝 떠오르는 효과 */
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px; /* 아이콘과 텍스트 간격 */
  }
`;

const MapButtons = () => {
  return (
    <FloatingButtonContainer>
      <FloatingButton>
      <img src={infraIcon}/>
        인프라
      </FloatingButton>
      <FloatingButton>
        <img src={safetyIcon}/>
        안전
      </FloatingButton>
      <FloatingButton>
        <img src={heartIcon}/>
        찜
      </FloatingButton>
    </FloatingButtonContainer>
  );
};

export default MapButtons;
