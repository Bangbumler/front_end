import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FindHousePage from "./FindHousePage";
import RoomList from "./RoomList";
import MapButtons from "./MapButtons";

const Layout = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const MapContainer = styled.div`
  flex: 1;
  position: relative;
`;

const MapLayout = () => {
  const [rooms, setRooms] = useState([]); //fetch에서 사용해서 방목록 상태로 관리
  const [filteredRooms, setFilteredRooms] = useState([]); // 각 컴포넌트에 전달될 필터링된 방들
  const [activeFilter, setActiveFilter] = useState(null); //현재 켜진 버튼(찜,인프라,안전)
  const [favorites, setFavorites] = useState([]); //찜된 방 번호들 --> saleNumber로 구분
  const [activeInfraFilter, setActiveInfraFilter] = useState(null); // 인프라 필터 상태 (지하철,편의점,병원)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/data/room.json");
        const data = await response.json();
        setRooms(data);
        setFilteredRooms(data); // 처음엔 데이터 전체로
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filterCondition) => {
    if (activeFilter === filterCondition) {
      // 이미 활성화된 버튼을 다시 누르면 해제
      setActiveFilter(null);
      setFilteredRooms(rooms); 
      return;
    }
  
    setActiveFilter(filterCondition);
  
    switch (filterCondition) {
      case "infra":
        setActiveInfraFilter(null);
        setFilteredRooms(rooms);
        break;
      case "safety":
        setFilteredRooms(
          rooms.filter((room) => {
            const facilityDistance = parseFloat(
              room.infrastructure.publicSecurityFacility.replace("km", "")
            );
            return facilityDistance <= 1;
          })
        );
        break;
      case "favorites":
        setFilteredRooms(rooms.filter((room) => favorites.includes(room.saleNumber)));
        break;
      default:
        setFilteredRooms(rooms);
    }
  };
  
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        // 이미 찜한 상태면?? -> 제거
        return prevFavorites.filter((favId) => favId !== id);
      } else {
        // 찜하지 않은 상태면?? -> 추가
        return [...prevFavorites, id];
      }
    });
  };
  const handleInfraFilterChange = (infraType) => {
    setActiveInfraFilter(infraType); // 현재 활성화된 인프라 버튼 설정

    const MAX_DISTANCE = 0.5; // 500m 기준으로 해뒀습니다. 각각 설정하려면 복잡하기도 하겠지만... 일단?
    setFilteredRooms(
      rooms.filter((room) => {
        const distanceStr = room.infrastructure[infraType]; 
        if (!distanceStr) return false;

        //거리가 m도 있고 km도 있어서 추가된 로직
        //거리 파싱
        const distance = parseFloat(distanceStr.replace("km", "").replace("m", "")) / 
          (distanceStr.includes("km") ? 1 : 1000); 
        return distance <= MAX_DISTANCE; // 최대 거리 이하 필터링
      })
    );
  };

  return (
    <Layout>
      <RoomList
        rooms={filteredRooms}
        favorites={favorites} // 찜 상태 전달
        onToggleFavorite={toggleFavorite} // 하트 토글 함수 전달
      />
      <MapContainer>
        <FindHousePage rooms={filteredRooms} />
        <MapButtons
          onFilterChange={handleFilterChange}
          onInfraFilterChange={handleInfraFilterChange} 
          activeFilter={activeFilter}
          activeInfraFilter={activeInfraFilter}
        />
      </MapContainer>
    </Layout>
  );
};


export default MapLayout;
