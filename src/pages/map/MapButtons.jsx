import React, { useState } from "react";
import styled from "styled-components";
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
  background-color: ${(props) => (props.active ? "#4a60f6" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid ${(props) => (props.active ? "#374ab6" : "#ddd")};
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.active ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.2)"};
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? "#374ab6" : "#f5f5f5")};
    transform: translateY(-2px);
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;

const SubButtonContainer = styled.div`
  position: absolute;
  bottom: calc(100% + 10px); /* "인프라" 버튼 위로 이동 */
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SubButton = styled(FloatingButton)`
  width: 90px; /* 더 작은 크기 */
  padding: 8px;
  font-size: 12px;
  justify-content: center;
`;

const MapButtons = ({onFilterChange,onInfraFilterChange,activeFilter,activeInfraFilter,}) => {
  const [showInfraOptions, setShowInfraOptions] = useState(false);

  const toggleInfraOptions = () => {
    setShowInfraOptions((prev) => !prev);
    if (!showInfraOptions) {
      onFilterChange("infra"); 
    } else {
      onFilterChange(null); 
    }
  };

  return (
    <FloatingButtonContainer>
      {showInfraOptions && (
        <SubButtonContainer>
          <SubButton
            active={activeInfraFilter === "subway"}
            onClick={() => onInfraFilterChange("subway")}
          >
            지하철
          </SubButton>
          <SubButton
            active={activeInfraFilter === "convenienceStore"}
            onClick={() => onInfraFilterChange("convenienceStore")}
          >
            편의점
          </SubButton>
          <SubButton
            active={activeInfraFilter === "hospital"}
            onClick={() => onInfraFilterChange("hospital")}
          >
            병원
          </SubButton>
        </SubButtonContainer>
      )}

      <FloatingButton
        active={activeFilter === "infra"}
        onClick={toggleInfraOptions}
      >
        <img src={infraIcon} alt="인프라" />
        인프라
      </FloatingButton>

      <FloatingButton
        active={activeFilter === "safety"}
        onClick={() => onFilterChange("safety")}
      >
        <img src={safetyIcon} alt="안전" />
        안전
      </FloatingButton>

      <FloatingButton
        active={activeFilter === "favorites"}
        onClick={() => onFilterChange("favorites")}
      >
        <img src={heartIcon} alt="찜" />
        찜
      </FloatingButton>
    </FloatingButtonContainer>
  );
};

export default MapButtons;
