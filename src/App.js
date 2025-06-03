import React, { Component } from "react";
import NavbarComponent from "./components/NavbarComponent";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import DetailUserContainer from "./containers/DetailUserContainer";
import EditUserContainer from "./containers/EditUserContainer";
import CreateUserContainer from "./containers/CreateUserContainer";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {" "}
        {}
        <div>
          <NavbarComponent />
          <Routes>
            {}
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/register" element={<RegisterContainer />} />

            {}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomeContainer />
                </PrivateRoute>
              }
            />
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <CreateUserContainer />
                </PrivateRoute>
              }
            />
            <Route
              path="/detail/:id"
              element={
                <PrivateRoute>
                  <DetailUserContainer />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <EditUserContainer />
                </PrivateRoute>
              }
            />

            {}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
