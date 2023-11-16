import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePublicDataContext } from "./PublicDataContext";
import PublicItem from "../model/PublicItem";
import PublicItem2 from "../model/PublicItem2";
import axios from "axios";
import PublicItem3 from "../model/PublicItem3";

const PublicDataListCss = styled.div`
  // ... (스타일링 부분, 필요에 따라 추가)
`;

const PublicDataList = () => {
  const { state: { category }, actions: { setCategory } } = usePublicDataContext();
  const [publicData, setPublicData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [datatype, setDatatype] = useState(0); // 여러분의 요구에 따라 datatype을 조정하세요.

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // 여러분의 요구에 따라 API 엔드포인트와 데이터 처리를 조정하세요.
        const response = await axios.get(`여러분의_공공데이터_API_ENDPOINT`);

        switch (category) {
          case "busanFood":
            setPublicData(response.data.getFoodKr.item);
            setDatatype(1);
            break;
          case "busanWalking":
            setPublicData(response.data.getWalkingKr.item);
            setDatatype(2);
            break;
          default:
            setPublicData(response.data); // 여러분의 API 응답 구조에 따라 조정하세요.
            setDatatype(0);
            break;
        }
      } catch (error) {
        console.error("공공데이터를 불러오는 중 에러 발생:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [category]);

  if (loading) {
    return <PublicDataListCss>데이터를 불러오는 중...</PublicDataListCss>;
  }

  if (!publicData) {
    return null;
  }

  const renderPublicData = () => {
    switch (datatype) {
      case 1:
        return (
          <div>
            {publicData.map((data) => (
              <PublicItem key={data.MAIN_IMG_THUMB} data={data} />
            ))}
          </div>
        );
      case 2:
        return (
          <div>
            {publicData.map((data) => (
              <PublicItem2 key={data.MAIN_IMG_THUMB} data={data} />
            ))}
          </div>
        );
      default:
        return (
          <div>
            {publicData.map((data) => (
              // 여러분의 데이터 구조에 따라 조정하세요.
              <PublicItem3 key={data.galWebImageUrl} data={data}/>
            ))}
          </div>
        );
    }
  };

  return <PublicDataListCss>{renderPublicData()}</PublicDataListCss>;
};

export default PublicDataList;
