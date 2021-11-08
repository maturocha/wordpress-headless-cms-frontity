import React from "react";
import { connect, styled } from "frontity";
import MenuNav from "./menu-nav"
import MenuMobile from "./menu-mobile"

const Menu = ({ state }) => {

  return (
    <>
      <MenuMobile />
      <MenuNav />
    </>
  );
};

export default connect(Menu);
