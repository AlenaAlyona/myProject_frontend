import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Jumbotron } from "react-bootstrap";

export default function HomePage() {
  return (
    <div>
      <Jumbotron fluid>
        <h1>Welcome to TALKIE</h1>
        <p>
          It's much easier to learn the language when you have friends who also
          speak it! Welcome to TALKIE, a nice place where multilingual families
          can meet each other! We understand how sometimes it can be challenging
          to maintain kids' interest in one of the mothertongues when you live
          in a country where language is different. Our mission is to help you
          and your children to broad your horizone, practice your mothertongue
          and make new friends. With love and care, team TALKIE.
        </p>
        <div className="buttons">
          <p>first time at our place?</p>
          <Link to={`/signup`}>
            <Button>Sign Up</Button>
          </Link>{" "}
          <p>Already have an account?</p>
          <Link to={`/login`}>
            <Button>Log In</Button>
          </Link>
        </div>
      </Jumbotron>
    </div>
  );
}
