import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selectors";

export default function UserTemplate(props) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  function submit(event) {
    event.preventDefault();
  }

  return (
    <div className="container">
      <div>
        <h3>
          {props.firstName} {props.lastName}
        </h3>
        <p>{props.cityName}</p>
        <p>{props.bio}</p>
        <div>
          {props.children.map((child) => {
            return <p key={child.id}>Child's age: {child.age}</p>;
          })}
        </div>
        <button>say hi</button>
      </div>
    </div>
  );
}
