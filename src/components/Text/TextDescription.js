import React, { memo } from "react";

const TextPrice = ({ children }) => {
  return <p className="text-description">{children}</p>;
};

export default memo(TextPrice);
