import { useEffect } from 'react';
import { Container } from 'reactstrap';
import BackComponent from '../components/BackComponent';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetail } from '../actions/userAction';
import DetailUserComponent from '../components/DetailUserComponent';

function DetailUserContainer() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetail(id));
  }, [dispatch, id]);

  return (
    <Container>
      <BackComponent />
      <h1>Detail User: {id}</h1>
      <DetailUserComponent/>
    </Container>
  );
}

export default DetailUserContainer;