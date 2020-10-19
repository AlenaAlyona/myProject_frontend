import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Select from "react-select";

import UserTemplate from "../components/UserTemplate/index";

import { selectToken } from "../store/user/selectors";
import { fetchAllLangs, fetchUsersWithLang } from "../store/language/actions";
import {
  selectAllLangs,
  selectUsersWithLang,
} from "../store/language/selectors";

export default function MainPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [languageId, setLanguageId] = useState(null);
  const [usersWithLangs, setUsersWithLangs] = useState(null);

  const token = useSelector(selectToken);
  const allLangs = useSelector(selectAllLangs);
  const usersWithLang = useSelector(selectUsersWithLang);
  console.log("USER WITH LANGS", usersWithLang);
  useEffect(() => {
    dispatch(fetchAllLangs());
    dispatch(fetchUsersWithLang(languageId));
    // if (token !== null) {
    //   history.push("/");
    // }
    console.log("LANG ID", languageId);
  }, [dispatch, languageId]);

  const getUsersWithLangs = (event) => {
    event.preventDefault();
    console.log("EBENT VALUE", event.target.value);
    setLanguageId(parseInt(event.target.value));
  };

  return (
    <Container>
      {" "}
      <Form.Group controlId="formBasicLanguage">
        <Form.Label>Language</Form.Label>
        <Form.Control
          as="select"
          custom
          onChange={getUsersWithLangs}
          required
          defaultValue=""
        >
          <option value="" disabled>
            Select language
          </option>
          {allLangs.map((l) => {
            return (
              <option value={l.id} key={l.id}>
                {l.lang}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      {usersWithLang.map((user) => {
        return (
          <UserTemplate
            key={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            cityName={user.city.name}
            bio={user.bio}
            children={user.children}
          />
        );
      })}
    </Container>
  );
}
