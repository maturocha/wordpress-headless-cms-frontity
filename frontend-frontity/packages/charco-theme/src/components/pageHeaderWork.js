import React from "react";
import { connect, styled } from "frontity";
import { Row } from "./elements/container";
import { Title, Subtitle } from "./elements/titles"
import TaxonomyList from "./elements/taxonomiesList";

const PageHeaderWork= ({ title, subtitle, description, categories, deliverables, libraries }) => {

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  return (
    <WorkHeader>
      <Title dangerouslySetInnerHTML={{ __html:title }} style={{ margin: '16px 0', textTransform: 'uppercase' }} />
      {subtitle && <Subtitle style={{ margin: '16px 0' }}><Html2React html={subtitle} /></Subtitle>}
      <Row>
        <Description>
          {description && <Html2React html={description} />}
        </Description>
        <Row css={{ textAlign: 'right' }}>
          {deliverables && <TaxonomyList title="Deliverables" taxonomy="deliverables" items={deliverables} />}
          {categories && <TaxonomyList title="Categories" taxonomy="category" items={categories} />}
        </Row>
      </Row>
    </WorkHeader>
  );
}

export default connect(PageHeaderWork);

const WorkHeader = styled.div`
  margin-bottom: 32px;
`

const Description = styled.div`
`;