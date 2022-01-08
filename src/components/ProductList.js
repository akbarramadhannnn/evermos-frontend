import React, { memo, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ConvertNumber } from "../utils/convert";
import { ReplaceToSlug } from "../utils/replace";

const Index = ({ data = {} }) => {
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  const price = useMemo(() => {
    const convert = ConvertNumber(data.price);
    return convert;
  }, [data.price]);

  const slug = useMemo(() => {
    const slug = ReplaceToSlug(data.title);
    return slug;
  }, [data.title]);

  const handleOnLoadImage = useCallback(() => {
    setIsLoadedImage(true);
  }, []);

  return (
    <Link
      href={{
        pathname: "/[slug]",
        query: {
          slug: slug,
        },
      }}
    >
      <div className="card-product">
        <div className="img-box">
          <img
            style={{ display: isLoadedImage ? "block" : "none" }}
            src={data.image}
            alt="img-product"
            onLoad={handleOnLoadImage}
          />
          {!isLoadedImage && <div className="skeleton-image"></div>}
        </div>

        <div className="content">
          <div className="area-section">
            <h1>{data.title}</h1>
          </div>

          <div className="area-section">
            <h2>Rp {price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(Index);
