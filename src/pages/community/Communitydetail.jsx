import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import HouseIcon from "../../assets/icons/house.png";
import FloorIcon from "../../assets/icons/floor.png";
import AreaIcon from "../../assets/icons/area.png";
import RecipeIcon from "../../assets/icons/recipe.png";

// 글로벌 스타일 정의
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
    box-sizing: border-box;
  }
`;

const PageContainer = styled.div`
  background: linear-gradient(180deg, #afafff 0%, #c7c7fa 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border: 4px solid #efddff;
`;

const CommunityDetailInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  padding: 30px;
  margin: 70px;
  width: 70%;
  height: 700px;
  max-width: 1400px;
  border-radius: 30px;
  border: 9px solid #efddff;
  gap: 20px;
`;

const LeftSection = styled.div`
  flex: 2.5;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const ImageSection = styled.div`
  text-align: center;

  img {
    width: 100%;
    max-width: 650px;
    height: 350px;
    border-radius: 10px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price {
      font-family: 'Maple';
      font-size: 30px;
    }

    .sale-number {
      font-size: 16px;
      font-weight: bold;
      color: #555;
      background-color: #f5f5f5;
      padding: 5px 10px;
      border-radius: 20px;
      margin-right:40px;
    }
  }

  .description {
    font-size: 16px;
    color: #555;
    margin-bottom: 20px;
  }

  .info-list {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 20px;

    img {
      width: 40px;
      height: 35px;
    }

    span {
      font-size: 14px;
    }
  }
`;

const RightSection = styled.div`
  flex: 2;
  background-color: #d5e2ff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  h3 {
    font-family: 'Maple', sans-serif;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const ReviewsSection = styled.div`
  flex: 1;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    background: white;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
`;

const AddReview = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'MapleL', sans-serif;
  }

  button {
    padding: 10px 20px;
    background-color: #9392ff;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
      background-color: #7371ef;
    }
  }
`;

const CommunityDetail = () => {
  const { saleNumber } = useParams();
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch("/assets/data/room.json");
        if (!response.ok) throw new Error("Failed to fetch room data");

        const data = await response.json();
        const selectedRoom = data.find((room) => room.saleNumber === saleNumber);

        if (selectedRoom) {
          setRoom(selectedRoom);
          setReviews(selectedRoom.reviews || []);
        } else {
          console.error("Room not found for saleNumber:", saleNumber);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [saleNumber]);

  const handleAddReview = () => {
    if (!newReview.trim()) return;
    setReviews([newReview, ...reviews]);
    setNewReview("");
  };

  if (loading) return <div>방 정보를 불러오는 중입니다...</div>;
  if (!room) return <div>해당 방 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <CommunityDetailInfo>
          <LeftSection>
            <ImageSection>
              {room.photo ? (
                <img src={`/assets/${room.photo}`} alt="방 이미지" />
              ) : (
                <p>이미지가 없습니다</p>
              )}
            </ImageSection>
            <InfoSection>
              <div className="header">
                <div className="price">{room.lease} {room.price}</div>
                <div className="sale-number">매물번호: {room.saleNumber}</div>
              </div>
              <p className="description">{room.description}</p>
              <div className="info-list">
                <div className="info-item">
                  <img src={HouseIcon} alt="방 종류" />
                  <span>{room.type}</span>
                </div>
                <div className="info-item">
                  <img src={FloorIcon} alt="층수" />
                  <span>{room.floor}</span>
                </div>
                <div className="info-item">
                  <img src={AreaIcon} alt="면적" />
                  <span>{room.exclusiveArea}㎡</span>
                </div>
                <div className="info-item">
                  <img src={RecipeIcon} alt="관리비" />
                  <span>{room.maintenanceCost}원</span>
                </div>
              </div>
            </InfoSection>
          </LeftSection>

          <RightSection>
            <AddReview>
              <input
                type="text"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="후기를 작성해주세요"
              />
              <button onClick={handleAddReview}>등록</button>
            </AddReview>
            <ReviewsSection>
              <h3>후기</h3>
              <ul>
                {reviews.length > 0 ? (
                  reviews.map((review, index) => <li key={index}>{review}</li>)
                ) : (
                  <li>작성된 후기가 없습니다.</li>
                )}
              </ul>
            </ReviewsSection>
          </RightSection>
        </CommunityDetailInfo>
      </PageContainer>
    </>
  );
};

export default CommunityDetail;
