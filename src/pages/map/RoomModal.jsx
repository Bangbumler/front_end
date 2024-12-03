import React from "react";
import Modal from "react-modal";
import styled, { createGlobalStyle } from "styled-components";
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
import RobberIcon from "../../assets/icons/robber.png";
import AssaultIcon from "../../assets/icons/assault.png";
import MurderIcon from "../../assets/icons/murder.png";
import ThiefIcon from "../../assets/icons/thief.png";
import SexualViolenceIcon from "../../assets/icons/sexual-violence.png";


// 전역 폰트 정의
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
    font-family: 'MapleL'
  }
`;

// Styled-components
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 8px;
  overflow: hidden;
`;

const RoomImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 25px;
  padding: 0 20px;
  font-family: 'Maple';
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: #555;
  padding: 0 20px;
  font-family: 'MapleL';
`;

const Thirdtitle = styled.div`
  font-size: 20px;
  color: #000;
  padding: 0 20px;
  font-family: 'Maple';
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
    font-family: 'Maple';
  }
`;

const Line = styled.div`
  border-bottom: 2px solid #efddff;
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
    width: 60px;
    height: 60px;
    border: 7px solid efddff;
  }

  span {
    font-size: 13px;
    font-family: 'MapleL'; /* 옵션 텍스트에 Maplestory Light 적용 */
  }
`;

const CloseButton = styled.button`
  background-color: #f6d4ff;
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Maple';

  &:hover {
   background-color: #e8b3f7;
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

  const getSafetyValue = (safety) => {
    const style = {
      color: '',
      fontFamily: 'MapleL',
    };
    switch (safety) {
      case "안전":
        style.color = "green";
        break;
      case "주의":
        style.color = "orange";
        break;
      case "위험":
        style.color = "red";
        break;
      default:
        return safety;
    }
  
    return <span style={style}>{safety}</span>;
  };

  const getSafetyKey = (key) => {
    switch (key) {
      case "성폭력":
        return SexualViolenceIcon;
      case "강도":
        return RobberIcon;
      case "살인":
        return MurderIcon;
      case "폭행":
        return AssaultIcon;
      case "절도":
        return ThiefIcon;
      default:
        return null;
    }
  };
  

  return (
    <>
      <GlobalStyle /> {/* 전역 스타일 적용 */}
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
            width: "550px",
            maxHeight: "75vh",
            overflow: "auto",
            padding: "20px",
            borderRadius: "25px",
            border: "5px solid #efddff",
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
            <DetailsGrid>
            {Object.entries(room.safety).map(([key, value]) => (
                <Detail key={key}>
                  <img src={getSafetyKey(key)} alt={key} /><span>{key}</span> {getSafetyValue(value)}
                </Detail>
              ))}
            </DetailsGrid>
            <Line></Line>
            <Thirdtitle>
              <span>옵션</span>
            </Thirdtitle>
            <OptionsContainer>
              {room.option &&
                room.option.map((item, index) => (
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
    </>
  );
};

export default RoomModal;
