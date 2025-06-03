import React, { Component } from "react";
import { Container } from "reactstrap";
import BackComponent from "../components/BackComponent";
import FormComponent from "../components/FormComponent";
import { connect } from "react-redux";
import { postUserCreate } from "../actions/userAction";
import Swal from "sweetalert2";

const mapStateToProps = (state) => {
  return {
    getResponDataUser: state.users.getResponDataUser,
    errorResponDataUser: state.users.errorResponDataUser,
  };
};

class CreateUserContainer extends Component {
  handleSubmit(data) {
    this.props.dispatch(postUserCreate(data));
  }
  render() {
    if (this.props.getResponDataUser || this.props.errorResponDataUser) {
      if (this.props.errorResponDataUser) {
        // Error Alert
        Swal.fire({
          title: "Failed!",
          text: this.props.errorResponDataUser,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        // Success Alert
        Swal.fire({
          title: "User Created!",
          html: `
            <strong>Nama:</strong> ${this.props.getResponDataUser.nama}<br>
            <strong>Umur:</strong> ${this.props.getResponDataUser.umur}
          `,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    }
    
    return (
      <Container>
        <BackComponent />
        <h1>Create User</h1>
        <FormComponent onSubmit={(data) => this.handleSubmit(data)} />
      </Container>
    );
  }
}
export default connect(mapStateToProps, null)(CreateUserContainer);
