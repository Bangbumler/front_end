import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper, FirstSection, SecondSection } from "../styles/homestyle"; 
import HouseImage from "../assets/images/house.png"; 
import RoomFilterImage from "../assets/images/room-filter.png"; 
import CommunityImage from "../assets/images/community.png"; 

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false); // 검색 섹션 토글 상태
  const [searchInput, setSearchInput] = useState(""); // 검색 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [filteredCards, setFilteredCards] = useState([]); // 필터된 카드 상태
  const [cards, setCards] = useState([]); // 카드 데이터 상태
  const cardsPerPage = 6; // 페이지당 카드 개수
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); 
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/data/room.json");
        const data = await response.json();
        setCards(data);
        setFilteredCards(data); // 초기 상태: 전체 데이터
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchData();
  }, []);

  // 검색어에 따라 카드 필터링
  const filterCards = (input) => {
    if (input) {
      const result = cards.filter((card) => card.saleNumber === input); // 매물 번호로 필터링
      setFilteredCards(result);
    } else {
      setFilteredCards(cards); // 검색 입력값이 없으면 모든 카드 표시
    }
  };

  // 현재 페이지에 표시할 카드 계산
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // 페이지네이션 총 페이지 수 계산
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  // 검색 입력 핸들러
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  // 엔터 키로 검색
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      filterCards(searchInput);
    }
  };

  // 검색 버튼 클릭 시 검색
  const handleSearch = () => {
    filterCards(searchInput);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 카드 클릭 핸들러
  const handleCardClick = (saleNumber) => {
    navigate(`/community-detail/${saleNumber}`);
  };

  return (
    <Wrapper scrollY={scrollY}>
      <FirstSection>
        <div className="text-content">
          <p>안전한 집을 구하고 싶으신가요?</p>
          <h1>인프라와 범죄율 기반</h1>
          <h2>원룸 추천 서비스</h2>
          <h3>방범러</h3>
          <p className="sub-text">지금 바로 로그인하고 시작해보세요</p>
          <button onClick={() => navigate("/login")}>로그인 하기</button>
        </div>
        <div className="image-content">
          <img src={HouseImage} alt="집 아이콘" />
        </div>
      </FirstSection>

      {!showSearch && (
        <SecondSection>
          <div className="card">
            <div className="card-header">Room Filter</div>
            <div className="card-content">
              <p>최적의 환경의 방을 구하고 싶으신가요?</p>
              <p>
                다양한 필터를 통해 원하는 조건에 맞는 방을 쉽게 찾을 수 있습니다.
                <br />
                지하철, 편의점, 병원, 치안시설 인프라 필터와,
                <br />
                지역 안전도를 통해 필요한 정보를 한눈에 파악할 수 있습니다.
              </p>
              <button onClick={() => setShowSearch(true)}>방 보러 가기 →</button>
            </div>
            <div className="card-footer">
              <img className="img1" src={RoomFilterImage} alt="방 필터" />
            </div>
          </div>
          <div className="card">
            <div className="card-header">Community</div>
            <div className="card-content">
              <p>솔직한 방의 정보를 알고 싶나요?</p>
              <p>
                솔직한 정보를 다양한 사람들과 소통하며 얻을 수 있습니다.
                <br />
                실제 입주자들의 경험을 공유받아 방의 상태나,
                <br />
                주변 환경에 대해 보다 현실적이고 진솔한 평가를 확인할 수 있습니다.
              </p>
              <button onClick={() => navigate("/community")}>커뮤니티 바로가기 →</button>
            </div>
            <div className="card-footer">
              <img className="img2" src={CommunityImage} alt="커뮤니티" />
            </div>
          </div>
        </SecondSection>
      )}

      {showSearch && (
        <div className="search-section">
          {/* 검색 창 */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="원하시는 방의 매물번호를 입력해주세요."
              value={searchInput}
              onChange={handleSearchInput}
              onKeyDown={handleKeyDown} // 엔터 키 이벤트
            />
            <button type="submit" onClick={handleSearch}>
              검색
            </button>
          </div>

          {/* 카드 리스트 컨테이너 */}
          <div className="card-container">
            {currentCards.length > 0 ? (
              <div className="card-list">
                {currentCards.map((card, index) => (
                  <div
                    className="card"
                    key={index}
                    onClick={() => handleCardClick(card.saleNumber)}
                  >
                    <img src={`/assets/${card.photo}`} alt="Room" />
                    <h3>{card.price}</h3>
                    <p>{card.type}</p>
                    <p>{card.description}</p>
                    <p className="card-id">{card.saleNumber}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">검색 결과가 없습니다.</p>
            )}
          </div>

          {/* 페이지네이션 */}
          {filteredCards.length > cardsPerPage && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    className={currentPage === number ? "active" : ""}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
}

export default Home;
