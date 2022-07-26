import React from "react";

import "./RenderLayout.scss";
import { Link } from "react-router-dom";

export const priceToString = (price: any) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const SmallColumnCard = ({
  data,
  index,
  grid,
  type,
  targetRef,
}: {
  data: any;
  index: number;
  grid: boolean;
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
        className={grid ? "grid" : ""}
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

// import "./ThumbnailCard.scss";
//{list2[rowIndex][columnIndex].name}
export const ThumbnailCard = ({
  rowIndex,
  columnIndex,
  data,
  type,
  targetRef,
}: {
  rowIndex: number;
  columnIndex: number;
  data: any;
  type: string;
  targetRef: any;
}) => {
  const CardType = ["store"].includes(type) ? type : "";
  type productList = {
    modelCode: string;
    productName: string;
    productId: number;
    image: string;
    salePrice: number;
    deliveryType: number;
  };
  const imageSize = "_N_7_80x80_100_2";
  return (
    <>
      {/* 데이터가 존재할때만 렌더 */}
      {data[rowIndex][columnIndex] && (
        <div
          id="ThumbnailCard"
          // key={idx}
          // ref={data.length - 1 === data.idx ? targetRef : null}
          style={{ padding: "16px" }}
        >
          {/* <Link to={"/products/" + Number(data[rowIndex][columnIndex].productId)}> */}
          {/* <img
            style={{ width: "100px" }}
            src={
              data[rowIndex][columnIndex].image
                ? `https://pricegolf.co.kr/wys2/file_attach_thumb/${
                    data[rowIndex][columnIndex].image.slice(
                      0,
                      data[rowIndex][columnIndex].image.length - 4
                    ) +
                    imageSize +
                    data[rowIndex][columnIndex].image.slice(
                      data[rowIndex][columnIndex].image.length - 4,
                      data[rowIndex][columnIndex].image.length
                    )
                  }`
                : ""
            }
            alt={""}
            className={"product-images"}
          /> */}
          <img
            src={`http://pricegolf.co.kr/upload/model/${data[rowIndex][columnIndex].modelCode}.jpg`}
            className={"product-images"}
            // onError={onErrorImg}
            alt=""
            style={{ width: "20px" }}
          />
          <div>
            <div className="card_right">
              <p className="ellipsis">
                {data[rowIndex][columnIndex].modelName}
              </p>

              <p style={{ color: "gray", fontSize: "13px" }}>
                {data[rowIndex][columnIndex].deliveryType === 0
                  ? "무료배송"
                  : data[rowIndex][columnIndex].deliveryType === 1
                  ? "유료(착불)배송"
                  : "유료(선결제)배송"}
              </p>
            </div>
          </div>
          {/* </Link> */}
        </div>
      )}
    </>
  );
};
ThumbnailCard.defaultProps = {
  type: null,
  targetRef: null,
  dataSrc: "",
};

export const ImageThumbnailWrap = ({
  img,
  dataSrc,
  className,
}: {
  img: string;
  dataSrc: string;
  className: string;
}) => {
  return (
    <div id="ImageThumbnailWrap">
      <img
        src={img}
        alt=""
        data-src={dataSrc}
        className={className}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = "/assets/images/default.png";
        }}
      />
    </div>
  );
};

ImageThumbnailWrap.defaultProps = {
  dataSrc: "",
  className: "",
};
