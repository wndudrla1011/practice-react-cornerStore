import React from "react";

// serverData: 서버로부터 받은 모든 데이터
// movePage: 페이지 이동 함수
function PageComponent({ serverData, movePage }) {
  return (
    <div className="m-6 flex justify-center">
      {/* ----- 이전 페이지 ----- */}
      {serverData.prev ? (
        <div
          className="m-2 p-2 w-16 text-center font-bold text-blue-400"
          onClick={() => movePage({ page: serverData.prevPage })}
        >
          Prev
        </div>
      ) : (
        <></>
      )}

      {/* ----- 전체 페이지 번호 ----- */}
      {serverData.pageNumberList.map((pageNum) => (
        <div
          key={pageNum}
          className={`m-2 p-2 w-12  text-center rounded shadow-md text-white ${
            serverData.current === pageNum ? "bg-gray-500" : "bg-blue-400"
          }`}
          onClick={() => movePage({ page: pageNum })}
        >
          {pageNum}
        </div>
      ))}

      {/* ----- 다음 페이지 ----- */}
      {serverData.next ? (
        <div
          className="m-2 p-2 w-16 text-center font-bold text-blue-400"
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          Next
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PageComponent;
