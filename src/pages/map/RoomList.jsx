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

const HamburgerMenu = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative; /* 항상 화면에 고정 */
  top: 105px;
  // left: ${(props) => (props.isHidden ? "10px" : "270px")}; /* 숨김 상태에 따라 위치 변경 */
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;

  span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: #333;
  }
`;
const HamburgerWrapper = styled.div`
  position: absolute;
  top: 105px;
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

const RoomCategory = styled.div`
  font-size: 14px;
  color: black;
  margin-bottom: 10px;
`;

const RoomDetails = styled.div`
  font-size: 14px;
  color: black;
`;

const RoomList = ({ rooms,favorites, onToggleFavorite }) => {
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false); // Modal 열림 여부
  const [isHidden, setIsHidden] = useState(false);

  const toggleHidden = () =>{
    setIsHidden(!isHidden);
  }
  const openModal = (room) => {
    setSelectedRoom(room); // 클릭된 방 데이터를 설정
    setModalOpen(true); // Modal 열기
  };

  const closeModal = () => {
    setModalOpen(false); // Modal 닫기
    setSelectedRoom(null); // 선택된 방 데이터 초기화
  };

  return (
    <>
    
    <HamburgerWrapper isHidden={isHidden} onClick={toggleHidden}>
      <HamburgerImage
        src={hambuttonIcon}
         onClick={toggleHidden}
      />
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
              filled={favorites.includes(room.saleNumber)} // 배열로 체크
              onClick={(e) => {
                e.stopPropagation(); // Modal 열림 방지
                onToggleFavorite(room.saleNumber);
              }}
            >
              {favorites.includes(room.saleNumber) ? "❤️" : "🤍"}
            </FavoriteButton>
            <RoomTextContainer>
              <RoomName>{room.price}</RoomName>
              <RoomCategory>{room.type} </RoomCategory>
              <RoomDetails>{room.description}</RoomDetails>
              <RoomDetails>층수: {room.floor}</RoomDetails>
              <RoomDetails>면적: {room.exclusiveArea}</RoomDetails>
              <RoomDetails>관리비: {room.maintenanceCost}</RoomDetails>
            </RoomTextContainer>
          </ListItemContainer>
        ))}
      </ListContainer>
      {selectedRoom && (
        <RoomModal isOpen={isModalOpen} onClose={closeModal} room={selectedRoom} />
      )}
    </>
  );
};

export default RoomList;
