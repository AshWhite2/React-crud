import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login'); 
  };

  return (
    <Button color="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;