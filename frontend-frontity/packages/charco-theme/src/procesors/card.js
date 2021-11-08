import Card from "../components/cards";

const card = {
  // We can add a name to identify it later.
  name: "card",

  // We can add a priority so it executes before or after other processors.
  priority: 10,

  // Only process the node it if it's an image.
  test: ({ node }) => node.component === "div" && /card-component/.test(node.props.className),

  processor: ({ node }) => {  

    node.component = Card;
    node.props.postType = node.props.cardtype;
    node.props.id = node.props.postid;

    return node
  }
};

export default [card];

