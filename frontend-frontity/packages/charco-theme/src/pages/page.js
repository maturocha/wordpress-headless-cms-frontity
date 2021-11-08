import React from "react";
import { connect, styled } from "frontity";
import Heading from "../components/pageHeader";
import Content from "../components/pageContent";

const Page =  ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  const page = state.source[data.type][data.id];

  return (
    <>
      <Heading
        title={page.title.rendered}
      />
      <Content
        text={page.content.rendered}
      />
    </>
  );
};

export default connect(Page);