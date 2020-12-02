import React, { useState, useEffect } from "react";
import "./signup.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Select from "react-select";

import { signUp } from "../store/user/actions";
import { fetchAllCities } from "../store/city/actions";
import { selectAllCities } from "../store/city/selectors";
import { fetchAllLangs } from "../store/language/actions";
import { selectAllLangs } from "../store/language/selectors";
import { ageOptions } from "../config/constants";

const firebase = require("firebase");

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cityId, setCityId] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [age, setAge] = useState([]);
  const [bio, setBio] = useState("");
  const [langOpts, setLangOpts] = useState([]);
  const [registered, setRegistered] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const allCities = useSelector(selectAllCities);
  const allLangs = useSelector(selectAllLangs);

  if (registered) {
    history.push("/login");
  }

  useEffect(() => {
    dispatch(fetchAllCities());
    dispatch(fetchAllLangs());

    if (allLangs.length > 0) {
      const opts = allLangs.map((l) => {
        return { value: `${l.id}`, label: `${l.lang}` };
      });
      setLangOpts(opts);
    } else {
      dispatch(fetchAllLangs());
    }
  }, [dispatch, history, allLangs, setLangOpts]);

  function submitForm(event) {
    event.preventDefault();
    dispatch(
      signUp(
        email,
        password,
        passwordConfirmation,
        firstName,
        lastName,
        cityId,
        languageId,
        bio,
        age,
        function () {
          setRegistered(true);
        }
      )
    );

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        (authRes) => {
          const userObj = {
            email: authRes.user.email,
          };
          firebase
            .firestore()
            .collection("users")
            .doc(email)
            .set(userObj)
            .then((dbError) => {
              console.log(dbError);
              setSignUpError("Failed to add user");
              console.log(signUpError);
            });
        },
        (authError) => {
          console.log(authError);
          setSignUpError("Failed to add user");
        }
      );
  }

  const checkPasswords = () => {
    if (password.length < 6 && password.length > 0) {
      return (
        <div className="signupText" style={{ color: "#9E2121", fontSize: 12 }}>
          Password must contain at least 6 characters
        </div>
      );
    } else if (password !== passwordConfirmation) {
      return (
        <div className="signupText" style={{ color: "#9E2121", fontSize: 12 }}>
          Passwords don't match
        </div>
      );
    } else {
      return (
        <div className="signupText" style={{ color: "#4F994F", fontSize: 12 }}>
          You're good to go
        </div>
      );
    }
  };

  return (
    <div className="imageSignUp">
      <Container className="signupGroup">
        <Form as={Col} md={{ span: 6, offset: 3 }} className="signUpForm">
          <h1 className="signupHeader">Signup</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="signupText">Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Enter email"
              required
              autoFocus
            />
            <Form.Text className="signupFormText">
              We'll never share your email with anyone else
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="signupText">Create Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="must contain at least 6 or more characters"
              required
              minlength="6"
            />
            {password.length > 0 && password.length < 6 ? (
              <div
                className="signupText"
                style={{ color: "#9E2121", fontSize: 12 }}
              >
                Password must contain at least 6 characters
              </div>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formBasicPasswordConfirmation">
            <Form.Label className="signupText">Confirm Password</Form.Label>
            <Form.Control
              value={passwordConfirmation}
              type="password"
              placeholder="Password confirmation"
              required
              minlength="6"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
            {passwordConfirmation.length === 0 ? null : checkPasswords()}
          </Form.Group>

          <Form.Group controlId="formBasicFirstName">
            <Form.Label className="signupText">First Name</Form.Label>
            <Form.Control
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              type="text"
              placeholder="Enter first name"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastName">
            <Form.Label className="signupText">Last Name</Form.Label>
            <Form.Control
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              type="text"
              placeholder="Enter last name"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicCity">
            <Form.Label className="signupText">City</Form.Label>
            <Form.Control
              as="select"
              custom
              onChange={(event) => setCityId(event.target.value)}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select city
              </option>
              {allCities.map((c) => {
                return (
                  <option value={c.id} key={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicLanguage">
            <Form.Label className="signupText">Language</Form.Label>
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
            ) : null}
            <Form.Text className="signupText">
              Choose as many languages as your family speak
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicAge">
            <Form.Label className="signupText">Child's Age</Form.Label>

            <Select
              required
              isMulti
              options={ageOptions}
              onChange={(event) => {
                if (event !== null) {
                  setAge(event.map((e) => e.value));
                } else {
                  setAge([]);
                }
              }}
            />
            <Form.Text className="signupText">
              If you have children of different age, just choose as many options
              as needed
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicBio">
            <Form.Label className="signupText">About You</Form.Label>
            <Form.Control
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              type="text"
              placeholder="Tell us about yourself and your kid"
              required
            />
          </Form.Group>

          <Form.Group className="mt-5">
            <Button constiant="primary" type="submit" onClick={submitForm}>
              Sign up
            </Button>
          </Form.Group>
          <Link className="signupText" to="/login">
            Click here to log in
          </Link>
        </Form>
      </Container>
    </div>
  );
}
