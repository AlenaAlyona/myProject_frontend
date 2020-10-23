import React, { useState, useEffect } from "react";
import "./mainpage.css";
import { Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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

  const token = useSelector(selectToken);
  const allLangs = useSelector(selectAllLangs);
  const usersWithLang = useSelector(selectUsersWithLang);

  if (token === null) {
    history.push("/");
  }

  useEffect(() => {
    dispatch(fetchAllLangs());
    dispatch(fetchUsersWithLang(languageId));
    const container = document.getElementById("profile-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  }, [dispatch, languageId]);

  const getUsersWithLangs = (event) => {
    event.preventDefault();
    setLanguageId(parseInt(event.target.value));
  };

  return (
    <div className="mainImage">
      <Container>
        {" "}
        <Form.Group controlId="formBasicLanguage">
          <div className="label">
            <Form.Label>
              <h3>Select Language</h3>
            </Form.Label>

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
          </div>
        </Form.Group>
        <div id="profile-container">
          {usersWithLang.map((user) => {
            return (
              <UserTemplate
                key={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                cityName={user.city.name}
                bio={user.bio}
                children={user.children}
                email={user.email}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}
