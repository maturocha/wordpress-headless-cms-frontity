import React from "react";
import { connect } from "frontity";

const Link = ({
  state,
  actions,
  link,
  className,
  children,
  "aria-current": ariaCurrent,
}) => {
  const onClick = (event) => {
    // Do nothing if it's an external link
    if (link.startsWith("http")) return;

    //If it's mobile close the menu :)
    //if (state.frontity.isMobile) state.theme.isMobileMenuOpen = false;
    state.theme.isMobileMenuOpen = false;

    event.preventDefault();
    // Set the router to the new url.
    actions.router.set(link);

    // Scroll the page to the top
    window.scrollTo(0, 0);

  };

  return (
    <a
      href={link}
      onClick={onClick}
      className={className}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  );
};

export default connect(Link);