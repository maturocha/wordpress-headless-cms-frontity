import React from "react";
import { styled, connect } from "frontity";
import Link from "../elements/link";

const MenuModal = ({ state }) => {
  


  const menu = state.source.get(state.theme.menu_endpoint);
  const isThereLinks = menu != null && menu.length > 0;

  const { isMobileMenuOpen } = state.theme;

  return (
    <MenuOverlay isMobileMenuOpen={isMobileMenuOpen}>
      <MenuContent as="nav">
        {menu.isReady &&
         menu.items.map( ({title, url, id}) => {
          
          return (
            <MenuLink
              key={id}
              link={url}
              aria-current={state.router.link === url ? "page" : undefined}
            >
            {title.rendered}
          </MenuLink>
          );
        })}
      </MenuContent>
    </MenuOverlay>
  );
};

const MenuOverlay = styled.div`
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  opacity: ${props =>
    props.isMobileMenuOpen ? 1 : 0};
  visibility: ${props =>
    props.isMobileMenuOpen ? 'visible' : 'hidden'};
`;

const MenuContent = styled.div`
  z-index: 3;
`;

const MenuLink = styled(Link)`
  width: 100%;
  display: inline-block;
  outline: 0;
  font-size: 20px;
  text-align: center;
  padding: 1.2rem 0;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
  }
  /* styles for active link */
  &[aria-current="page"] {
    color: #5c5b5b;
    font-weight: bold;
  }
`;

export default connect(MenuModal);
