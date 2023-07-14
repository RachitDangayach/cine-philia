import {Badge} from "@mui/material";
import {img_300, unavailable} from "../config"
import ContentModal from "../ContentModal/ContentModal";
import "./SingleContent.css";

function SingleContent(props){
    return (
        <ContentModal media_type={props.media_type} id={props.id} >
          <Badge sx={{ "& .MuiBadge-badge": {fontWeight: "bold"}}}
           badgeContent={props.vote_average}
           color={props.vote_average > 7 ? "success" : "primary"} />
          <img className="poster"
            src={props.poster? img_300+props.poster: unavailable}
            alt={props.title} />
          <b className="title">{props.title}</b>
          <span className="subTitle">
            {props.media_type === "tv" ? "Series" : "Movie"}
            <span className="subTitle">{props.date}</span>
          </span>
        </ContentModal>
    );
}

export default SingleContent;