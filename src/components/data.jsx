import { useEffect, useState } from "react";
import { list } from "./dummyData";

export const Data = () => {
  const [array, setArray] = useState([]);
  useEffect(() => {
    setArray(list);
  }, []);

  //   for (let index = 0; index < array.length; index++) {
  //     const element = array[index];
  //   }

  // arr[5][2] (null로 초기화하여 생성)
  const arr2 = Array.from(Array(5), () => Array(2).fill(array[1]));
  console.log(arr2);
  return <div>data</div>;
};
