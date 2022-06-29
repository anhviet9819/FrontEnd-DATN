import UpdateBloodPressureHistory from "components/BasicTrackingHistory/UpdateBloodPressureHistory";
import UpdateDiabatesMelitiyusHistory from "components/BasicTrackingHistory/UpdateDiabatesMelitiyusHistory";
import UpdatePersonalIndexHistory from "components/BasicTrackingHistory/UpdatePersonalIndexHistory";
import React, { useEffect, useState } from "react";
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";

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
  Tabs,
  Tab,
} from "react-bootstrap";
import { Route, Switch } from "react-router";
import userTrackingHistoryApi from "services/UserTrackingHistoryApi";
import swal from "sweetalert";
import Select from "react-select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CreateActivityTracking from "components/ActivityTracking/CreateActivityTracking";
import UpdateActivityTracking from "components/ActivityTracking/UpdateActivityTracking";

function BasicTrackingHistory() {
  const [userTrackingId, setUserTrackingId] = useState(
    localStorage.getItem("userTrackingId")
  );
  const [accessToken, setaccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [key, setKey] = useState();
  const [personalIndexData, setPersonalIndexData] = useState([]);
  const [BloodPressureData, setBloodPressureData] = useState([]);
  const [DiabatesMelitiyusData, setDiabatesMelitiyusData] = useState([]);

  const [createdList, setCreatedList] = useState([
    {
      value: "Mới nhất đến cũ nhất",
      label: "Mới nhất đến cũ nhất",
    },
    {
      value: "Cũ nhất đến mới nhất",
      label: "Cũ nhất đến mới nhất",
    },
  ]);
  const [createdAtFilter, setCreatedAtFilter] = useState("desc");
  const [isShow, setIsShow] = useState(true);

  const removePersonalIndexHistory = (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa không?",
      text: "Nếu bạn xóa, dữ liệu sẽ không thể khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        userTrackingHistoryApi.deletePersonalIndexById(id, accessToken);
        swal(
          "Success",
          "Bạn đã xóa lịch sử chiều cao, cân nặng thành công!",
          "success"
        );
      }
    });
  };
  const removeBloodPressureHistory = (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa không?",
      text: "Nếu bạn xóa, dữ liệu sẽ không thể khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        userTrackingHistoryApi.deleteBloodPressureById(id, accessToken);
        swal("Success", "Bạn đã xóa lịch sử huyết áp thành công!", "success");
      }
    });
  };
  const removeDiabatesMeltiyusHistory = (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa không?",
      text: "Nếu bạn xóa, dữ liệu sẽ không thể khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        userTrackingHistoryApi.deleteDiabatesMeltiyusById(id, accessToken);
        swal(
          "Success",
          "Bạn đã xóa lịch sử đường huyết thành công!",
          "success"
        );
      }
    });
  };

  useEffect(() => {
    userTrackingHistoryApi
      .getPersonalIndexByUserTrackingIdFilters(
        userTrackingId,
        accessToken,
        createdAtFilter
      )
      .then((data) => {
        data.map((personalIndex) => {
          personalIndex.created_at = new Date(
            personalIndex.created_at
          ).toLocaleString();
        });
        setPersonalIndexData(data);
      });
  }, [personalIndexData]);

  useEffect(() => {
    userTrackingHistoryApi
      .getBloodPressureByUserTrackingId(userTrackingId, accessToken)
      .then((data) => {
        data.map((bloodPressure) => {
          bloodPressure.created_at = new Date(
            bloodPressure.created_at
          ).toLocaleString();
        });
        setBloodPressureData(data);
      });
  }, [BloodPressureData]);

  useEffect(() => {
    userTrackingHistoryApi
      .getDiabatesMelitiyusByUserTrackingId(userTrackingId, accessToken)
      .then((data) => {
        data.map((diabatesMeltiyus) => {
          diabatesMeltiyus.created_at = new Date(
            diabatesMeltiyus.created_at
          ).toLocaleString();
        });
        setDiabatesMelitiyusData(data);
      });
  }, [DiabatesMelitiyusData]);

  return (
    <>
      {/* <Switch>
        <Route path="/user/basictrackinghistory/updatepersonalindexhistory/:personalindexid">
          <UpdatePersonalIndexHistory />
        </Route>
        <Route path="/user/basictrackinghistory/updatebloodpressurehistory/:bloodpressureid">
          <UpdateBloodPressureHistory />
        </Route>
        <Route path="/user/basictrackinghistory/updatediabatesmelitiyushistory/:diabatesmelitiyusid">
          <UpdateDiabatesMelitiyusHistory />
        </Route>
      </Switch> */}

      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4"
      >
        <Tab eventKey="personal_index" title="Chỉ số cơ bản">
          <Container fluid>
            <Row>
              <Col md="9">
                <Card className="strpied-tabled-with-hover">
                  <Card.Header>
                    <Card.Title as="h4">Chỉ số cơ bản</Card.Title>
                    <p className="card-category">
                      Bảng trên thể hiện lịch sử thay đổi chiều cao, cân nặng
                    </p>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          {/* <th className="border-0">
                            <Select
                              placeholder="Ngày tạo"
                              options={createdList}
                              onChange={(e) => {
                                setCreatedAtFilter(e.value);
                                if (e.value === "Mới nhất đến cũ nhất") {
                                  setCreatedAtFilter("desc");
                                } else {
                                  setCreatedAtFilter("asc");
                                }
                              }}
                            />
                          </th> */}
                          {isShow ? (
                            <th
                              onClick={() => {
                                setIsShow(!isShow);
                                setCreatedAtFilter("asc");
                              }}
                              className="border-0"
                            >
                              Ngày tạo{" "}
                              <span>
                                <ArrowDropDownIcon fontSize="small" />
                              </span>
                            </th>
                          ) : (
                            <th
                              onClick={() => {
                                setIsShow(!isShow);
                                setCreatedAtFilter("desc");
                              }}
                              className="border-0"
                            >
                              Ngày tạo{" "}
                              <span>
                                <ArrowDropUpIcon fontSize="small" />
                              </span>
                            </th>
                          )}

                          <th className="border-0">Chiều cao</th>
                          <th className="border-0">Cân nặng</th>
                          {/* <th className="border-0">City</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {personalIndexData.map((personalIndexdata) => {
                          return (
                            <tr key={personalIndexdata.id}>
                              {/* <td>{index++}</td> */}
                              <td>{personalIndexdata.created_at}</td>
                              <td>{personalIndexdata.height}cm</td>
                              <td>{personalIndexdata.weight}kg</td>
                              <td>
                                <Button
                                  className="btn-fill pull-right"
                                  // variant="primary"
                                  href={`basictrackinghistory/updatepersonalindexhistory/${personalIndexdata.id}`}
                                  onClick={() => {
                                    localStorage.setItem(
                                      "personalIndexId",
                                      personalIndexdata.id
                                    );
                                  }}
                                >
                                  Sửa
                                </Button>

                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    removePersonalIndexHistory(
                                      personalIndexdata.id,
                                      accessToken
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
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="blood_pressure" title="Chỉ số đường huyết">
          <Container fluid>
            <Row>
              <Col md="9">
                <Card className="strpied-tabled-with-hover">
                  <Card.Header>
                    <Card.Title as="h4">Chỉ số đường huyết</Card.Title>
                    <p className="card-category">
                      Bảng trên thể hiện lịch sử thay đổi đường huyết
                    </p>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          {/* <th className="border-0">ID</th> */}
                          <th className="border-0">Ngày tạo</th>
                          <th className="border-0">
                            Chỉ số đường huyết trước khi ăn
                          </th>
                          <th className="border-0">
                            Chỉ số đường huyết sau khi ăn
                          </th>
                          {/* <th className="border-0">City</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {DiabatesMelitiyusData.map((diabatesMelitiyusdata) => {
                          return (
                            <tr key={diabatesMelitiyusdata.id}>
                              {/* <td></td> */}
                              <td>{diabatesMelitiyusdata.created_at}</td>
                              <td>
                                {
                                  diabatesMelitiyusdata.blood_glucose_before_meal
                                }
                                mg/dl
                              </td>
                              <td>
                                {diabatesMelitiyusdata.blood_glucose_after_meal}
                                mg/dl
                              </td>
                              <td>
                                <Button
                                  className="btn-fill pull-right"
                                  // variant="primary"
                                  href={`basictrackinghistory/updatediabatesmelitiyushistory/${diabatesMelitiyusdata.id}`}
                                  onClick={() => {
                                    localStorage.setItem(
                                      "diabatesMelitiyusId",
                                      diabatesMelitiyusdata.id
                                    );
                                  }}
                                >
                                  Sửa
                                </Button>

                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    removeDiabatesMeltiyusHistory(
                                      diabatesMelitiyusdata.id,
                                      accessToken
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
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="diabates_melitiyus" title="Chỉ số huyết áp">
          <Container fluid>
            <Row>
              <Col md="9">
                <Card className="strpied-tabled-with-hover">
                  <Card.Header>
                    <Card.Title as="h4">Chỉ số huyết áp</Card.Title>
                    <p className="card-category">
                      Bảng trên thể hiện lịch sử thay đổi huyết áp
                    </p>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          {/* <th className="border-0">ID</th> */}
                          <th className="border-0">Ngày tạo</th>
                          <th className="border-0">Chỉ số tâm trương</th>
                          <th className="border-0">Chỉ số tâm thu</th>
                          {/* <th className="border-0">City</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {BloodPressureData.map((bloodPressuredata) => {
                          return (
                            <tr key={bloodPressuredata.id}>
                              {/* <td></td> */}
                              <td>{bloodPressuredata.created_at}</td>
                              <td>{bloodPressuredata.diastolic}mmHg</td>
                              <td>{bloodPressuredata.systolic}mmHg</td>
                              <td>
                                <Button
                                  className="btn-fill pull-right"
                                  // variant="primary"
                                  href={`basictrackinghistory/updatebloodpressurehistory/${bloodPressuredata.id}`}
                                  onClick={() => {
                                    localStorage.setItem(
                                      "bloodPressureId",
                                      bloodPressuredata.id
                                    );
                                  }}
                                >
                                  Sửa
                                </Button>

                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    removeBloodPressureHistory(
                                      bloodPressuredata.id,
                                      accessToken
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
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </>
  );
}

export default BasicTrackingHistory;
