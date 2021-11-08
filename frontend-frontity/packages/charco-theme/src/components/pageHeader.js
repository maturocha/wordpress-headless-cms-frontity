import React from "react";
import { connect, styled } from "frontity";

import { Title, Subtitle } from "./elements/titles"

const PageHeader= ({ title, subtitle, libraries }) => {

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  return (
    <>
      <Title>{title}</Title>
      {subtitle && 
        <Subtitle>
          <Html2React html={subtitle} />
        </Subtitle>
      }
    </>
  );
}

export default connect(PageHeader);