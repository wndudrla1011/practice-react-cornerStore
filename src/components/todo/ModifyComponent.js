import React, { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/UseCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  tno: 0,
  title: "",
  content: "",
  dueDate: "",
  complete: false,
};

function ModifyComponent({ tno }) {
  const [todo, setTodo] = useState(initState);

  const [result, setResult] = useState(null); //Modal의 Trigger

  const { moveToList, moveToRead } = useCustomMove(); //이동 기능들

  useEffect(() => {
    getOne(tno).then((data) => {
      console.log(data);
      setTodo(data);
    });
  }, [tno]);

  //input 값 추적
  const handleChangeTodo = (e) => {
    console.log(e.target.name, e.target.value);

    todo[e.target.name] = e.target.value; //todo[title]

    setTodo({ ...todo });
  };

  //완료 여부
  const handleChangeTodoComplete = (e) => {
    const value = e.target.value;

    todo.complete = value === "Y";

    setTodo({ ...todo });
  };

  //수정
  const handleClickModify = () => {
    putOne(todo).then((data) => {
      console.log("modify result : " + data);
      setResult("수정 성공");
    });
  };

  //삭제
  const handleClickDelete = () => {
    deleteOne(tno).then((data) => {
      console.log("delete result : " + data);
      setResult("삭제 성공");
    });
  };

  //Modal 창 닫기 버튼
  const closeModal = () => {
    if (result === "삭제 성공") {
      moveToList();
    } else {
      moveToRead(tno);
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {result ? (
        <ResultModal
          title={"처리 결과"}
          content={result}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      {/* tno */}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {todo.tno}
          </div>
        </div>
      </div>

      {/* content */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Content</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {todo.content}
          </div>
        </div>
      </div>

      {/* title */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="title"
            type={"text"}
            value={todo.title}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      {/* dueDate */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="dueDate"
            type={"date"}
            value={todo.dueDate}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      {/* complete */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">COMPLETE</div>
          <select
            name="status"
            className="border-solid border-2 rounded m-1 p-2"
            onChange={handleChangeTodoComplete}
            value={todo.complete ? "Y" : "N"}
          >
            <option value="Y">Completed</option>
            <option value="N">Not Yet</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify}
        >
          Modify
        </button>
      </div>
    </div>
  );
}

export default ModifyComponent;
