import React from 'react';
import {Carousel}  from 'react-carousel-minimal';
import { useSelector } from "react-redux";
import { useEffect} from "react";


export default function CarouselImg (img) {

  let detail = useSelector((state) => state.detail);
  let data2 = detail.images?.map(e => ({image: e, caption:""} ));
    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }

      useEffect(() => {
        data2=[];
      }, []);

    return (
    
        
          <Carousel
            data={data2}
            time={2000}
            width="150vw"
            height="75vh"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={false}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={false}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
          />
       
 
    );
};

