import Theme from "./components";
import CarouselProcessor from "./procesors/carousel";
import CardProcessor from "./procesors/card";

const menuHandler = {
  name: "menus",
  priority: 10,
  pattern: "menus/:id",
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source;
    const { id } = params;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: "menu-items",
      params: {
        menus: id,
        per_page: 100 // To make sure we get all elements
      }
    });

    // 2. get an array with each item in json formatfelipe
    const items = await response.json();
    items.forEach((item) => {
      item.url = item.url.replace(state.source["api"].replace("/wp-json", ""), "")
    })

    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      id,
      items,
      isMenu: true
    });
  }
};

const mediaHandler = {
  name: "media",
  priority: 10,
  pattern: "media/:id",
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source;
    const { id } = params;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: "media/" + id,
    });

    // 2. get an array with each item in json formatfelipe
    const data = await response.json();
   
    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      id,
      data,
      isLogo: true
    });
  }
};

const settingsHandler = {
  name: "settings",
  priority: 10,
  pattern: "site-settings",
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source;
    const { id } = params;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: "site-settings"
    });

    // 2. get an array with each item in json formatfelipe
    const data = await response.json();

    const logo_id = data.logo_id;

    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      id,
      data,
      logo_id,
      isSettings: true
    });
  }
};

const footerHandler = {
  name: "footer",
  priority: 10,
  pattern: "footer",
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source;
    const { id } = params;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: "footer"
    });

    // 2. get an array with each item in json formatfelipe
    const columns = await response.json();

    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      id,
      columns,
      isFooter: true
    });
  }
};

const pagesHandler = {
  name: "pages",
  priority: 10,
  pattern: "pages/:id",
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source;
    const { id } = params;

     // 1. fetch the data you want from the endpoint page
     const response = await api.get({
      endpoint: "pages/" + id,
    });

    // 2. get an array with each item in json formatfelipe
    const data = await response.json();

    const pageId = {
      [id]: data
    }
    // 3. add data to source
    const currentPageData = state.source[data.type];
    Object.assign(currentPageData,
      pageId
    );
  }
};

export default {
  name: "charco-theme",
  roots: {
    theme: Theme    
  },
  state: {
    theme: {
      cpt: {
        "work": "/works",
        "content": "/contents"  
      },
      cpt_1: "/works",
      cpt_2: "/contents",
      language: "en_US",
      settings_endpoint: "site-settings",
      menu_endpoint: "menus/2",
      footer_endpoint: "footer",
      isMobileMenuOpen: false,
      filter: {},
      colors: {
        primary: "#5c5b5b",
        headerBg: "#ffffff",
        footerBg: "#ffffff",
        bodyBg: "#ffffff"
      }
    }
  },
  actions: {
    theme: {
      beforeSSR: ({ actions, state }) => async () => {
        await actions.source.fetch("site-settings");
        var settings = state.source.get(state.theme.settings_endpoint);
        var logo_id = settings.logo_id;
        await actions.source.fetch("media/" + logo_id);

        await actions.source.fetch("menus/2");
        await actions.source.fetch("footer");

        await actions.source.fetch(state.theme.cpt_1);
      },
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      setFilter: ({state}) => (postType, id) => {
        state.theme.filter[postType] = id;
      },
      setLanguage: ({state}) => (locale) => {
        state.theme.language = locale;
      }
      
    }
  },
  libraries: {
    source: {
      handlers: [menuHandler, settingsHandler, mediaHandler, footerHandler, pagesHandler]
    },
    html2react: {
      processors: [...CarouselProcessor, ...CardProcessor]
    }
  }
};