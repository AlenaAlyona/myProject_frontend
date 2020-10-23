import React, { useState } from "react";
import "./navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";

import { selectToken } from "../../store/user/selectors";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

function Navbar() {
  const token = useSelector(selectToken);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <NavLink className="title" to="/">
            <h4>TALKIE</h4>
          </NavLink>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {token ? null : (
              <li className="nav-text">
                <Link to="/signup">
                  <RiIcons.RiUserAddLine />
                  <span>Sign Up</span>
                </Link>
              </li>
            )}
            {token ? (
              <li className="nav-text">
                <Link to="/">
                  <AiIcons.AiOutlineHome />
                  <span>Home</span>
                </Link>
              </li>
            ) : null}
            {token ? (
              <li className="nav-text">
                <Link to="/main">
                  <AiIcons.AiOutlineSearch />
                  <span>Playmate Search</span>
                </Link>
              </li>
            ) : null}
            {token ? (
              <li className="nav-text">
                <Link to="/chat">
                  <BiIcons.BiChat />
                  <span>Chat</span>
                </Link>
              </li>
            ) : null}
            {loginLogoutControls}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
