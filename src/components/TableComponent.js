import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import LogoutButton from './LogoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEdit,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { deleteUser } from "../actions/userAction";

const { SearchBar } = Search;

const handleClick = async (dispatch, id) => {
  const result = await Swal.fire({
    title: "Apakah Anda yakin akan menghapus data ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  if (result.isConfirmed) {
    try {
      await dispatch(deleteUser(id));
      await Swal.fire("Terhapus!", "Data User berhasil dihapus.", "success");
    } catch (error) {
      await Swal.fire(
        "Gagal!",
        "Terjadi kesalahan saat menghapus data.",
        "error"
      );
    }
  }
};

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    getUsersList: state.users.getUsersList,
    errorUsersList: state.users.errorUsersList,
  };
};

const TableComponent = (props) => {
  const columns = [
    {
      dataField: "_row_index",
      text: "ID",
      sort: true,
      formatter: (cell, row, rowIndex) => rowIndex + 1,
      headerStyle: () => {
        return { width: "5%" };
      },
    },
    {
      dataField: "nama",
      text: "Nama",
      sort: true,
    },
    {
      dataField: "alamat",
      text: "Alamat",
      sort: true,
    },
    {
      dataField: "umur",
      text: "Umur",
      sort: true,
      headerStyle: () => {
        return { width: "7%" };
      },
    },
    {
      dataField: "nohp",
      text: "No. Hp",
      sort: true,
    },
    {
      dataField: "link",
      text: "Action",
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex flex-wrap" style={{ gap: "5px" }}>
            <Link to={"detail/" + row.id}>
              <Button color="dark" size="sm">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>

            <Link to={"edit/" + row.id}>
              <Button color="dark" size="sm">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
            </Link>

            <Button
              color="dark"
              size="sm"
              onClick={() => handleClick(props.dispatch, row.id)}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Container>
      {props.getUsersList ? (
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={props.getUsersList}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
               <Row className="mb-3 align-items-center">
                <Col xs={12} md={6} className="mb-2 mb-md-0">
                  <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                    <Link to="/create">
                      <Button color="dark">
                      <FontAwesomeIcon icon={faUserPlus} /> Create User
                    </Button>
                  </Link>
                  
                  <SearchBar
                      {...props.searchProps}
                      placeholder="Search .."
                      style={{ width: "300px" }}
                    />
                    <LogoutButton className="ml-2"/>
                  </div>
                </Col>
              </Row>
              
              <div className="table-responsive">
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  striped
                  hover
                  condensed
                  wrapperClasses="table-responsive"
                />
              </div>
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <div className="text-center py-5">
          {props.errorUsersList ? (
            <h4 className="text-danger">{props.errorUsersList}</h4>
          ) : (
            <>
              <Spinner color="primary" />
              <p className="mt-2">Memuat data...</p>
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default connect(mapStateToProps, null)(TableComponent);
