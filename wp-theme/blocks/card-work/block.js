/**
 * BLOCK: Card Work
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

var { __ } = wp.i18n; // Import __() from wp.i18n
var { registerBlockType, Editable, AlignmentToolbar, BlockControls, InspectorControls, Toolbar } = wp.blocks; // Import registerBlockType() from wp.blocks
var { withAPIData, Component } = wp.element;
var { withDispatch, withSelect } = wp.data;
var compose = wp.compose;

var el = wp.element.createElement;

var mySelectPosts = compose.compose(
	// withDispatch allows to save the selected post ID into post meta
	withDispatch( function( dispatch, props ) {
		return {
      
			setMetaValue: function( metaValue ) {
				dispatch( 'core/editor' ).editPost(
					{ meta: { [ props.metaKey ]: metaValue } }
				);
			}
		}
	} ),
	// withSelect allows to get posts for our SelectControl and also to get the post meta value
	withSelect( function( select, props ) {
		return {
			posts: select('core').getEntityRecords('postType', 'work', { per_page: 20 }),
			metaValue: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.metaKey ],
		}
	} ) )( function( props ) {

    const onChangePost = event => {
      let id = Number(event.target.value);
      //TODO: Set featued img
      //imageObj: imageId ? select("core").getMedia(imageId) : null
      props.setAttributes({ postID: id });
    }

    if (!props.posts) {
      return "Loading...";
    }

    if (props.posts.length === 0) {
      return "No posts";
    }

 
		// options for SelectControl
		var options = [];
 
		// if posts found
		if( props.posts ) {
      //options.push( { value: 0, label: 'Select something' } );
      var option = el(
        'option',
        { value: 0 },
        'Select Post'
      );
      options.push(option);
      
      props.posts.forEach((post) => { // simple foreach loop
      
        option = el(
          'option',
          { value: post.id },
          post.title.rendered
        );
        options.push(option);
      
			});
		} else {

			options.push( el(
        'option',
        { value: 0 },
        'Loading...'
       ));

    }

    
    
    var select = [
      el('h4', {}, 'Card Work'),
      el(
        'select',
        {
          onChange: onChangePost,
          value: props.attributes.postID
        },
        options
      )
    ];

    return select;
 
	}
 
);
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'theme/card-work', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: 'Card Work',
    // Icon for the block
    // Choose from here by default https://developer.wordpress.org/resource/dashicons/
  icon: 'format-image',
  category: 'common',
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Card Component' ),
	],

  attributes: {
    postID: {
      type: 'number',
      default: 0,
      selector: 'div.post'
    },
    featured_src: {
      type: 'string',
      default: 0,
      selector: 'div.img'
    },
  },

	// The "edit" property must be a valid function.
	edit: mySelectPosts,

	// The "save" property must be specified and must be a valid function.
	save: function( props ) {

    const { content, postID } = props.attributes;

    return el('div', {
      className: "card card-component",
      postID : postID,
      cardType: 'work'
    }, '');

	},
} );