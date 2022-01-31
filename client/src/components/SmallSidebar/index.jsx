import React from "react";
import classnames from "classnames";
import Wrapper from "../../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import { Logo } from "..";
import NavbarLinks from "../NavbarLinks";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={classnames("sidebar-container", {
          "show-sidebar": showSidebar,
        })}
      >
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavbarLinks enableToggle={true} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
