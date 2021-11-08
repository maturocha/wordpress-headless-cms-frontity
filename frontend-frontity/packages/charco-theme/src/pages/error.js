import React from "react";
import { styled, connect } from "frontity";

const description404 = (
  <>
    The page you were looking for could not be found. It might have been
    removed, renamed, or did not exist in the first place. Search for:
  </>
);

// The Error page component
const ErrorPage = ({ state }) => {
  const data = state.source.get(state.router.link);

  const title = "Oops, something bad happened";
  const title404 = "Oops! 404";

  return (
    <>
      {data.is404 ? description404 : ""}
    </>
  );
};

export default connect(ErrorPage);
