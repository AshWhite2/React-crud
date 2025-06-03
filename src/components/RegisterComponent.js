import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { registerUser } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(registerUser(userData));
    if (success) navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                placeholder="Nama"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
            </FormGroup>
            
            <Button color="primary" block type="submit">
              Register
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Sudah punya akun ? <a href="/login">Login disini</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;