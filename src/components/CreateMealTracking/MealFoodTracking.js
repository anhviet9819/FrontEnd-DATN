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
      title: "Bạn chắc chắn muốn xóa không?",
      text: "Nếu bạn xóa, dữ liệu sẽ không thể khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mealFoodApi.deleteByMealFoodId(mealtrackingid, foodid, accessToken);
        swal("Success", "Bạn đã xóa món ăn thành công!", "success", {
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
            // name: foodName === undefined ? "Gạo nếp cái" : foodName,
            id: foodId,
          },
          food_volume: food_volume,
        }
      );
      console.log(response);
      if (response.name) {
        swal(
          "Success",
          "Bạn đã cập nhật thành công danh sách món ăn!",
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
          "Thông tin bạn nhập không hợp lệ, hãy kiếm tra lại!",
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
            "Thông tin bạn nhập không hợp lệ, hãy kiếm tra lại3!",
            "error"
          );
        }
      } else {
        swal(
          "Failed",
          "Thông tin bạn nhập không hợp lệ, hãy kiếm tra lại4!",
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
            // name: foodName === undefined ? "Gạo nếp cái" : foodName,
            id: foodId,
          },
          food_volume: food_volume,
        }
      );
      console.log(response);
      if (response.name) {
        swal(
          "Success",
          "Bạn đã cập nhật thành công danh sách món ăn!",
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
          "Thông tin bạn nhập không hợp lệ, hãy kiếm tra lại1!",
          "error"
        );
      }
    } else if (foodGroupAdding !== undefined && foodCalories !== undefined) {
      if (isValidCaloPer100G === false) {
        swal(
          "Failed",
          "Thông tin bạn nhập không hợp lệ, hãy kiếm tra lại2!",
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
            "Thông tin bạn nhập không hợp lệ, hãy kiếm tra lại3!",
            "error"
          );
        }
      }
    } else {
      //truong hop 2:
      swal(
        "Failed",
        "Món ăn bạn chọn chưa có sẵn trong danh mục món ăn, hãy nhập đầy đủ thông tin nhé!",
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
                      <th className="border-0">Năng lượng(calo)</th>
                      <th className="border-0">Chất béo(g)</th>
                      <th className="border-0">Đạm(g)</th>
                      <th className="border-0">Tinh bột(g)</th>
                      <th className="border-0">Chất xơ(g)</th>
                      <th className="border-0">Đường(g)</th>
                      <th className="border-0">Canxi(mg)</th>
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
                    <td style={{ color: "blue" }}>
                      <strong>Tổng lượng dinh dưỡng</strong>
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
                <Card.Title as="h4">Thống kê dinh dưỡng bữa ăn</Card.Title>
                <p className="card-category">
                  Thống kê các thành phần dinh dưỡng trong bữa ăn
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
                  Chất béo <i className="fas fa-circle text-danger"></i>
                  Đạm <i className="fas fa-circle text-warning"></i>
                  Tinh bột<br></br>
                  <i
                    style={{ color: "rgb(147,104,233" }}
                    className="fas fa-circle"
                  ></i>
                  Chất xơ{" "}
                  <i
                    style={{ color: "rgb(125, 203, 22)" }}
                    className="fas fa-circle"
                  ></i>
                  Đường{" "}
                  <i
                    style={{ color: "rgb(116, 125, 187)" }}
                    className="fas fa-circle"
                  ></i>
                  Canxi
                  <i
                    style={{ color: "rgb(94,94,94)" }}
                    className="fas fa-circle "
                  ></i>
                  Các thành phần khác
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Cập nhật 2 phút trước
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
                          Chọn loại thức ăn
                          <span style={{ color: "red" }}>*(bắt buộc)</span>
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
                            Khối lượng món ăn(g)
                            <span style={{ color: "red" }}>*(bắt buộc)</span>
                          </label>
                          <Form.Control
                            id="food_volume"
                            name="food_volume"
                            // defaultValue={personalIndex.height}
                            placeholder="Nhập vào khối lượng món ăn theo đơn vị gam"
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
                            *Khối lượng món ăn phải là số dương
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
                              Chọn nhóm thức ăn
                              <span style={{ color: "red" }}>*(bắt buộc)</span>
                            </label>
                            <Select
                              placeholder="Nhóm thức ăn bạn thêm vào"
                              options={foodGroupList}
                              onChange={(e) => {
                                setFoodGroupAdding(e.value);
                                if (e.value !== undefined)
                                  setIsValidFoodGroupName(true);
                              }}
                            />
                          </Col>
                          <Col className="pr-1" md="4">
                            <label>Xuất xứ/ngôn ngữ món ăn</label>
                            <CreatableSelect
                              placeholder="VD: VIE, ENG, CHN,..."
                              options={foodLanguageList}
                              onChange={(e) => {
                                setFoodLanguage(e.value);
                              }}
                            />
                          </Col>
                          <Col className="pr-1" md="4">
                            <label>Món ăn có phải nguyên liệu không</label>
                            <Select
                              placeholder="Nguyên liệu ?"
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
                                Calo cung cấp(tính trên 100g)
                                <span style={{ color: "red" }}>
                                  *(bắt buộc)
                                </span>
                              </label>
                              <Form.Control
                                id="food_calories"
                                name="food_calories"
                                placeholder="Nhập vào lượng calo món ăn cung cấp/100gam"
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
                                *Lượng calo cung cấp phải là số dương
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Fat cung cấp(tính trên 100g)</label>
                              <Form.Control
                                id="food_fat"
                                name="food_fat"
                                placeholder="Nhập vào lượng fat món ăn cung cấp/100gam"
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
                                *Lượng fat cung cấp phải là số dương
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Protein cung cấp(tính trên 100g)</label>
                              <Form.Control
                                id="food_protein"
                                name="food_protein"
                                placeholder="Nhập vào lượng protein món ăn cung cấp/100gam"
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
                                *Lượng protein cung cấp phải là số dương
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Tinh bột cung cấp(tính trên 100g)</label>
                              <Form.Control
                                id="food_carb"
                                name="food_carb"
                                placeholder="Nhập vào lượng tinh bột món ăn cung cấp/100gam"
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
                                *Lượng tinh bột cung cấp phải là số dương
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Chất xơ cung cấp(tính trên 100g)</label>
                              <Form.Control
                                id="food_diatery_fiber"
                                name="food_diatery_fiber"
                                placeholder="Nhập vào lượng chất xơ món ăn cung cấp/100gam"
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
                                *Lượng chất xơ cung cấp phải là số dương
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Đường cung cấp(tính trên 100g)</label>
                              <Form.Control
                                id="food_sugars"
                                name="food_sugars"
                                placeholder="Nhập vào lượng đường món ăn cung cấp/100gam"
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
                                *Lượng đường cung cấp phải là số dương
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Col>
                          <Col className="pr-1" md="4">
                            <Form.Group>
                              <label>Canxi cung cấp(tính trên 100g)</label>
                              <Form.Control
                                id="food_calcium"
                                name="food_calcium"
                                placeholder="Nhập vào lượng canxi món ăn cung cấp/100gam"
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
                                *Lượng canxi cung cấp phải là số dương
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
                      Thêm
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
