import Pagination from "components/Pagination";
import SearchForm from "components/SearchForm/index";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Route, Switch } from "react-router";
import foodApi from "services/FoodApi";
import mealFoodApi from "services/mealfoodApi";
import nutritionFactApi from "services/NutritionFactApi";
import swal from "sweetalert";
import FoodManageCreate from "./FoodManageCreate";
import FoodManageUpdate from "./FoodManageUpdate";
import FoodManageUpdateNutrition from "./FoodManageUpdateNutrition";
import Select from "react-select";

function FoodManage() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [listFood, setListFood] = useState([]);
  const [nutritionfactIdList, setNutritionfactIdList] = useState();

  const [pagination, setPagination] = useState({
    _page: 0,
    _size: 10,
    _totalRows: 100,
  });
  const [filters, setFilters] = useState({
    foodGroupName: "",
    _page: 0,
    _size: 10,
    nameContaining: "",
  });

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
      label: "Hạt, quả, giàu protein, lipid và sản phẩm chế biến",
      value: "Hạt, quả, giàu protein, lipid và sản phẩm chế biến",
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
      label: "Đồ ngọt (đường, bánh, mứt, kẹo)",
      value: "Đồ ngọt (đường, bánh, mứt, kẹo)",
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
    {
      label: "Tất cả",
      value: "Tất cả",
    },
  ];

  function handlePageChange(newPage) {
    // console.log("New page: ", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleFiltersChange(newFilters) {
    // console.log("New filters: ", newFilters);
    setFilters({
      ...filters,
      _size: 10,
      _page: 0,
      nameContaining: newFilters.searchTerm,
    });
    console.log(filters);
  }

  const removeFood = (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa không?",
      text: "Nếu bạn xóa, dữ liệu sẽ không thể khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mealFoodApi
          .getByFoodId(localStorage.getItem("accessToken"), id)
          .then((data) => {
            if (data.length !== 0) {
              swal(
                "Failed",
                "Món ăn bạn muốn xóa đã được người dùng lưu trong nhật ký hoạt động, hãy kiểm tra lại!",
                "error"
              );
            } else {
              foodApi.deleteById(id, localStorage.getItem("accessToken")).then(
                swal(
                  "Success",
                  "Bạn đã xóa Món ăn trong danh mục thành công!",
                  "success",
                  {
                    button: false,
                    timer: 2000,
                  }
                ).then(() => {
                  window.location.href = `/admin/foodmanage`;
                })
              );
            }
          });
      }
    });
  };

  useEffect(() => {
    foodApi
      .getWithFilters(
        accessToken,
        filters.foodGroupName,
        filters._page,
        filters._size,
        filters.nameContaining
      )
      .then((data) => {
        // console.log(data.content);
        setListFood(data.content);
        setPagination({
          _page: data.number,
          _size: data.size,
          _totalRows: data.totalElements,
        });
      });
  }, [filters]);

  return (
    <>
      <Switch>
        <Route path="/admin/foodmanage/updatefood">
          <FoodManageUpdate />
        </Route>
        <Route path="/admin/foodmanage/updatenutrition">
          <FoodManageUpdateNutrition />
        </Route>
        <Route path="/admin/foodmanage/create">
          <FoodManageCreate />
        </Route>
      </Switch>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Quản lý danh mục thực phẩm</Card.Title>
                {/* <p>Tìm kiếm</p> */}
                <p className="card-category">Tìm kiếm theo tên</p>
                <SearchForm onSubmit={handleFiltersChange} />
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">STT</th>
                      {/* <th className="border-0">Nhóm thực phẩm</th> */}
                      <th className="border-0">
                        <Select
                          placeholder="Nhóm thực phẩm"
                          options={foodGroupList}
                          onChange={(e) => {
                            // console.log(e.value);
                            if (e.value === "Tất cả") {
                              setFilters({
                                ...filters,
                                foodGroupName: "",
                              });
                            } else {
                              setFilters({
                                ...filters,
                                foodGroupName: e.value,
                              });
                            }
                          }}
                        />
                      </th>
                      <th className="border-0">Tên thực phẩm</th>
                      <th className="border-0">Có phải nguyên liệu không</th>
                      <th className="border-0">Ngôn ngữ</th>
                      <th className="border-0">Phạm vi</th>
                      <th className="border-0">Quản lý</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listFood.map((food, index) => {
                      // console.log(food);
                      return (
                        <tr key={food.id}>
                          <td>{food.id}</td>
                          <td>{food.foodGroup.group_name}</td>
                          <td>{food.name}</td>
                          {food.is_ingredient === true ? (
                            <td>Nguyên liệu</td>
                          ) : (
                            <td>Món ăn</td>
                          )}
                          <td>{food.language}</td>
                          {food.scope === "true" ? (
                            <td>Toàn bộ hệ thống</td>
                          ) : (
                            <td>Cá nhân</td>
                          )}
                          <td>
                            <Button
                              className="btn-fill pull-right"
                              // variant="primary"
                              href={`/admin/foodmanage/updatefood/${food.id}`}
                              onClick={() => {
                                localStorage.setItem("foodId", food.id);
                              }}
                            >
                              Sửa thông tin
                            </Button>
                            <Button
                              // className="btn-fill pull-right"
                              variant="primary"
                              href={`/admin/foodmanage/updatenutrition/${food.id}`}
                              onClick={() => {
                                localStorage.setItem("foodId", food.id);
                              }}
                            >
                              Sửa dinh dưỡng
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => removeFood(food.id)}
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
          </Col>
          <Col>
            <Button
              className="btn-fill pull-right"
              variant="primary"
              href="/admin/foodmanage/create"
            >
              Tạo món ăn mới
            </Button>
          </Col>
          <Col>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FoodManage;
