import React, { useRef, useState } from "react";
import { postAdd } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "./../common/ResultModal";
import useCustomMove from "../../hooks/UseCustomMove";

const initState = {
  name: "",
  description: "",
  price: 0,
  files: [],
};

function AddComponent() {
  const [product, setProduct] = useState(initState);
  const uploadRef = useRef(); //DOM 참조: <input>

  const [fetching, setFetching] = useState(false); //fetching 모달창
  const [result, setResult] = useState(null); //result 모달창

  const { moveToList } = useCustomMove(); //이동을 위한 함수

  //input 값 추적
  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;

    setProduct({ ...product }); //변경 값으로 셋팅
  };

  //등록 버튼
  const handleClickAdd = (e) => {
    console.log(product);

    const files = uploadRef.current.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);

    console.log(formData);

    setFetching(true); //activate

    postAdd(formData).then((data) => {
      setFetching(false); //inactivate
      setResult(data.RESULT);
    });
  };

  //result modal 종료
  const closeModal = () => {
    setResult(null);
    moveToList();
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}

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
          <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="name"
            type={"text"}
            value={product.name}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Description</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="description"
            rows="4"
            onChange={handleChangeProduct}
            value={product.pdesc}
          >
            {product.pdesc}
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="price"
            type={"number"}
            value={product.price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
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
