import React, { memo } from "react";
import Link from "next/link";

const Index = ({ data = [], isLoading = true }) => {
  return (
    <Link href="/details">
      <div className="card-product">
        <div className="img-box">
          {isLoading ? (
            <div className="skeleton-image"></div>
          ) : (
            <img src={data.image} alt="img-product" />
          )}
        </div>

        <div className="content">
          <div className="area-section">
            {isLoading ? (
              <div className="skeleton-text"></div>
            ) : (
              <h1>{data.name}</h1>
            )}
          </div>

          <div className="area-section">
            {isLoading ? (
              <div className="skeleton-text"></div>
            ) : (
              <h2>Rp {data.price}</h2>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(Index);
