import React from "react";
import { connect } from "frontity";
import Item from "./masonry-item";

const Masonry = ({ data, state }) => {

  return data.isReady ? (
    <>
     { data.items.map( ({id, type}) => {
        const item = state.source[type][id];
        return <Item key={item.id} item={item} />;
     })}

    </>
  ) : null;

  }

  export default connect(Masonry);