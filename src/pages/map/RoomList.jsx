import React, { useState } from "react";
import styled from "styled-components";
import RoomModal from "./RoomModal";
import hambuttonIcon from "../../assets/icons/hambutton.png";

const ListContainer = styled.div`
  width: ${(props) => (props.isHidden ? "0" : "28%")};
  overflow-y: auto;
  border-right: ${(props) => (props.isHidden ? "none" : "1px solid #ddd")};
  display: ${(props) => (props.isHidden ? "none" : "flex")};
  flex-direction: column;
  background-color: #ffffff;
  padding: ${(props) => (props.isHidden ? "0" : "16px")};
  transition: all 0.3s ease;
  position: relative;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const HeaderButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: #4a60f6;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #374ab6;
  }
`;

const HamburgerWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: ${(props) => (props.isHidden ? "10px" : "25%")};
  z-index: 100;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const HamburgerImage = styled.img`
  width: 36px;
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
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;

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
  width: 180px;
  height: 200px;
  border-radius: 5px;
  margin-right: 10px;
`;

const RoomTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
`;

const RoomName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

const RoomDetails = styled.div`
  font-size: 14px;
  color: black;
  margin-bottom: 5px;
`;

const RoomList = ({ rooms, favorites, onToggleFavorite, showInfra }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

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

  return (
    <>
      <HamburgerWrapper isHidden={isHidden} onClick={toggleHidden}>
        <HamburgerImage src={hambuttonIcon} />
      </HamburgerWrapper>
      <ListContainer isHidden={isHidden}>
        <HeaderContainer>
          <ButtonGroup>
            <HeaderButton>월세</HeaderButton>
            <HeaderButton>전세</HeaderButton>
          </ButtonGroup>
        </HeaderContainer>
        {rooms.map((room) => (
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
