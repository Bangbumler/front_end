import React from "react";
import { Wrapper, ProfileSection, RoomSection } from "../styles/mypagestyle";
import ProfileImage from "../assets/images/profile.png";

function MyPage({ favorites }) {
  const rooms = [
    { id: 1, image: "/assets/images/room1.png", title: "월세 2000/100", details: "3층, 30.3㎡, 한양 여자대학교 10분거리" },
    { id: 2, image: "/assets/images/room2.png", title: "월세 3000/150", details: "5층, 40㎡, 성신여대 인근" },
    { id: 3, image: "/assets/images/room3.png", title: "전세 1억", details: "2층, 50㎡, 서울숲 근처" },
  ];

  const favoriteRooms = rooms.filter((room) => favorites.includes(room.id));

  return (
    <Wrapper>
      <ProfileSection>
        <div className="profile-image">
          <img src={ProfileImage} alt="프로필" />
        </div>
        <div className="profile-details">
          <button>회원정보 수정 ✏️</button>
          <p>닉네임: 코끼리</p>
          <p>이메일: aaaaa@gmail.com</p>
          <p>관심지역: 성북구</p>
        </div>
      </ProfileSection>
      <RoomSection>
        <div className="section-header">
          <div className="header-card">찜한 방</div>
        </div>
        <div className="room-list">
          {favoriteRooms.length > 0 ? (
            favoriteRooms.map((room) => (
              <div key={room.id} className="room-card">
                <img src={room.image} alt={`Room ${room.id}`} />
                <h3>{room.title}</h3>
                <p>{room.details}</p>
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
