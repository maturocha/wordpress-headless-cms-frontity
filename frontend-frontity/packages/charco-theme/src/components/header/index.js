import React from "react";
import { connect, styled } from "frontity";
import Menu from "./navigation";
import Link from "../elements/link";
import Logo from "../elements/logo-media";

const Header = ({ state }) => {

  const settings = state.source.get(state.theme.settings_endpoint);

  return (
    <HeaderWrapper textColor={state.theme.colors}>
      <StyledLink link="/">
        {settings.isReady &&
          <Logo id={settings.data.logo_id} />
        }
      </StyledLink>
      <Menu />
    </HeaderWrapper>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 0 16px;
  margin: 16px 0;
  display: flex;
  justify-content: space-between;  
  color: ${(props) => props.primary};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  z-index: 9999;
`;