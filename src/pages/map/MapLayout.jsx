import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FindHousePage from "./FindHousePage";
import RoomList from "./RoomList";
import MapButtons from "./MapButtons";
import Legend from "./Legend";

const Layout = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const MapContainer = styled.div`
  flex: 1;
  position: relative; /* Legend가 MapContainer를 기준으로 배치 */
`;

const MapLayout = ({ favorites, toggleFavorite }) => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeInfraFilter, setActiveInfraFilter] = useState(null);
  const [showInfra, setShowInfra] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/data/room.json");
        const data = await response.json();
        setRooms(data);
        setFilteredRooms(data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filterCondition) => {
    if (activeFilter === filterCondition) {
      setActiveFilter(null);
      setFilteredRooms(rooms);
      return;
    }

    setActiveFilter(filterCondition);

    switch (filterCondition) {
      case "infra":
        setShowInfra(true);
        setActiveInfraFilter(null);
        setFilteredRooms(rooms);
        break;
      case "safety":
        setShowInfra(false);
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
        setShowInfra(false);
        setFilteredRooms(rooms.filter((room) => favorites.includes(room.saleNumber)));
        break;
      default:
        setShowInfra(false);
        setFilteredRooms(rooms);
    }
  };

  const handleInfraFilterChange = (infraType) => {
    setActiveInfraFilter(infraType);
    const MAX_DISTANCE = 0.5;
    setFilteredRooms(
      rooms.filter((room) => {
        const distanceStr = room.infrastructure[infraType];
        if (!distanceStr) return false;
        const distance =
          parseFloat(distanceStr.replace("km", "").replace("m", "")) /
          (distanceStr.includes("km") ? 1 : 1000);
        return distance <= MAX_DISTANCE;
      })
    );
  };

  return (
    <Layout>
      <RoomList
        rooms={filteredRooms}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        showInfra={showInfra}
      />
      <MapContainer>
        <FindHousePage rooms={filteredRooms} />
        <Legend /> {/* 우측 상단에 배치 */}
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
