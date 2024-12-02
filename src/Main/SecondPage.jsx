import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import communityImg from '../assets/images/community.png';
import roomFilterImg from '../assets/images/room_filter.png';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #8874FF 0%, #C3A6FF 70%, #F7C3FF 100%); /* 자연스러운 연결 */
  padding: 50px 20px; /* 여백 추가 */
`;

const CardContainer = styled.div`
  display: flex;
  gap: 179px;
  margin-bottom: 50px;
`;

const Card = styled.div`
  position: relative;
  width: 476px;
  height: 583px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CardTitle = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: auto;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(0deg, rgba(236, 175, 255, 0.90) 0%, rgba(133, 132, 255, 0.90) 100%);
  padding: 8px 16px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardDescription = styled.div`
  color: #000;
  font-family: "Golos Text", sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;
  text-align: left;
`;

const CardButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #8271FF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 30px;

  &:hover {
    background-color: #6d61e5;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  object-fit: cover;
  border-radius: 10px;
`;

const MiniTitle = styled.div`
  color: #615CEE;
  font-family: "Golos Text", sans-serif;
  font-size: 18px;
  font-weight: 900;
  margin-right: 150px;
  margin-top: 100px;
  margin-bottom: 10px;
`;

// Footer 스타일
const FooterWrapper = styled.div`
  padding: 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterContainer = styled.footer`
  
  background: #ffffff;
  color: #000;
  padding: 2rem 1.5rem;
  text-align: center;
  font-family: "Golos Text", sans-serif;
  margin: 20px auto;
  max-width: 1200px; /* 가로 최대 크기 */
  border-radius: 15px; /* 둥근 모서리 */
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1); 
  border: 9px solid #efddff;
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  ${({ isVisible }) =>
    isVisible &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
`;


const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1rem;

  button {
    padding: 0.8rem 1.5rem;
    background-color: rgba(130, 113, 255, 0.8);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(109, 97, 229, 0.9);
      transform: scale(1.05);
    }
  }
`;

const FooterContent = styled.div`
  margin-top: 1rem;
`;

const SecondPage = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRoomPageButton = () => {
    navigate('/map');
  };

  const handleCommunityPageButton = () => {
    navigate('/community');
  };

  const toggleFooter = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <PageContainer>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* 카드 컨테이너 */}
      <CardContainer>
        <Card>
          <CardTitle>Room Filter</CardTitle>
          <MiniTitle>
            최적의 환경의 방을 구하고 싶으신가요?
          </MiniTitle>
          <CardDescription>
            다양한 필터를 통해 원하는 조건에 맞는 방을 쉽게 찾을 수 있습니다.<br />
            지하철, 편의점, 병원, 치안시설 인프라 필터와 지역 안전도를 통해<br />
            필요한 정보를 한눈에 파악할 수 있습니다.
          </CardDescription>
          <CardButton onClick={handleRoomPageButton}>방 보러 가기 ➜</CardButton>
          <Image src={roomFilterImg} />
        </Card>
        <Card>
          <CardTitle>Community</CardTitle>
          <MiniTitle>
            솔직한 방의 정보를 알고 싶나요?
          </MiniTitle>
          <CardDescription>
            솔직한 정보로 다양한 사람들과 소통하며 얻을 수 있습니다.<br />
            실제 입주자들의 경험을 공유받아 방의 상태나 주변 환경에 대해<br />
            보다 현실적이고 진솔한 평가를 확인할 수 있습니다.
          </CardDescription>
          <CardButton onClick={handleCommunityPageButton}>커뮤니티 바로가기 ➜</CardButton>
          <Image src={communityImg} />
        </Card>
      </CardContainer>

      {/* 푸터 */}
      <FooterWrapper>
        <ButtonContainer>
          <button onClick={toggleFooter}>
            {isExpanded ? 'Hide About Our Team' : 'About Our Team'}
          </button>
        </ButtonContainer>
        <FooterContainer isVisible={isExpanded}>
          <FooterContent>
            <p>안녕하세요! 저희는 “방범러” 팀입니다.</p>
            <p>저희가 이 원룸 추천 서비스를 시작하게 된 계기는,</p>
            <p>1인 가구가 점점 늘어나는 시대에 안전과 편리함이 무엇보다 중요해지고 있다는 점을 느꼈기 때문입니다.</p>
            <p>기존의 원룸 서비스는 단순히 방을 보여주는 데 그쳤지만,</p>
            <p>저희는 더 나아가 안전지역, 대중교통 접근성, 편의시설까지 모두 포함해 여러분이 안전하고 편리한 생활을 누릴 수 있는 원룸 서비스를 만들게 되었습니다.</p>
            <p>저희 서비스가 집을 구하는 모든 분들에게 더 나은 선택과 안심을 드릴 수 있기를 진심으로 바랍니다.</p>
            <p>앞으로도 여러분의 편안한 일상에 도움이 되는 서비스가 되도록 최선을 다하겠습니다. 감사합니다! 😊</p>
          </FooterContent>
        </FooterContainer>
      </FooterWrapper>
    </PageContainer>
  );
};

export default SecondPage;
