import React from "react";
import { Global, css, connect, styled } from "frontity";
import Image from "@frontity/components/image";

import Css from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CarouselGallery = ({items}) => {

  if (!items) return null;

  return (
    <>
      <Global styles={css(Css)} />
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        useKeyboardArrows={true}
        autoPlay={true}
        stopOnHover={true}
        swipeable={true}
        dynamicHeight={false}
        emulateTouch={true}
        infiniteLoop={true}
      >
        {
          items.map(item => {
            if (item.component !== 'img') return null
            
            return <Image {...item.props}
              key={item.props["data-id"]}
            />
          })
        }
    </Carousel>
  </>
  );
};

export default connect(CarouselGallery);

