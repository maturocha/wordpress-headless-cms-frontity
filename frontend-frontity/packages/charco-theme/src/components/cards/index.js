import React from "react";
import { connect, styled } from "frontity";
import Link from "../elements/link";
import { Title } from "../elements/titles"
import FeaturedMedia from "../elements/featured-media";
import Categories from "./categories";
import { motion, AnimatePresence } from "framer-motion"


/**
 * Card Component
 *
 * It renders a card of a CPT
 * - Article: clickable title of the post
 * - FeaturedMedia: the featured image/video of the post
 * - Title: title of the post
 * - Categories: Render all the categories of the post
 */

const Card = ({ postType, id, state, libraries }) => {

  const data = state.source.get(state.theme.cpt[postType]);
  const postData = state.source[postType];
  
  const Html2React = libraries.html2react.Component; 
  
  return (data.isReady) ? (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      positionTransition
    >
      <CardWrapper link={postData[id].link}>
        <ImageWrapper>
          {postType === 'work' &&
            <FeaturedMedia id={postData[id].featured_media} />
          }
        </ImageWrapper>
        <Content>
          <Title dangerouslySetInnerHTML={{ __html: postData[id].title.rendered }} style={{ margin: 0, textTransform: "uppercase" }} />
          <Categories key={id} items={postData[id].categories} />
        </Content>
      </CardWrapper>
    </motion.article>
  ) : null;
}

export default connect(Card);

const Content =  styled.div`
  position: absolute;
  color: white;
  z-index: 9;
  bottom: 0;
  padding: 32px;
  transition: all 0.3s ease;
  opacity: 0;

  a:hover & {
    opacity: 1;
  }
`

const CardWrapper = styled(Link)`
  margin-top: 0;
  margin-bottom: 16px;
  display: block;
  position: relative;

  & img {
    transition: all 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:hover figure:before {
    opacity: 1;
  } 
`
  
const ImageWrapper = styled.figure`
  position: relative;
  margin: 0;
  overflow: hidden;
  
  &:before {
    z-index: 1;
    content: "";
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    background: radial-gradient(ellipse at bottom left, rgba(92,91,91,0.5) 0%, rgba(92,91,91,0.296437324929972) 30%, rgba(255,255,255,0) 60%);
    opacity: 0;
    transition: all .3s ease;
  }
`