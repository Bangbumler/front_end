import React, { useRef } from "react";
import KakaoMap from "./KakaoMap";
import styled from "styled-components";

// 전체 컨테이너
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
`;

// // 헤더
// const Header = styled.div`
//   padding: 10px;
//   background-color: #f5f5f5;
//   border-bottom: 1px solid #ddd;
//   text-align: center;
//   font-size: 24px;
//   font-weight: bold;
// `;

// 지도 컨테이너
const MapContainer = styled.div`
  flex: 1; /* 남은 공간을 모두 차지 */
`;

const FindHousePage = () => {
  const mapInstance = useRef(null);

  const handleMapLoaded = (map) => {
    mapInstance.current = map;
  };

  return (
    <PageContainer>
      <MapContainer>
        <KakaoMap onMapLoaded={handleMapLoaded} />
      </MapContainer>
    </PageContainer>
  );
};

export default FindHousePage;
