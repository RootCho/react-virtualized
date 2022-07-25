// import { FixedSizeGrid as Grid } from "react-window";
// import { list2 } from "./dummyData";
// import { useState } from "react";
// import InfiniteLoader from "react-window-infinite-loader";

// const Cell = ({ columnIndex, rowIndex, style }) => (
//   <div style={style}>
//     r{rowIndex}, c{columnIndex}
//     {list2[rowIndex][columnIndex].name}
//   </div>
// );
// let itemStatusMap = {};
// const isItemLoaded = (index) => !!itemStatusMap[index];
// const loadMoreItems = (startIndex, stopIndex) => {};
// export const Example = () => (
//   <InfiniteLoader
//     isItemLoaded={isItemLoaded}
//     itemCount={1000}
//     loadMoreItems={loadMoreItems}
//     threshold={50}
//   >
//     <Grid
//       className="Grid"
//       columnCount={3}
//       columnWidth={100}
//       height={window.visualViewport.height}
//       rowCount={list2.length}
//       rowHeight={200}
//       width={400}
//     >
//       {Cell}
//     </Grid>
//   </InfiniteLoader>
// );
