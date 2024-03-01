import React, { useEffect } from "react";
import { useState } from "react";
import useCustomMove from "./../../hooks/UseCustomMove";
import PageComponent from "../common/PageComponent";
import { getList } from "./../../api/todoApi";

const initState = {
  dtoList: [],
  pageNumberList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

function ListComponent() {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      {serverData.dtoList.map((todo) => (
        <div
          key={todo.tno}
          className="w-full min-w-[400px]  p-2 m-2 rounded shadow-md"
          onClick={() => moveToRead(todo.tno)}
        >
          <div className="flex">
            <div className="font-extrabold text-2xl p-2 w-1/12">{todo.tno}</div>
            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
              {todo.title}
            </div>
            <div className="text-1xl m-1 p-2 w-2/10 font-medium">
              {todo.dueDate}
            </div>
          </div>
        </div>
      ))}

      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
}

export default ListComponent;
