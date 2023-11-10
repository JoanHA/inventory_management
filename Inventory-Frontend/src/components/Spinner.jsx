import React from "react";

function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100 mt-5 py-5">
      <div className="spinner-grow text-primary" role="status" style={{width:"100px",height:"100px"}}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-success" role="status"  style={{width:"100px",height:"100px"}}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-primary" role="status"  style={{width:"100px",height:"100px"}}>
        <span className="visually-hidden">Loading...</span>
      </div>
      
    </div>
  );
}

export default Spinner;
