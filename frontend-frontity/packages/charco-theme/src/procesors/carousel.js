import Carousel from "../components/elements/carousel";

const carousel = {
  // We can add a name to identify it later.
  name: "carousel",

  // We can add a priority so it executes before or after other processors.
  priority: 10,

  // Only process the node it if it's an image.
  test: ({ node }) => node.component === "figure" && /wp-block-gallery/.test(node.props.className),

  processor: ({ node }) => {    
    
    const items = node.children[0].children.map(li => {
      const image = li.children[0].children[0];
      
      // Many WP lazy load plugins move the real "src" to "data-src", so we move it back.
      if (image.props["data-src"])
        image.props.src = node.props["data-src"];
      if (image.props["data-srcset"])
        image.props.srcSet = node.props["data-srcset"];

      return image;
    })

    node.component = Carousel;
    node.props.items = items;

    return node
  }
};

export default [carousel];

