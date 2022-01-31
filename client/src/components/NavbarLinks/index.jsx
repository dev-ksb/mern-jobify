import links from "../../utils/links";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { useAppContext } from "../../context/appContext";

const NavbarLinks = ({ enableToggle }) => {
  const { toggleSidebar } = useAppContext();

  return (
    <div className="nav-links">
      <div className="nav-links">
        {links.map(({ id, path, icon, text }) => (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              classnames("nav-link", isActive && "active")
            }
            onClick={() => enableToggle && toggleSidebar()}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavbarLinks;
