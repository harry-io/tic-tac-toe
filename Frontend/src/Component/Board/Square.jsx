import React from "react";

const Square = ({ chooseSquare, val }) => {
  return (
    <div
      onClick={chooseSquare}
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "aliceblue",
        border: "1px solid red",
      }}
    >
      {val}
    </div>
  );
};

export default Square;
