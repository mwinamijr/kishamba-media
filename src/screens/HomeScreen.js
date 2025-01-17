import React from "react";
import { Container, Col, Row, ListGroup } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-4">
      <h1>Welcome to My Website</h1>

      <Row>
        <Col xs={8}>1 of 3</Col>
        <Col xs={2}>
          <ListGroup>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2d me-auto">
                <div className="fw-bold">
                  Sugfgfgfgfgfgfgfsgfsgddddddddddddddddddddddddddddsgsdfgsgsdfsdsdsdsdsdsdsdsddsdsdsbheading
                </div>
                Cras
                jssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssusto
                odio
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
