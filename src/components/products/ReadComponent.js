import React, { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../api/todoApi";
import { getOne } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import useCustomMove from "../../hooks/UseCustomMove";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  pno: 0,
  name: "",
  description: "",
  price: 0,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

function ReadComponent({ pno }) {
  const [product, setProduct] = useState(initState);

  const { moveToList, moveToModify } = useCustomMove(); //화면 이동 기능

  const [fetching, setFetching] = useState(false); //fetching modal

  const { changeCart, cartItems } = useCustomCart(); //장바구니 기능

  const { loginState } = useCustomLogin(); //로그인 정보

  const handleClickAddCart = () => {
    let qty = 1;

    //장바구니 목록에서 해당 상품 찾기
    const addedItem = cartItems.filter((item) => item.pno === parseInt(pno))[0];

    if (addedItem) {
      if (
        window.confirm("이미 추가된 상품입니다. 추가하시겠습니까?") === false
      ) {
        return; //취소 선택
      } else {
        //추가 선택 or 장바구니에 없는 상품
        qty = addedItem.qty + 1;
      }
    }

    changeCart({ email: loginState.email, pno: pno, qty: qty });
  };

  useEffect(() => {
    setFetching(true); //active fetching modal

    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false); //inactive fetching modal
    });
  }, [pno]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}

      {/* 상품 번호 (pno) */}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pno}
          </div>
        </div>
      </div>

      {/* 상품명 {name} */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">NAME</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.name}
          </div>
        </div>
      </div>

      {/* 상품 가격 (price) */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">PRICE</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.price}
          </div>
        </div>
      </div>

      {/* 상품 설명 (description) */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DESCRIPTION</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.description}
          </div>
        </div>
      </div>

      {/* 업로드된 이미지 */}
      <div className="w-full justify-center flex  flex-col m-auto items-center">
        {product.uploadFileNames.map((imgFile, i) => (
          <img
            alt="product"
            key={i}
            className="p-4 w-1/2"
            src={`${host}/api/products/view/${imgFile}`} //request to viewFileGET
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-green-500"
          onClick={handleClickAddCart}
        >
          Add Cart
        </button>
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32  text-white bg-red-500"
          onClick={() => moveToModify(pno)}
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

export default ReadComponent;
