import React from "react";
import { FaBell, FaUser } from "react-icons/fa";

function Header(){

return(

<div className="header">

  <input
    type="text"
    placeholder="Search"
    className="search"
  />

  <div className="icons">
    <FaBell/>
    <FaUser/>
  </div>

</div>

)

}

export default Header