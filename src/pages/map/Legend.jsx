import React from "react";
import styled from "styled-components";

// Legend 컨테이너 스타일
const LegendContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9); 
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 12px;
  z-index: 1000; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  & > div {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 3px;
  }
`;

const Legend = () => {
  return (
    <LegendContainer>
      <LegendItem>
        <div style={{ backgroundColor: "#32cd32" }}></div>
        <span>안전</span>
      </LegendItem>
      <LegendItem>
        <div style={{ backgroundColor: "#ffd700" }}></div>
        <span>주의</span>
      </LegendItem>
      <LegendItem>
        <div style={{ backgroundColor: "#ff4500" }}></div>
        <span>위험</span>
      </LegendItem>
    </LegendContainer>
  );
};

export default Legend;
