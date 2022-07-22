import React from "react";

import "./RenderLayout.scss";
import { Link } from "react-router-dom";

export const priceToString = (price: any) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const SmallColumnCard = ({
  data,
  index,
  type,
  targetRef,
}: {
  data: any;
  index: number;
  type: string;
  targetRef: any;
}) => {
  //이미지 없음
  const onErrorImg = (e: any) => {
    e.target.src = "/assets/images/default.png";
  };
  const CardType = ["rank"].includes(type) ? type : "";
  type modelList = {
    modelCode: string;
    modelName: string;
    modelBrandName: string;
    modelYear: string;
    modelCategory: string;
    modelPriceAvr: number;
    modelPriceMin: number;
    modelPriceMax: number;
    modelPriceChange: number;
    modelProductCount: number;
  };
  return (
    <>
      <div
        id="SmallColumnCard"
        // key={idx}
        ref={data.length - 5 === index ? targetRef : null}
      >
        <Link to={"model-price/" + Number(data[index].modelCode)}>
          {CardType === "rank" ? (
            <span className="rank_number">{index + 1}</span>
          ) : (
            ""
          )}
          <img
            src={`http://pricegolf.co.kr/upload/model/${data[index].modelCode}.jpg`}
            className={"product-images"}
            // onError={onErrorImg}
            alt=""
          />
          <div className="product_info">
            <h4>{data[index].modelName}</h4>
            <div>
              <span className="graytext">{data[index].modelBrandName}</span>
              <span className="graytext">{data[index].modelYear}</span>
              <span className="graytext">{data[index].modelCategory}</span>
            </div>
            <span className="graytext">
              {data[index].modelProductCount}개 등록
            </span>
          </div>
        </Link>
        <div className="price">
          <span>{priceToString(Number(data[index].modelPriceAvr))}원</span>
          {data[index].modelPriceChange < 0 ? (
            <span className="bluetext">
              ▼ {priceToString(Math.abs(data[index].modelPriceChange))}
            </span>
          ) : data[index].modelPriceChange > 0 ? (
            <span className="redtext">
              ▲ {priceToString(Number(data[index].modelPriceChange))}
            </span>
          ) : (
            <span className="graytext">변동없음</span>
          )}
        </div>
      </div>
    </>
  );
};
SmallColumnCard.defaultProps = {
  type: null,
  targetRef: null,
  dataSrc: "",
};
