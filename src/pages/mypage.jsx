import React, { useEffect, useState } from "react";
import { Wrapper, ProfileSection, RoomSection } from "../styles/mypagestyle";
import ProfileImage from "../assets/images/profile.png";

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
                <img src={`/assets/${room.photo}`}/>
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
