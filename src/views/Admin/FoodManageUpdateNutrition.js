import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import activitiesTrackingApi from "services/ActivitiesTrackingApi";
import foodApi from "services/FoodApi";
import listActivitiesApi from "services/ListActivitiesApi";
import mealsTrackingApi from "services/MealsTrackingApi";
import nutritionFactApi from "services/NutritionFactApi";
import swal from "sweetalert";

function FoodManageUpdateNutrition() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [foodId, setFoodId] = useState(localStorage.getItem("foodId"));

  const [foodName, setFoodName] = useState();
  const [foodGroupName, setFoodGroupName] = useState();

  const [calories, setCalories] = useState();
  const [fat, setFat] = useState();
  const [saturated_fat, setSaturated_fat] = useState();
  const [trans_fat, setTrans_fat] = useState();
  const [protein, setProtein] = useState();
  const [cholesterol, setCholesterol] = useState();
  const [sodium, setSodium] = useState();
  const [potassium, setPotassium] = useState();
  const [carbohydrates, setCarbohydrates] = useState();
  const [diatery_fiber, setDiatery_fiber] = useState();
  const [sugars, setSugars] = useState();
  const [vitamin_a, setVitamin_a] = useState();
  const [vitamin_c, setVitamin_c] = useState();
  const [calcium, setCalcium] = useState();
  const [iron, setIron] = useState();

  const [isValidCalories, setIsValidCalories] = useState(true);
  const [isValidFat, setIsValidFat] = useState(true);
  const [isValidSaturatedFat, setIsValidSaturatedFat] = useState(true);
  const [isValidTransFat, setIsValidTransFat] = useState(true);
  const [isValidProtein, setIsValidProtein] = useState(true);
  const [isValidCholesterol, setIsValidCholesterol] = useState(true);
  const [isValidSodium, setIsValidSodium] = useState(true);
  const [isValidPotassium, setIsValidPotassium] = useState(true);
  const [isValidCarbohydrates, setIsValidCarbohydrates] = useState(true);
  const [isValidDiatery_fiber, setIsValidDiatery_fiber] = useState(true);
  const [isValidSugars, setIsValidSugars] = useState(true);
  const [isValidVitaminA, setIsValidVitaminA] = useState(true);
  const [isValidVitaminC, setIsValidVitaminC] = useState(true);
  const [isValidCalcium, setIsValidCalcium] = useState(true);
  const [isValidIron, setIsValidIron] = useState(true);

  const [food, setFood] = useState({});
  const [nutritionfact, setNutritionfact] = useState({});

  useEffect(() => {
    foodApi.getById(accessToken, foodId).then((data) => {
      setCalories(data.calories);
      setFat(data.fat);
      setSaturated_fat(data.saturated_fat);
      setTrans_fat(data.trans_fat);
      setProtein(data.protein);
      setCholesterol(data.cholesterol);
      setSodium(data.sodium);
      setPotassium(data.potassium);
      setCarbohydrates(data.carbohydrates);
      setDiatery_fiber(data.diatery_fiber);
      setSugars(data.sugars);
      setVitamin_a(data.vitamin_a);
      setVitamin_c(data.vitamin_c);
      setCalcium(data.calcium);
      setIron(data.iron);
      setFood(data);
    });

    nutritionFactApi.getByFoodId(accessToken, foodId).then((data) => {
      setNutritionfact(data);
      // console.log(typeof data.calories);
    });
  }, []);

  const updateFood = async (e) => {
    // console.log(calories);
    e.preventDefault();
    if (
      calories < 0 ||
      fat < 0 ||
      saturated_fat < 0 ||
      trans_fat < 0 ||
      protein < 0 ||
      cholesterol < 0 ||
      sodium < 0 ||
      potassium < 0 ||
      carbohydrates < 0 ||
      diatery_fiber < 0 ||
      sugars < 0 ||
      vitamin_a < 0 ||
      vitamin_c < 0 ||
      calcium < 0 ||
      iron < 0
    ) {
      swal(
        "Failed",
        "Thông tin bạn nhập không hợp lệ, hãy kiếm tra lại!",
        "error"
      );
    } else {
      const response = await nutritionFactApi.updateByFoodId(
        accessToken,
        foodId,
        {
          calories:
            calories === undefined
              ? nutritionfact.calories
              : calories === ""
              ? 0
              : calories,
          fat: fat === undefined ? nutritionfact.fat : fat === "" ? 0 : fat,
          saturated_fat:
            saturated_fat === undefined
              ? nutritionfact.saturated_fat
              : saturated_fat === ""
              ? 0
              : saturated_fat,
          trans_fat:
            trans_fat === undefined
              ? nutritionfact.trans_fat
              : trans_fat === ""
              ? 0
              : trans_fat,
          protein:
            protein === undefined
              ? nutritionfact.protein
              : protein === ""
              ? 0
              : protein,
          cholesterol:
            cholesterol === undefined
              ? nutritionfact.cholesterol
              : cholesterol === ""
              ? 0
              : cholesterol,
          sodium:
            sodium === undefined
              ? nutritionfact.sodium
              : sodium === ""
              ? 0
              : sodium,
          potassium:
            potassium === undefined
              ? nutritionfact.potassium
              : potassium === ""
              ? 0
              : potassium,
          carbohydrates:
            carbohydrates === undefined
              ? nutritionfact.carbohydrates
              : carbohydrates === ""
              ? 0
              : carbohydrates,
          diatery_fiber:
            diatery_fiber === undefined
              ? nutritionfact.diatery_fiber
              : diatery_fiber === ""
              ? 0
              : diatery_fiber,
          sugars:
            sugars === undefined
              ? nutritionfact.sugars
              : sugars === ""
              ? 0
              : sugars,
          calcium:
            calcium === undefined
              ? nutritionfact.calcium
              : calcium === ""
              ? 0
              : calcium,
          vitamin_a:
            vitamin_a === undefined
              ? nutritionfact.vitamin_a
              : vitamin_a === ""
              ? 0
              : vitamin_a,
          vitamin_c:
            vitamin_c === undefined
              ? nutritionfact.vitamin_c
              : vitamin_c === ""
              ? 0
              : vitamin_c,
          iron:
            iron === undefined ? nutritionfact.iron : iron === "" ? 0 : iron,
        }
      );
      // console.log(response);
      if (response.id) {
        // console.log(response.status === 200);
        swal("Success", "Bạn đã cập nhật thành công món ăn!", "success", {
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
                      <Form.Group>
                        <label>Tên món ăn</label>
                        <Form.Control
                          id="food_name"
                          name="food_name"
                          defaultValue={food.name}
                          disabled
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Calories</label>
                        <Form.Control
                          id="calories"
                          name="calories"
                          defaultValue={nutritionfact.calories}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setCalories(e.target.value);
                            if (temp < 0) {
                              setIsValidCalories(false);
                            } else setIsValidCalories(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidCalories === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Calories phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Chất béo</label>
                        <Form.Control
                          id="fat"
                          name="fat"
                          defaultValue={nutritionfact.fat}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setFat(e.target.value);
                            if (temp < 0) {
                              setIsValidFat(false);
                            } else setIsValidFat(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidFat === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Fat phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Chất béo bão hòa</label>
                        <Form.Control
                          id="saturated_fat"
                          name="food_group_name"
                          defaultValue={nutritionfact.saturated_fat}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setSaturated_fat(e.target.value);
                            if (temp < 0) {
                              setIsValidSaturatedFat(false);
                            } else setIsValidSaturatedFat(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidSaturatedFat === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Saturated Fat phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Chất béo chuyển hóa</label>
                        <Form.Control
                          id="trans_fat"
                          name="trans_fat"
                          defaultValue={nutritionfact.trans_fat}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setTrans_fat(e.target.value);
                            if (temp < 0) {
                              setIsValidTransFat(false);
                            } else setIsValidTransFat(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidTransFat === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Trans Fat phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Chất đạm</label>
                        <Form.Control
                          id="protein"
                          name="protein"
                          defaultValue={nutritionfact.protein}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setProtein(e.target.value);
                            if (temp < 0) {
                              setIsValidProtein(false);
                            } else setIsValidProtein(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidProtein === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Protein phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Cholesterol</label>
                        <Form.Control
                          id="cholesterol"
                          name="cholesterol"
                          defaultValue={nutritionfact.cholesterol}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setCholesterol(e.target.value);
                            if (temp < 0) {
                              setIsValidCholesterol(false);
                            } else setIsValidCholesterol(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidCholesterol === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Cholesterol phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Sodium</label>
                        <Form.Control
                          id="sodium"
                          name="sodium"
                          defaultValue={nutritionfact.sodium}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setSodium(e.target.value);
                            if (temp < 0) {
                              setIsValidSodium(false);
                            } else setIsValidSodium(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidSodium === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Sodium phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Potassium</label>
                        <Form.Control
                          id="potassium"
                          name="potassium"
                          defaultValue={nutritionfact.potassium}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setPotassium(e.target.value);
                            if (temp < 0) {
                              setIsValidPotassium(false);
                            } else setIsValidPotassium(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidPotassium === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Sodium phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Tinh bột</label>
                        <Form.Control
                          id="carbohydrates"
                          name="carbohydrates"
                          defaultValue={nutritionfact.carbohydrates}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setCarbohydrates(e.target.value);
                            if (temp < 0) {
                              setIsValidCarbohydrates(false);
                            } else setIsValidCarbohydrates(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidCarbohydrates === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Carbohydrates phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Chất xơ</label>
                        <Form.Control
                          id="diatery_fiber"
                          name="diatery_fiber"
                          defaultValue={nutritionfact.diatery_fiber}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setDiatery_fiber(e.target.value);
                            if (temp < 0) {
                              setIsValidDiatery_fiber(false);
                            } else setIsValidDiatery_fiber(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidDiatery_fiber === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Diatery fiber phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Đường</label>
                        <Form.Control
                          id="sugars"
                          name="sugars"
                          defaultValue={nutritionfact.sugars}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setSugars(e.target.value);
                            if (temp < 0) {
                              setIsValidSugars(false);
                            } else setIsValidSugars(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidSugars === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Sugars phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Canxi</label>
                        <Form.Control
                          id="canxi"
                          name="canxi"
                          defaultValue={nutritionfact.calcium}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setCalcium(e.target.value);
                            if (temp < 0) {
                              setIsValidCalcium(false);
                            } else setIsValidCalcium(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidCalcium === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Calcium phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Vitamin A</label>
                        <Form.Control
                          id="vitamin_a"
                          name="vitamin_a"
                          defaultValue={nutritionfact.vitamin_a}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setVitamin_a(e.target.value);
                            if (temp < 0) {
                              setIsValidVitaminA(false);
                            } else setIsValidVitaminA(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidVitaminA === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Vitamin A phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Vitamin C</label>
                        <Form.Control
                          id="vitamin_c"
                          name="vitamin_c"
                          defaultValue={nutritionfact.vitamin_c}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setVitamin_c(e.target.value);
                            if (temp < 0) {
                              setIsValidVitaminC(false);
                            } else setIsValidVitaminC(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidVitaminC === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Vitamin C phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Sắt</label>
                        <Form.Control
                          id="iron"
                          name="iron"
                          defaultValue={nutritionfact.iron}
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);

                            setIron(e.target.value);
                            if (temp < 0) {
                              setIsValidIron(false);
                            } else setIsValidIron(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidIron === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Iron phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
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

export default FoodManageUpdateNutrition;
