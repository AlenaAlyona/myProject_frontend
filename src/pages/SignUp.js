import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Typography from "@material-ui/core/Typography";
import { signUp } from "../store/user/actions";
import { selectToken } from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { Divider } from "@material-ui/core";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cityId, setCityId] = useState("");
  const [city, setCity] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

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

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Your Password</Form.Label>
          <Form.Control
            value={passwordConfirmation}
            type="password"
            placeholder="Password Confirmation"
            required
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          {password !== passwordConfirmation ? (
            <div style={{ color: "#9E2121", fontSize: 12 }}>
              Passwords don't match
            </div>
          ) : (
            <div style={{ color: "#4F994F", fontSize: 12 }}>
              You're good to go
            </div>
          )}
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

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            type="text"
            placeholder="Enter last name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>City</Form.Label>
          <Form.Control
            as="select"
            custom
            value={city}
            onChange={(event) => setCityId(event.target.value)}
            placeholder="Choose your city"
            required
          >
            <option>1</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicFirstName">
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

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Child's Age</Form.Label>
          <Form.Control
            as="select"
            custom
            value={age}
            onChange={(event) => setAge(event.target.value)}
            placeholder="Your child's age"
            required
          >
            <option>0</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicFirstName">
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
