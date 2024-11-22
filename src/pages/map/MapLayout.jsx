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
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/data/room.json");
        const data = await response.json();
        setRooms(data);
        setFilteredRooms(data); // 초기 상태: 전체 데이터
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filterCondition) => {
    setFilter(filterCondition);
    switch (filterCondition) {
      case "infra":
        setFilteredRooms(rooms.filter((room) => room.infra));
        break;
      case "safety":
        setFilteredRooms(rooms.filter((room) => room.safety));
        break;
      case "favorites":
        setFilteredRooms(rooms.filter((room) => room.isFavorite));
        break;
      default:
        setFilteredRooms(rooms);
    }
  };

  return (
    <Layout>
      <RoomList rooms={filteredRooms} />
      <MapContainer>
        <FindHousePage rooms={rooms} />
        <MapButtons onFilterChange={handleFilterChange} />
      </MapContainer>
    </Layout>
  );
};


export default MapLayout;
