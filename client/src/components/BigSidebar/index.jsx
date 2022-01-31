import React from "react";
import Wrapper from "../../assets/wrappers/BigSidebar";
import { useAppContext } from "../../context/appContext";
import classnames from "classnames";
import { Logo } from "..";
import NavbarLinks from "../NavbarLinks";

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={classnames("sidebar-container ", {
          "show-sidebar": !showSidebar,
        })}
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavbarLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
