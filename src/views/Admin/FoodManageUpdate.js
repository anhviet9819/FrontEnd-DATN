import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import activitiesTrackingApi from "services/ActivitiesTrackingApi";
import foodApi from "services/FoodApi";
import listActivitiesApi from "services/ListActivitiesApi";
import mealsTrackingApi from "services/MealsTrackingApi";
import nutritionFactApi from "services/NutritionFactApi";
import swal from "sweetalert";
import Select from "react-select";

function FoodManageUpdate() {
  const { foodid } = useParams();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  // const [foodId, setFoodId] = useState(localStorage.getItem("foodId"));

  const foodGroupList = [
    {
      id: "1",
      label: "Ngũ cốc và sản phẩm chế biến",
      value: "Ngũ cốc và sản phẩm chế biến",
    },
    {
      id: "2",
      label: "Khoai củ và sản phẩm chế biến",
      value: "Khoai củ và sản phẩm chế biến",
    },
    {
      id: "3",
      label: "Hạt, quả giàu protein, lipid và sản phẩm chế biến",
      value: "Hạt, quả giàu protein, lipid và sản phẩm chế biến",
    },
    {
      id: "4",
      label: "Rau, quả, củ dùng làm rau",
      value: "Rau, quả, củ dùng làm rau",
    },
    {
      id: "5",
      label: "Quả chín",
      value: "Quả chín",
    },
    {
      id: "6",
      label: "Dầu, mỡ, bơ",
      value: "Dầu, mỡ, bơ",
    },
    {
      id: "7",
      label: "Thịt và sản phẩm chế biến",
      value: "Thịt và sản phẩm chế biến",
    },
    {
      id: "8",
      label: "Thủy sản và sản phẩm chế biến",
      value: "Thủy sản và sản phẩm chế biến",
    },
    {
      id: "9",
      label: "Trứng và sản phẩm chế biến",
      value: "Trứng và sản phẩm chế biến",
    },
    {
      id: "10",
      label: "Sữa và sản phẩm chế biến",
      value: "Sữa và sản phẩm chế biến",
    },
    {
      id: "11",
      label: "Đồ hộp",
      value: "Đồ hộp",
    },
    {
      id: "12",
      label: "Đồ ngọt(đường, bánh, mứt, kẹo)",
      value: "Đồ ngọt(đường, bánh, mứt, kẹo)",
    },
    {
      id: "13",
      label: "Gia vị, nước chấm",
      value: "Gia vị, nước chấm",
    },
    {
      id: "14",
      label: "Nước giải khát",
      value: "Nước giải khát",
    },
    {
      id: "15",
      label: "Khác",
      value: "Khác",
    },
  ];

  const trueFalseList = [
    {
      label: "true",
      value: "true",
    },
    {
      label: "false",
      value: "false",
    },
  ];

  const scopeList = [
    {
      label: "Toàn bộ hệ thống",
      value: "Toàn bộ hệ thống",
    },
    {
      label: "Chỉ người tạo ra",
      value: "Chỉ người tạo ra",
    },
  ];

  const [foodName, setFoodName] = useState();
  const [foodGroupName, setFoodGroupName] = useState();
  const [foodGroupId, setFoodGroupId] = useState();
  const [language, setLanguage] = useState();
  const [owner, setOwner] = useState();
  const [scope, setScope] = useState();
  const [isIngredient, setIsIngredient] = useState();

  const [indexTFList, setIndexTFList] = useState();

  const [food, setFood] = useState({});

  useEffect(() => {
    foodApi.getById(accessToken, foodid).then((data) => {
      // console.log(data.is_ingredient === false);
      setFoodGroupId(data.foodGroup.id);
      setFoodGroupName(data.foodGroup.group_name);
      setFoodName(data.name);
      setLanguage(data.language);
      setOwner(data.owner);
      if (data.scope === "true") {
        setScope("Toàn bộ hệ thống");
      } else setScope("Chỉ người tạo ra");
      if (data.is_ingredient === true) {
        setIndexTFList(0);
      } else setIndexTFList(1);
      setIsIngredient(data.is_ingredient);
      // setFood(data);
    });
  }, []);

  const updateFood = async (e) => {
    e.preventDefault();
    const response = await foodApi.updateById(foodid, accessToken, {
      foodGroup: {
        id: foodGroupId,
      },
      name: foodName,
      language: language,
      scope: scope === "Toàn bộ hệ thống" ? "true" : "U4",
      owner: owner,
      is_ingredient: isIngredient,
    });

    if (response.name) {
      // console.log(response.status === 200);
      swal("Success", "Bạn đã cập nhật món ăn thành công!", "success", {
        button: false,
        timer: 2000,
      }).then(() => {
        window.location.href = "/admin/foodmanage";
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
                <Card.Title as="h4">Chỉnh sửa món ăn</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updateFood}>
                  <Row>
                    <Col className="px-1" md="6">
                      <label>Nhóm món ăn</label>
                      <Select
                        placeholder="Món ăn bạn chỉnh sửa thuộc nhóm nào vậy?"
                        defaultValue={foodGroupList[0]}
                        options={foodGroupList}
                        onChange={(e) => {
                          // console.log(e.id);
                          setFoodGroupId(e.id);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Tên món ăn</label>
                        <Form.Control
                          id="food_name"
                          name="food_name"
                          defaultValue={foodName}
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
                      <label>Có phải nguyên liệu không</label>
                      <Select
                        // defaultInputValue={trueFalseList[indexTFList].value}
                        defaultValue={trueFalseList[0]}
                        options={trueFalseList}
                        onChange={(e) => {
                          // console.log(trueFalseList[indexTFList]);
                          setIsIngredient(e.value);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Ngôn ngữ</label>
                        <Form.Control
                          id="language"
                          name="language"
                          defaultValue={language}
                          type="text"
                          onChange={(e) => {
                            setLanguage(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <label>Phạm vi sử dụng</label>
                      <Select
                        // placeholder="Nhóm thức ăn bạn thêm vào thuộc loại nào vậy?"
                        // defaultValue={trueFalseList[1]}
                        options={scopeList}
                        onChange={(e) => {
                          setScope(e.value);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <label>Người tạo ra</label>
                      <Select
                        // placeholder="Nhóm thức ăn bạn thêm vào thuộc loại nào vậy?"
                        options={trueFalseList}
                        onChange={(e) => {
                          setOwner(e.value);
                        }}
                      />
                    </Col>
                  </Row>

                  <Button
                    // onClick={updateProfile}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Cập nhật món ăn
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

export default FoodManageUpdate;
