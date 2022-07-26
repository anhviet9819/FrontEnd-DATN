import CreateActivityTracking from "../components/ActivityTracking/CreateActivityTracking";
import UpdateActivityTracking from "../components/ActivityTracking/UpdateActivityTracking";
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
import activitiesTrackingApi from "services/ActivitiesTrackingApi";
import swal from "sweetalert";
import Select from "react-select";
import Pagination from "components/Pagination";
import listActivitiesApi from "services/ListActivitiesApi";

function ActivitiesTracking() {
  const [isShow, setIsShow] = useState(true);
  const [activitiestrackingData, setActivitiestrackingData] = useState([]);
  const [activitiestrackingDataCheck, setActivitiestrackingDataCheck] =
    useState([]);
  const [usertrackingid, setUsertrackingid] = useState(
    localStorage.getItem("userTrackingId")
  );
  const [accesstoken, setAccesstoken] = useState(
    localStorage.getItem("accessToken")
  );
  const [pagination, setPagination] = useState({
    _page: 0,
    _size: 7,
    _totalRows: 100,
  });
  const [filters, setFilters] = useState({
    createdAtStart: "",
    createdAtEnd: "",
    listActivitiesId: "",
    _page: 0,
    _size: 7,
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

  const [listActivities, setListActivities] = useState([]);
  const [listActivitiesFilter, setListActivitiesFilter] = useState();

  useEffect(() => {
    activitiesTrackingApi
      .getActivitiesTrackingByUsertrackingId(usertrackingid, accesstoken)
      .then((data) => {
        setActivitiestrackingDataCheck(data);
      });
    console.log(activitiestrackingDataCheck);
  }, []);

  useEffect(() => {
    listActivitiesApi.getAllNoFilters(accesstoken).then((data) => {
      data.map((activity) => {
        activity.label = activity.name;
        activity.value = activity.name;
      });
      data.push({
        value: "Tất cả",
        label: "Tất cả",
      });
      // console.log(data);
      setListActivities(data);
    });
    return;
  }, []);

  // useEffect(() => {
  //   activitiesTrackingApi
  //     .getByFilters(
  //       accesstoken,
  //       usertrackingid,
  //       filters.createdAtStart,
  //       filters.createdAtEnd,
  //       filters.listActivitiesId
  //     )
  //     .then((data) => {
  //       data.map((activitytracking) => {
  //         activitytracking.created_at = new Date(
  //           activitytracking.created_at
  //         ).toLocaleString();
  //         activitytracking.start_time = new Date(
  //           activitytracking.start_time
  //         ).toLocaleString();
  //         activitytracking.end_time = new Date(
  //           activitytracking.end_time
  //         ).toLocaleString();
  //       });
  //       setActivitiestrackingData(data);
  //     });
  //   return;
  // }, [filters]);

  useEffect(() => {
    activitiesTrackingApi
      .getByFiltersPagination(
        accesstoken,
        usertrackingid,
        filters.createdAtStart,
        filters.createdAtEnd,
        filters.listActivitiesId,
        filters._page,
        filters._size
      )
      .then((data) => {
        data.content.map((activitytracking) => {
          activitytracking.created_at = new Date(
            activitytracking.created_at
          ).toLocaleString();
          activitytracking.start_time = new Date(
            activitytracking.start_time
          ).toLocaleString();
          activitytracking.end_time = new Date(
            activitytracking.end_time
          ).toLocaleString();
        });
        setActivitiestrackingData(data.content);
        setPagination({
          _page: data.number,
          _size: data.size,
          _totalRows: data.totalElements,
        });
      });
    return;
  }, [filters]);

  function handlePageChange(newPage) {
    // console.log("New page: ", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  const onHandleClick = () => {
    setIsShow(false);
    if (!isShow) {
      return <CreateActivityTracking />;
    }
  };

  const removeActitvityTracking = (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa không?",
      text: "Nếu bạn xóa, dữ liệu sẽ không thể khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        activitiesTrackingApi.deleteById(id, accesstoken);
        swal("Success", "Bạn đã xóa nhật ký hoạt động thành công!", "success", {
          button: false,
          timer: 2000,
        }).then(() => {
          window.location.href = "/user/activitiestracking";
        });
      }
    });
  };

  return (
    <>
      {/* <Switch>
        <Route path="/user/activitiestracking/createactivitytracking">
          <CreateActivityTracking />
        </Route>
        <Route path="/user/activitiestracking/updateactivitytracking/:activitytrackingid">
          <UpdateActivityTracking />
        </Route>
      </Switch> */}
      <Container fluid>
        {activitiestrackingDataCheck.length === 0 ? (
          { isShow } ? (
            <>
              <p>Bạn chưa có nhật ký hoạt động nào cả.</p>
              <Link
                to="/user/activitiestracking/createactivitytracking"
                onClick={() => onHandleClick()}
              >
                Tạo ngay nhé!
              </Link>
            </>
          ) : (
            <CreateActivityTracking />
          )
        ) : (
          <>
            <Container fluid>
              <Row>
                <Col md="12">
                  <Card className="strpied-tabled-with-hover">
                    <Card.Header>
                      <Card.Title as="h4">Nhật ký hoạt động</Card.Title>
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
                                  //lay duoc 3 ngay truoc bat dau tu 0h ????? Xem lai
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
                            <th className="border-0">
                              <Select
                                placeholder="Tên hoạt động"
                                options={listActivities}
                                onChange={(e) => {
                                  // console.log(e.id);
                                  setListActivitiesFilter(e.value);
                                  if (e.value === "Tất cả") {
                                    setFilters({
                                      ...filters,
                                      listActivitiesId: "",
                                    });
                                  } else {
                                    setFilters({
                                      ...filters,
                                      listActivitiesId: e.id,
                                    });
                                  }
                                }}
                              />
                            </th>
                            <th className="border-0">Bắt đầu</th>
                            <th className="border-0">Kết thúc</th>
                            <th className="border-0">Lượng calo tiêu thụ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activitiestrackingData.map(
                            (activitiestrackingdata) => {
                              return (
                                <tr key={activitiestrackingdata.id}>
                                  <td>{activitiestrackingdata.created_at}</td>
                                  <td>
                                    {activitiestrackingdata.listActivities.name}
                                  </td>
                                  <td>{activitiestrackingdata.start_time}</td>
                                  <td>{activitiestrackingdata.end_time}</td>
                                  <td>
                                    {activitiestrackingdata.calo_loss} calo
                                  </td>
                                  <td>
                                    <Button
                                      className="btn-fill pull-right"
                                      // variant="primary"
                                      href={`/user/activitiestracking/updateactivitytracking/${activitiestrackingdata.id}`}
                                      onClick={() => {
                                        localStorage.setItem(
                                          "activitytrackingid",
                                          activitiestrackingdata.id
                                        );
                                      }}
                                    >
                                      Sửa
                                    </Button>
                                    <Button
                                      variant="danger"
                                      onClick={() =>
                                        removeActitvityTracking(
                                          activitiestrackingdata.id
                                        )
                                      }
                                    >
                                      Xóa
                                    </Button>
                                  </td>
                                </tr>
                              );
                            }
                          )}
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
                    href="/user/activitiestracking/createactivitytracking"
                  >
                    Tạo nhật ký hoạt động mới
                  </Button>
                </Col>
              </Row>
              {/* <div>
                <Link
                  to="/user/activitiestracking/createactivitytracking"
                  onClick={() => onHandleClick()}
                >
                  Tạo nhật ký hoạt động mới
                </Link>
              </div> */}
            </Container>
          </>
        )}
      </Container>
    </>
  );
}

export default ActivitiesTracking;
