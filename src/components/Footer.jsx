import React, { useState } from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  background: linear-gradient(to bottom, #C3A6FF, #F7C3FF); /* SecondPage와 자연스럽게 연결 */
  padding: 2rem 0;
`;

const FooterContainer = styled.footer`
  background: #ffffff;
  color: black;
  padding: 2rem 1rem;
  text-align: center;
  font-family: 'Inter', sans-serif;
  margin: 0 auto;
  max-width: 800px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0; /* 기본 상태: 투명 */
  transform: translateY(-30px); /* 기본 상태: 살짝 위 */
  transition: opacity 0.5s ease, transform 0.5s ease; /* 부드러운 전환 */

  ${({ isVisible }) =>
    isVisible &&
    `
    opacity: 1; /* 보이게 */
    transform: translateY(0); /* 제자리로 */
  `}
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1rem;

  button {
    padding: 0.8rem 1.5rem;
    background-color: rgba(130, 113, 255, 0.8); /* 약간 투명 */
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(109, 97, 229, 0.9);
      transform: scale(1.05); /* 살짝 커짐 */
    }
  }
`;

const FooterContent = styled.div`
  margin-top: 1rem;
`;

function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFooter = () => {
    setIsExpanded(!isExpanded);
  };

  return (
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
  );
}

export default Footer;
