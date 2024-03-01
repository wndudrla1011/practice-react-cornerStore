import React, { useEffect, useState } from "react";
import useCustomMove from "./../../hooks/UseCustomMove";
import { getList } from "../../api/productsApi";
import FetchingModal from "./../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";

const host = API_SERVER_HOST;

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

  const [serverData, setServerData] = useState(initState); //api response

  const [fetching, setFetching] = useState(false); //fetching modal

  useEffect(() => {
    setFetching(true); //active fetching modal

    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data); //setting responses
      setFetching(false); //inactive fetching modal
    });
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      {fetching ? <FetchingModal /> : <></>}

      <div className="flex flex-wrap mx-auto p-6">
        {serverData.dtoList.map((product) => (
          <div
            key={product.pno}
            className="w-1/2 p-1 rounded shadow-md border-2"
            onClick={() => moveToRead(product.pno)}
          >
            <div className="flex flex-col h-full">
              {/* 상품 번호 */}
              <div className="font-extrabold text-2xl p-2 w-full">
                {product.pno}
              </div>
              <div className="text-1xl m-1 p-2 w-full flex flex-col">
                {/* 상품 이미지 썸네일 */}
                <div className="w-full overflow-hidden">
                  <img
                    alt="product"
                    className="m-auto rounded-md w-60"
                    //해당 상품의 0번째 파일의 썸네일 요청 -> viewFileGET
                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                  />
                </div>

                {/* 상품 정보 */}
                <div className="bottom-0 font-extrabold bg-white">
                  <div className="text-center p-1">상품명 : {product.name}</div>
                  <div className="text-center p-1"> 가격 : {product.price}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
}

export default ListComponent;
