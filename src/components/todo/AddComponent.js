import React, { useState } from "react";
import ResultModal from "../common/ResultModal";
import { postAdd } from "../../api/todoApi";
import useCustomMove from "./../../hooks/UseCustomMove";

const initState = {
  title: "",
  content: "",
  dueDate: "",
};

function AddComponent() {
  const [todo, setTodo] = useState({ ...initState });

  const [result, setResult] = useState(null); //Modal의 Trigger

  const { moveToList } = useCustomMove();

  //input 값 추적
  const handleChangeTodo = (e) => {
    console.log(e.target.name, e.target.value);

    todo[e.target.name] = e.target.value; //todo[title]

    setTodo({ ...todo });
  };

  //등록 버튼
  const handleClickAdd = () => {
    postAdd(todo).then((result) => {
      //return Map<"TNO", tno>
      setResult(result.TNO); //등록
      setTodo({ ...initState }); //등록 화면 초기화
    });
  };

  //Modal 창 닫기 버튼
  const closeModal = () => {
    setResult(null); //inactive Modal
    moveToList(); //List 화면 이동
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {/* 모달 처리 */}
      {result ? (
        <ResultModal
          title={"등록되었습니다."}
          content={`게시물 번호: ${result}`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="title"
            type={"text"}
            value={todo.title}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Content</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="content"
            type={"text"}
            value={todo.content}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="dueDate"
            type={"date"}
            value={todo.dueDate}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl  text-white "
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddComponent;
