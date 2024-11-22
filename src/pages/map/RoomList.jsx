import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  width: 25%; /* 좌측 메뉴의 너비 */
  overflow-y: auto;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 16px;
`;

const ListTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 16px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ListImage = styled.img`
  width: 180px;
  height: 200px;
  border-radius: 5px;
  margin-right: 10px;
`;

const ListInfo = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  p {
    margin: 4px 0 0;
    font-size: 14px;
    color: #666;
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
const RoomName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

const RoomPrice = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 4px;
`;

const RoomDetails = styled.div`
  font-size: 14px;
  color: black;
`;
const RoomTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  padding-left: 10px; /* 이미지와 텍스트 간격 */
`;
const RoomCategory = styled.div`
  font-size : 14px;
  color : black;
  margin-bottom:10px;
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
  gap: 10px; /* 버튼 사이 간격 */
`;

// 개별 버튼 스타일
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

// 햄버거 메뉴 버튼
const HamburgerMenu = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: #333;
  }
`;

const RoomList = ({ rooms }) => {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ListContainer>
      <HeaderContainer>
        <ButtonGroup>
          <HeaderButton>월세</HeaderButton>
          <HeaderButton>전세</HeaderButton>
        </ButtonGroup>
        <HamburgerMenu>
          <span></span>
          <span></span>
          <span></span>
        </HamburgerMenu>
      </HeaderContainer>
      {rooms.map((room) => (
        <ListItemContainer key={room.saleNumber}>
          <ListImage src={`/assets/${room.photo}`} alt={room.name || room.type} />
          <FavoriteButton
            filled={favorites[room.saleNumber]}
            onClick={() => toggleFavorite(room.saleNumber)}
          >
            {favorites[room.saleNumber] ? "❤️" : "🤍"}
          </FavoriteButton>
          <RoomTextContainer>
            <RoomName>{room.price}</RoomName>
            <RoomCategory>{room.type} </RoomCategory>
            <RoomDetails>층수: {room.floor}</RoomDetails>
            <RoomDetails>{room.description}</RoomDetails>
            <RoomDetails>면적: {room.exclusiveArea}</RoomDetails>
            <RoomDetails>관리비: {room.maintenanceCost}</RoomDetails>
          </RoomTextContainer>
        </ListItemContainer>
      ))}
    </ListContainer>
  );
};

export default RoomList;

