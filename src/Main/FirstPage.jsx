// FirstPage.js
import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import houseImg from '../assets/images/house.png';

const PageContainer = styled.div`
    height: 100vh;
    background: linear-gradient(180deg, #4947FF 0%, #8271FF 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: relative;
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 1000px;
    height: 500px;
`;

const TextContainer = styled.div`
    max-width: 600px;
    margin-right: 20px;
`;

const Title = styled.div`
    color: #FFF;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #ECAFFF;
    font-family: 'Glory', sans-serif;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const SubTitle = styled.div`
    color: #FFF;
    font-family: 'Glory', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const Description = styled.div`
      color: #FFF;
      font-family: 'Glory', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
`;

const LoginButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    background-color: white;
    color: #4a00e0;
    border: none;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const ImageSection = styled.div`
    width: 250px;
    height: 250px;
    background-image: url(${houseImg});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));
`;

const FirstPage = () => {
    const handleLoginClick = () => {
        console.log("button clikced");
    };

    return (
        <PageContainer>
            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Glory:wght@700&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <ContentWrapper>
                <TextContainer>
                    <SubTitle>안전한 집을 구하고 싶으신가요?</SubTitle>
                    <Title>
                        인프라와 범죄율 기반<br />
                        원룸 추천 서비스 방범러
                    </Title>
                    <Description>지금 바로 로그인하고 시작해보세요</Description>
                    <LoginButton onClick={handleLoginClick}>로그인 하기</LoginButton>
                </TextContainer>
                <ImageSection />
            </ContentWrapper>
        </PageContainer>
    );
};

export default FirstPage;
