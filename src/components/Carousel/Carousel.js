import axios from "axios";
import React, {useState, useEffect} from "react";
import AliceCarousel from "react-alice-carousel";
import {img_300, noPicture} from "../config";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";

function handleDragStart(e){
    e.preventDefault();
}

function Gallery(props){
    const [credits, setCredits] = useState([]);

    const responsive = {
        0: {
            items: 3
        },
        512: {
            items:5
        },
        1024: {
            items: 7
        }
    };

    async function fetchCredits(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/${props.media_type}/${props.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setCredits(data.cast);
    }

    useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
    }, []);

    const items = credits.map((c) => {
        return (
        <div className="carouselItem">
            <img src={c.profile_path ? img_300+c.profile_path : noPicture}
            alt={c.name}
            onDragStart={handleDragStart}
            className="carouselItem__img" />
            <b className="carouselItem__txt">{c.name}</b>
        </div> );
    });

    return (
        <AliceCarousel mouseTracking
         infinite
         disableDotsControls
         disableButtonsControls
         responsive={responsive}
         items={items}
         autoPlay />
    );
}

export default Gallery;