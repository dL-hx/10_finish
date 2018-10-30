import React from "react";
/* 
内插变量
*/
const AmountBox = ({ text, type, amount }) => {
  return (
    <div className="col">
      <div className="card">
        {/* <div className="card-header bg-success text-white" > */}
        <div className={`card-header bg-${type} text-white`}>{text}</div>
        <div className="card-body">
          {/* 78 */}
          {amount}
        </div>
      </div>
    </div>
  );
};

export default AmountBox;
