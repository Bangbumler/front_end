import React, { useEffect, useRef } from 'react';
import { kakaoMapAPIkey } from './APIKey';

const KakaoMap = () => {
  const mapContainer = useRef(null); 

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapAPIkey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(async () => {
        const center = new window.kakao.maps.LatLng(37.5822, 127.0109); // 학교 좌표
        const mapOption = {
          center: center, 
          level: 3, 
        };

        const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
        map.setMaxLevel(3); // 지도의 최대 확대 수준 설정 --> 너무 많이 축소되면 프로젝트 컨셉상 이상할듯

        // 텍스트 파일에서 데이터를 읽어오는 함수
        const fetchPolygonData = async () => {
          try {
            const response = await fetch('/polygonsData.txt'); // txt 파일은 반드시 public 안에
            const text = await response.text();
            return JSON.parse(text);
          } catch (error) {
            console.error('Error loading polygon data:', error);
            return [];
          }
        };

        const polygonData = await fetchPolygonData();

        polygonData.forEach((polygon) => {
          const path = polygon.coordinates.map(
            (coord) => new window.kakao.maps.LatLng(coord.lat, coord.lng)
          );

          new window.kakao.maps.Polygon({
            map: map,
            path: path, // 좌표 
            strokeWeight: polygon.strokeWeight, // 선 두께
            strokeColor: polygon.strokeColor, // 선 색
            strokeOpacity: polygon.strokeOpacity, // 선 투명도
            fillColor: polygon.fillColor , // 내부 색
            fillOpacity: polygon.fillOpacity, // 내부 투명도
          });
        });
      });
    };

    document.head.appendChild(script);
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
};

export default KakaoMap;
