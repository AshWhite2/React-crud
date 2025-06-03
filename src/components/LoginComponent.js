import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { loginUser } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(loginUser(email, password));
    if (success) navigate("/"); 
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" block type="submit">
              Login
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Belum punya akun ? <a href="/register">Daftar disini</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
