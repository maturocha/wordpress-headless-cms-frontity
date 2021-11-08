import React from "react";
import { connect, styled } from "frontity";

/**
 * Taxnonomy Component
 *
 * It renders the categories of a CPT
 */
const TaxonomiesList = ({ state, title, items, taxonomy }) => {

  const taxonomies = state.source[taxonomy];

  return (items.length > 0) ? (
    <TaxonomyWrapper>
      <TaxonomyTitle>{title}</TaxonomyTitle>
      <TaxonomyList>
        {
          items.map((id, i, arr) => {  
            const taxonomyItem = taxonomies[id];
            return (
              <Taxonomy key={id} dangerouslySetInnerHTML={{ __html: taxonomyItem.name }} />
            );
          })
        }
      </TaxonomyList>
    </TaxonomyWrapper>
  ) : null;
};

const TaxonomyWrapper = styled.div`
`

const TaxonomyTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
`

const TaxonomyList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const Taxonomy = styled.li`
  margin-bottom: 8px;
`

// Connect the Item to gain access to `state` as a prop
export default connect(TaxonomiesList);