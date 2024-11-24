import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #5B59FC;
  min-height: 100vh;
  color: white;
  padding: 2rem;
`;

export const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background-color: #5B59FC;
  color: white;
  border-radius: 10px;
  margin-right:800px;
  

  .profile-image {
    img {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      margin-left:150px;
    }
  }

  .profile-details {
    text-align: left;

    p {
      margin: 4rem 0;
      font-size: 1.2rem;
    }

    button {
      margin-top: 5rem;
      padding: 0.3rem 1rem;
      background-color: white;
      color: black;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      width:70%;

      &:hover {
        background-color: grey;
      }
    }
  }
`;

export const RoomSection = styled.section`
  margin-top: 2rem;

  .section-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5rem;
    margin-top: 3rem;

    .header-card {
      background-color: white;
      color: black;
      font-weight: bold;
      font-size: 1.5rem;
      padding: 1rem 5rem;
      border-radius: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      margin-right: 1100px;
    }
  }

  .room-list {
    display: flex;
    justify-content: center; /* 카드들을 가운데 정렬 */
    flex-wrap: wrap; /* 카드 줄바꿈 허용 */
    gap: 5rem; /* 카드 사이 간격 */
    margin-top: 5rem; /* 리스트 상단 간격 */
  }

  .room-card {
    position: relative;
    background-color: white;
    color: #4947ff;
    padding: 1rem;
    border-radius: 10px;
    width: 350px; /* 카드의 너비 고정 */
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    margin: 0 0.5rem; /* 좌우 간격 */
    margin-bottom: 1rem; /* 아래쪽 간격 추가 */

    img {
      width: 100%;
      height: auto;
      border-radius: 5px;
    }

    .heart-icon {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 1.8rem;
      color: red;
      
      border-radius: 50%;
      padding: 5px;
      cursor: pointer;

      &:hover {
        background: #ffd6d6;
      }
    }

    h3 {
      margin: 1rem 0 0.5rem;
    }

    p {
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
  }
`;

