import React from 'react';
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';




export default function CarouselImg () {

  let detail = useSelector((state) => state.detail);
      
    return (
    
      <Carousel style={{width: "700px"}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.images[0]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.images[1]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.images[2]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.images[3]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.images[4]}
          alt="First slide"
        />
      </Carousel.Item>
      
    </Carousel>
       
 
    );
};

