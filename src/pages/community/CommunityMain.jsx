import React, { useState, useEffect } from "react";
import "./CommunityMain.css";

const CommunityMain = () => {
  const [searchInput, setSearchInput] = useState(""); // 검색 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [filteredCards, setFilteredCards] = useState([]); // 필터된 카드 상태
  const [cards, setCards] = useState([]); // 카드 데이터 상태
  const cardsPerPage = 6; // 페이지당 카드 개수

  // 페이지 로드 시 카드 데이터 로드
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

  return (
    <div className="community-main">
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
          <img
            src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
            alt="검색"
          />
        </button>
      </div>

      {/* 카드 리스트 컨테이너 */}
      <div className="card-container">
        {currentCards.length > 0 ? (
          <div className="card-list">
            {currentCards.map((card, index) => (
              <div className="card" key={index}>
              {console.log(card.photo)}  {/* card.photo 값 확인 */}
              <img
                  src={`/assets/${card.photo}`}  // 변경된 경로
                  alt={card.saleNumber}
              />
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={currentPage === number ? "active" : ""}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityMain;
