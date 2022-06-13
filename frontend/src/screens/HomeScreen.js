import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const [productsNumber, setProductsNumber] = useState(4);
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Inapoi la cumparaturi
        </Link>
      )}
      <Row>
        <Col>
          <h1>{keyword ? "Rezultate:" : "Noutati"}</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products &&
              products
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4)
                .map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
          </Row>
          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          /> */}
        </>
      )}
      {!keyword && (
        <Row>
          <Col>
            <h1>Cele mai populare produse</h1>
          </Col>
        </Row>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        !keyword && (
          <>
            <Row>
              {products &&
                products
                  .sort((a, b) => b.numReviews - a.numReviews)
                  .slice(0, 4)
                  .map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
            </Row>
            {/* <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            /> */}
          </>
        )
      )}
      <Container className="align-middle">
        <Row className="align-items-center see-all-button-container">
          <Link to="/products">
            <div className="see-all-button">Vezi Toate Produsele</div>
          </Link>
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
