import React from 'react';
import './style/App.css';
import './style/BillingCalculator.css';
import BillingCalculator from './components/BillingCalculator.js';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import serinTeknik from "./img/teknik.jpg";
import sern from "./img/srn.jpg";
import Form from 'react-bootstrap/Form';

const App = () => {


  const handleBillingCalculate = (excelData) => {


  };

  return (
    <div className="app-container">
      <br></br>
      <Navbar className='navbar'>
        <Container className='navbar-container'>
        <Navbar.Collapse className="d-flex justify-content-start">
            <Navbar.Text className='navbar-text'>
            <img
            className='logo'
              alt="" 
              src={serinTeknik}
              width="280"
              height="110"
            />
            </Navbar.Text>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-center">
            <Navbar.Text  className='navbar-text'>
              <Form.Label>Fiyat Teklifi</Form.Label>
            </Navbar.Text>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className='navbar-text'>
            <img
            className='logo'
              alt="" 
              src={sern}
              width="120"
              height="120"
            />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr></hr>
      <div>
        <BillingCalculator onBillingCalculate={handleBillingCalculate} />
      </div>
    </div>
  );
};

export default App;
