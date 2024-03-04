import React from 'react';
import { useBilling } from './BillingContext';
import generatePDF from './GeneratePDF';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import serinTeknik from "../img/teknik.jpg";
import sern from "../img/srn.jpg";
import '../style/BillingSummary.css';

const BillingSummary = () => {
    const { billingData } = useBilling();
    const { items, totalPrice, taxRate, taxPrice, discRate, discPrice, totalPriceWithTax } = billingData;

    if (items.length === 0 || totalPrice === 0) {
        return null;
    }

    const date = new Date();
    const today = date.toLocaleDateString('en-GB', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
    });
    const handleGeneratePDF = () => {
        generatePDF({ items, totalPrice, taxRate, taxPrice, discRate, discPrice, totalPriceWithTax });
    };

    const totalPriceFormatted = totalPrice !== null ? totalPrice.toLocaleString('tr-TR').replace('.', ',') : "";
    const discPriceFormatted = discPrice !== null ? discPrice.toLocaleString('tr-TR').replace('.', ',') : "";
    const taxPriceFormatted = taxPrice !== null ? taxPrice.toLocaleString('tr-TR').replace('.', ',') : "";
    const totalPriceWithTaxFormatted = totalPriceWithTax !== null ? totalPriceWithTax.toLocaleString('tr-TR').replace('.', ',') : "";

    return (
        <div className='billing-summary' id="billing-summary">
            <div id='billing-header' style={{ display: 'none' }}>
                <br></br>
                <Navbar className='navbar'>
                    <Container>
                        <Navbar.Collapse className="justify-content-start">
                            <Navbar.Text className='navbar-text'>
                                <img
                                    alt=""
                                    className='logo'
                                    src={serinTeknik}
                                    width="280"
                                    height="110"
                                />
                            </Navbar.Text>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-center">
                            <Navbar.Text className='navbar-text'>
                                <Form.Label>Fiyat Teklifi</Form.Label>
                            </Navbar.Text>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text className='navbar-text'>
                                <img
                                    alt=""
                                    className='logo'
                                    src={sern}
                                    width="120"
                                    height="120"
                                />
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> <hr></hr>
            </div><br></br>
            <div id='date' style={{ display: 'none' }}>
                <Form.Label>{today}</Form.Label>
            </div>
            <div id="billing-items" style={{ display: 'none' }}>
                {items.length > 0 &&
                    <Row>
                        <Table striped bordered hover variant="light" className="table-small table-narrow">
                            <thead>
                                <tr>
                                    <th>Ürün</th>
                                    <th>Birim Fiyat</th>
                                    <th>Adet</th>
                                    <th>Toplam</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td>{item.price.toLocaleString('tr-TR').replace('.', ',')} TL</td>
                                        <td>{item.productCount}</td>
                                        <td>{item.totalPriceOfProduct.toLocaleString('tr-TR').replace('.', ',')} TL</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                }
            </div>
            <div className="row justify-content-end">
                <div id="billing-sum" className="col-sm-5">
                    <Row>
                        <Col sm={7}></Col>
                        <Col sm={5}>
                            <Form.Label className="small-label">
                                Toplam Fiyat: {totalPriceFormatted.toLocaleString('tr-TR').replace('.', ',')} TL
                            </Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={7}></Col>
                        <Col sm={5} >
                            <Form.Label className="small-label">
                                İndirim (%{discRate}): {discPriceFormatted.toLocaleString('tr-TR').replace('.', ',')} TL
                            </Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={7}></Col>
                        <Col sm={5} >
                            <Form.Label className="small-label">
                                KDV (%{taxRate}): {taxPriceFormatted.toLocaleString('tr-TR').replace('.', ',')} TL
                            </Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={7}></Col>
                        <Col sm={5}>
                            <Form.Label className="small-label">
                                Genel Toplam: {totalPriceWithTaxFormatted.toLocaleString('tr-TR').replace('.', ',')} TL
                            </Form.Label>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-sm-5">
                    <Row>
                        <Col sm={7}></Col>
                        <Col sm={5}>
                            <Button variant="outline-info" onClick={handleGeneratePDF}>PDF Oluştur
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default BillingSummary;