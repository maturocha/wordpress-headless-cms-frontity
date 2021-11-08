import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import FeaturedMediaSquare from "./featured-media-square";

/**
 * Related Component
 *
 * It renders the realed posts of a CPT
 */
const RelatedPosts = ({ state, title, items, postType }) => {

  const data = state.source.get(state.theme.cpt_1);

  return ((data.isReady ) && (items.length > 0)) ? (
    <RelatedWrapper>
      <h3>{title}</h3>
      <RelatedGrid>
    {
      items.map((id) => {  
        const postData = state.source[postType];
        return (
          <RelatedItem link={postData[id].link} key={id}>
            <FeaturedMediaSquare id={postData[id].featured_media} />
          </RelatedItem>
        );
      })
    }
     </RelatedGrid>
    </RelatedWrapper>
  ) : null;
};

const RelatedWrapper = styled.div`
  margin-top: 32px;
`

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;
  }
`

const RelatedItem = styled(Link)`
  margin-top: 0;
  display: block;
  margin-bottom: 16px;

  & img {
    transition: box-shadow 0.3s ease;
  }

  &:hover img {
    box-shadow: 4px 4px 18px 0 rgba(168,167,166,1);
  }
`

// Connect the Item to gain access to `state` as a prop
export default connect(RelatedPosts);