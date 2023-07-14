import React, {useEffect, useState} from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TvIcon from '@mui/icons-material/Tv';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useNavigate } from "react-router";

const useStyles = makeStyles({
    root: {
      width: "100%",
      position: "fixed",
      bottom: 0,
      zIndex: 100,
    }
  });

  function SimpleBottomNavigation(){
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(value === 0) navigate("/");
        else if(value === 1) navigate("/movies");
        else if(value === 2) navigate("/series");
        else if(value === 3) navigate("/search");
    }, [value, navigate]);

    return (
        <BottomNavigation sx={{bgcolor: "black"}}
         value={value}
         showLabels
         onChange={(event, newValue) => {
            setValue(newValue);
         }}
         className={classes.root} >

         <BottomNavigationAction 
            style={{color: "white"}}
            label="Trending"
            icon={<WhatshotIcon />}
         />

         <BottomNavigationAction 
            style={{color: "white"}}
            label="Movies"
            icon={<MovieCreationIcon />}
         />

         <BottomNavigationAction 
            style={{color: "white"}}
            label="Series"
            icon={<TvIcon />} 
         />

         <BottomNavigationAction 
            style={{color: "white"}}
            label="Search"
            icon={<SearchIcon />}
         />

        </BottomNavigation>
    );
  }

  export default SimpleBottomNavigation;