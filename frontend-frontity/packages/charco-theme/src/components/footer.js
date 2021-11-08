import React from "react";
import { connect, styled } from "frontity";
import { Row } from "./elements/container";

const Footer = ({ state, libraries }) => {

  const footer = state.source.get(state.theme.footer_endpoint); 
  const Html2React = libraries.html2react.Component;

  return footer.isReady ? (
    <FooterWrapper>
      <Row css={{ borderTop: '1px solid rgb(92 91 91 / .2)', paddingTop: '16px' }}>
        {
          Object.values(footer.columns).map((item, key) => {
            return (
              <Column key={key} dangerouslySetInnerHTML={{ __html: item.rendered }} />
            );
          })
        }
      </Row>
    </FooterWrapper>
  ) : null;

};

export default connect(Footer);

const FooterWrapper = styled.footer`
  width: 100%;
  margin: 24px 0;
  padding: 0 16px;

  h3 {
    margin: 0 0 .5rem;
  }
`

const Column = styled.div`
`