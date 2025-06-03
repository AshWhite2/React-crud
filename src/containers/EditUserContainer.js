import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import BackComponent from "../components/BackComponent";
import FormComponent from "../components/FormComponent";
import { getUserDetail, putUserUpdate } from "../actions/userAction";

export default function EditUserContainer() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { getResponDataUser, errorResponDataUser } = useSelector((state) => ({
    getResponDataUser: state.users.getResponDataUser,
    errorResponDataUser: state.users.errorResponDataUser,
  }));

  useEffect(() => {
    dispatch(getUserDetail(id));
  }, [dispatch, id]);

  const handleSubmit = async (data) => {
    try {
      const result = await dispatch(putUserUpdate(data, id));

      if (result?.status === 200) {
        Swal.fire({
          title: "User Updated!",
          html: `
            <strong>Nama:</strong> ${data.nama}<br>
            <strong>Umur:</strong> ${data.umur}
          `,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: error.message || "Update failed",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    if (errorResponDataUser) {
      Swal.fire({
        title: "Failed!",
        text: errorResponDataUser,
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (getResponDataUser) {
      Swal.fire({
        title: "User Updated!",
        html: `
          <strong>Nama:</strong> ${getResponDataUser.nama}<br>
          <strong>Umur:</strong> ${getResponDataUser.umur}
        `,
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  }, [getResponDataUser, errorResponDataUser]);

  return (
    <Container>
      <BackComponent />
      <h1>Edit User</h1>
      <FormComponent
        onSubmit={handleSubmit}
        initialValues={getResponDataUser}
      />
    </Container>
  );
}
