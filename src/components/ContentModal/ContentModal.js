import React, { useEffect, useState } from "react";
import {Modal, Backdrop, Fade, Button} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import YouTubeIcon from '@mui/icons-material/YouTube';
import {img_500, unavailable, unavailableLandscape} from "../config";
import Carousel from "../Carousel/Carousel";
import "./ContentModal.css";

const useStyles = makeStyles({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        width: "75%",
        height: "70%",
        backgroundColor: "#FAF0E6",
        border: "1px solid #FF0038",
        borderRadius: "10px",
        color: "black"
    }
});

function TransitionsModal(props){
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();

    function handleOpen(){
        setOpen(true);
    }

    function handleClose(){
        setOpen(false);
    }

    async function fetchData(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/${props.media_type}/${props.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setContent(data);
    }

    async function fetchVideo(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/${props.media_type}/${props.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        if(data.results[0]) setVideo(data.results[0].key);
    }

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="media"
             style={{cursor: "pointer"}}
             color="inherit"
             onClick={handleOpen}>
             {props.children}
            </div>
            <Modal aria-labelledby="transition-modal-title"
             aria-describedby="transition-modal-description"
             className={classes.modal}
             open={open}
             onClose={handleClose}
             closeAfterTransition
             slots={Backdrop}
             slotProps={{ timeout: 500 }}>
                <Fade in={open}>
                    {content && (
                        <div className={classes.paper}>
                            <div className="ContentModal">
                                <img
                                 src={
                                    content.poster_path? img_500+content.poster_path : unavailable
                                 }
                                 alt={content.title}
                                 className="ContentModal__potrait" />
                                <img
                                 src={
                                    content.backdrop_path? img_500+content.backdrop_path : unavailableLandscape
                                 }
                                 alt={content.title}
                                 className="ContentModal__landscape" />
                                <div className="ContentModal__about">
                                    <span className="ContentModal__title">
                                        {content.title || content.name} ({content.release_date? content.release_date.substring(0,4) : content.first_air_date.substring(0,4)})
                                    </span>

                                    {content.tagline && (
                                        <i className="tagline">{content.tagline}</i>
                                    )}

                                    {content.overview && (
                                        <span className="ContentModal__description">{content.overview}</span>
                                    )}
                                    
                                    <div><Carousel id={props.id} media_type={props.media_type} /></div>

                                    <Button variant="contained"
                                     startIcon={<YouTubeIcon/>}
                                     color="secondary"
                                     target="__blank"
                                     href={`https://www.youtube.com/watch?v=${video}`}>
                                        Watch Trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </>
    );
}

export default TransitionsModal;