import React from "react";
import styled from "styled-components";
import FindHousePage from "./FindHousePage";
import RoomList from "./RoomList";
import MapButtons from "./MapButtons";
// 전체 레이아웃
const Layout = styled.div`
  display: flex;
  height: 100vh; /* 전체 화면 높이 */
  font-family: Arial, sans-serif;
`;

// 지도 섹션
const MapContainer = styled.div`
  flex: 1; /* 남은 공간을 지도에 할당 */
  position: relative;
`;

const MapLayout = () => {
  return (
    <Layout>
      {/* 매물 리스트 */}
      <RoomList />
      {/* 지도 */}
      <MapContainer>
        <FindHousePage />
        <MapButtons />
      </MapContainer>
    </Layout>
  );
};

export default MapLayout;
