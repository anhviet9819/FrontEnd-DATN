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
import mealsTrackingApi from "services/MealsTrackingApi";
import ChartistGraph from "react-chartist";

function MealFoodTracking() {
  const { mealstrackingid } = useParams();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  // const [mealstrackingid, setMealstrackingid] = useState(
  //   localStorage.getItem("mealtrackingid")
  // );

  const [mealsTracking, setMealsTracking] = useState([]);

  const [isShow, setIsShow] = useState(false);
  const [isShowNewFoodAdd, setIsShowNewFoodAdd] = useState(false);
  const [foodList, setFoodList] = useState([]);

  const [isValidFoodGroupName, setIsValidFoodGroupName] = useState(false);
  const [isValidCaloPer100G, setIsValidCaloPer100G] = useState(false);
  const [isValidFatPer100G, setIsValidFatPer100G] = useState(true);
  const [isValidProteinPer100G, setIsValidProteinPer100G] = useState(true);
  const [isValidCarbPer100G, setIsValidCarbPer100G] = useState(true);
  const [isValidDiateryPer100G, setIsValidDiateryPer100G] = useState(true);
  const [isValidSugarsPer100G, setIsValidSugarsPer100G] = useState(true);
  const [isValidCalciumPer100G, setIsValidCalciumPer100G] = useState(true);
  const [isValidVolume, setIsValidVolume] = useState(true);

  const [disabledButton, setDisabledButton] = useState(true);
  const [chartData, setChartData] = useState({});

  const foodGroupList = [
    {
      label: "Ng?? c???c v?? s???n ph???m ch??? bi???n",
      value: "Ng?? c???c v?? s???n ph???m ch??? bi???n",
    },
    {
      label: "Khoai c??? v?? s???n ph???m ch??? bi???n",
      value: "Khoai c??? v?? s???n ph???m ch??? bi???n",
    },
    {
      label: "H???t, qu??? gi??u protein, lipid v?? s???n ph???m ch??? bi???n",
      value: "H???t, qu??? gi??u protein, lipid v?? s???n ph???m ch??? bi???n",
    },
    {
      label: "Rau, qu???, c??? d??ng l??m rau",
      value: "Rau, qu???, c??? d??ng l??m rau",
    },
    {
      label: "Qu??? ch??n",
      value: "Qu??? ch??n",
    },
    {
      label: "D???u, m???, b??",
      value: "D???u, m???, b??",
    },
    {
      label: "Th???t v?? s???n ph???m ch??? bi???n",
      value: "Th???t v?? s???n ph???m ch??? bi???n",
    },
    {
      label: "Th???y s???n v?? s???n ph???m ch??? bi???n",
      value: "Th???y s???n v?? s???n ph???m ch??? bi???n",
    },
    {
      label: "Tr???ng v?? s???n ph???m ch??? bi???n",
      value: "Tr???ng v?? s???n ph???m ch??? bi???n",
    },
    {
      label: "S???a v?? s???n ph???m ch??? bi???n",
      value: "S???a v?? s???n ph???m ch??? bi???n",
    },
    {
      label: "????? h???p",
      value: "????? h???p",
    },
    {
      label: "????? ng???t(???????ng, b??nh, m???t, k???o)",
      value: "????? ng???t(???????ng, b??nh, m???t, k???o)",
    },
    {
      label: "Gia v???, n?????c ch???m",
      value: "Gia v???, n?????c ch???m",
    },
    {
      label: "N?????c gi???i kh??t",
      value: "N?????c gi???i kh??t",
    },
    {
      label: "Kh??c",
      value: "Kh??c",
    },
  ];
  const foodLanguageList = [
    {
      label: "VIE",
      value: "VIE",
    },
    {
      label: "THA",
      value: "THA",
    },
    {
      label: "CHN",
      value: "CHN",
    },
    {
      label: "ENG",
      value: "ENG",
    },
    {
      label: "KOR",
      value: "KOR",
    },
    {
      label: "JPN",
      value: "JPN",
    },
    {
      label: "AUS",
      value: "AUS",
    },
    {
      label: "CAN",
      value: "CAN",
    },
    {
      label: "USA",
      value: "USA",
    },
    {
      label: "RUS",
      value: "RUS",
    },
    {
      label: "CZE",
      value: "CZE",
    },
  ];
  const isIngredient = [
    {
      label: "true",
      value: "true",
    },
    {
      label: "false",
      value: "false",
    },
  ];

  const [foodAddIndex, setFoodAddIndex] = useState(0);
  const [mealFoodList, setMealFoodList] = useState([]);

  const [foodId, setFoodId] = useState();
  const [foodName, setFoodName] = useState();
  const [foodGroupAdding, setFoodGroupAdding] = useState();
  const [foodLanguage, setFoodLanguage] = useState();
  const [foodIngredient, setFoodIngredient] = useState();
  const [food_volume, setFood_volume] = useState();
  const [foodCalories, setFoodCalories] = useState();
  const [foodFat, setFoodFat] = useState();
  const [foodProtein, setFoodProtein] = useState();
  const [foodCarbohydrates, setFoodCarbohydrates] = useState();
  const [foodDiateryFiber, setFoodDiateryFiber] = useState();
  const [foodSugars, setFoodSugars] = useState();
  const [foodCalcium, setFoodCalcium] = useState();

  const removeFood = (mealtrackingid, foodid) => {
    swal({
      title: "B???n ch???c ch???n mu???n x??a kh??ng?",
      text: "N???u b???n x??a, d??? li???u s??? kh??ng th??? kh??i ph???c!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mealFoodApi.deleteByMealFoodId(mealtrackingid, foodid, accessToken);
        swal("Success", "B???n ???? x??a m??n ??n th??nh c??ng!", "success", {
          button: false,
          timer: 2000,
        }).then(() => {
          window.location.href = `/user/mealstracking/mealfoodtracking/${mealstrackingid}`;
        });
      }
    });
  };

  const updateMealFoodLists = async (e) => {
    e.preventDefault();
    // const foodSearch = await foodApi.getById(accessToken, foodId);
    let foodArrTest = [];
    foodList.map((food) => {
      foodArrTest.push(food.label);
    });
    // console.log(foodList);
    if (foodArrTest.indexOf(foodName) !== -1) {
      const response = await mealFoodApi.addFood2ByMealsTrackingId(
        accessToken,
        mealstrackingid,
        {
          food: {
            // name: foodName === undefined ? "G???o n???p c??i" : foodName,
            id: foodId,
          },
          food_volume: food_volume,
        }
      );
      console.log(response);
      if (response.name) {
        swal(
          "Success",
          "B???n ???? c???p nh???t th??nh c??ng danh s??ch m??n ??n!",
          "success",
          {
            button: false,
            timer: 1000,
          }
        ).then(() => {
          window.location.href = `/user/mealstracking/mealfoodtracking/${mealstrackingid}`;
        });
      } else {
        swal(
          "Failed",
          "Th??ng tin b???n nh???p kh??ng h???p l???, h??y ki???m tra l???i!",
          "error"
        );
      }
    } else {
      if (
        isValidCalciumPer100G &&
        isValidCaloPer100G &&
        isValidCarbPer100G &&
        isValidDiateryPer100G &&
        isValidFatPer100G &&
        isValidProteinPer100G &&
        isValidSugarsPer100G &&
        isValidVolume &&
        isValidFoodGroupName
      ) {
        const response = await mealFoodApi.addFood2ByMealsTrackingId(
          accessToken,
          mealstrackingid,
          {
            food: {
              id: 1,
              name: foodName,
              foodGroup: {
                group_name: foodGroupAdding,
              },
              language: foodLanguage,
              is_ingredient: foodIngredient,
            },
            food_volume: food_volume,
          }
        );
        const response1 = await nutritionFactApi.updateByFoodId(
          accessToken,
          response.id,
          {
            calories: foodCalories,
            fat: foodFat === undefined ? 0 : foodFat,
            protein: foodProtein === undefined ? 0 : foodProtein,
            carbohydrates:
              foodCarbohydrates === undefined ? 0 : foodCarbohydrates,
            diatery_fiber:
              foodDiateryFiber === undefined ? 0 : foodDiateryFiber,
            sugars: foodSugars === undefined ? 0 : foodSugars,
            calcium: foodCalcium === undefined ? 0 : foodCalcium,
          }
        );
        if (response.name !== undefined && response1.calories) {
          swal(
            "Success",
            "B???n ???? c???p nh???t th??nh c??ng danh s??ch m??n ??n!",
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
            "Th??ng tin b???n nh???p kh??ng h???p l???, h??y ki???m tra l???i3!",
            "error"
          );
        }
      } else {
        swal(
          "Failed",
          "Th??ng tin b???n nh???p kh??ng h???p l???, h??y ki???m tra l???i4!",
          "error"
        );
      }
    }
  };

  const updateMealFoodList = async (e) => {
    e.preventDefault();
    if (foodGroupAdding === undefined && foodCalories === undefined) {
      //truong hop 1: add food co san trong danh muc
      const response = await mealFoodApi.addFood2ByMealsTrackingId(
        accessToken,
        mealstrackingid,
        {
          food: {
            // name: foodName === undefined ? "G???o n???p c??i" : foodName,
            id: foodId,
          },
          food_volume: food_volume,
        }
      );
      console.log(response);
      if (response.name) {
        swal(
          "Success",
          "B???n ???? c???p nh???t th??nh c??ng danh s??ch m??n ??n!",
          "success",
          {
            button: false,
            timer: 1000,
          }
        ).then(() => {
          window.location.href = `/user/mealstracking/mealfoodtracking/${mealstrackingid}`;
        });
      } else {
        swal(
          "Failed",
          "Th??ng tin b???n nh???p kh??ng h???p l???, h??y ki???m tra l???i1!",
          "error"
        );
      }
    } else if (foodGroupAdding !== undefined && foodCalories !== undefined) {
      if (isValidCaloPer100G === false) {
        swal(
          "Failed",
          "Th??ng tin b???n nh???p kh??ng h???p l???, h??y ki???m tra l???i2!",
          "error"
        );
      } else {
        const response = await mealFoodApi.addFood2ByMealsTrackingId(
          accessToken,
          mealstrackingid,
          {
            food: {
              id: 1,
              name: foodName,
              foodGroup: {
                group_name: foodGroupAdding,
              },
              language: foodLanguage,
              is_ingredient: foodIngredient,
            },
            food_volume: food_volume,
          }
        );
        const response1 = await nutritionFactApi.updateByFoodId(
          accessToken,
          response.id,
          {
            calories: foodCalories,
            fat: foodFat === undefined ? 0 : foodFat,
            protein: foodProtein === undefined ? 0 : foodProtein,
            carbohydrates:
              foodCarbohydrates === undefined ? 0 : foodCarbohydrates,
            diatery_fiber:
              foodDiateryFiber === undefined ? 0 : foodDiateryFiber,
            sugars: foodSugars === undefined ? 0 : foodSugars,
            calcium: foodCalcium === undefined ? 0 : foodCalcium,
          }
        );
        if (response.name !== undefined && response1.calories) {
          swal(
            "Success",
            "B???n ???? c???p nh???t th??nh c??ng danh s??ch m??n ??n!",
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
            "Th??ng tin b???n nh???p kh??ng h???p l???, h??y ki???m tra l???i3!",
            "error"
          );
        }
      }
    } else {
      //truong hop 2:
      swal(
        "Failed",
        "M??n ??n b???n ch???n ch??a c?? s???n trong danh m???c m??n ??n, h??y nh???p ?????y ????? th??ng tin nh??!",
        "error"
      );
    }
  };

  // useEffect(() => {
  //   mealFoodApi
  //     .getByMealsTrackingId(accessToken, mealstrackingid)
  //     .then((data) => {
  //       data.map((mealFood) => {
  //         mealFood.calories = Math.round(mealFood.calories * 100) / 100;
  //         mealFood.fat = Math.round(mealFood.fat * 100) / 100;
  //         mealFood.protein = Math.round(mealFood.protein * 100) / 100;
  //         mealFood.carbohydrates =
  //           Math.round(mealFood.carbohydrates * 100) / 100;
  //         mealFood.diatery_fiber =
  //           Math.round(mealFood.diatery_fiber * 100) / 100;
  //         mealFood.sugars = Math.round(mealFood.sugars * 100) / 100;
  //         mealFood.calcium = Math.round(mealFood.calcium * 100) / 100;
  //         console.log(mealFood.food.name);
  //       });
  //       setMealFoodList(data);
  //       return;
  //     });
  // }, []);

  // useEffect(() => {
  //   mealsTrackingApi
  //     .getMealTrackingById(mealstrackingid, accessToken)
  //     .then((data) => {
  //       data.meal_calories = Math.round(data.meal_calories * 100) / 100;
  //       data.meal_fat = Math.round(data.meal_fat * 100) / 100;
  //       data.meal_protein = Math.round(data.meal_protein * 100) / 100;
  //       data.meal_carbohydrates =
  //         Math.round(data.meal_carbohydrates * 100) / 100;
  //       data.meal_diatery_fiber =
  //         Math.round(data.meal_diatery_fiber * 100) / 100;
  //       data.meal_sugars = Math.round(data.meal_sugars * 100) / 100;
  //       data.meal_calcium = Math.round(data.meal_calcium * 100) / 100;
  //       setMealsTracking(data);
  //     });
  //   return;
  // }, []);

  // useEffect(() => {
  //   foodApi.getAll(0, 1000, "").then((data) => {
  //     data.content.map((food) => {
  //       food.value = food.name;
  //       food.label = food.name;
  //       delete food.name;
  //     });
  //     setFoodList(data.content);
  //   });
  //   return;
  // }, []);

  // useEffect(() => {
  //   mealsTrackingApi
  //     .getBieuDoDinhDuongBuaAn(mealstrackingid, accessToken)
  //     .then((data) => {
  //       setChartData({
  //         labels: [
  //           `${data[0].toString()}%`,
  //           `${data[1].toString()}%`,
  //           `${data[2].toString()}%`,
  //           `${data[3].toString()}%`,
  //           `${data[4].toString()}%`,
  //           `${data[5].toString()}%`,
  //           `${data[6].toString()}%`,
  //         ],
  //         series: data,
  //       });
  //     });
  //   return;
  // }, []);

  useEffect(() => {
    Promise.all([
      mealFoodApi.getByMealsTrackingId(accessToken, mealstrackingid),
      mealsTrackingApi.getMealTrackingById(mealstrackingid, accessToken),
      foodApi.getAll(0, 1000, ""),
      mealsTrackingApi.getBieuDoDinhDuongBuaAn(mealstrackingid, accessToken),
    ]).then(([mealFoodList, mealsTracking, foodList, chartData]) => {
      mealFoodList.map((mealFood) => {
        mealFood.calories = Math.round(mealFood.calories * 100) / 100;
        mealFood.fat = Math.round(mealFood.fat * 100) / 100;
        mealFood.protein = Math.round(mealFood.protein * 100) / 100;
        mealFood.carbohydrates = Math.round(mealFood.carbohydrates * 100) / 100;
        mealFood.diatery_fiber = Math.round(mealFood.diatery_fiber * 100) / 100;
        mealFood.sugars = Math.round(mealFood.sugars * 100) / 100;
        mealFood.calcium = Math.round(mealFood.calcium * 100) / 100;
      });
      setMealFoodList(mealFoodList);

      mealsTracking.meal_calories =
        Math.round(mealsTracking.meal_calories * 100) / 100;
      mealsTracking.meal_fat = Math.round(mealsTracking.meal_fat * 100) / 100;
      mealsTracking.meal_protein =
        Math.round(mealsTracking.meal_protein * 100) / 100;
      mealsTracking.meal_carbohydrates =
        Math.round(mealsTracking.meal_carbohydrates * 100) / 100;
      mealsTracking.meal_diatery_fiber =
        Math.round(mealsTracking.meal_diatery_fiber * 100) / 100;
      mealsTracking.meal_sugars =
        Math.round(mealsTracking.meal_sugars * 100) / 100;
      mealsTracking.meal_calcium =
        Math.round(mealsTracking.meal_calcium * 100) / 100;
      setMealsTracking(mealsTracking);

      foodList.content.map((Data) => {
        Data.value = Data.name;
        Data.label = Data.name;
        delete Data.name;
      });
      setFoodList(foodList.content);
      setChartData({
        labels: [
          `${chartData[0].toString()}%`,
          `${chartData[1].toString()}%`,
          `${chartData[2].toString()}%`,
          `${chartData[3].toString()}%`,
          `${chartData[4].toString()}%`,
          `${chartData[5].toString()}%`,
          `${chartData[6].toString()}%`,
        ],
        series: chartData,
      });
    });
    return;
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Danh s??ch m??n ??n</Card.Title>
              </Card.Header>
              <Card.Body>
                {/* <Form onSubmit={updateMealFood}> */}
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">STT</th>
                      <th className="border-0">T??n m??n ??n</th>
                      <th className="border-0">Kh???i l?????ng m??n ??n</th>
                      <th className="border-0">N??ng l?????ng(calo)</th>
                      <th className="border-0">Ch???t b??o(g)</th>
                      <th className="border-0">?????m(g)</th>
                      <th className="border-0">Tinh b???t(g)</th>
                      <th className="border-0">Ch???t x??(g)</th>
                      <th className="border-0">???????ng(g)</th>
                      <th className="border-0">Canxi(mg)</th>
                      {/* <th className="border-0">L?????ng calo cung c???p</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {mealFoodList.map((mealfoodData, index = 1) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index + 1}</td>
                          <td>{mealfoodData.food.name}</td>
                          <td>{mealfoodData.food_volume}</td>
                          <td>{mealfoodData.calories}</td>
                          <td>{mealfoodData.fat}</td>
                          <td>{mealfoodData.protein}</td>
                          <td>{mealfoodData.carbohydrates}</td>
                          <td>{mealfoodData.diatery_fiber}</td>
                          <td>{mealfoodData.sugars}</td>
                          <td>{mealfoodData.calcium}</td>
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
                                    S???a
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
                              X??a
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                    <td style={{ color: "blue" }}>
                      <strong>T???ng l?????ng dinh d?????ng</strong>
                    </td>
                    <td></td>
                    <td></td>
                    <td style={{ color: "blue" }}>
                      {mealsTracking.meal_calories}
                    </td>
                    <td style={{ color: "blue" }}>{mealsTracking.meal_fat}</td>
                    <td style={{ color: "blue" }}>
                      {mealsTracking.meal_protein}
                    </td>
                    <td style={{ color: "blue" }}>
                      {mealsTracking.meal_carbohydrates}
                    </td>
                    <td style={{ color: "blue" }}>
                      {mealsTracking.meal_diatery_fiber}
                    </td>
                    <td style={{ color: "blue" }}>
                      {mealsTracking.meal_sugars}
                    </td>
                    <td style={{ color: "blue" }}>
                      {mealsTracking.meal_calcium}
                    </td>
                  </tbody>
                </Table>

                <div className="clearfix"></div>
                {/* </Form> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Th???ng k?? dinh d?????ng b???a ??n</Card.Title>
                <p className="card-category">
                  Th???ng k?? c??c th??nh ph???n dinh d?????ng trong b???a ??n
                </p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph data={chartData} type="Pie" />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Ch???t b??o <i className="fas fa-circle text-danger"></i>
                  ?????m <i className="fas fa-circle text-warning"></i>
                  Tinh b???t<br></br>
                  <i
                    style={{ color: "rgb(147,104,233" }}
                    className="fas fa-circle"
                  ></i>
                  Ch???t x??{" "}
                  <i
                    style={{ color: "rgb(125, 203, 22)" }}
                    className="fas fa-circle"
                  ></i>
                  ???????ng{" "}
                  <i
                    style={{ color: "rgb(116, 125, 187)" }}
                    className="fas fa-circle"
                  ></i>
                  Canxi
                  <i
                    style={{ color: "rgb(94,94,94)" }}
                    className="fas fa-circle "
                  ></i>
                  C??c th??nh ph???n kh??c
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  C???p nh???t 2 ph??t tr?????c
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {isShow && (
          <Row>
            <Col md="8">
              <Card>
                <Card.Body>
                  <Form onSubmit={updateMealFoodLists}>
                    <Row>
                      <Col className="pr-1" md="4">
                        <label>
                          Ch???n lo???i th???c ??n
                          <span style={{ color: "red" }}>*(b???t bu???c)</span>
                        </label>
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
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>
                            Kh???i l?????ng m??n ??n(g)
                            <span style={{ color: "red" }}>*(b???t bu???c)</span>
                          </label>
                          <Form.Control
                            id="food_volume"
                            name="food_volume"
                            // defaultValue={personalIndex.height}
                            placeholder="Nh???p v??o kh???i l?????ng m??n ??n theo ????n v??? gam"
                            type="text"
                            onChange={(e) => {
                              // console.log(typeof e.target.value === "string");
                              setFood_volume(e.target.value);
                              if (
                                parseFloat(e.target.value) <= 0 ||
                                isNaN(parseFloat(e.target.value)) === true
                              ) {
                                setIsValidVolume(false);
                              } else {
                                setIsValidVolume(true);
                              }
                            }}
                          ></Form.Control>
                        </Form.Group>
                        {isValidVolume === false ? (
                          <Typography
                            variant="body2"
                            color="red"
                            fontSize="13px"
                          >
                            *Kh???i l?????ng m??n ??n ph???i l?? s??? d????ng
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
                    {isShowNewFoodAdd && (
                      <>
                        <Row>
                          <Col className="pr-1" md="4">
                            <label>
                              Ch???n nh??m th???c ??n
                              <span style={{ color: "red" }}>*(b???t bu???c)</span>
                            </label>
                            <Select
                              placeholder="Nh??m th???c ??n b???n th??m v??o"
                              options={foodGroupList}
                              onChange={(e) => {
                                setFoodGroupAdding(e.value);
                                if (e.value !== undefined)
                                  setIsValidFoodGroupName(true);
                              }}
                            />
                          </Col>
                          <Col className="pr-1" md="4">
                            <label>Xu???t x???/ng??n ng??? m??n ??n</label>
                            <CreatableSelect
                              placeholder="VD: VIE, ENG, CHN,..."
                              options={foodLanguageList}
                              onChange={(e) => {
                                setFoodLanguage(e.value);
                              }}
                            />
                          </Col>
                          <Col className="pr-1" md="4">
                            <label>M??n ??n c?? ph???i nguy??n li???u kh??ng</label>
                            <Select
                              placeholder="Nguy??n li???u ?"
                              options={isIngredient}
                              onChange={(e) => {
                                if (e.value === "true") {
                                  setFoodIngredient(true);
                                } else {
                                  setFoodIngredient(false);
                                }
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>
                                Calo cung c???p(t??nh tr??n 100g)
                                <span style={{ color: "red" }}>
                                  *(b???t bu???c)
                                </span>
                              </label>
                              <Form.Control
                                id="food_calories"
                                name="food_calories"
                                placeholder="Nh???p v??o l?????ng calo m??n ??n cung c???p/100gam"
                                type="text"
                                onChange={(e) => {
                                  setFoodCalories(e.target.value);
                                  if (
                                    parseFloat(e.target.value) <= 0 ||
                                    isNaN(parseFloat(e.target.value)) === true
                                  ) {
                                    setIsValidCaloPer100G(false);
                                    // setDisabledButton(true);
                                  } else {
                                    setIsValidCaloPer100G(true);
                                    // setDisabledButton(false);
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
                                *L?????ng calo cung c???p ph???i l?? s??? d????ng
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Fat cung c???p(t??nh tr??n 100g)</label>
                              <Form.Control
                                id="food_fat"
                                name="food_fat"
                                placeholder="Nh???p v??o l?????ng fat m??n ??n cung c???p/100gam"
                                type="text"
                                onChange={(e) => {
                                  setFoodFat(e.target.value);
                                  if (
                                    parseFloat(e.target.value) <= 0 ||
                                    isNaN(parseFloat(e.target.value)) === true
                                  ) {
                                    setIsValidFatPer100G(false);
                                  } else {
                                    setIsValidFatPer100G(true);
                                  }
                                }}
                              ></Form.Control>
                            </Form.Group>
                            {isValidFatPer100G === false ? (
                              <Typography
                                variant="body2"
                                color="red"
                                fontSize="13px"
                              >
                                *L?????ng fat cung c???p ph???i l?? s??? d????ng
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Protein cung c???p(t??nh tr??n 100g)</label>
                              <Form.Control
                                id="food_protein"
                                name="food_protein"
                                placeholder="Nh???p v??o l?????ng protein m??n ??n cung c???p/100gam"
                                type="text"
                                onChange={(e) => {
                                  setFoodProtein(e.target.value);
                                  if (
                                    parseFloat(e.target.value) <= 0 ||
                                    isNaN(parseFloat(e.target.value)) === true
                                  ) {
                                    setIsValidProteinPer100G(false);
                                  } else {
                                    setIsValidProteinPer100G(true);
                                  }
                                }}
                              ></Form.Control>
                            </Form.Group>
                            {isValidProteinPer100G === false ? (
                              <Typography
                                variant="body2"
                                color="red"
                                fontSize="13px"
                              >
                                *L?????ng protein cung c???p ph???i l?? s??? d????ng
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Tinh b???t cung c???p(t??nh tr??n 100g)</label>
                              <Form.Control
                                id="food_carb"
                                name="food_carb"
                                placeholder="Nh???p v??o l?????ng tinh b???t m??n ??n cung c???p/100gam"
                                type="text"
                                onChange={(e) => {
                                  setFoodCarbohydrates(e.target.value);
                                  if (
                                    parseFloat(e.target.value) <= 0 ||
                                    isNaN(parseFloat(e.target.value)) === true
                                  ) {
                                    setIsValidCarbPer100G(false);
                                  } else {
                                    setIsValidCarbPer100G(true);
                                  }
                                }}
                              ></Form.Control>
                            </Form.Group>
                            {isValidCarbPer100G === false ? (
                              <Typography
                                variant="body2"
                                color="red"
                                fontSize="13px"
                              >
                                *L?????ng tinh b???t cung c???p ph???i l?? s??? d????ng
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Ch???t x?? cung c???p(t??nh tr??n 100g)</label>
                              <Form.Control
                                id="food_diatery_fiber"
                                name="food_diatery_fiber"
                                placeholder="Nh???p v??o l?????ng ch???t x?? m??n ??n cung c???p/100gam"
                                type="text"
                                onChange={(e) => {
                                  setFoodDiateryFiber(e.target.value);
                                  if (
                                    parseFloat(e.target.value) <= 0 ||
                                    isNaN(parseFloat(e.target.value)) === true
                                  ) {
                                    setIsValidDiateryPer100G(false);
                                  } else {
                                    setIsValidDiateryPer100G(true);
                                  }
                                }}
                              ></Form.Control>
                            </Form.Group>
                            {isValidDiateryPer100G === false ? (
                              <Typography
                                variant="body2"
                                color="red"
                                fontSize="13px"
                              >
                                *L?????ng ch???t x?? cung c???p ph???i l?? s??? d????ng
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>???????ng cung c???p(t??nh tr??n 100g)</label>
                              <Form.Control
                                id="food_sugars"
                                name="food_sugars"
                                placeholder="Nh???p v??o l?????ng ???????ng m??n ??n cung c???p/100gam"
                                type="text"
                                onChange={(e) => {
                                  setFoodSugars(e.target.value);
                                  if (
                                    parseFloat(e.target.value) <= 0 ||
                                    isNaN(parseFloat(e.target.value)) === true
                                  ) {
                                    setIsValidSugarsPer100G(false);
                                  } else {
                                    setIsValidSugarsPer100G(true);
                                  }
                                }}
                              ></Form.Control>
                            </Form.Group>
                            {isValidSugarsPer100G === false ? (
                              <Typography
                                variant="body2"
                                color="red"
                                fontSize="13px"
                              >
                                *L?????ng ???????ng cung c???p ph???i l?? s??? d????ng
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Canxi cung c???p(t??nh tr??n 100g)</label>
                              <Form.Control
                                id="food_calcium"
                                name="food_calcium"
                                placeholder="Nh???p v??o l?????ng canxi m??n ??n cung c???p/100gam"
                                type="text"
                                onChange={(e) => {
                                  setFoodCalcium(e.target.value);
                                  if (
                                    parseFloat(e.target.value) <= 0 ||
                                    isNaN(parseFloat(e.target.value)) === true
                                  ) {
                                    setIsValidCalciumPer100G(false);
                                  } else {
                                    setIsValidCalciumPer100G(true);
                                  }
                                }}
                              ></Form.Control>
                            </Form.Group>
                            {isValidCalciumPer100G === false ? (
                              <Typography
                                variant="body2"
                                color="red"
                                fontSize="13px"
                              >
                                *L?????ng canxi cung c???p ph???i l?? s??? d????ng
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                        </Row>
                      </>
                    )}
                    <Button
                      // disabled={() => {
                      //   if (
                      //     isValidCalciumPer100G === true &&
                      //     isValidCaloPer100G === true &&
                      //     isValidCarbPer100G === true &&
                      //     isValidDiateryPer100G === true &&
                      //     isValidFatPer100G === true &&
                      //     isValidProteinPer100G === true &&
                      //     isValidSugarsPer100G === true &&
                      //     isValidVolume === true
                      //   ) {
                      //     return false;
                      //   } else return true;
                      // }}

                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                    >
                      Th??m
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
              Th??m m??n ??n
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsShow(!isShow);
                // console.log(foodAddIndex);
                setFoodAddIndex(foodAddIndex + 1);
              }}
            >
              X??a m??n ??n
            </Button>
          )}
        </div>
      </Container>
    </>
  );
}

export default MealFoodTracking;
