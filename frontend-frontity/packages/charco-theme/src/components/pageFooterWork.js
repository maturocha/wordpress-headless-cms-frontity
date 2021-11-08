import React from "react";
import { connect, styled } from "frontity";

const PageFooterWork= ({ data, libraries }) => {

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  return (
    <>
      {data && <Html2React html={data} />}
    </>
    );

  }

  export default connect(PageFooterWork);