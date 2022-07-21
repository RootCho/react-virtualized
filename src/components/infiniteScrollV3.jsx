import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  CellMeasurerCache,
  CellMeasurer,
  InfiniteLoader,
  List,
  AutoSizer,
} from "react-virtualized";

// type RandomImageType = {
//   id: string;
//   author: string;
//   width: number;
//   height: number;
//   url: string;
//   download_url: string;
// };

export const InfiniteScrollV3 = () => {
  const [randomImageList, setRandomImageList] = useState([]);
  const [page, setPage] = useState(1);

  const infiniteLoaderRef = useRef(null);
  const listRef = useRef(null);

  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });

  const isRowLoaded = ({ index }) => {
    return !!randomImageList[index];
  };

  const getRandomImageThenSet = async () => {
    console.log("fetching 함수 호출됨");
    try {
      const { data } = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=7`
      );
      setRandomImageList(randomImageList.concat(data));
    } catch {
      console.error("fetching error");
    }
  };

  useEffect(() => {
    console.log("page ? ", page);
    getRandomImageThenSet();
  }, [page]);

  function rowRenderer({ key, index, parent, isScrolling, isVisible, style }) {
    return (
      <CellMeasurer
        key={key}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <img
          key={randomImageList[index].id}
          src={randomImageList[index].download_url}
          alt="random"
        />
      </CellMeasurer>
    );
  }

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={getRandomImageThenSet}
      rowCount={10000000}
      ref={infiniteLoaderRef}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ width, height }) => (
            <List
              rowCount={randomImageList.length}
              width={width}
              height={height}
              rowHeight={cellMeasurerCache.rowHeight}
              rowRenderer={rowRenderer}
              deferredMeasurementCache={cellMeasurerCache}
              overscanRowCount={2}
              onRowsRendered={onRowsRendered}
              // scrollToIndex={30}
              ref={(el) => {
                listRef.current?.setState(el);
                registerChild(el);
              }}
            />
          )}
        </AutoSizer>
      )}
      <List
        width={window.innerWidth}
        height={window.innerHeight}
        rowCount={randomImageList.length}
        rowHeight={200}
        rowRenderer={rowRenderer}
      />
    </InfiniteLoader>
  );
};
