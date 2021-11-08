import React from "react";
import { connect, styled, Head } from "frontity";
import Heading from "../components/pageHeaderWork";
import Footer from "../components/pageFooterWork";
import Content from "../components/pageContent";
import RelatedWorks from "../components/elements/related-post";

const Work =  ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  const page = state.source[data.type][data.id];
  
  return (
    <>
      <Heading
        title={page.title.rendered}
        subtitle={page.acf.subtitle}
        description={page.acf.description}
        categories={page.categories}
        deliverables={page.deliverables}
      />
      <Content
        text={page.content.rendered}
      />
      <Footer
        data={page.acf.credits}
        />
      <RelatedWorks
        title="Related Projects"
        items={page.related_works}
        postType={data.type}
      />

    </>
  )
};

export default connect(Work);