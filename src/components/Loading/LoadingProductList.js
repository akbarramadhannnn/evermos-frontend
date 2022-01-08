import React, { Fragment, memo } from "react";

const Index = () => {
  const FakeArray = Array(8).fill(0);

  return (
    <Fragment>
      {FakeArray.map((_, i) => (
        <div key={i} className="card-product">
          <div className="img-box">
            <div className="skeleton-image"></div>
          </div>

          <div className="content">
            <div className="area-section">
              <div className="skeleton-text"></div>
            </div>

            <div className="area-section">
              <div className="skeleton-text"></div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default memo(Index);
