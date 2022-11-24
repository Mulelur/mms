import * as React from "react";
import styled from "styled-components";
import {
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  Button,
  NavLink,
} from "shards-react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
  const img =
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1316&q=80";

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword === password) {
      const data = {
        email,
        username,
        password,
      };

      try {
        const res = await Axios.post(
          "https://weblinnk-api.herokuapp.com/api/auth/local/register",
          data
        );

        const { jwt } = res.data;

        localStorage.setItem("jwt", jwt);

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <In>
              <h2>Register</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <label htmlFor="#username">Username</label>
                  <FormInput
                    id="#username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="#password">Email</label>
                  <FormInput
                    type="email"
                    id="#email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="#password">Password</label>
                  <FormInput
                    type="password"
                    id="#password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="#password">Confirm Password</label>
                  <FormInput
                    type="confirm-password"
                    id="#confirm-password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormCheckbox
                  // checked={}
                  // onChange={(e) => this.handleChange(e, "orange")}
                  >
                    Remember me
                  </FormCheckbox>
                </FormGroup>
                <FormGroup>
                  <Button style={{ width: "100%" }}>Sign Up</Button>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <P>Already have an account ?</P>
                    <NavLink href="/signin">Sign in</NavLink>
                  </Row>
                </FormGroup>
              </Form>
            </In>
          </Col>
          <Col>
            <Img src={img} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Col = styled.div`
  max-width: calc(100vw / 2);
  width: 100%;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const In = styled.div`
  padding: 4rem 9rem;

  @media only screen and (max-width: 768px) {
    flex-direction: column;

    padding: 3rem 2.1rem;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: contain;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const P = styled.p`
  margin: 0;
  padding: 0;
`;

export default SingUp;
