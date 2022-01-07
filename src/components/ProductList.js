import React, { memo } from "react";
import Link from "next/link";

const Index = ({ data }) => {
  return (
    <Link href="/details">
      <div className="card-product">
        <div className="img-box">
          <img src={data.image} alt="img-product" />
        </div>

        <div className="content">
          <div className="area-section">
            <h1>{data.name}</h1>
          </div>

          <div className="area-section">
            <h2>Rp {data.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(Index);
