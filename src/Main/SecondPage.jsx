import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import communityImg from '../assets/images/community.png';
import roomFilterImg from '../assets/images/room_filter.png';

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(180deg, #8874FF 0%, #C3A6FF 100%);
    padding: 50px;
`;

const CardContainer = styled.div`
    display: flex;
    gap: 179px;
`;

const Card = styled.div`
    
    width: 476px;
    height : 583px;
    background-color: white;
    border-radius: 20px;
    padding: 0 20px 20px 20px; /* 상단 패딩을 제거하고 나머지 유지 */
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const CardTitle = styled.div`
    width:75%;
    font-size: 24px;
    font-weight: bold;
    color: #8271FF;
    background: linear-gradient(0deg, rgba(236, 175, 255, 0.90) 0%, rgba(133, 132, 255, 0.90) 100%);
    padding: 8px 16px;
    border-radius: 15px;
    margin-bottom: 20px;
`;

const CardDescription = styled.div`
    color: #000;
    font-family: "Golos Text", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px; /* 200% */
    text-align:left;
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
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-right:150px;
    margin-top : 30px;
    margin-bottom: 30px;
`;
const SecondPage = () => {
    const navigate = useNavigate();

    const handleRoomPageButton = () => {
        navigate('/map'); 
    };

    return (
        <PageContainer>
            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@600&display=swap"
                    rel="stylesheet"
                />
            </Helmet>

            <CardContainer>
                <Card>
                    <CardTitle>Room Filter</CardTitle>
                    <MiniTitle>
                        최적의 환경의 방을 구하고 싶으신가요?
                    </MiniTitle>
                        <br /><br />
                    <CardDescription>
                        다양한 필터를 통해 원하는 조건에 맞는 방을 쉽게 찾을 수 있습니다.<br></br>
                        지하철, 편의점, 병원, 치안시설 인프라 필터와 지역 안전도를 통해<br></br>
                        필요한 정보를 한눈에 파악할 수 있습니다.
                    </CardDescription>
                    <CardButton onClick={handleRoomPageButton}>방 보러 가기 ➜</CardButton>
                    <Image src={roomFilterImg}/>
                </Card>
                <Card>
                    <CardTitle>Community</CardTitle>
                    <MiniTitle>
                        솔직한 방의 정보를 알고 싶나요?
                    </MiniTitle>
                        <br /><br />
                    <CardDescription>
                        솔직한 정보로 다양한 사람들과 소통하며 얻을 수 있습니다.<br></br>
                        실제 입주자들의 경험을 공유받아 방의 상태나 주변 환경에 대해<br></br>
                        보다 현실적이고 진솔한 평가를 확인할 수 있습니다.
                    </CardDescription>
                    <CardButton>커뮤니티 바로가기 ➜</CardButton>
                    <Image src={communityImg} />
                </Card>
            </CardContainer>
        </PageContainer>
    );
};

export default SecondPage;
