import React, { useState } from 'react';
import axios from 'axios';
import { useBilling } from './BillingContext';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const BillingInput = () => {
    const { setBillingData } = useBilling();

    const [excelFile, setExcelFile] = useState(null);
    const [items, setItems] = useState([]);
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [productCount, setProductCount] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [customerType, setCustomerType] = useState('');
    const [filteredProductName, setFilteredProductName] = useState('');
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [taxRate, setTaxRate] = useState('');
    const [discountRate, setDiscountRate] = useState('');

    const date = new Date();
    const today = date.toLocaleDateString('en-GB', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setExcelFile(file);
    };
    const handleTaxRate = (e) => {
        const tax = e.target.value;
        setTaxRate(tax);
    };
    const handleDiscountRate = (e) => {
        const disc = e.target.value;
        setDiscountRate(disc);
    };
    const handleProductPriceChange = (e, productCode) => {
        const priceVal = e.target.value;
        setItems((items) =>
            items.map((item) =>
                item.productCode === productCode ? { ...item, price: priceVal } : item
            )
        );
        setUnitPrice(priceVal.toLocaleString('tr-TR').replace('.', ','));
    };

    const handleProductCountChange = (e, productCode) => {
        const count = e.target.value;
        setItems((items) =>
            items.map((item) =>
                item.productCode === productCode ? { ...item, productCount: count } : item
            )
        );
        setProductCount(count);
        console.log(productCount);
    };
    const handleRemoveItem = (productCode) => {
        const updatedItems = items.filter(item => item.productCode !== productCode);
        setItems(updatedItems);
        // Ürünü kaldır
        setProductName('');
        setProductCount('');
        setUnitPrice('');
        setTotalPrice('');
        setProductCode('');      
        setSimilarProducts([]);
        setFilteredProductName('');

        console.log('item count', items.length);
        if(items.length===1) {
            setCustomerType('');
        }
    };
    const handleProductCodeChange = (e) => {
        const code = e.target.value;
        setSelectedProduct('');
        setSimilarProducts([]);
        setFilteredProductName('');
        setProductCode(code);
    };

    const handleCustomerType = (e) => {
        const type = e.target.value;
        setCustomerType(type);
    };

    const handleProductNameChange = (e) => {
        const name = e.target.value;
        setFilteredProductName(name);
        setProductCode('');
    };

    const handleSelectedProduct = (e) => {
        const selectedProductCode = e.target.value;
        const selectedProduct = similarProducts.find(p => p.productCode === selectedProductCode);
        setSelectedProduct(selectedProduct);
    };

    const handleAddItem = async (e) => {
        try {
            if (!excelFile) {
                alert('Lütfen bir dosya yükleyin.');
                return;
            }
            if (!customerType) {
                alert('Lütfen müşteri tipi seçiniz.');
                return;
            }
            if (!selectedProduct && productCode === '') {
                alert('Lütfen ürün kodu girin veya benzer ürünleri seçin')
            }
            let newItem;
            if (selectedProduct) {
                console.log('selectedProduct Code:', selectedProduct.productCode);
                setProductCode('');
                const existingItem = items.find(item => item.productCode === selectedProduct.productCode);
                console.log('productCode', productCode);
                if (existingItem) {
                    console.log('exist', existingItem);
                    // Eğer ürün items listesinde varsa, sadece adet değerini artır
                    const updatedItems = items.map((item) => {
                        if (item.productCode === selectedProduct.productCode) {
                            const updatedItem = { ...item, productCount: (parseInt(item.productCount) + 1).toString() };
                            return updatedItem;
                        }
                        return item;
                    });
                    setItems(updatedItems);
                } else {
                    console.log('selectedProduct', selectedProduct);
                    const name = selectedProduct.productName;
                    const code = selectedProduct.productCode;
                    const price = selectedProduct.price;

                    setProductCode(code);
                    setProductName(name);
                    setUnitPrice(price.toLocaleString('tr-TR').replace('.', ','));

                    newItem = {
                        productCode: code,
                        productName: name,
                        productCount: parseInt('1'),
                        price: price.toLocaleString('tr-TR').replace('.', ','),
                    };
                    setItems((prevItems) => [...prevItems, newItem]);
                }
            } else {
                console.log('productCode', productCode);
                const existingItem = items.find(item => item.productCode === productCode);
                if (existingItem) {
                    const updatedItems = items.map((item) => {
                        if (item.productCode === productCode) {
                            const updatedItem = { ...item, productCount: (parseInt(item.productCount) + 1).toString() };
                            return updatedItem;
                        }
                        return item;
                    });
                    setItems(updatedItems);
                } else {
                    const formData = new FormData();
                    formData.append('file', excelFile);
                    formData.append('productCode', productCode);
                    formData.append('customerType', customerType);

                    const response = await axios.post('https://sern-offer-a413723796f4.herokuapp.com/api/getProduct', formData, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    console.log('response', response);
                    const name = response.data.productName;
                    const code = response.data.productCode;
                    const price = response.data.price;

                    console.log('name', name);
                    console.log('code', code);
                    console.log('price', price);

                    setProductCode(code);
                    setProductName(name);
                    console.log(productName);
                    setUnitPrice(price.toLocaleString('tr-TR').replace('.', ','));
                    console.log(unitPrice);

                    newItem = {
                        productCode: code,
                        productName: name,
                        productCount: parseInt('1'),
                        price: price.toLocaleString('tr-TR').replace('.', ','),
                    };
                    setItems((prevItems) => [...prevItems, newItem]);
                }
            }

            console.log('New Item:', newItem);
            console.log('Items:', items);
        } catch (error) {
            console.error('Ürün bilgisi alınamadı:', error.message);
        }
    }


    const handleGetSimilarProduct = async (e) => {
        try {
            if (!excelFile) {
                alert('Lütfen bir dosya yükleyin.');
                return;
            }
            if (!customerType) {
                alert('Lütfen müşteri tipi seçiniz.');
                return;
            }

            setProductCode('');
            if (filteredProductName.trim() !== '') {
                const formData = new FormData();
                formData.append('file', excelFile);
                formData.append('filteredProductName', filteredProductName);
                formData.append('customerType', customerType);

                const response = await axios.post('https://sern-offer-a413723796f4.herokuapp.com/api/searchProduct', formData, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setSimilarProducts(['']);
                setSimilarProducts(response.data);
                console.log('similar', similarProducts);
                
            }
        } catch (error) {
            console.error('Ürün bilgisi alınamadı:', error.message);
        }

    }
    const handleCalculateBilling = async (e) => {
        try {
            if (items.length === 0) {
                alert('En az Bir Ürün Eklenmelidir!');
                return;
            }
            if (taxRate === '') {
                alert('KDV Oranı Boş Bırakılamaz');
                return;
            }
            console.log('calculate items', items);

            console.log('tax', taxRate);
            console.log('disc', discountRate);
            const formattedItems = items.map(item => ({
                ...item,
                price: item.price.toLocaleString('tr-TR').replace(',', '.')
            }));
            const response = await axios.post('https://sern-offer-a413723796f4.herokuapp.com/api/calculateBilling', {
                items: formattedItems,
                taxRate: taxRate,
                discRate: discountRate
            });
            setBillingData({
                items: response.data.products, totalPrice: response.data.totalPrice,
                taxRate: taxRate, taxPrice: response.data.taxPrice, discRate: discountRate,
                discPrice: response.data.discPrice, totalPriceWithTax: response.data.totalPriceWithTax
            });
            console.log(totalPrice);

        } catch (error) {
            console.error('Toplam Fiyat Hesaplanamadı: ', error.message);
        }
    };

    return (
        <div className='billing-input'>
            <Row>
                <Col xs={6} md={4}>
                    <Form.Group controlId="formFile">
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                    <Form.Select aria-label="Default select example" value={customerType}
                        onChange={handleCustomerType}>
                        <option>Müşteri Tipini Seçiniz</option>
                        <option value="elektrikci">Elektrikci</option>
                        <option value="toptan">Toptan</option>
                        <option value="perakende">Perakende</option>
                    </Form.Select>
                </Col>
                <Col></Col><Col></Col><Col><Form.Label>{today}</Form.Label></Col>
            </Row><br></br>
            <Row>
                <Col xs={6} md={2}>
                    <Form.Label htmlFor="productCodeInput">Ürün Kodu</Form.Label>
                    <Form.Control type="text" id='productCodeInput' value={productCode} onChange={handleProductCodeChange} />
                </Col>
                <Col xs={6} md={2}>
                    <br></br>
                    <Button variant="outline-info" onClick={handleAddItem}>Ürünü Ekle</Button>
                </Col>
                <Col xs={6} md={2}>
                    <Form.Label htmlFor="productNameLabel">Ürün Adı Filtrele</Form.Label>
                    <Form.Control
                        type="text"
                        id="productNameInput"
                        value={filteredProductName} onChange={handleProductNameChange}
                    />
                </Col>
                <Col xs={6} md={2}>
                    <br></br>
                    <Button variant="outline-info" onClick={handleGetSimilarProduct}>Benzer Ürünleri Listele</Button>
                </Col>
                <Col xs={6} md={4}>
                    <Form.Label ></Form.Label>
                    {similarProducts.length > 0 && (
                        <Form.Select aria-label="Default select example" value={selectedProduct ? selectedProduct.productCode : ""} onChange={handleSelectedProduct}>
                            <option value="">Ürün Seçiniz</option>
                            {similarProducts.map((product, index) => (
                                <option key={index} value={product.productCode}>
                                    {product.productName}
                                </option>
                            ))}
                        </Form.Select>
                    )}
                </Col>
            </Row><br></br>
            <div id="items">
                {items.length > 0 &&
                    <Row>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Ürün</th>
                                    <th>Birim Fiyat</th>
                                    <th>Adet</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td>
                                            <input
                                            type="text"
                                            value={item.price}
                                            onChange={(e) => handleProductPriceChange(e, item.productCode)}
                                            /> TL
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={item.productCount}
                                                onChange={(e) => handleProductCountChange(e, item.productCode)}
                                            />
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleRemoveItem(item.productCode)}>
                                                Sil
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                }
            </div>

            <Row>
                <Col xs={3} md={2}>
                    <Form.Label htmlFor="discountRate">İndirim Oranı (%)</Form.Label>
                    <Form.Control type="text" id='discountRateInput' value={discountRate} onChange={handleDiscountRate} />
                </Col>
                <Col xs={3} md={2}>
                    <Form.Label htmlFor="taxRate">KDV (%)</Form.Label>
                    <Form.Control type="text" id='taxRateInput' value={taxRate} onChange={handleTaxRate} />
                </Col>
                <Col xs={3} md={2}>
                    <br></br>
                    <Button className="primary" onClick={handleCalculateBilling}>Teklif Al</Button>
                </Col>

            </Row>
        </div>
    );
}
export default BillingInput;