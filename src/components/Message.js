import React, { memo, Fragment } from "react";

const Message = ({ text }) => {
  return <Fragment>{text && <p className="message">{text}</p>}</Fragment>;
};

export default memo(Message);
