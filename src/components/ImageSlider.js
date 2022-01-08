import React, { Fragment, memo, useState, useCallback } from "react";

const Index = ({ image = "", imageList = [], onClick = () => {} }) => {
  const [isLoadedImage, setIsLoadedImage] = useState(false);
  const handleOnLoadImage = useCallback(() => {
    setIsLoadedImage(true);
  }, []);
  return (
    <Fragment>
      <img
        style={{ display: isLoadedImage ? "block" : "none" }}
        className="img"
        src={image}
        onLoad={handleOnLoadImage}
        alt="img"
      />
      {!isLoadedImage && <div className="skeleton-image"></div>}
      <div className="slider">
        <div className="wrap-slider">
          {imageList.map((img, i) => (
            <div key={i} className="item" onClick={() => onClick(img)}>
              {image === img && <div className="overlay"></div>}
              <img className="img-slider" src={img} alt="img" />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default memo(Index);
