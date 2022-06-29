import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import activitiesTrackingApi from "services/ActivitiesTrackingApi";
import foodApi from "services/FoodApi";
import swal from "sweetalert";

function FoodManageCreate() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [foodId, setFoodId] = useState(localStorage.getItem("foodId"));

  const [foodName, setFoodName] = useState();
  const [foodGroupId, setFoodGroupId] = useState();

  const [food, setFood] = useState({});

  const createFood = async (e) => {
    e.preventDefault();
    // console.log(`${foodName}alo`);
    const response = await foodApi.createByFoodGroupId(
      accessToken,
      foodGroupId === undefined ? 1 : foodGroupId,
      {
        id: 1,
        name: foodName === undefined ? food.name : foodName,
      }
    );

    if (response.name) {
      // console.log(response.status === 200);
      swal(
        "Success",
        "Bạn đã tạo món ăn thành công, tiếp tục nhập thông tin dinh dưỡng món ăn nhé!",
        "success",
        {
          button: false,
          timer: 2000,
        }
      ).then(() => {
        localStorage.setItem("foodId", response.id);
        window.location.href = "/admin/foodmanage/updatenutrition";
      });
    } else {
      // console.log("viett");
      swal(
        "Failed",
        "Thông tin bạn nhập không hợp lệ, hãy kiếm tra lại!",
        "error"
      );
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Thêm mới món ăn</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={createFood}>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Tên món ăn</label>
                        <Form.Control
                          id="food_name"
                          name="food_name"
                          defaultValue={food.name}
                          type="text"
                          onChange={(e) => {
                            setFoodName(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Nhóm món ăn</label>
                        <Form.Select
                          id="food_group_name"
                          name="food_group_name"
                          //   defaultValue={foodGroupName}
                          type="text"
                          onChange={(e) => {
                            console.log(e.target.options.selectedIndex + 1);
                            setFoodGroupId(e.target.options.selectedIndex + 1);
                          }}
                        >
                          <option>Ngũ cốc và sản phẩm chế biến</option>
                          <option>Khoai củ và sản phẩm chế biến</option>
                          <option>
                            Hạt, quả giàu protein, lipid và sản phẩm chế biến
                          </option>
                          <option>Rau, quả, củ dùng làm rau</option>
                          <option>Quả chín</option>
                          <option>Dầu, mỡ, bơ</option>
                          <option>Thịt và sản phẩm chế biến</option>
                          <option>Thủy sản và sản phẩm chế biến</option>
                          <option>Trứng và sản phẩm chế biến</option>
                          <option>Sữa và sản phẩm chế biến</option>
                          <option>Đồ hộp</option>
                          <option>Đồ ngọt(đường, bánh, mứt, kẹo)</option>
                          <option>Gia vị, nước chấm</option>
                          <option>Nước giải khát</option>
                          <option>Khác</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    // onClick={updateProfile}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Tạo mới món ăn
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

export default FoodManageCreate;
