import React, { useEffect, useRef } from 'react';
import { kakaoMapAPIkey } from './APIKey';

const KakaoMap = ({ style }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapAPIkey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(async () => {
        const center = new window.kakao.maps.LatLng(37.59138647014077, 127.01339201304067); // 지도 중심 좌표
        const mapOption = {
          center: center,
          level: 4, // 지도 확대 수준
        };

        const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
        map.setMaxLevel(5); // 최대 확대 수준 설정

        // 데이터 불러오기 함수
        const fetchPolygonData = async () => {
          try {
            const response = await fetch('/assets/data/map.json'); // JSON 파일 경로
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            return JSON.parse(text);
          } catch (error) {
            console.error('Error loading polygon data:', error);
            return [];
          }
        };

        // 폴리곤 데이터를 지도에 그리기
        const polygonData = await fetchPolygonData();

        polygonData.forEach((polygon) => {
          const path = polygon.coordinates.map(
            (coord) => new window.kakao.maps.LatLng(coord.lat, coord.lng)
          );

          // safety 값에 따라 색상과 투명도를 설정
          let fillColor, strokeColor, fillOpacity, strokeOpacity;

          switch (polygon.safety) {
            case '안전': // 초록색
              fillColor = '#32cd32'; // 내부 색상 (연두색)
              strokeColor = '#008000'; // 외곽선 색상 (초록색)
              fillOpacity = 0.2; // 내부 투명도
              strokeOpacity = 0.8; // 외곽선 투명도
              break;

            case '주의': // 노란색
              fillColor = '#ffd700'; // 내부 색상 (노란색)
              strokeColor = '#ffa500'; // 외곽선 색상 (주황색)
              fillOpacity = 0.3; // 내부 투명도
              strokeOpacity = 0.8; // 외곽선 투명도
              break;

            case '위험': // 빨간색
              fillColor = '#ff4500'; // 내부 색상 (빨간색)
              strokeColor = '#8b0000'; // 외곽선 색상 (진빨간색)
              fillOpacity = 0.4; // 내부 투명도
              strokeOpacity = 0.9; // 외곽선 투명도
              break;

            default: // 기본값
              fillColor = polygon.fillColor || '#808080'; // 회색
              strokeColor = polygon.strokeColor || '#505050'; // 회색
              fillOpacity = polygon.fillOpacity || 0.2;
              strokeOpacity = polygon.strokeOpacity || 0.7;
              break;
          }

          // 폴리곤 생성
          new window.kakao.maps.Polygon({
            map: map, // 지도 객체
            path: path, // 좌표
            strokeWeight: polygon.strokeWeight || 1, // 선 두께
            strokeColor: strokeColor, // 동적으로 설정된 선 색상
            strokeOpacity: strokeOpacity, // 동적으로 설정된 선 투명도
            fillColor: fillColor, // 동적으로 설정된 내부 색상
            fillOpacity: fillOpacity, // 동적으로 설정된 내부 투명도
          });

        
        });
      });
    };

    document.head.appendChild(script);
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', ...style }} />;
};

export default KakaoMap;
