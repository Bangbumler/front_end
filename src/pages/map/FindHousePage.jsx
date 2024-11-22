import React, { useRef } from "react";
import KakaoMap from "./KakaoMap";
import styled from "styled-components";

// 전체 컨테이너
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
`;

// 지도 컨테이너
const MapContainer = styled.div`
  flex: 1; /* 남은 공간을 모두 차지 */
`;

const FindHousePage = ({ rooms }) => {
  const mapInstance = useRef(null);

  const handleMapLoaded = (map) => {
    mapInstance.current = map;
  };

  return (
    <PageContainer>
      <MapContainer>
        {/* rooms 데이터를 KakaoMap에 전달 */}
        <KakaoMap onMapLoaded={handleMapLoaded} rooms={rooms} />
      </MapContainer>
    </PageContainer>
  );
};

export default FindHousePage;
