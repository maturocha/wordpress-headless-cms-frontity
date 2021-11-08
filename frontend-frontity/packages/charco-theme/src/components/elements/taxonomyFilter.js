import React from "react";
import { connect, styled } from "frontity";

/**
 * Taxnonomy Component
 *
 * It renders the categories of a CPT
 */
const taxonomyFilter = ({ state, actions, postType, taxonomy }) => {

  const items = state.source[taxonomy];

  return (
    <FilterList>
    {
    Object.values(items)
      // Get the url and width of each size.
      .map((taxonomyItem) => {
        return <FilterItem onClick={() => actions.theme.setFilter(postType, taxonomyItem.id)} key={taxonomyItem.id}>{taxonomyItem.name}</FilterItem>
      })
      }
      </FilterList>
  );

};

// Connect the Item to gain access to `state` as a prop
export default connect(taxonomyFilter);

const FilterList = styled.ul`
  line-height: 1.5rem;
  padding: 0;
  margin: .5rem 0;
  list-style-type: none;
  max-width: 100%;
  box-sizing: border-box;
`
const FilterItem = styled.li`
  text-transform: uppercase;
  font-weight: 600;
  margin-right: 16px;
  cursor: pointer;
  display: inline-block;

  &:last-item {
    margin-right: 0;
  }
`