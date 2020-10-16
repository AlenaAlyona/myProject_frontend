import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Select from "react-select";

import { selectToken } from "../store/user/selectors";
import { fetchAllCities } from "../store/city/actions";
import { selectAllCities } from "../store/city/selectors";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cityId, setCityId] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [language, setLanguage] = useState("");
  const [age, setAge] = useState([]);
  const [bio, setBio] = useState("");
  // const [addChild, setAddChild] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const token = useSelector(selectToken);
  const allCities = useSelector(selectAllCities);
  const sortedCities = [...allCities].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const ageOptions = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
  ];

  useEffect(() => {
    dispatch(fetchAllCities());

    if (token !== null) {
      history.push("/");
    }
  }, [dispatch, token, history]);

  function submitForm(event) {
    event.preventDefault();

    console.log(
      "TO BACKEND",
      email,
      password,
      firstName,
      lastName,
      cityId,
      languageId,
      bio,
      age
    );
    dispatch(
      signUp(email, password, firstName, lastName, cityId, languageId, bio, age)
    );
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setCityId("");
    setLanguageId("");
    setBio("");
    setAge("");
  }

  const checkPasswords = () => {
    if (password !== passwordConfirmation) {
      return (
        <div style={{ color: "#9E2121", fontSize: 12 }}>
          Passwords don't match
        </div>
      );
    } else {
      return (
        <div style={{ color: "#4F994F", fontSize: 12 }}>You're good to go</div>
      );
    }
  };

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Signup</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
            autoFocus
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPasswordConfirmation">
          <Form.Label>Confirm Your Password</Form.Label>
          <Form.Control
            value={passwordConfirmation}
            type="password"
            placeholder="Password Confirmation"
            required
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          {password.length === 0 && passwordConfirmation.length === 0
            ? null
            : checkPasswords()}
        </Form.Group>

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            type="text"
            placeholder="Enter first name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            type="text"
            placeholder="Enter last name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            as="select"
            custom
            value={cityId}
            onChange={(event) => setCityId(event.target.value)}
            placeholder="Choose your city"
            required
          >
            {sortedCities.map((c) => {
              return <option key={c.id}>{c.name}</option>;
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicLanguage">
          <Form.Label>Language</Form.Label>
          <Form.Control
            as="select"
            custom
            value={languageId}
            onChange={(event) => setLanguageId(event.target.value)}
            placeholder="Choose your language"
            required
          >
            <option>1</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicAge">
          <Form.Label>Child's Age</Form.Label>

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
        </Form.Group>

        <Form.Group controlId="formBasicBio">
          <Form.Label>About You</Form.Label>
          <Form.Control
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            type="text"
            placeholder="Tell us about yourself and your kid"
            required
          />
        </Form.Group>

        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Sign up
          </Button>
        </Form.Group>
        <Link to="/login">Click here to log in</Link>
      </Form>
    </Container>
  );
}
