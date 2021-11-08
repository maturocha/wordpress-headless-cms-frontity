import React from "react";
import { connect } from "frontity";

const Home = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const page = state.source[data.type][data.id];

  var pageContent = '';

  //Get language content
  if (page.polylang_current_lang != state.theme.language) {
    page.polylang_translations.map(({locale, id}) => {
      if (locale == state.theme.language) {
        let newHomeLink =  `pages/${id}`;
        actions.source.fetch(newHomeLink);
        pageContent = state.source.page[id]
      }
      })
  } else {
    pageContent = page;
  }

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;
  
  return (data.isReady && pageContent != undefined) ? (
    <>
      <Html2React html={pageContent.content.rendered} />
    </>
   ) : null;
};

export default connect(Home);