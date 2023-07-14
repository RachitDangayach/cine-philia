import React from "react";
import { Pagination } from "@mui/material";

function CustomPagination(props){
    function handlePageChange(page){
        props.setPage(page);
        window.scroll(0, 0);
    }

    return (
        <div
         style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10
         }} >
                <Pagination sx={{button:{color: "white", fontWeight: "bold"}}}
                color="primary"
                variant="outlined"
                onChange={(event) => handlePageChange(event.target.textContent)}
                count={props.numOfPages}
                hideNextButton
                hidePrevButton 
                />
         </div>
    );
}

export default CustomPagination;