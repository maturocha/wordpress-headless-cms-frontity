import React from "react";
import { styled, connect, Global } from "frontity";
import { CloseIcon, HamburgerIcon } from "./menu-icon";
import MenuModal from "./menu-modal";

const MenuMobile= ({ state, actions }) => {
  const { isMobileMenuOpen } = state.theme;
  return (
    <>
      <MenuToggle onClick={actions.theme.toggleMobileMenu} colors={state.theme.colors}>
        {isMobileMenuOpen ? (
          <>
            {/* Add some style to the body when menu is open,
            to prevent body scroll */}
            <Global styles={{ body: { overflowY: "hidden" } }} />
            <CloseIcon color={state.theme.colors.primary} size="20px" />
          </>
        ) : (
          <HamburgerIcon color={state.theme.colors.primary} size="24px" />
        )}
      </MenuToggle>
      {/* If the menu is open, render the menu modal */}
      <MenuModal isMobileMenuOpen />
    </>
  );
}

const MenuToggle = styled.button`
  background-color: ${({colors}) => colors.bodyBg};
  border: 0;
  color: ${({colors}) => colors.primary};
  z-index: 9999;
  display: none;

  @media (max-width: 560px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default connect(MenuMobile);

  