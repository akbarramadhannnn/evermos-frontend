import React, { memo } from "react";

const TextPrice = ({ children }) => {
  return <h2 className="text-price">Rp {children}</h2>;
};

export default memo(TextPrice);
