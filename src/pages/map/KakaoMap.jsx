import React, { useEffect, useRef } from 'react';
import { kakaoMapAPIkey } from './APIKey';

const KakaoMap = ({ style, rooms }) => {
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
              fillColor = '#32cd32';
              strokeColor = '#008000';
              fillOpacity = 0.2;
              strokeOpacity = 0.8;
              break;

            case '주의': // 노란색
              fillColor = '#ffd700';
              strokeColor = '#ffa500';
              fillOpacity = 0.3;
              strokeOpacity = 0.8;
              break;

            case '위험': // 빨간색
              fillColor = '#ff4500';
              strokeColor = '#8b0000';
              fillOpacity = 0.4;
              strokeOpacity = 0.9;
              break;

            default:
              fillColor = polygon.fillColor || '#808080';
              strokeColor = polygon.strokeColor || '#505050';
              fillOpacity = polygon.fillOpacity || 0.2;
              strokeOpacity = polygon.strokeOpacity || 0.7;
              break;
          }

          new window.kakao.maps.Polygon({
            map: map,
            path: path,
            strokeWeight: polygon.strokeWeight || 1,
            strokeColor: strokeColor,
            strokeOpacity: strokeOpacity,
            fillColor: fillColor,
            fillOpacity: fillOpacity,
          });
        });

        // 방 데이터를 기반으로 마커 생성
        if (rooms && rooms.length > 0) {
          // console.log('Rooms data:', rooms); // rooms 데이터 확인

          rooms.forEach((room) => {
            const position = new window.kakao.maps.LatLng(
              room.coordinate.latitude,
              room.coordinate.longitude
            );
              console.log(room.coordinate.latitude);
              console.log(room.coordinate.longitude);
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: position,
              title: room.type || '방',
            });

          });
        }
      });
    };

    document.head.appendChild(script);
  }, [rooms]); // rooms가 변경될 때마다 마커 업데이트

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', ...style }} />;
};

export default KakaoMap;
