import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileImage from "../assets/icons/Profile.png";

const Wrapper = styled.div`
  background: linear-gradient(180deg, #afafff 0%, #c7c7fa 100%);
  min-height: 100vh;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  background: #ffffff;
  padding: 30px;
  border: 9px solid #efddff;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;

  .profile-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .profile-details {
    text-align: center;
    font-family: "Inter", sans-serif;

    button {
      background-color: #9392ff;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 20px;
      padding: 10px 20px;
      cursor: pointer;
      margin-bottom: 15px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #7371ef;
      }
    }

    p {
      margin: 5px 0;
      font-size: 16px;
      color: #555;
    }
  }
`;

const RoomSection = styled.div`
  width: 100%;
  max-width: 1400px;

  .section-header {
    text-align: center;
    margin-bottom: 30px;

    .header-card {
      display: inline-block;
      background: linear-gradient(0deg, rgba(147, 146, 255, 0.9), rgba(115, 113, 239, 0.9));
      color: white;
      font-size: 24px;
      font-weight: bold;
      padding: 10px 30px;
      border-radius: 20px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
  }

  .room-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

    .room-card {
      background-color: white;
      border: 9px solid #efddff;
      border-radius: 10px ;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      width: 300px;
      padding: 20px;
      text-align: center;

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 15px;
      }

      h3 {
        font-size: 20px;
        color: #555;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: #777;
      }
    }
  }
`;

function MyPage({ favorites }) {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/data/room.json");
        const data = await response.json();
        setRooms(data);

        const favoriteRooms = data.filter((room) => favorites.includes(room.saleNumber));
        setFilteredRooms(favoriteRooms);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchData();
  }, [favorites]);

  useEffect(() => {
    const email = sessionStorage.getItem("userID");
    if (email) {
      setEmail(email);
    }
  }, []);

  return (
    <Wrapper>
      <ProfileSection>
        <div className="profile-image">
          <img src={ProfileImage} alt="프로필" />
        </div>
        <div className="profile-details">
          <button>회원정보 수정 ✏️</button>
          <p>이메일: {email}</p>
          <p>관심지역: 성북구</p>
        </div>
      </ProfileSection>
      <RoomSection>
        <div className="section-header">
          <div className="header-card">찜한 방</div>
        </div>
        <div className="room-list">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div key={room.saleNumber} className="room-card">
                <img src={`/assets/${room.photo}`} />
                <h3>{room.lease} {room.price}</h3>
                <p>{room.summary}</p>
              </div>
            ))
          ) : (
            <p>찜한 방이 없습니다.</p>
          )}
        </div>
      </RoomSection>
    </Wrapper>
  );
}

export default MyPage;
