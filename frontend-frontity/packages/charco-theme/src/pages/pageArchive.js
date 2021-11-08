import { connect, styled } from "frontity";
import React from "react";
import Card from "../components/cards"
import FilterTaxonomy from "../components/elements/taxonomyFilter";

import { motion, AnimatePresence } from "framer-motion"


const PageArchive = ({ state, filterTaxonomy, plural }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);

  return (
    <>
    {filterTaxonomy &&
      <FilterTaxonomy postType={data.type} taxonomy={filterTaxonomy} />
    }
      <Row>
        <AnimatePresence>
        {data.items.map(({ type, id }, index) => {
          const item = state.source[type][id];
          // Render one Item component for each one.
          let totalTaxonomies = item[plural];
          let element = state.theme.filter[data.type];
          
          return ( (!filterTaxonomy) ||
                    (element == undefined) ||
                    (totalTaxonomies.indexOf(element) > -1)   
                ) ? (
              <Card 
                postType={type} 
                id={item.id}
                key={item.id} />
          ) : null;
        })}
        </AnimatePresence>
      </Row>
    </>
  );
};

export default connect(PageArchive);

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
  }

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;
  }  
`