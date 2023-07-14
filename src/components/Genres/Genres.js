import {Chip} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

function Genres(props){
    function handleAdd(genre){
        props.setSelectedGenres([...props.selectedGenres, genre]);
        props.setGenres(props.genres.filter((g) => g.id !== genre.id));
        props.setPage(1);
    }

    function handleRemove(genre){
        props.setSelectedGenres(props.selectedGenres.filter((selected) => selected.id !== genre.id));
        props.setGenres([...props.genres, genre]);
        props.setPage(1);
    }

    async function fetchGenres(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${props.type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        props.setGenres(data.genres);
    }

    useEffect(() => {
        fetchGenres();
        return () => {
            props.setGenres([]); //unmounting
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div style={{padding: "6px 0"}}>
            {props.selectedGenres.map((genre) => (
                <Chip sx={{margin: "4px"}}
                 color="success"
                 label={genre.name}
                 key={genre.id}
                 clickable
                 size="small"
                 onDelete={() => handleRemove(genre)} />
            ))}

            {props.genres.map((genre) => (
                <Chip sx={{margin: "4px", color: "white", fontWeight: "400", backgroundColor: "#282C35"}}
                 label={genre.name}
                 key={genre.id}
                 clickable
                 size="small"
                 onClick={() => handleAdd(genre)} />
            ))}
        </div>
    );
}

export default Genres;