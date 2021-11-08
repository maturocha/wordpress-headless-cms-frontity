import React from "react";
import { connect, styled } from "frontity";

const PageContent= ({ text, libraries }) => {

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  return (
    <>
      <Html2React html={text} />
    </>
  );

}

export default connect(PageContent);