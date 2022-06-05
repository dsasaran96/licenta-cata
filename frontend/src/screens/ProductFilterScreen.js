import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const ProductFilterScreen = () => {
  const [brandFilters, setBrandFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(1000000);

  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleBrand = (filter) => {
    const updatedFilters = filter.checked
      ? [...brandFilters, filter.value]
      : brandFilters.filter((item) => item !== filter.value);
    setBrandFilters(updatedFilters);
  };

  const handleCategory = (filter) => {
    const updatedFilters = filter.checked
      ? [...categoryFilters, filter.value]
      : categoryFilters.filter((item) => item !== filter.value);
    setCategoryFilters(updatedFilters);
  };

  const brandsFromProducts = products
    .map((product) => product.brand)
    .filter((brand, i, products) => products.indexOf(brand) === i);

  const categoriesFromProducts = products
    .map((product) => product.category.split(",")[0])
    .filter((category, i, products) => products.indexOf(category) === i);

  return (
    <div>
      <Form>
        <Row>
          <Col>
            <Form.Label>Brand</Form.Label>
            {brandsFromProducts.map((brand, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                id={`${brand.toLowerCase()}`}
                label={`${brand}`}
                value={`${brand.toLowerCase()}`}
                onChange={(e) => handleBrand(e.target)}
              />
            ))}
          </Col>
          <Col>
            <Form.Label>Categorii</Form.Label>
            {categoriesFromProducts.map((category, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                id={`${category.toLowerCase()}`}
                label={`${category}`}
                value={`${category.toLowerCase()}`}
                onChange={(e) => handleCategory(e.target)}
              />
            ))}
          </Col>
          <Col>
            <Form.Label>Pret</Form.Label>
            <Form.Text>Min</Form.Text>
            <Col sm="10">
              <Form.Control
                size="sm"
                type="number"
                defaultValue={0}
                onChange={(e) => setLowPrice(e.target.value)}
              ></Form.Control>
            </Col>
            <Form.Text>Max</Form.Text>
            <Col sm="10">
              <Form.Control
                size="sm"
                type="number"
                defaultValue={1000000}
                onChange={(e) => setHighPrice(e.target.value)}
              ></Form.Control>
            </Col>
          </Col>
        </Row>
      </Form>
      <Row>
        {products
          .filter((product) =>
            brandFilters.length > 0
              ? brandFilters.includes(product.brand.toLowerCase())
              : product
          )
          .filter((product) =>
            categoryFilters.length > 0
              ? categoryFilters.includes(product.category.toLowerCase())
              : product
          )
          .filter(
            (product) => product.price <= highPrice && product.price >= lowPrice
          )
          .map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default ProductFilterScreen;
