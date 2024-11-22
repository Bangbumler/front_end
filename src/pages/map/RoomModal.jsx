import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

// Styled-components
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
`;

const RoomImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: #555;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;

  span {
    font-weight: bold;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const CloseButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const RoomModal = ({ isOpen, onClose, room }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Room Details"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1001,
        },
      }}
    >
{room && (
  <ModalContent>
    <ImageContainer>
      <RoomImage src={`/assets/${room.photo}`} alt={room.type} />
    </ImageContainer>
    <RoomInfo>
      <Title>{room.price}</Title>
      <Subtitle>{room.description}</Subtitle>
    </RoomInfo>
    <DetailsGrid>
      <Detail>
        <span>방종류</span> {room.type}
      </Detail>
      <Detail>
        <span>층수</span> {room.floor}
      </Detail>
      <Detail>
        <span>면적</span> {room.exclusiveArea}
      </Detail>
      <Detail>
        <span>방향</span> {room.direstion}
      </Detail>
      <Detail>
        <span>난방종류</span> {room.heat}
      </Detail>
      <Detail>
        <span>총 주차대수</span> {room.totalParking}
      </Detail>
    </DetailsGrid>
    <CloseButton onClick={onClose}>닫기</CloseButton>
  </ModalContent>
    )}
    </Modal>
  );
};

export default RoomModal;
