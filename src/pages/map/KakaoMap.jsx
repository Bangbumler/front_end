import React, { useRef, useEffect, useState } from 'react';
import { kakaoMapAPIkey } from './APIKey';

const KakaoMap = ({ circleOptions, polylineOptions }) => {
  const mapContainer = useRef(null);  // 지도 DOM을 참조합니다.
  const mapInstance = useRef(null);   // 지도 객체를 참조합니다.
  const [mapLoaded, setMapLoaded] = useState(false);  // 지도 로드 상태 관리

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapAPIkey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(37.5822, 127.0109); // 초기 중심
        const options = { center, level: 3 }; 
        mapInstance.current = new window.kakao.maps.Map(mapContainer.current, options);
        setMapLoaded(true);
      });
    };

    document.head.appendChild(script);
  }, []);

  // 원 생성 함수
  const createCircle = (options) => {
    const circle = new window.kakao.maps.Circle(options);
    circle.setMap(mapInstance.current); // 지도에 원 표시
    return circle;
  };

  // 선 생성 함수
  const createPolyline = (options) => {
    const polyline = new window.kakao.maps.Polyline(options);
    polyline.setMap(mapInstance.current); // 지도에 선 표시
    return polyline;
  };

  useEffect(() => {
    if (mapLoaded) {
      const circle = createCircle(circleOptions);
      const polyline = createPolyline(polylineOptions);

      return () => {
        circle.setMap(null);
        polyline.setMap(null);
      };
    }
  }, [circleOptions, polylineOptions, mapLoaded]);
  return <div ref={mapContainer} style={{ width: '600px', height: '500px' }} />;
};

export default KakaoMap;
