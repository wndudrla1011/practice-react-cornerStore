import React, { useEffect, useRef, useState } from "react";
import { API_SERVER_HOST } from "../../api/todoApi";
import { deleteOne, getOne, putOne } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/UseCustomMove";

const initState = {
  pno: 0,
  name: "",
  description: "",
  price: 0,
  delFlag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

function ModifyComponent({ pno }) {
  const [product, setProduct] = useState(initState);

  const [fetching, setFetching] = useState(false); //fetching modal

  const [result, setResult] = useState(null); //result modal

  const { moveToRead, moveToList } = useCustomMove();

  const uploadRef = useRef();

  //input 값 추적
  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;

    setProduct({ ...product });
  };

  const deleteOldImages = (imageName) => {
    //delete 버튼을 클릭하지 않은 파일들 (삭제 대상x)
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );

    product.uploadFileNames = resultFileNames; //resetting uploadFileNames

    setProduct({ ...product });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files; //new files

    const formData = new FormData();

    //add data to <form>
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]); //new files
    }

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);

    //existing files
    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i]);
    }

    setFetching(true); //active fetching modal

    putOne(pno, formData).then((data) => {
      setResult("수정 성공");
      setFetching(false); //inactive fetching modal
    });
  };

  const handleClickDelete = () => {
    setFetching(true); //active fetching modal

    deleteOne(pno).then((data) => {
      setResult("삭제 성공");
      setFetching(false); //inactive fetching modal
    });
  };

  useEffect(() => {
    setFetching(true); //active fetching modal

    getOne(pno).then((data) => {
      console.log(data);
      setProduct(data); //setting response
      setFetching(false); //inactive fetching modal
    });
  }, [pno]);

  const closeModal = () => {
    if (result === "삭제 성공") {
      moveToList({ page: 1 });
    } else {
      moveToRead(pno);
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}

      {result ? (
        <ResultModal
          title={"처리 결과"}
          content={result}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      {/* 상품명 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pname"
            type={"text"}
            value={product.name}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>

      {/* 상품 설명 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Description</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="pdesc"
            rows="4"
            onChange={handleChangeProduct}
            value={product.description}
          >
            {product.description}
          </textarea>
        </div>
      </div>

      {/* 상품 가격 */}
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

      {/* delFlag */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
          <select
            name="delFlag"
            value={product.delFlag}
            onChange={handleChangeProduct}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
          >
            <option value={false}>사용</option>
            <option value={true}>삭제</option>
          </select>
        </div>
      </div>

      {/* Files */}
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

      {/* uploadFileNames */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Images</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {product.uploadFileNames.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                {/* 삭제할 파일 선택 */}
                <button
                  className="bg-blue-500 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  DELETE
                </button>
                {/* request to viewFileGET */}
                <img alt="img" src={`${host}/api/products/view/s_${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>

        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-orange-500"
          onClick={handleClickModify}
        >
          Modify
        </button>

        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={moveToList}
        >
          List
        </button>
      </div>
    </div>
  );
}

export default ModifyComponent;
