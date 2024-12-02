import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import RoomModal from "./RoomModal";
import hambuttonIcon from "../../assets/icons/hambutton.png";

// 전역 폰트 설정
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Maple';
    src: url('../../fonts/Maplestory Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'MapleL';
    src: url('../../fonts/Maplestory Light.ttf') format('truetype');
  }

  body {
    font-family: 'MapleL';
    margin: 0;
    padding: 0;
  }
`;

const ListContainer = styled.div`
  width: ${(props) => (props.isHidden ? "0" : "25%")};
  overflow-y: auto;
  border-right: ${(props) => (props.isHidden ? "none" : "1px solid #ddd")};
  display: ${(props) => (props.isHidden ? "none" : "flex")};
  flex-direction: column;
  background-color: #ffffff;
  padding: ${(props) => (props.isHidden ? "0" : "16px")};
  transition: all 0.3s ease;
  position: relative;
  margin-top: 65px;
  border: 4px solid #efddff;
  font-family: 'MapleL';
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 60px;
  left: 1px;
  width: 24.6%;
  height: 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  z-index: 800;
  border: 4px solid #efddff;
  font-family: 'Maple'
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const HeaderButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? "#7b7bf9" : "#afafff")};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Maple', sans-serif; /* Bold 폰트 적용 */

  &:hover {
    background-color: #7b7bf9;
  }
`;

const HamburgerWrapper = styled.div`
  position: absolute;
  top: 77px;
  left: ${(props) => (props.isHidden ? "10px" : "23%")};
  z-index: 1100;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const HamburgerImage = styled.img`
  height: 36px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const ListItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 2px solid #efddff;
  border-radius: 20px;
  margin-bottom: 16px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-family: 'MapleL', sans-serif; /* Light 폰트 적용 */

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: ${(props) => (props.filled ? "red" : "#ccc")};
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.filled ? "#ff6666" : "#aaa")};
  }
`;

const ListImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  margin-right: 30px;
`;

const RoomTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  font-family: 'MapleL'
`;

const RoomName = styled.div`
  font-size: 21px;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Maple'
`;

const RoomDetails = styled.div`
  font-size: 14px;
  color: black;
  margin-bottom: 7px;
  font-family: 'MapleL'
`;

const RoomList = ({ rooms, favorites, onToggleFavorite, showInfra }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [filter, setFilter] = useState(""); // 초기 상태: 전체 리스트 표시

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const openModal = (room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRoom(null);
  };

  // 필터 상태를 토글 (같은 버튼 클릭 시 비활성화)
  const toggleFilter = (type) => {
    setFilter((prevFilter) => (prevFilter === type ? "" : type));
  };

  // 필터링된 방 리스트
  const filteredRooms = filter ? rooms.filter((room) => room.lease === filter) : rooms;

  return (
    <>
      <GlobalStyle />
      <HamburgerWrapper isHidden={isHidden} onClick={toggleHidden}>
        <HamburgerImage src={hambuttonIcon} />
      </HamburgerWrapper>
      <ListContainer isHidden={isHidden}>
        <HeaderContainer>
          <ButtonGroup>
            <HeaderButton
              active={filter === "월세"}
              onClick={() => toggleFilter("월세")}
            >
              월세
            </HeaderButton>
            <HeaderButton
              active={filter === "전세"}
              onClick={() => toggleFilter("전세")}
            >
              전세
            </HeaderButton>
          </ButtonGroup>
        </HeaderContainer>
        {filteredRooms.map((room) => (
          <ListItemContainer key={room.saleNumber} onClick={() => openModal(room)}>
            <ListImage src={`/assets/${room.photo}`} alt={room.name || room.type} />
            <FavoriteButton
              filled={favorites.includes(room.saleNumber)}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(room.saleNumber);
              }}
            >
              {favorites.includes(room.saleNumber) ? "❤️" : "🤍"}
            </FavoriteButton>
            <RoomTextContainer>
              <RoomName>{room.price}</RoomName>
              {showInfra ? (
                <>
                  <RoomDetails>🚇지하철: {room.infrastructure.subway}</RoomDetails>
                  <RoomDetails>🧭편의점: {room.infrastructure.convenienceStore}</RoomDetails>
                  <RoomDetails>🚨병원: {room.infrastructure.hospital}</RoomDetails>
                </>
              ) : (
                <>
                  <RoomDetails>층수: {room.floor}</RoomDetails>
                  <RoomDetails>면적: {room.exclusiveArea}</RoomDetails>
                  <RoomDetails>관리비: {room.maintenanceCost}</RoomDetails>
                </>
              )}
            </RoomTextContainer>
          </ListItemContainer>
        ))}
      </ListContainer>
      {selectedRoom && <RoomModal isOpen={isModalOpen} onClose={closeModal} room={selectedRoom} />}
    </>
  );
};

export default RoomList;
