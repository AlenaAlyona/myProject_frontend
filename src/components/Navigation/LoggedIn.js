import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();
  return (
    <>
      <li className="nav-text" onClick={() => dispatch(logOut())}>
        <Link>
          <AiIcons.AiOutlineLogout /> <span>Logout</span>
        </Link>
      </li>
    </>
  );
}
