import {
  // Grid,
  MultiGrid,
  List,
  AutoSizer,
  WindowScroller,
  // InfiniteLoader,
} from "react-virtualized";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeGrid as Grid } from "react-window";
import { useEffect, useRef, useState } from "react";
import "react-virtualized/styles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { SmallColumnCard, ThumbnailCard } from "./RenderLayout";
import { FilterBar } from "./FilterBar";
export const InfiniteGrid = ({ path }) => {
  //restore srcroll position
  const prevQuery = qs.parse(
    window.location.search.slice(1, window.location.search.length)
  );
  const [queryString, setQueryString] = useState(prevQuery);

  const navigate = useNavigate();
  const search = qs.stringify(queryString);

  const [state, setState] = useState(false);
  //   const [grid, setGrid] = useState(false);

  const [dataList, setDataList] = useState([]);
  const [lastCursor, setLastCursor] = useState("");
  const [array, setArray] = useState([]);

  const gridArray = () => {
    const arr = [];
    for (let i = 0; i < dataList.length; i += 3) {
      arr.push(dataList.slice(i, i + 3));
    }
    setArray(arr);
    console.log(array);
  };
  useEffect(() => {
    gridArray();
  }, [dataList]);
  ////infiniteloader //fetch data
  function isRowLoaded({ index }) {
    return !!dataList[index];
    // return !!array[index];
  }

  const loadRows = async () => {
    console.log("fetching 함수 loadRows 호출됨");

    try {
      const res = await axios.get(`${path}?${search}&lastCursor=&size=30`);
      const data = res.data.data.modelList;
      setDataList([...data]);

      setLastCursor(res.data.data.lastCursor);
      console.log(dataList.length);
      console.log("lastCursor ? ", lastCursor);
      //   ref.current = false;
      dataList && gridArray();
    } catch {
      console.error("fetching error");
    }
    setState(false);
  };
  const loadMoreRows = async () => {
    console.log("fetching 함수 호출됨");
    if (lastCursor !== undefined) {
      const url2 = `${path}?${search}&lastCursor=${lastCursor}&size=30`;

      try {
        const res = await axios.get(url2);
        const data = res.data.data.modelList;

        setDataList([...dataList, ...data]);
        // for (let i = 0; i < data.length; i += 3) {
        //   array.push(data.slice(i, i + 3));
        // }

        setLastCursor(res.data.data.lastCursor);
        dataList && gridArray();
        console.log(dataList.length);
        console.log("lastCursor ? ", lastCursor);
      } catch {
        console.error("fetching error");
      }
    }
  };
  useEffect(() => {
    navigate({ search: search });
    // ref.current ? loadRows() : loadMoreRows();
    state ? loadRows() : loadMoreRows();
  }, [queryString.categoryCode, queryString.sort]);

  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) {
    return (
      <div key={key} style={style}>
        <SmallColumnCard data={dataList} index={index} />
      </div>
    );
  }

  function cellRenderer({ columnIndex, rowIndex, style }) {
    return (
      <div style={style}>
        <ThumbnailCard
          data={array}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
        />
      </div>
    );
  }

  const handleClick1 = () => {
    setQueryString({ ...queryString, categoryCode: "2032" });
    // setDataList([]);
    setState(true);
  };

  const handleClick2 = () => {
    setQueryString({ ...queryString, categoryCode: "1" });
    // setDataList([]);
    setState(true);
  };
  const handleClick3 = () => {
    setQueryString({ ...queryString, sort: "price_desc" });
    // setDataList([]);
    setState(true);
  };
  const handleGrid = () => {};
  //

  return (
    <div style={{ height: "100vh" }}>
      <div>
        <button onClick={handleClick1}>아이언</button>
        <button onClick={handleClick2}>드라이버</button>
        <button onClick={handleClick3}>평균가 높은 순</button>
        <button onClick={handleGrid}>그리드/리스트</button>
        <FilterBar
          setQueryString={setQueryString}
          queryString={queryString}
          setState={setState}
        />
      </div>
      <AutoSizer disableHeight>
        {({ width }) => (
          <InfiniteLoader
            isItemLoaded={(index) => index < dataList.length}
            loadMoreItems={loadMoreRows}
            itemCount={dataList.length + 1}
          >
            {({ onItemsRendered, ref }) => {
              // onItemsRendered는 Grid가 아닌 List를 사용하면 <List onItemsRendered={onItemsRendered} />이렇게 넘겨주면 됩니다.
              // 그러나 Grid를 사용하면 리스트의 바닥에 스크롤이 도달해도 자동으로 onItemsRendered가 실행 되지 않습니다. 그래서 아래처럼 임의 함수를 만들어서 <Grid onItemsRendered={newItemsRendered} /> 형태로 넘깁니다.

              const newItemsRendered = (gridData) => {
                const useOverscanForLoading = true;
                const {
                  visibleRowStartIndex,
                  visibleRowStopIndex,
                  visibleColumnStopIndex,
                  overscanRowStartIndex,
                  overscanRowStopIndex,
                  overscanColumnStopIndex,
                } = gridData;

                const endCol =
                  (useOverscanForLoading || true
                    ? overscanColumnStopIndex
                    : visibleColumnStopIndex) + 1;

                const startRow =
                  useOverscanForLoading || true
                    ? overscanRowStartIndex
                    : visibleRowStartIndex;
                const endRow =
                  useOverscanForLoading || true
                    ? overscanRowStopIndex
                    : visibleRowStopIndex;

                const visibleStartIndex = startRow * endCol;
                const visibleStopIndex = endRow * endCol;

                onItemsRendered({
                  //call onItemsRendered from InfiniteLoader so it can load more if needed
                  visibleStartIndex,
                  visibleStopIndex,
                });
              };
              return (
                <div>
                  {/* <List
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        width={width} // 전체 크기
                        height={height} // 전체 높이 windowScroller의 height는 The height of the viewport.
                        rowCount={dataList.length} // 항목 개수
                        rowHeight={120} // 항목 높이
                        rowRenderer={rowRenderer} // 항목 렌더링 시 쓰는 함수
                        style={{ padding: "16px" }} // 전체 스타일 지정
                        //   srcollTop={ref.current && 0}
                        scrollToIndex={state && 0} //스크롤 위치 복원할 때 사용 가능
                        //특정 아이템의 position top 위치를 넣어주면 해당 top 위치를 가진 데이터를 최상단으로 올려준다
                        //   deferredMeasurementCache={cache}
                      /> */}
                  <Grid
                    onItemsRendered={newItemsRendered}
                    ref={ref}
                    itemCount={array.length + 1}
                    itemData={array}
                    columnCount={3}
                    columnWidth={width / 3}
                    height={window.visualViewport.height}
                    rowCount={array.length} //불러올 데이터 항목 개수
                    rowHeight={130}
                    width={width}
                  >
                    {cellRenderer}
                  </Grid>
                </div>
              );
            }}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};

//grid, list css로 설정 안 됨. grid의 경우 데이터를 이차원 배열로 만들어준 다음 렌더해야함. It is not common to use InfiniteLoader and Grid together ...
//infiniteLoader: api로 data fetch하는 용도
//infiniteLoader에서는 scrollToIndex가 먹질 않는다. 또한 scrollToIndex는 해당 index의 아이템을 화면의 최하단으로 스크롤해주는 기능이라서 우리가 생각하는 정확한 위치로 이동시켜주지는 못한다는 한계점이 있다.
//scrollTop: 개별 아이템마다 position top 위치가 저장되는데 해당 아이템의 top 위치(px)를 넣어주면 그 아이템을 최 상단으로 스크롤해준다.
//state의 값에 따라 호출하는 함수를 다르게 설정한다.
//state===true ? 초기데이터 30개 호출+스크롤위치 최상단(필터버튼) : 그 다음 데이터 30개 호출 (스크롤)
//본 라이브러리에서는 window.scrollTo가 먹히지 않는다.
