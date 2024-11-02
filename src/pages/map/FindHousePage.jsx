import React, { useRef } from 'react';
import KakaoMap from './KakaoMap';

const FindHousePage = () => {
  const mapInstance = useRef(null);

  const handleMapLoaded = (map) => {
    mapInstance.current = map;
  };

  return (
    <div>
      <h1>Find Your House with Kakao Map</h1>
      <KakaoMap onMapLoaded={handleMapLoaded} />
    </div>
  );
};

export default FindHousePage;
