import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Jumbotron } from "react-bootstrap";

export default function HomePage() {
  return (
    <div>
      <Jumbotron>
        <h1>Welcome to Lingua</h1>
      </Jumbotron>
    </div>
  );
}
