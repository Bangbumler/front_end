import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper, FirstSection, SecondSection } from "../styles/homestyle"; 
import HouseImage from "../assets/images/house.png"; 
import RoomFilterImage from "../assets/images/room-filter.png"; 
import CommunityImage from "../assets/images/community.png"; 

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); 
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper scrollY={scrollY}>
      {/* 첫 번째 섹션 */}
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

      {/* 두 번째 섹션 */}
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
            <button onClick={() => navigate("/map")}>방 보러 가기 →</button>
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
    </Wrapper>
  );
}

export default Home;
