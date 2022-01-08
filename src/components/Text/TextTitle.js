import React, { memo } from "react";

const TextTitle = ({ children }) => {
  return <h1 className="text-title">{children}</h1>;
};

export default memo(TextTitle);
