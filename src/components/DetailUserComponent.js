import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import { useParams } from "react-router-dom";
import { getUserDetail } from "../actions/userAction";

const DetailUserComponent = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.dispatch(getUserDetail(id)); 
  }, [id]);

  if (!props.getUserDetail) {
    return <div>Loading or no data found...</div>;
  }

  return (
    <Table striped>
      <tbody>
        <tr>
          <td width="200">Nama</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.nama || "-"}</td>
        </tr>
        <tr>
          <td width="200">Alamat</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.alamat || "-"}</td>
        </tr>
        <tr>
          <td width="200">Umur</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.umur || "-"}</td>
        </tr>
        <tr>
          <td width="200">No HP</td>
          <td width="10">:</td>
          <td>{props.getUserDetail.nohp || "-"}</td>
        </tr>
      </tbody>
    </Table>
  );
};

const mapStateToProps = (state) => ({
  getUserDetail: state.users.getUserDetail,
  errorUsersDetail: state.users.errorUsersDetail,
});

export default connect(mapStateToProps)(DetailUserComponent);