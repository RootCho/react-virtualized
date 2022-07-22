import { Grid, List, AutoSizer, WindowScroller } from "react-virtualized";
import { useState } from "react";
import { list, list2 } from "./dummyData";
import "react-virtualized/styles.css";
import { Link } from "react-router-dom";

export const InfiniteScroll = ({ next }) => {
  const handleClick = (e) => {
    console.log(e.pageY);
    sessionStorage.setItem("scrollY", e.pageY);
  };
  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) {
    return (
      <div
        key={key}
        style={style}
        className={"wrapper"}
        onClick={() => sessionStorage.setItem("index", index)}
      >
        <Link
          to="/products"
          style={{ display: "flex", padding: "16px" }}
          onClick={(e) => handleClick(e)}
        >
          <img
            src={list[index].image}
            style={{ width: "50px", marginRight: "10px" }}
          />
          <p>
            {list[index].name}
            {index}
          </p>
        </Link>
      </div>
    );
  }

  function cellRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <div key={key} style={style}>
        {/* {list1[rowIndex][columnIndex]}
        {rowIndex},{columnIndex} */}
        {list2[rowIndex][columnIndex].name}
        {rowIndex},{columnIndex}
      </div>
    );
  }

  return (
    <div style={{}}>
      <WindowScroller>
        {({ height, scrollTop, isScrolling, onChildScroll }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                // autoHeight={true}
                className="TodoList"
                width={width} // 전체 크기
                height={height} // 전체 높이 windowScroller의 height는 The height of the viewport.
                rowCount={list.length} // 항목 개수
                rowHeight={80} // 항목 높이
                rowRenderer={rowRenderer} // 항목 렌더링 시 쓰는 함수
                style={{}} // 전체 스타일 지정
                scrollToIndex={Number(sessionStorage.getItem("index"))} //스크롤 위치 복원할 때 사용 가능
                // isScrolling={isScrolling} //boolean
                // scrollTop={scrollTop}
                // Number(sessionStorage.getItem("scrollY"))
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>

      {/* <Grid
        cellRenderer={cellRenderer}
        columnCount={3}
        columnWidth={100}
        height={window.visualViewport.height}
        rowCount={list2.length} //불러올 데이터 항목 개수
        rowHeight={100}
        width={300}
        // overscanColumnCount={overscanColumnCount}
        // overscanRowCount={overscanRowCount}
      /> */}
    </div>
  );
};

//grid, list css로 설정 안 됨. 받아온 데이터 배열을 변환시켜서 다른 컴포넌트로 보내줘야 함
