import React from "react";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";

export default function LoggedOut() {
  return (
    <>
      <li className="nav-text">
        <Link to="/login">
          <AiIcons.AiOutlineLogin />
          <span>Log In</span>
        </Link>
      </li>
    </>
  );
}
