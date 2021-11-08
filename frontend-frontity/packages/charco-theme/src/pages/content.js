import React from "react";
import { connect, styled } from "frontity";
import PageHeader from "../components/PageHeader";
import PageContent from "../components/pageContent";

const Content = ({ state }) => {

  const data = state.source.get(state.router.link);
  const page = state.source[data.type];
  
  return (
    <>
      <PageHeader
        title={page.title.rendered}
        subtitle={page.excerpt.rendered}
      />
      <PageContent
        text={page.content.rendered}
      />
    </>
  );
};

export default connect(Content);