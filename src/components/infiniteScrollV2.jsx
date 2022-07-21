import {
  Grid,
  List,
  AutoSizer,
  WindowScroller,
  InfiniteLoader,
} from "react-virtualized";
import { useEffect, useState } from "react";
import { ProductItem } from "./List";
import { list, list2 } from "./dummyData";
import "react-virtualized/styles.css";
import "./infiniteScroll.scss";
import { Link } from "react-router-dom";
import axios from "axios";

export const InfiniteScrollV2 = () => {
  const [dataList, setDataList] = useState([]);
  const [lastCursor, setLastCursor] = useState("");
  ////infiniteloader //fetch data
  function isRowLoaded({ index }) {
    return !!dataList[index];
  }
  const loadMoreRows = async () => {
    console.log("fetching 함수 호출됨");
    try {
      const res = await axios.get(
        `http://kjh.pricegolf.co.kr:8080/api/v1/market-price/models?lastCursor=${lastCursor}&size=30`
      );
      const data = res.data.data.modelList;
      setDataList([...dataList, ...data]);
      setLastCursor(res.data.data.lastCursor);
      console.log(dataList.length);
      console.log("lastCursor ? ", lastCursor);
    } catch {
      console.error("fetching error");
    }
  };
  useEffect(() => {
    loadMoreRows();
  }, []);

  //////
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
        <Link to="/products" style={{ display: "flex", padding: "16px" }}>
          {/* <img
            src={list[index].image}
            style={{ width: "50px", marginRight: "10px" }}
          /> */}
          <p>
            {dataList[index].modelCategory}
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
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={1000000}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, scrollTop, isScrolling, onChildScroll }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    // autoHeight={true}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    width={width} // 전체 크기
                    height={height} // 전체 높이 windowScroller의 height는 The height of the viewport.
                    rowCount={dataList.length} // 항목 개수
                    rowHeight={60} // 항목 높이
                    rowRenderer={rowRenderer} // 항목 렌더링 시 쓰는 함수
                    style={{}} // 전체 스타일 지정
                    scrollToIndex={10} //스크롤 위치 복원할 때 사용 가능
                    // isScrolling={isScrolling} //boolean
                    // Number(sessionStorage.getItem("scrollY"))
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
      {/* <WindowScroller>
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
                scrollToIndex={0} //스크롤 위치 복원할 때 사용 가능
                // isScrolling={isScrolling} //boolean
                // scrollTop={scrollTop}
                // Number(sessionStorage.getItem("scrollY"))
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller> */}

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
//infiniteLoader: api로 data fetch하는 용도
//infiniteLoader에서는 scrollToIndex가 먹질 않는다. 또한 scrollToIndex는 해당 index의 아이템을 화면의 최하단으로 스크롤해주는 기능이라서 우리가 생각하는 정확한 위치로 이동시켜주지는 못한다는 한계점이 있다.
