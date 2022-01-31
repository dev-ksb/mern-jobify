import React, { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../../assets/wrappers/Navbar";
import { useAppContext } from "../../context/appContext";
import Logo from "../Logo";

const Navbar = () => {
  const { toggleSidebar, user, logoutUser } = useAppContext();
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={() => toggleSidebar()}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>

          <div className={showDropDown ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
