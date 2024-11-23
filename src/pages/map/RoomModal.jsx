import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import HouseIcon from "../../assets/icons/house.png";
import FloorIcon from "../../assets/icons/floor.png";
import AreaIcon from "../../assets/icons/area.png";
import RecipeIcon from "../../assets/icons/recipe.png";
import ShoeCabinetIcon from "../../assets/icons/신발장.png";
import FridgeIcon from "../../assets/icons/냉장고.png";
import WashingMachineIcon from "../../assets/icons/세탁기.png";
import SinkIcon from "../../assets/icons/싱크대.png";
import FireIcon from "../../assets/icons/인덕션.png";
import AirIcon from "../../assets/icons/에어컨.png";


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
   border: 2px solid black;
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
  padding: 0 20px;
`;
const Subtitle = styled.div`
  font-size: 16px;
  color: #555;
  padding: 0 20px;
`;
const Thirdtitle = styled.div`
  font-size: 17px;
  color: #000;
  padding: 0 20px;
  font-weight: bold;
`;


const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 5px 20px;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 15px;
  margin-bottom: 14px;

  img {
    width: 31px;
    height: 24px;
  }

  span {
    font-weight: bold;
  }
`;

const Line = styled.div`
   border-bottom: 1px solid #ddd;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
  align-items: center;
  
  img {
    width: 45px;
    height: 45px;
    border: 2px solid black;
  }
  span{
     font-size: 13px;
     font-weight: bold;
  }
`;

const CloseButton = styled.button`
  background-color: #8271FF;
  color: white;
  border: 2px solid black;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const RoomModal = ({ isOpen, onClose, room }) => {
  const getOptionIcon = (option) => {
    switch (option) {
      case "신발장":
        return ShoeCabinetIcon;
      case "냉장고":
        return FridgeIcon;
      case "세탁기":
        return WashingMachineIcon;
      case "싱크대":
        return SinkIcon;
      case "인덕션":
        return FireIcon;
      case "에어컨":
        return AirIcon;
        default:
        return null; // 아이콘이 없을 경우
    }
  };
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
          border: "3px solid black",
          //boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
      <img src={HouseIcon} alt="방종류" /> {room.type}
      </Detail>
      <Detail>
      <img src={RecipeIcon} alt="관리비" /> {room.maintenanceCost}
      </Detail>
      <Detail>
      <img src={FloorIcon} alt="층수" /> {room.floor}
      </Detail>
      <Detail>
      <img src={AreaIcon} alt="면적" /> {room.exclusiveArea}
      </Detail>
    </DetailsGrid>
    <Line></Line>
    <DetailsGrid>
      <Detail>
        <span>난방종류</span> {room.heat}
      </Detail>
      <Detail>
        <span>방향</span> {room.direstion}
      </Detail> 
      <Detail>
        <span>전용/공급면적</span> {room.allArea}
      </Detail> 
      <Detail>
        <span>총 주차대수</span> {room.totalParking}
      </Detail>
      <Detail>
        <span>방수/욕실수</span> {room.roomCount}
      </Detail>
      <Detail>
        <span>입주 가능일</span> {room.movingIn}
      </Detail>
    </DetailsGrid>
    <Line></Line>
    <Thirdtitle>
      <span>옵션</span>
    </Thirdtitle>
    <OptionsContainer>
            {room.option && room.option.map((item, index) => (
              <Option key={index}>
                <img src={getOptionIcon(item)} alt={item} />
                <span>{item}</span>
              </Option>
            ))}
          </OptionsContainer>

    <CloseButton onClick={onClose}>닫기</CloseButton>
  </ModalContent>
    )}
    </Modal>
  );
};

export default RoomModal;
