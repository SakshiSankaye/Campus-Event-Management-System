import React from "react";
import { FaBell } from "react-icons/fa";

const Header = () => {

  return (
    <div className="header">

      <input
        type="text"
        placeholder="Search Events..."
        className="search-bar"
      />

      <div className="header-icons">

        <FaBell className="icon" />

        <img
          src="/profile.png"
          alt="profile"
          className="profile-icon"
        />

      </div>

    </div>
  );

};

export default Header;