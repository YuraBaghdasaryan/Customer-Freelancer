import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import "./style.scss";

export const Error: React.FC = React.memo(() => {
  return (
    <div>
      <h1 className="h1">Error:</h1>
      <h1 className="h1">Please try again:</h1>
    </div>
  );
});
