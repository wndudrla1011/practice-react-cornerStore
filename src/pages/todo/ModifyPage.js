import React from "react";
import ModifyComponent from "../../components/todo/ModifyComponent";
import { useParams } from "react-router-dom";

function ModifyPage() {
  const { tno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className={"text-3xl font-extrabold"}>Todo Modify Page</div>

      <ModifyComponent tno={tno} />
    </div>
  );
}

export default ModifyPage;
