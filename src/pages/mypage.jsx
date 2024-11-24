import React from 'react';
import { Wrapper, ProfileSection, RoomSection } from '../styles/mypagestyle'; 
import Room1 from '../assets/images/room1.png'; 
import Room2 from '../assets/images/room2.png'; 
import Room3 from '../assets/images/room3.png'; 
import ProfileImage from '../assets/images/profile.png'; 

function MyPage() {
  const rooms = [
    { id: 1, image: Room1, title: '월세 2000/100', details: '3층, 30.3㎡, 근처에 한양 여자대학교 10분거리' },
    { id: 2, image: Room2, title: '월세 2000/100', details: '3층, 30.3㎡, 근처에 한양 여자대학교 10분거리' },
    { id: 3, image: Room3, title: '월세 2000/100', details: '3층, 30.3㎡, 근처에 한양 여자대학교 10분거리' },
  ];

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
    {rooms.map((room) => (
      <div key={room.id} className="room-card">
        <img src={room.image} alt={`Room ${room.id}`} />
        <div className="heart-icon">❤️</div> 
        <h3>{room.title}</h3>
        <p>{room.details}</p>
      </div>
    ))}
  </div>
</RoomSection>


    </Wrapper>
  );
}

export default MyPage;
