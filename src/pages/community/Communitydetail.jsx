import React from "react";
import { useParams } from "react-router-dom";

const CommunityDetail = () => {
  const { saleNumber } = useParams(); // URL 파라미터로부터 saleNumber 가져오기

  return (
    <div>
      <h1>Community Detail</h1>
      <p>매물 번호: {saleNumber}</p>
    </div>
  );
};

export default CommunityDetail;
