import React from "react";

export const FilterBar = ({ setQueryString, queryString, ref }) => {
  const handleSort = (e) => {
    setQueryString({ ...queryString, sort: e.target.value });
    ref.current = true;
  };
  const handleCategoryChange = (e) => {
    setQueryString({ ...queryString, categoryCode: e.target.value });
    ref.current = true;
  };
  return (
    <div style={{ display: "flex" }}>
      <select name="필터" id="" onChange={handleSort}>
        <option value="price_asc">평균가 낮은 순</option>
        <option value="price_desc">평균가 높은 순</option>
      </select>
      <select name="필터" id="" onChange={handleCategoryChange}>
        <option value="2032">아이언</option>
        <option value="2034">페어웨이우드</option>
      </select>
    </div>
  );
};
