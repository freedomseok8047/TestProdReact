import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PublicItem from "../model/Public/PublicItem";
import PublicItem2 from "../model/Public/PublicItem2";
import PublicItem3 from "../model/Public/PublicItem3";

const PublicDataListCss = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 1000px;
  margin: 0 auto;
  margin-top: 2rem;
  font-family: "Noto Sans KR", sans-serif;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const PublicDataList = ({ category }) => {
  const [publicData, setPublicData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [datatype, setDatatype] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const query =
          category === "busanFood"
            ? `&category=busanFood`
            : `&category=${category}`;
        switch (query) {
          case "&category=busanFood":
            const response = await axios.get(
              `https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=ALRX9GpugtvHxcIO%2FiPg1vXIQKi0E6Kk1ns4imt8BLTgdvSlH%2FAKv%2BA1GcGUQgzuzqM3Uv1ZGgpG5erOTDcYRQ%3D%3D&numOfRows=100&pageNo=1&resultType=json`
            );
            setPublicData(response.data.getFoodKr.item);
            setDatatype(0);
            break;

          case "&category=busanWalking":
            const response1 = await axios.get(
              `https://apis.data.go.kr/6260000/WalkingService/getWalkingKr?serviceKey=ALRX9GpugtvHxcIO%2FiPg1vXIQKi0E6Kk1ns4imt8BLTgdvSlH%2FAKv%2BA1GcGUQgzuzqM3Uv1ZGgpG5erOTDcYRQ%3D%3D&pageNo=1&numOfRows=100&resultType=json`
            );
            setPublicData(response1.data.getWalkingKr.item);
            setDatatype(1);
            break;

          case "&category=TripForAutumn":
            const response2 = await axios.get(
              `https://apis.data.go.kr/B551011/PhotoGalleryService1/galleryList1?serviceKey=q%2B5AV0YSvmxJdE1ufVn0wWWPEekA2qg4yXsnCi9tDactEQjlNYzrsy05UxNBw4%2FUrudX940T%2FcAnaCNjhvkKbA%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&_type=json`
            );
            setPublicData(response2.data.response.body.items.item);
            setDatatype(2);
            break;
          default:
            alert("카테고리를 선택해주세요.");
        }
      } catch (error) {
        console.log(error);
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

  const renderPublicData = ({ publicData }) => {
    switch (datatype) {
      case 0:
        return (
          <div>
            {publicData.map((publicData) => (
              <PublicItem
                key={publicData.MAIN_IMG_THUMB}
                publicData={publicData}
              />
            ))}
          </div>
        );
      case 1:
        return (
          <div>
            {publicData.map((publicData) => (
              <PublicItem2
                key={publicData.MAIN_IMG_THUMB}
                publicData={publicData}
              />
            ))}
          </div>
        );
      case 2:
        return (
          <div>
            {publicData.map((publicData) => (
              <PublicItem3
                key={publicData.galWebImageUrl}
                publicData={publicData}
              />
            ))}
          </div>
        );
      default:
        return;
    }
  };

  return (
    <PublicDataListCss>{renderPublicData({ publicData })}</PublicDataListCss>
  );
};

export default PublicDataList;
