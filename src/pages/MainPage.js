import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Select from "react-select";

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

  useEffect(() => {
    dispatch(fetchAllLangs());
    dispatch(fetchUsersWithLang(languageId));

    // if (token !== null) {
    //   history.push("/");
    // }
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
        {/* {console.log("INSIDE TERNARY", langOpts)}
          {allLangs !== null &&
          allLangs.length > 0 &&
          langOpts !== undefined &&
          langOpts.length > 0 ? (
            <Select
              required
              isMulti
              options={langOpts}
              onChange={(event) => {
                if (event !== null) {
                  setLanguageId(event.map((e) => e.value));
                } else {
                  setLanguageId([]);
                }
              }}
            />
          ) : null} */}
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
    </Container>
  );
}
