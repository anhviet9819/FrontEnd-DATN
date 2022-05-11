import { Select } from "@mui/material";
import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";

function CreateMealTracking() {
  const history = useHistory();

  const handleBack = () => {
    return history.push("/mealstracking");
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Tạo mới nhật ký bữa ăn</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Thời gian</label>
                        <Form.Control
                          id="created_at"
                          name="created_at"
                          // defaultValue=""
                          placeholder="Chọn thời gian bữa ăn"
                          type="datetime-local"
                          onChange={(e) => {
                            e.preventDefault();
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Tên bữa ăn</label>
                        <Form.Control
                          id="name"
                          name="namename"
                          // defaultValue=""
                          placeholder="Nhập tên cho bữa ăn của bạn"
                          type="text"
                          onChange={(e) => {
                            e.preventDefault();
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Loại bữa ăn</label>
                        <Form.Control
                          id="type"
                          name="type"
                          // defaultValue=""
                          // placeholder="Bữa sáng"
                          type="text"
                          onChange={(e) => {
                            e.preventDefault();
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Chú thích cho bữa ăn</label>
                        <Form.Control
                          id="description"
                          name="description"
                          // defaultValue=""
                          placeholder="Ghi chú thích cho bữa ăn của bạn(nếu có)"
                          type="text"
                          onChange={(e) => {
                            e.preventDefault();
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    // onClick={updateProfile}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Tạo đăng ký cho bữa ăn
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateMealTracking;
