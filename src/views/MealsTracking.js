import CreateMealTracking from "../components/CreateMealTracking/CreateMealTracking";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import {
  BrowserRouter,
  Link,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import mealsTrackingApi from "services/MealsTrackingApi";
import UpdateMealTracking from "components/CreateMealTracking/UpdateMealTracking";
import CreateMealFoodTracking from "../components/CreateMealTracking/CreateMealFoodTracking";
import MealFoodTracking from "components/CreateMealTracking/MealFoodTracking";
import swal from "sweetalert";
import Select from "react-select";
import Pagination from "components/Pagination";
import CreateActivityTracking from "components/ActivityTracking/CreateActivityTracking";
import UpdateActivityTracking from "components/ActivityTracking/UpdateActivityTracking";
import UpdatePersonalIndexHistory from "components/BasicTrackingHistory/UpdatePersonalIndexHistory";
import UpdateBloodPressureHistory from "components/BasicTrackingHistory/UpdateBloodPressureHistory";
import UpdateDiabatesMelitiyusHistory from "components/BasicTrackingHistory/UpdateDiabatesMelitiyusHistory";

function MealsTracking() {
  const [isShow, setIsShow] = useState(true);
  const [mealstrackingData, setMealstrackingData] = useState([]);
  const [mealstrackingDataCheck, setMealstrackingDataCheck] = useState([]);
  const [usertrackingid, setUsertrackingid] = useState(
    localStorage.getItem("userTrackingId")
  );
  const [accesstoken, setAccesstoken] = useState(
    localStorage.getItem("accessToken")
  );
  const [filters, setFilters] = useState({
    createdAtStart: "",
    createdAtEnd: "",
    type: "",
    _page: 0,
    _size: 7,
  });
  const [pagination, setPagination] = useState({
    _page: 0,
    _size: 7,
    _totalRows: 100,
  });

  const [createdList, setCreatedList] = useState([
    {
      value: "Tất cả",
      label: "Tất cả",
    },
    {
      value: "Hôm nay",
      label: "Hôm nay",
    },
    {
      value: "3 ngày vừa qua",
      label: "3 ngày vừa qua",
    },
    {
      value: "7 ngày vừa qua",
      label: "7 ngày vừa qua",
    },
  ]);
  const [createdAtFilter, setCreatedAtFilter] = useState();

  const [typeList, setTypeList] = useState([
    {
      value: "Bữa sáng",
      label: "Bữa sáng",
    },
    {
      value: "Bữa trưa",
      label: "Bữa trưa",
    },
    {
      value: "Bữa tối",
      label: "Bữa tối",
    },
    {
      value: "Bữa phụ",
      label: "Bữa phụ",
    },
    {
      value: "Tất cả",
      label: "Tất cả",
    },
  ]);

  // useEffect(() => {
  //   mealsTrackingApi
  //     .getMealsTrackingByUsertrackingId(usertrackingid, accesstoken)
  //     .then((data) => {
  //       data.map((mealtracking) => {
  //         mealtracking.created_at = new Date(
  //           mealtracking.created_at
  //         ).toLocaleString();
  //       });
  //       setMealstrackingDataCheck(data);
  //     });
  //   return;
  // }, [mealstrackingDataCheck]);

  useEffect(() => {
    Promise.all([
      mealsTrackingApi
        .getByFiltersPagination(
          accesstoken,
          usertrackingid,
          filters.createdAtStart,
          filters.createdAtEnd,
          filters.type,
          filters._page,
          filters._size
        )
        .then((data) => {
          console.log(data);
          data.content.map((mealtracking) => {
            mealtracking.created_at = new Date(
              mealtracking.created_at
            ).toLocaleString();
            mealtracking.meal_calories =
              Math.round(mealtracking.meal_calories * 100) / 100;
            mealtracking.meal_fat =
              Math.round(mealtracking.meal_fat * 100) / 100;
            mealtracking.meal_protein =
              Math.round(mealtracking.meal_protein * 100) / 100;
            mealtracking.meal_carbohydrates =
              Math.round(mealtracking.meal_carbohydrates * 100) / 100;
            mealtracking.meal_diatery_fiber =
              Math.round(mealtracking.meal_diatery_fiber * 100) / 100;
            mealtracking.meal_sugars =
              Math.round(mealtracking.meal_sugars * 100) / 100;
            mealtracking.meal_calcium =
              Math.round(mealtracking.meal_calcium * 100) / 100;
          });
          setMealstrackingData(data.content);
          setPagination({
            _page: data.number,
            _size: data.size,
            _totalRows: data.totalElements,
          });
        }),
      mealsTrackingApi
        .getMealsTrackingByUsertrackingId(usertrackingid, accesstoken)
        .then((data) => {
          data.map((mealtracking) => {
            mealtracking.created_at = new Date(
              mealtracking.created_at
            ).toLocaleString();
          });
          setMealstrackingDataCheck(data);
        }),
    ]);
    return;
  }, [filters]);

  function handlePageChange(newPage) {
    // console.log("New page: ", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  const navigateCreateMealTracking = () => {
    setIsShow(false);
    if (!isShow) {
      return <CreateMealTracking />;
    }
  };

  const removeMealtracking = (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa không?",
      text: "Nếu bạn xóa, dữ liệu sẽ không thể khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mealsTrackingApi.deleteById(id, accesstoken);
        swal("Success", "Bạn đã xóa nhật ký bữa ăn thành công!", "success", {
          button: false,
          timer: 2000,
        }).then(() => {
          window.location.href = "/user/mealstracking";
        });
      }
      // else {
      //   swal("Your imaginary file is safe!");
      // }
    });
  };

  const navigateMealFoodTracking = () => {
    return <CreateMealFoodTracking />;
  };

  return (
    <>
      {/* <Switch>
        <Route path="/user/mealstracking/createmealtracking">
          <CreateMealTracking />
        </Route>
        <Route path="/user/mealstracking/updatemealtracking/:mealstrackingid">
          <UpdateMealTracking />
        </Route>
        <Route path="/user/mealstracking/mealfoodtracking/:mealstrackingid">
          <MealFoodTracking />
        </Route>
      </Switch> */}
      <Container fluid>
        {mealstrackingDataCheck.length === 0 ? (
          { isShow } ? (
            <>
              <p>Bạn chưa có nhật ký dinh dưỡng nào cả.</p>
              <Link
                to="/user/mealstracking/createmealtracking"
                onClick={() => {
                  localStorage.setItem("mealtrackingid", mealstrackingData.id);
                }}
              >
                Tạo ngay nhé!
              </Link>
            </>
          ) : (
            <CreateMealTracking />
            // <p>Viet</p>
          )
        ) : (
          <>
            <Container fluid>
              <Row>
                <Col md="12">
                  <Card className="strpied-tabled-with-hover">
                    <Card.Header>
                      <Card.Title as="h4">Nhật ký ăn uống</Card.Title>
                    </Card.Header>
                    <Card.Body className="table-full-width table-responsive px-0">
                      <Table className="table-hover table-striped">
                        <thead>
                          <tr>
                            <th className="border-0">
                              <Select
                                placeholder="Ngày tạo"
                                options={createdList}
                                onChange={(e) => {
                                  // console.log(e.value);
                                  let currentDate = new Date()
                                    .toISOString()
                                    .slice(0, 10)
                                    .concat("T00:00:00.001Z");
                                  //lay duoc 3 ngay truoc bat dau tu 0h
                                  let currentDate3DaysAgo = new Date(
                                    new Date()
                                      .toISOString()
                                      .slice(0, 10)
                                      .concat("T00:00:00.001Z")
                                  );
                                  let epoch3DaysAgo =
                                    Date.parse(currentDate3DaysAgo) -
                                    2 * 86400000;
                                  //3 ngay truoc chuan day nhe!!!
                                  let threeDaysAgo = new Date(
                                    epoch3DaysAgo
                                  ).toISOString();

                                  //lay duoc 7 ngay truoc bat dau tu 0h
                                  let currentDate7DaysAgo = new Date(
                                    new Date()
                                      .toISOString()
                                      .slice(0, 10)
                                      .concat("T00:00:00.001Z")
                                  );
                                  let epoch7DaysAgo =
                                    Date.parse(currentDate7DaysAgo) -
                                    7 * 86400000;
                                  //7 ngay truoc chuan day nhe!!!
                                  let sevenDaysAgo = new Date(
                                    epoch7DaysAgo
                                  ).toISOString();

                                  let currentDateEnd = new Date()
                                    .toISOString()
                                    .slice(0, 10)
                                    .concat("T23:59:59.001Z");

                                  setCreatedAtFilter(e.value);
                                  if (e.value === "Hôm nay") {
                                    setFilters({
                                      ...filters,
                                      createdAtStart: currentDate,
                                      createdAtEnd: currentDateEnd,
                                    });
                                  } else if (e.value === "3 ngày vừa qua") {
                                    setFilters({
                                      ...filters,
                                      createdAtStart: threeDaysAgo,
                                      createdAtEnd: currentDateEnd,
                                    });
                                  } else if (e.value === "7 ngày vừa qua") {
                                    setFilters({
                                      ...filters,
                                      createdAtStart: sevenDaysAgo,
                                      createdAtEnd: currentDateEnd,
                                    });
                                  } else {
                                    setFilters({
                                      ...filters,
                                      createdAtStart: "",
                                      createdAtEnd: "",
                                    });
                                  }
                                }}
                              />
                            </th>
                            {/* <th className="border-0">Tên nhật ký</th> */}
                            {/* <th className="border-0">Chi tiết nhật ký</th> */}
                            <th className="border-0">
                              <Select
                                placeholder="Loại bữa ăn"
                                options={typeList}
                                onChange={(e) => {
                                  if (e.value === "Bữa sáng") {
                                    setFilters({
                                      ...filters,
                                      type: "Bữa sáng",
                                    });
                                  } else if (e.value === "Bữa trưa") {
                                    setFilters({
                                      ...filters,
                                      type: "Bữa trưa",
                                    });
                                  } else if (e.value === "Bữa tối") {
                                    setFilters({
                                      ...filters,
                                      type: "Bữa tối",
                                    });
                                  } else if (e.value === "Bữa phụ") {
                                    setFilters({
                                      ...filters,
                                      type: "Bữa phụ",
                                    });
                                  } else {
                                    setFilters({
                                      ...filters,
                                      type: "",
                                    });
                                  }
                                }}
                              />
                            </th>
                            <th className="border-0">Năng lượng(calo)</th>
                            <th className="border-0">Chất béo(g)</th>
                            <th className="border-0">Đạm(g)</th>
                            <th className="border-0">Tinh bột(g)</th>
                            <th className="border-0">Chất xơ(g)</th>
                            <th className="border-0">Đường(g)</th>
                            <th className="border-0">Canxi(mg)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mealstrackingData.map((mealstrackingData) => {
                            return (
                              <tr key={mealstrackingData.id}>
                                <td>{mealstrackingData.created_at}</td>
                                {/* <td>
                                  <Link
                                    to={`/user/mealstracking/mealfoodtracking/${mealstrackingData.id}`}
                                    onClick={() => {
                                      localStorage.setItem(
                                        "mealtrackingid",
                                        mealstrackingData.id
                                      );
                                    }}
                                  >
                                    {mealstrackingData.name}
                                  </Link>
                                </td> */}
                                {/* <td>{mealstrackingData.description}</td> */}
                                <td>
                                  <Link
                                    to={`/user/mealstracking/mealfoodtracking/${mealstrackingData.id}`}
                                    onClick={() => {
                                      localStorage.setItem(
                                        "mealtrackingid",
                                        mealstrackingData.id
                                      );
                                    }}
                                  >
                                    {mealstrackingData.type}
                                  </Link>
                                </td>
                                <td>{mealstrackingData.meal_calories}</td>
                                <td>{mealstrackingData.meal_fat}</td>
                                <td>{mealstrackingData.meal_protein}</td>
                                <td>{mealstrackingData.meal_carbohydrates}</td>
                                <td>{mealstrackingData.meal_diatery_fiber}</td>
                                <td>{mealstrackingData.meal_sugars}</td>
                                <td>{mealstrackingData.meal_calcium}</td>
                                <td>
                                  <Button
                                    className="btn-fill pull-right"
                                    // variant="primary"
                                    href={`/user/mealstracking/updatemealtracking/${mealstrackingData.id}`}
                                    onClick={() => {
                                      localStorage.setItem(
                                        "mealtrackingid",
                                        mealstrackingData.id
                                      );
                                    }}
                                  >
                                    Sửa
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() =>
                                      removeMealtracking(mealstrackingData.id)
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
                    </Card.Body>
                  </Card>
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                  <Button
                    className="btn-fill pull-right"
                    variant="primary"
                    href="/user/mealstracking/createmealtracking"
                  >
                    Tạo nhật ký bữa ăn mới
                  </Button>
                </Col>
              </Row>
              {/* <div>
                <Link
                  to="/user/mealstracking/createmealtracking"
                  onClick={() => navigateCreateMealTracking()}
                >
                  Tạo nhật ký dinh dưỡng mới
                </Link>
              </div> */}
            </Container>
          </>
        )}
      </Container>
    </>
  );
}

export default MealsTracking;
