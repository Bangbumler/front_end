import React, { useState, useRef } from 'react';
import KakaoMap from './KakaoMap';

const FindHousePage = () => {
  const [circleOptions, setCircleOptions] = useState(null);
  const [polylineOptions, setPolylineOptions] = useState(null);
  const mapInstance = useRef(null); // 지도 객체 참조

  const handleFilterChange = (filter) => {
    if (!mapInstance.current) return; // 지도 로드 전 필터 적용 방지
    console.log(filter);
    const center = mapInstance.current.getCenter(); // 현재 중심 좌표

    if (filter === 'blue') {
      setCircleOptions({
        center,
        radius: 100,
        strokeWeight: 5,
        strokeColor: '#75B8FA',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: '#ADD8E6',
        fillOpacity: 0.5,
      });

      setPolylineOptions({
        path: [
          center,
          new window.kakao.maps.LatLng(center.getLat() + 0.01, center.getLng() + 0.01),
        ],
        strokeWeight: 3,
        strokeColor: '#0000FF',
        strokeOpacity: 0.7,
        strokeStyle: 'dashed',
      });
    } else if (filter === 'red') {
      setCircleOptions({
        center,
        radius: 150,
        strokeWeight: 5,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: '#FFA07A',
        fillOpacity: 0.5,
      });

      setPolylineOptions({
        path: [
          center,
          new window.kakao.maps.LatLng(center.getLat() - 0.01, center.getLng() - 0.01),
        ],
        strokeWeight: 3,
        strokeColor: '#FF0000',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      });
    }
  };

  return (
    <div>
      <h1>Find Your House with Kakao Map</h1>
      <button onClick={() => handleFilterChange('blue')}>Blue Filter</button>
      <button onClick={() => handleFilterChange('red')}>Red Filter</button>

      <KakaoMap
        circleOptions={circleOptions}
        polylineOptions={polylineOptions}
      />
    </div>
  );
};

export default FindHousePage;
