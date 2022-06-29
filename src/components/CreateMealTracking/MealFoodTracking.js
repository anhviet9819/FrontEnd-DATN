import SearchBar from "components/SearchForm/SearchBar";
import React, { useEffect, useState } from "react";
import FuzzySearch from "react-fuzzy";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { useParams } from "react-router";
import SelectSearch from "react-select-search";
import basicTrackingApi from "services/BasicTrackingApi";
import foodApi from "services/FoodApi";
import mealFoodApi from "services/mealfoodApi";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { responsiveFontSizes, Typography } from "@mui/material";
import swal from "sweetalert";
import nutritionFactApi from "services/NutritionFactApi";
import validator from "validator";

function MealFoodTracking() {
  const { mealstrackingid } = useParams();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  // const [mealstrackingid, setMealstrackingid] = useState(
  //   localStorage.getItem("mealtrackingid")
  // );

  const [isShow, setIsShow] = useState(false);
  const [isShowNewFoodAdd, setIsShowNewFoodAdd] = useState(false);
  const [foodList, setFoodList] = useState([]);

  const [isValidCaloPer100G, setIsValidCaloPer100G] = useState(true);
  const [isPositiveNumber, setIsPositiveNumber] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);

  const foodGroupList = [
    {
      label: "Ngũ cốc và sản phẩm chế biến",
      value: "Ngũ cốc và sản phẩm chế biến",
    },
    {
      label: "Khoai củ và sản phẩm chế biến",
      value: "Khoai củ và sản phẩm chế biến",
    },
    {
      label: "Hạt, quả giàu protein, lipid và sản phẩm chế biến",
      value: "Hạt, quả giàu protein, lipid và sản phẩm chế biến",
    },
    {
      label: "Rau, quả, củ dùng làm rau",
      value: "Rau, quả, củ dùng làm rau",
    },
    {
      label: "Quả chín",
      value: "Quả chín",
    },
    {
      label: "Dầu, mỡ, bơ",
      value: "Dầu, mỡ, bơ",
    },
    {
      label: "Thịt và sản phẩm chế biến",
      value: "Thịt và sản phẩm chế biến",
    },
    {
      label: "Thủy sản và sản phẩm chế biến",
      value: "Thủy sản và sản phẩm chế biến",
    },
    {
      label: "Trứng và sản phẩm chế biến",
      value: "Trứng và sản phẩm chế biến",
    },
    {
      label: "Sữa và sản phẩm chế biến",
      value: "Sữa và sản phẩm chế biến",
    },
    {
      label: "Đồ hộp",
      value: "Đồ hộp",
    },
    {
      label: "Đồ ngọt(đường, bánh, mứt, kẹo)",
      value: "Đồ ngọt(đường, bánh, mứt, kẹo)",
    },
    {
      label: "Gia vị, nước chấm",
      value: "Gia vị, nước chấm",
    },
    {
      label: "Nước giải khát",
      value: "Nước giải khát",
    },
    {
      label: "Khác",
      value: "Khác",
    },
  ];

  const [foodAddIndex, setFoodAddIndex] = useState(0);
  const [mealFoodList, setMealFoodList] = useState([]);

  const [foodId, setFoodId] = useState();
  const [foodName, setFoodName] = useState();
  const [foodGroupAdding, setFoodGroupAdding] = useState();
  const [food_volume, setFood_volume] = useState();
  const [foodCalories, setFoodCalories] = useState();

  const removeFood = (mealtrackingid, foodid) => {
    swal({
      title: "Bạn chắc chắn muốn xóa không?",
      text: "Nếu bạn xóa, dữ liệu sẽ không thể khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mealFoodApi.deleteByMealFoodId(mealtrackingid, foodid, accessToken);
        swal("Success", "Bạn đã xóa món ăn thành công!", "success");
      }
    });
  };

  const updateMealFoodList = async (e) => {
    e.preventDefault();
    // if(validator.)
    if (foodGroupAdding === undefined && foodCalories === undefined) {
      //truong hop 1: add food co san trong danh muc
      const response = await foodApi.addFoodByMealsTrackingId(
        accessToken,
        mealstrackingid,
        {
          food: {
            // name: foodName === undefined ? "Gạo nếp cái" : foodName,
            id: foodId === undefined ? 100000001 : foodId,
          },
          food_volume: food_volume,
        }
      );
      if (response.name) {
        swal(
          "Success",
          "Bạn đã cập nhật thành công danh sách món ăn!",
          "success",
          {
            button: false,
            timer: 2000,
          }
        ).then(() => {
          window.location.href = `/user/mealstracking/mealfoodtracking/${mealstrackingid}`;
        });
      } else {
        swal(
          "Failed",
          "Thông tin bạn nhập không hợp lệ, hãy kiếm tra lại!",
          "error"
        );
      }
    } else if (foodGroupAdding !== undefined && foodCalories !== undefined) {
      const response = await foodApi.addFoodByMealsTrackingId(
        accessToken,
        mealstrackingid,
        {
          food: {
            id: 1,
            name: foodName,
            foodGroup: {
              group_name: foodGroupAdding,
            },
          },
          food_volume: food_volume,
        }
      );
      const response1 = await nutritionFactApi.updateByFoodId(
        accessToken,
        response.id,
        {
          calories: foodCalories,
        }
      );
      if (response.name !== undefined && response1.calories) {
        swal(
          "Success",
          "Bạn đã cập nhật thành công danh sách món ăn!",
          "success",
          {
            button: false,
            timer: 2000,
          }
        ).then(() => {
          window.location.href = `/user/mealstracking/mealfoodtracking/${mealstrackingid}`;
        });
      } else {
        swal(
          "Failed",
          "Thông tin bạn nhập không hợp lệ, hãy kiếm tra lại!",
          "error"
        );
      }
    } else {
      //truong hop 2:
      console.log(foodGroupAdding);
      console.log(foodCalories);
      swal(
        "Failed",
        "Món ăn bạn chọn chưa có sẵn trong danh mục món ăn, hãy nhập đầy đủ thông tin nhé!",
        "error"
      );
    }
  };

  useEffect(() => {
    // console.log(id);
    mealFoodApi
      .getByMealsTrackingId(accessToken, mealstrackingid)
      .then((data) => {
        // console.log(data);
        setMealFoodList(data);
      });
  }, [mealFoodList]);

  useEffect(() => {
    foodApi.getAll(0, 1000, "").then((data) => {
      // console.log(data.content);
      data.content.map((Data) => {
        Data.value = Data.name;
        Data.label = Data.name;
        delete Data.name;
      });
      // console.log(data.content);
      setFoodList(data.content);
    });
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Danh sách món ăn</Card.Title>
              </Card.Header>
              <Card.Body>
                {/* <Form onSubmit={updateMealFood}> */}
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">STT</th>
                      <th className="border-0">Tên món ăn</th>
                      <th className="border-0">Khối lượng món ăn</th>
                      {/* <th className="border-0">Lượng calo cung cấp</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {mealFoodList.map((mealfoodData, index = 1) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index + 1}</td>
                          <td>{mealfoodData.food.name}</td>
                          <td>{mealfoodData.food_volume}</td>
                          <td>
                            {/* <Button
                                    className="btn-fill pull-right"
                                    // variant="primary"
                                    href="/user/mealstracking/updatemealtracking"
                                    onClick={() => {
                                      localStorage.setItem(
                                        "mealtrackingid",
                                        mealstrackingData.id
                                      );
                                    }}
                                  >
                                    Sửa
                                  </Button> */}
                            <Button
                              variant="danger"
                              onClick={() =>
                                removeFood(
                                  mealfoodData.id.meal_tracking_id,
                                  mealfoodData.id.food_id
                                )
                              }
                            >
                              Xóa
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>

                <div className="clearfix"></div>
                {/* </Form> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {isShow && (
          <Row>
            <Col md="8">
              <Card>
                <Card.Body>
                  <Form onSubmit={updateMealFoodList}>
                    <Row>
                      <Col className="px-1" md="4">
                        <label>Chọn loại thức ăn</label>
                        <CreatableSelect
                          options={foodList}
                          onChange={(e) => {
                            // console.log(e);
                            setFoodId(e.id);
                            setFoodName(e.value);
                            e.__isNew__ === true
                              ? setIsShowNewFoodAdd(true)
                              : setIsShowNewFoodAdd(false);
                          }}
                        />
                      </Col>
                    </Row>
                    {isShowNewFoodAdd && (
                      <>
                        <Row>
                          <Col className="px-1" md="4">
                            <label>Chọn nhóm thức ăn</label>
                            <Select
                              placeholder="Nhóm thức ăn bạn thêm vào thuộc loại nào vậy?"
                              options={foodGroupList}
                              onChange={(e) => {
                                // console.log(e.value);
                                setFoodGroupAdding(e.value);
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="px-1" md="4">
                            <Form.Group>
                              <label>Lượng calo cung cấp(100g)</label>
                              <Form.Control
                                id="food_calories"
                                name="food_calories"
                                placeholder="Nhập vào lượng calo món ăn cung cấp/100gam"
                                type="number"
                                onChange={(e) => {
                                  setFoodCalories(e.target.value);
                                  if (parseFloat(e.target.value) <= 0) {
                                    setIsValidCaloPer100G(false);
                                    setDisabledButton(true);
                                  } else {
                                    setIsValidCaloPer100G(true);
                                    setDisabledButton(false);
                                  }
                                }}
                              ></Form.Control>
                            </Form.Group>
                            {isValidCaloPer100G === false ? (
                              <Typography
                                variant="body2"
                                color="red"
                                fontSize="13px"
                              >
                                *Lượng calo cung cấp phải là số dương
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                        </Row>
                      </>
                    )}
                    <Row>
                      <Col className="px-1" md="4">
                        <Form.Group>
                          <label>Khối lượng món ăn(g)</label>
                          <Form.Control
                            id="food_volume"
                            name="food_volume"
                            // defaultValue={personalIndex.height}
                            placeholder="Nhập vào khối lượng món ăn theo đơn vị gam"
                            type="text"
                            onChange={(e) => {
                              // console.log(typeof e.target.value === "string");
                              setFood_volume(e.target.value);
                              if (parseFloat(e.target.value) <= 0) {
                                setIsPositiveNumber(false);
                                setDisabledButton(true);
                              } else {
                                setIsPositiveNumber(true);
                                setDisabledButton(false);
                              }
                            }}
                          ></Form.Control>
                        </Form.Group>
                        {isPositiveNumber === false ? (
                          <Typography
                            variant="body2"
                            color="red"
                            fontSize="13px"
                          >
                            *Khối lượng món ăn phải là số dương
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>

                    <Button
                      // onClick={updateProfile}
                      disabled={disabledButton}
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                    >
                      Cập nhật
                    </Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        <div>
          {isShow === false ? (
            <Button
              onClick={() => {
                setIsShow(!isShow);
                // console.log(foodAddIndex);
                setFoodAddIndex(foodAddIndex + 1);
              }}
            >
              Thêm món ăn
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsShow(!isShow);
                // console.log(foodAddIndex);
                setFoodAddIndex(foodAddIndex + 1);
              }}
            >
              Xóa món ăn
            </Button>
          )}
        </div>
      </Container>
    </>
  );
}

export default MealFoodTracking;
