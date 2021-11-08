import React from "react";
import { connect, styled } from "frontity";
import Link from "../elements/link";

const MenuNav = ({ state, actions }) => {

  const menu = state.source.get(state.theme.menu_endpoint);
  const languages = state.source.languages;

  return menu.isReady ? (
    <NavContainer>
     { menu.items.map( ({title, url, id}) => {

        const isCurrentPage = state.router.link === url;
        
        return (
          <NavItem key={id} textColor={state.theme.colors}>
            {/* If link url is the current page, add `aria-current` for a11y */}
            <Link link={url} aria-current={isCurrentPage ? "page" : undefined}>
              {title.rendered}
            </Link>
          </NavItem>
        );
      })}
      <ul>
        { languages
        // Get the url and width of each size.
        .map(({locale, title}) => {
        return (
            <li key={locale} onClick={() => actions.theme.setLanguage(locale)}>
              {title[state.theme.language]}
            </li>
        );
        })}
      </ul>

    </NavContainer>
  ) : null;

  }

export default connect(MenuNav);

const NavContainer = styled.nav`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  overflow-x: auto;

  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const NavItem = styled.div`
  padding: 0;
  margin-right: 0.5rem;
  color: ${(props) => props.primary};
  font-size: 1em;
  font-weight: bold;
  text-transform: uppercase;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  align-items: center;

  & > a {
    color: ${(props) => props.primary};
    display: inline-block;
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;