import React, { Fragment } from "react";

const Index = ({ image = "", imageList = [], onClick = () => {} }) => {
  return (
    <Fragment>
      {image && <img className="img" src={image} />}
      <div className="slider">
        <div className="wrap-slider">
          {imageList.map((img, i) => (
            <div key={i} className="item" onClick={() => onClick(img)}>
              {image === img && <div className="overlay"></div>}
              <img className="img-slider" src={img} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
