import "./Header.css";
import React from "react";

function Header(){
    return (
        <span onClick={() => window.scroll(0, 0)} className="header">
            Cine Philia
        </span>
    );
}

export default Header;