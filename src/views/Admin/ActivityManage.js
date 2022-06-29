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
import activitiesTrackingApi from "services/ActivitiesTrackingApi";
import listActivitiesApi from "services/ListActivitiesApi";
import swal from "sweetalert";
import ActivityManageCreate from "./ActivityManageCreate";
import ActivityManageUpdate from "./ActivityManageUpdate";
import Select from "react-select";

function ActivityManage() {
  const [listActivitiesData, setListActivitiesData] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.accessToken);
  const [isShow, setIsShow] = useState(true);

  const [pagination, setPagination] = useState({
    _page: 0,
    _size: 8,
    _totalRows: 10,
  });
  const [filters, setFilters] = useState({
    sort: "",
    _page: 0,
    _size: 8,
    nameContaining: "",
  });

  const [sortList, setSortList] = useState([
    {
      value: "Lượng calo từ cao đến thấp",
      label: "Lượng calo từ cao đến thấp",
    },
    {
      value: "Lượng calo từ thấp đến cao",
      label: "Lượng calo từ thấp đến cao",
    },
    {
      value: "Lượng calo tiêu thụ",
      label: "Lượng calo tiêu thụ",
    },
  ]);

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
      _page: 0,
      nameContaining: newFilters.searchTerm,
    });
    console.log(filters._page);
  }

  const removeActivity = (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa không?",
      text: "Nếu bạn xóa, dữ liệu sẽ không thể khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        activitiesTrackingApi
          .getActivitiesTrackingByListActivitiesId(
            id,
            localStorage.getItem("accessToken")
          )
          .then((data) => {
            if (data.length !== 0) {
              swal(
                "Failed",
                "Hoạt động bạn muốn xóa đã được người dùng lưu trong nhật ký hoạt động, hãy kiểm tra lại!",
                "error"
              );
            } else {
              listActivitiesApi
                .deleteById(id, localStorage.getItem("accessToken"))
                .then(
                  swal(
                    "Success",
                    "Bạn đã xóa hoạt động trong danh mục thành công!",
                    "success",
                    {
                      button: false,
                      timer: 2000,
                    }
                  ).then(() => {
                    window.location.href = `/admin/activitymanage`;
                  })
                );
            }
          });
      }
    });
  };

  useEffect(() => {
    listActivitiesApi
      .getAllWithFilters(
        accessToken,
        filters.sort,
        filters._page,
        filters._size,
        filters.nameContaining
      )
      .then((data) => {
        // console.log(data);
        setListActivitiesData(data.content);
        setPagination({
          _page: data.number,
          _size: data.size,
          _totalRows: data.totalElements,
        });
        //   console.log(data.content);
      });
  }, [filters]);

  return (
    <>
      <Switch>
        <Route path="/admin/activitymanage/update">
          <ActivityManageUpdate />
        </Route>
        <Route path="/admin/activitymanage/create">
          <ActivityManageCreate />
        </Route>
      </Switch>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Quản lý danh mục hoạt động</Card.Title>
                {/* <p>Tìm kiếm</p> */}
                <p className="card-category">Tìm kiếm theo tên</p>
                <SearchForm onSubmit={handleFiltersChange} />
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">STT</th>
                      <th className="border-0">Tên hoạt động</th>
                      {/* <th className="border-0">Lượng calo tiêu thụ 1 giờ</th> */}
                      <th className="border-0">
                        <Select
                          placeholder="Lượng calo tiêu thụ 1 giờ"
                          options={sortList}
                          onChange={(e) => {
                            if (e.value === "Lượng calo tiêu thụ") {
                              setFilters({
                                ...filters,
                                sort: "",
                              });
                            } else if (
                              e.value === "Lượng calo từ cao đến thấp"
                            ) {
                              setFilters({
                                ...filters,
                                sort: "desc",
                              });
                            } else {
                              setFilters({
                                ...filters,
                                sort: "asc",
                              });
                            }
                          }}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listActivitiesData.map((activity, index) => {
                      return (
                        <tr key={activity.id}>
                          <td>{activity.id}</td>
                          <td>{activity.name}</td>
                          <td>{activity.calo_per_hour}</td>
                          <td>
                            <Button
                              className="btn-fill pull-right"
                              // variant="primary"
                              href={`/admin/activitymanage/update/${activity.id}`}
                              onClick={() => {
                                localStorage.setItem("activityId", activity.id);
                              }}
                            >
                              Sửa
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => removeActivity(activity.id)}
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
              href="/admin/activitymanage/create"
            >
              Tạo hoạt động mới
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

export default ActivityManage;
