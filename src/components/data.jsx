import { useEffect, useState } from "react";
import { list } from "./dummyData";
import { ThumbnailCard } from "./RenderLayout";

export const Data = () => {
  //Grid용 2차원 배열
  const [array, setArray] = useState([]);
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < list.length; i += 3) {
      arr.push(list.slice(i, i + 3));
    }
    setArray(arr);
  }, []);

  // const arr = [];
  // for (let i = 0; i < array.length; i += 3) {
  //   arr.push(array.slice(i, i + 3));
  // }
  // console.log(array);
  // console.log(arr);
  return <div>{/* <ThumbnailCard data={array} /> */}</div>;
};
