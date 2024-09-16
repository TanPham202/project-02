import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import ModalAddNew from './components/ModalAddNew';
import { useState } from 'react';

function App() {

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const handleClose = () => {
    setIsShowModalAddNew(false)
  }

  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className='my-3 add-new'>
          <span> <b> List Users: </b> </span>
          <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>
            Add new user
          </button>
        </div>
        <TableUsers />
      </Container>
      <ModalAddNew 
        show = {isShowModalAddNew}
        handleClose = {handleClose}
      />
    </div>
  );
}

export default App;
