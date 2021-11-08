import React from "react";
import { connect, styled } from "frontity";
import Link from "../elements/link";

/**
 * Category Component
 *
 * It renders the categories of a CPT
 */
const Categories = ({ state, items }) => {

  return (items.length > 0) ? (
    <CategoriesWrapper>
    {
      items.map((id, i, arr) => {  
        const category = state.source.category[id];
        const text = category.name + (arr.length - 1 === i ? "" : " -")
        return (
          <Category key={id} dangerouslySetInnerHTML={{ __html: text }} />
        );
      })
    }
    </CategoriesWrapper>
  ) : null;
};

const CategoriesWrapper = styled.div`
`

const Category = styled.span`
  font-size: 0.8rem;
  margin-right: 0.2rem;
`

// Connect the Item to gain access to `state` as a prop
export default connect(Categories);