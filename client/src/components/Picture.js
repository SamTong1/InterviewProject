import React, { useState } from "react";

const Picture = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <img src={data.src.large} alt="圖片資訊" />
      </div>
      <p>
        在此下載圖片:
        <a taget="_blank" href={data.src.large}>
          按一下
        </a>
      </p>
    </div>
  );
};

export default Picture;
