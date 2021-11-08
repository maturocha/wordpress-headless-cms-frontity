import React, { useEffect } from "react";
import { Global, css, connect, styled, Head } from "frontity";
import WpCss from "../styles/wp.css"
import Loading from "./loading";
import Header from "./header";
import Footer from "./footer";
import Home from "../pages/home";
import Page from "../pages/page";
import Work from "../pages/work";
import PageArchive from "../pages/pageArchive";
import Error from "../pages/error";

const Theme = ({state, actions}) => {
  
  const data = state.source.get(state.router.link); 
  const settings = state.source.get(state.theme.settings_endpoint);

  useEffect(() => {
    //Download works on state
  }, [])

  return (
    <>
      <Head>
        <html lang="en" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
        <link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@200;400;500&display=swap" rel="stylesheet" />
      </Head>

      <Global styles={globalStyles} />
      <Global styles={WpCss} />

      <Header />
      <Main>
        {data.isFetching && <Loading />}
        {data.isHome && <Home />}
        {!data.isHome && data.isPage && <Page />}
        {data.isWork && <Work />}
        {data.isWorkArchive && <PageArchive filterTaxonomy="category" plural="categories"/>}
        {data.isContentArchive && <PageArchive filterTaxonomy={false} plural="categories" />}
        {data.isError && <Error />}
      </Main>
      <Footer />
    </>
  );
};

const Main = styled.main`
  width: 100%;
  padding: 0 16px;
  flex: 1 0 auto;
`;

const globalStyles = css`

  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-family: "Barlow Semi Condensed", Arial, Helvetica, sans-serif;
    font-weight: 400;
    margin: 0;
    color: #5c5b5b;
    min-height: 100vh;
  }

  #root {
    width: 1170px;
    margin: 0 auto;
    max-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  a,
  a:visited {
    color: #5c5b5b;
    text-decoration: none;
  }

  p {
    margin-top: 0;
  }
`;

export default connect(Theme);