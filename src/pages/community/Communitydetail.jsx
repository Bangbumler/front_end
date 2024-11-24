import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import HouseIcon from "../../assets/icons/house.png";
import FloorIcon from "../../assets/icons/floor.png";
import AreaIcon from "../../assets/icons/area.png";
import RecipeIcon from "../../assets/icons/recipe.png";
import ReviewIcon from "../../assets/icons/review.png";

const PageContainer = styled.div`
  background: linear-gradient(180deg, #d8baff 0%, #b3d9ff 100%);
  min-height: 1000px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 20px 0 20px;
  padding-top: 100px;
`;

const CommunityDetailInfo = styled.div`
  background-color: white;
  padding: 30px;
  margin: auto;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const SaleNumberSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SaleNumber = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: #000;
  background-color: #f5f5f5;
  border: 1px solid #656565;
  border-radius: 30px;
  padding: 3px 100px;
  text-align: center;
  display: inline-block;
`;

const RoomImageSection = styled.div`
  text-align: center;
  margin: 20px 0 30px 0;
`;

const RoomImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
`;

const DetailInfoSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  margin: 30px auto;
  width: 100%;
  max-width: 800px;
  padding: 10px;
  box-sizing: border-box;
`;

const DetailInfoLeft = styled.div`
  flex: 1 1 45%;
  max-width: 45%;
  text-align: left;

  .price {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .description {
    font-size: 14px;
    font-weight: 600;
    color: #555;
    margin-bottom: 10px;
  }
`;

const DetailInfoRight = styled.div`
  flex: 1 1 45%;
  max-width: 45%;
  text-align: left;
`;

const InfoItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

const ReviewsContainer = styled.div`
  min-height: 500px;
  background-color: #d5e2ff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const Divider = styled.hr`
  border: none;
  border-top: 3px solid #9392ff;
  margin: 10px 0;
`;

const ReviewsList = styled.ul`
  list-style: none;
  padding: 0 50px;
  margin: 0;
  font-size: 17px;

  li {
    margin-bottom: 8px;
    word-wrap: break-word;
    overflow-wrap: anywhere;
    background-color: white;
    padding: 5px;

    &:empty {
      background-color: transparent;
    }
  }
`;

const Pagination = styled.div`
  text-align: center;
  font-size: 16px;
  margin-top: auto;
  color: #000;

  .page-link {
    cursor: pointer;
    margin: 0 5px;
    text-decoration: none;

    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }

    &.active {
      font-weight: bold;
      text-decoration: underline;
    }

    &:hover:not(.disabled) {
      color: #7371ef;
    }
  }
`;

const CommunityDetail = () => {
  const { saleNumber } = useParams(); // URL 파라미터로부터 saleNumber 가져오기
  const [room, setRoom] = useState(null); // 현재 방 데이터 가져오기
  const [reviews, setReviews] = useState([]); // 후기 데이터
  const [newReview, setNewReview] = useState(""); // 새로운 후기 입력 값
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const reviewsPerPage = 8; // 페이지당 후기 개수

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch("/assets/data/room.json");
        if (!response.ok) throw new Error("Failed to fetch room data");

        const data = await response.json();
        const selectedRoom = data.find((room) => room.saleNumber === saleNumber);

        if (selectedRoom) {
          setRoom(selectedRoom);
          setReviews(selectedRoom.reviews.reverse() || []);
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
    if (newReview.trim() === "") return; // 공백 입력 방지
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    setNewReview("");
    setCurrentPage(1);
  };

  // 현재 페이지에 표시할 후기
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = (pageNumber) => { setCurrentPage(pageNumber); };
  const handlePreviousPage = () => { if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1); };

  if (loading) return <div>방 정보를 불러오는 중입니다...</div>;
  if (!room) return <div>해당 방 정보를 찾을 수 없습니다.</div>;

  return (
    <PageContainer>
      <CommunityDetailInfo>
        {/* 매물번호 */}
        <SaleNumberSection>
          <SaleNumber>매물번호: {room.saleNumber}</SaleNumber>
        </SaleNumberSection>
        
        {/* 방 이미지 */}
        <RoomImageSection>
          {room.photo ? (
            <RoomImage src={`/assets/${room.photo}`} alt="방 이미지" className="room-image" />
          ) : (
            <p>이미지가 없습니다</p>
          )}
        </RoomImageSection>

        {/* 방 정보 */}
        <DetailInfoSection>
          <DetailInfoLeft>
            <span className="price">{room.lease} {room.price}</span>
            <p className="description">{room.description}</p>
          </DetailInfoLeft>
          <DetailInfoRight>
            <InfoItemContainer>
              <InfoItem>
                <img src={HouseIcon} alt="방종류"/>
                <span>{room.type}</span>
              </InfoItem>
              <InfoItem>
                <img src={RecipeIcon} alt="관리비"/>
                <span>{room.exclusiveArea}</span>
              </InfoItem>
              <InfoItem>
                <img src={FloorIcon} alt="층수"/>
                <span>{room.floor}</span>
              </InfoItem>
              <InfoItem>
                <img src={AreaIcon} alt="면적"/>
                <span>{room.maintenanceCost}</span>
              </InfoItem>
            </InfoItemContainer>
          </DetailInfoRight>
        </DetailInfoSection>

        {/* 후기 */}
        <ReviewsContainer>
          <AddReview>
            <InfoItem>
              <img src={ReviewIcon} alt="리뷰"/>
            </InfoItem>
            <input type="text" value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="후기 추가..."/>
            <button onClick={handleAddReview}>등록</button>
          </AddReview>

          <Divider/>

          <div className="reviews">
            <ReviewsList>
              {Array.from({ length: reviewsPerPage }).map((_, index) => (
                <li key={index}>{currentReviews[index] || ""}</li>
              ))}
            </ReviewsList>
          </div>

          {/* 페이지네이션 */}
          <Pagination>
            <span className={`page-link ${currentPage === 1 ? "disabled" : ""}`} onClick={handlePreviousPage}>{"< "}</span>
            {Array.from({ length: totalPages || 1 }, (_, i) => (
              <span key={i + 1} className={`page-link ${currentPage === i + 1 ? "active" : ""}`} onClick={() => handlePageChange(i + 1)}>{i + 1}{" "}</span>
            ))}
            <span className={`page-link ${currentPage === totalPages || totalPages === 0 ? "disabled" : ""}`} onClick={handleNextPage}>{">"}</span>
          </Pagination>
        </ReviewsContainer>
      </CommunityDetailInfo>
    </PageContainer>
  );
};

export default CommunityDetail;
