import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Jumbotron } from "react-bootstrap";

import { selectToken } from "../store/user/selectors";
import { logOut } from "../store/user/actions";

export default function HomePage() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  return (
    <div className="homepage">
      {/* <Jumbotron className="jumbotron" fluid> */}
      <div className="textHome">
        <h1>Welcome to TALKIE</h1>
        <br />
        <p>
          It's much easier to learn the language when you have friends who also
          speak it!
          <br />
          Welcome to TALKIE, a nice place where multilingual families can meet
          each other!
          <br /> We understand how sometimes it can be challenging to maintain
          kids' interest in one of the mothertongues when you live in a country
          where people speak different language. Our mission is to help you and
          your children to broad your horizone, practice your mothertongue and
          make new friends. <br /> With love and care, team TALKIE.
        </p>
        {!token ? (
          <span className="buttonsHome">
            <Link to={`/signup`}>
              <Button>Sign Up</Button>
            </Link>{" "}
            <Link to={`/login`}>
              <Button>Log In</Button>
            </Link>
          </span>
        ) : (
          <Button onClick={() => dispatch(logOut())}>Logout</Button>
        )}
      </div>
    </div>
  );
}
