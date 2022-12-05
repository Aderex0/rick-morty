import React from "react";

interface Props {
  error: Error;
}

const Error = ({ error }: Props) => {
  return <div data-testid="test-error">{error.message}</div>;
};

export default Error;
