import React from 'react';
import styled from 'styled-components';
import infraIcon from "../../assets/icons/infra.png";
import safetyIcon from "../../assets/icons/safety.png";
import heartIcon from "../../assets/icons/heart.png";

const FloatingButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10;
`;

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
    transform: translateY(-2px);
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;

const MapButtons = ({ onFilterChange }) => {
  return (
    <FloatingButtonContainer>
      <FloatingButton onClick={() => onFilterChange("infra")}>
        <img src={infraIcon} alt="인프라" />
        인프라
      </FloatingButton>
      <FloatingButton onClick={() => onFilterChange("safety")}>
        <img src={safetyIcon} alt="안전" />
        안전
      </FloatingButton>
      <FloatingButton onClick={() => onFilterChange("favorites")}>
        <img src={heartIcon} alt="찜" />
        찜
      </FloatingButton>
    </FloatingButtonContainer>
  );
};

export default MapButtons;
