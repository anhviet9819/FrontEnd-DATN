import UpdateBloodPressureHistory from "components/BasicTrackingHistory/UpdateBloodPressureHistory";
import UpdateDiabatesMelitiyusHistory from "components/BasicTrackingHistory/UpdateDiabatesMelitiyusHistory";
import UpdatePersonalIndexHistory from "components/BasicTrackingHistory/UpdatePersonalIndexHistory";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Pagination from "components/Pagination";
import "react-datepicker/dist/react-datepicker.css";
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
import ChartistGraph from "react-chartist";
import { width } from "@mui/system";
import { red } from "@mui/material/colors";

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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [endDate1, setEndDate1] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [endDate2, setEndDate2] = useState(new Date());
  const [startDate3, setStartDate3] = useState(new Date());
  const [endDate3, setEndDate3] = useState(new Date());

  const [pagination1, setPagination1] = useState({
    _page: 0,
    _size: 7,
    _totalRows: 100,
  });

  const [filters1, setFilters1] = useState({
    _page: 0,
    _size: 7,
  });
  const [pagination2, setPagination2] = useState({
    _page: 0,
    _size: 7,
    _totalRows: 100,
  });

  const [filters2, setFilters2] = useState({
    _page: 0,
    _size: 7,
  });
  const [pagination3, setPagination3] = useState({
    _page: 0,
    _size: 7,
    _totalRows: 100,
  });

  const [filters3, setFilters3] = useState({
    _page: 0,
    _size: 7,
  });

  const [chartData, setChartData] = useState({});
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [chartData3, setChartData3] = useState({});

  let heightlists = [];
  let weightlists = [];
  let diabatesmelitiyuslists1 = [];
  let diabatesmelitiyuslists2 = [];
  let bloodpressurelists1 = [];
  let bloodpressurelists2 = [];

  const [createdList, setCreatedList] = useState([
    {
      value: "M???i nh???t ?????n c?? nh???t",
      label: "M???i nh???t ?????n c?? nh???t",
    },
    {
      value: "C?? nh???t ?????n m???i nh???t",
      label: "C?? nh???t ?????n m???i nh???t",
    },
  ]);
  const [createdAtFilter, setCreatedAtFilter] = useState("desc");
  const [isShow, setIsShow] = useState(true);

  function handlePageChange1(newPage) {
    // console.log("New page: ", newPage);
    setFilters1({
      ...filters1,
      _page: newPage,
    });
  }

  function handlePageChange2(newPage) {
    // console.log("New page: ", newPage);
    setFilters2({
      ...filters2,
      _page: newPage,
    });
  }

  function handlePageChange3(newPage) {
    // console.log("New page: ", newPage);
    setFilters3({
      ...filters3,
      _page: newPage,
    });
  }

  const xemBieudoChieuCao = () => {
    heightlists = [];
    userTrackingHistoryApi
      .getBieuDoChieuCaoCanNang(
        userTrackingId,
        accessToken,
        startDate.toISOString().substring(0, 10),
        endDate.toISOString().substring(0, 10)
      )
      .then((data) => {
        data.map((piData) => {
          heightlists.push(parseFloat(piData.height));
        });
        setChartData({
          series: [heightlists],
        });
      });
  };

  const xemBieudoCannang = () => {
    weightlists = [];
    userTrackingHistoryApi
      .getBieuDoChieuCaoCanNang(
        userTrackingId,
        accessToken,
        startDate1.toISOString().substring(0, 10),
        endDate1.toISOString().substring(0, 10)
      )
      .then((data) => {
        data.map((piData) => {
          weightlists.push(parseFloat(piData.weight));
        });
        setChartData1({
          series: [weightlists],
        });
      });
  };

  const xemBieudoDuongHuyet = () => {
    diabatesmelitiyuslists1 = [];
    diabatesmelitiyuslists2 = [];
    userTrackingHistoryApi
      .getBieuDoDuongHuyet(
        userTrackingId,
        accessToken,
        startDate2.toISOString().substring(0, 10),
        endDate2.toISOString().substring(0, 10)
      )
      .then((data) => {
        data.map((piData) => {
          diabatesmelitiyuslists1.push(
            parseFloat(piData.blood_glucose_before_meal)
          );
          diabatesmelitiyuslists2.push(
            parseFloat(piData.blood_glucose_after_meal)
          );
        });
        setChartData3({
          series: [diabatesmelitiyuslists1, diabatesmelitiyuslists2],
        });
      });
  };

  const xemBieudoHuyetAp = () => {
    bloodpressurelists1 = [];
    bloodpressurelists2 = [];
    userTrackingHistoryApi
      .getBieuDoHuyetAp(
        userTrackingId,
        accessToken,
        startDate3.toISOString().substring(0, 10),
        endDate3.toISOString().substring(0, 10)
      )
      .then((data) => {
        data.map((piData) => {
          bloodpressurelists1.push(parseFloat(piData.systolic));
          bloodpressurelists2.push(parseFloat(piData.diastolic));
        });
        setChartData3({
          series: [bloodpressurelists1, bloodpressurelists2],
        });
      });
  };

  const removePersonalIndexHistory = (id) => {
    swal({
      title: "B???n ch???c ch???n mu???n x??a kh??ng?",
      text: "N???u b???n x??a, d??? li???u s??? kh??ng th??? kh??i ph???c!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        userTrackingHistoryApi.deletePersonalIndexById(id, accessToken);
        swal(
          "Success",
          "B???n ???? x??a l???ch s??? chi???u cao, c??n n???ng th??nh c??ng!",
          "success"
        ).then(() => {
          userTrackingHistoryApi
            .getPersonalIndexByUserTrackingIdPagination(
              accessToken,
              userTrackingId,
              filters1._page,
              filters1._size,
              "desc"
            )
            .then((data) => {
              data.content.map((personalIndex) => {
                personalIndex.created_at = new Date(
                  personalIndex.created_at
                ).toLocaleString();
              });
              setPersonalIndexData(data.content);
              setPagination1({
                _page: data.number,
                _size: data.size,
                _totalRows: data.totalElements,
              });
            });
        });
      }
    });
  };
  const removeBloodPressureHistory = (id) => {
    swal({
      title: "B???n ch???c ch???n mu???n x??a kh??ng?",
      text: "N???u b???n x??a, d??? li???u s??? kh??ng th??? kh??i ph???c!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        userTrackingHistoryApi.deleteBloodPressureById(id, accessToken);
        swal(
          "Success",
          "B???n ???? x??a l???ch s??? huy???t ??p th??nh c??ng!",
          "success"
        ).then(() => {
          userTrackingHistoryApi
            .getBloodPressureByUserTrackingIdPagination(
              accessToken,
              userTrackingId,
              filters3._page,
              filters3._size,
              "desc"
            )
            .then((data) => {
              data.content.map((bloodPressure) => {
                bloodPressure.created_at = new Date(
                  bloodPressure.created_at
                ).toLocaleString();
              });
              setBloodPressureData(data.content);
              setPagination3({
                _page: data.number,
                _size: data.size,
                _totalRows: data.totalElements,
              });
            });
        });
      }
    });
  };
  const removeDiabatesMeltiyusHistory = (id) => {
    swal({
      title: "B???n ch???c ch???n mu???n x??a kh??ng?",
      text: "N???u b???n x??a, d??? li???u s??? kh??ng th??? kh??i ph???c!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        userTrackingHistoryApi.deleteDiabatesMeltiyusById(id, accessToken);
        swal(
          "Success",
          "B???n ???? x??a l???ch s??? ???????ng huy???t th??nh c??ng!",
          "success"
        ).then(() => {
          userTrackingHistoryApi
            .getDiabatesMelitiyusByUserTrackingIdPagination(
              accessToken,
              userTrackingId,
              filters2._page,
              filters2._size,
              "desc"
            )
            .then((data) => {
              data.content.map((diabatesMeltiyus) => {
                diabatesMeltiyus.created_at = new Date(
                  diabatesMeltiyus.created_at
                ).toLocaleString();
              });
              setDiabatesMelitiyusData(data.content);
              setPagination2({
                _page: data.number,
                _size: data.size,
                _totalRows: data.totalElements,
              });
            });
        });
      }
    });
  };

  useEffect(() => {
    userTrackingHistoryApi
      .getBieuDoChieuCaoCanNang(userTrackingId, accessToken, "", "")
      .then((data) => {
        data.map((piData) => {
          heightlists.push(parseInt(piData.height));
        });
        setChartData({
          series: [heightlists],
        });
      });
  }, [personalIndexData]);

  useEffect(() => {
    userTrackingHistoryApi
      .getBieuDoChieuCaoCanNang(userTrackingId, accessToken, "", "")
      .then((data) => {
        data.map((piData) => {
          weightlists.push(parseInt(piData.weight));
        });
        setChartData1({
          series: [weightlists],
        });
      });
  }, [personalIndexData]);

  useEffect(() => {
    userTrackingHistoryApi
      .getBieuDoDuongHuyet(userTrackingId, accessToken, "", "")
      .then((data) => {
        data.map((piData) => {
          diabatesmelitiyuslists1.push(
            parseFloat(piData.blood_glucose_before_meal)
          );
          diabatesmelitiyuslists2.push(
            parseFloat(piData.blood_glucose_after_meal)
          );
        });
        setChartData2({
          series: [diabatesmelitiyuslists1, diabatesmelitiyuslists2],
        });
      });
  }, [DiabatesMelitiyusData]);

  useEffect(() => {
    userTrackingHistoryApi
      .getBieuDoHuyetAp(userTrackingId, accessToken, "", "")
      .then((data) => {
        data.map((piData) => {
          bloodpressurelists1.push(parseFloat(piData.systolic));
          bloodpressurelists2.push(parseFloat(piData.diastolic));
        });
        setChartData3({
          series: [bloodpressurelists1, bloodpressurelists2],
        });
      });
  }, [BloodPressureData]);

  useEffect(() => {
    userTrackingHistoryApi
      .getPersonalIndexByUserTrackingIdPagination(
        accessToken,
        userTrackingId,
        filters1._page,
        filters1._size,
        "desc"
      )
      .then((data) => {
        data.content.map((personalIndex) => {
          personalIndex.created_at = new Date(
            personalIndex.created_at
          ).toLocaleString();
        });
        setPersonalIndexData(data.content);
        setPagination1({
          _page: data.number,
          _size: data.size,
          _totalRows: data.totalElements,
        });
      });
  }, [filters1]);

  useEffect(() => {
    userTrackingHistoryApi
      .getDiabatesMelitiyusByUserTrackingIdPagination(
        accessToken,
        userTrackingId,
        filters2._page,
        filters2._size,
        "desc"
      )
      .then((data) => {
        data.content.map((diabatesMeltiyus) => {
          diabatesMeltiyus.created_at = new Date(
            diabatesMeltiyus.created_at
          ).toLocaleString();
        });
        setDiabatesMelitiyusData(data.content);
        setPagination2({
          _page: data.number,
          _size: data.size,
          _totalRows: data.totalElements,
        });
      });
  }, [filters2]);

  useEffect(() => {
    userTrackingHistoryApi
      .getBloodPressureByUserTrackingIdPagination(
        accessToken,
        userTrackingId,
        filters3._page,
        filters3._size,
        "desc"
      )
      .then((data) => {
        data.content.map((bloodPressure) => {
          bloodPressure.created_at = new Date(
            bloodPressure.created_at
          ).toLocaleString();
        });
        setBloodPressureData(data.content);
        setPagination3({
          _page: data.number,
          _size: data.size,
          _totalRows: data.totalElements,
        });
      });
  }, [filters3]);

  return (
    <>
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4"
      >
        <Tab eventKey="personal_index" title="Ch??? s??? c?? b???n">
          <Container fluid>
            <Row>
              <Col md="7">
                <Card className="strpied-tabled-with-hover">
                  <Card.Header>
                    <Card.Title as="h4">Ch??? s??? c?? b???n</Card.Title>
                    <p className="card-category">
                      B???ng tr??n th??? hi???n l???ch s??? thay ?????i chi???u cao, c??n n???ng
                    </p>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Ng??y t???o</th>
                          <th className="border-0">Chi???u cao</th>
                          <th className="border-0">C??n n???ng</th>
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
                                  S???a
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
                                  X??a
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
                  pagination={pagination1}
                  onPageChange={handlePageChange1}
                />
              </Col>
              <Col md="5">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Bi???u ????? th???ng k?? chi???u cao</Card.Title>
                    <p className="card-category">
                      Bi???u ????? tr??n th??? hi???n l???ch s??? thay ?????i chi???u cao
                    </p>
                    <Row>
                      <Col md="5">
                        <p className="card-category">T???</p>
                        <DatePicker
                          className="card-category"
                          selected={startDate}
                          onChange={(date) => {
                            setStartDate(date);
                          }}
                        />
                      </Col>
                      {/* <Col>?????n</Col> */}
                      <Col md="5">
                        <p className="card-category">?????n</p>
                        <DatePicker
                          className="card-category"
                          selected={endDate}
                          onChange={(date) => {
                            // console.log(date);
                            setEndDate(date);
                          }}
                        />
                      </Col>
                      <Col>
                        <Button
                          className="card-category"
                          style={{
                            color: "black",
                            borderColor: "black",
                            height: "35px",
                            textAlign: "center",
                          }}
                          onClick={xemBieudoChieuCao}
                        >
                          Xem
                        </Button>
                      </Col>
                    </Row>
                  </Card.Header>

                  <Card.Body>
                    <div className="ct-chart" id="chartHours">
                      <ChartistGraph
                        data={chartData}
                        type="Line"
                        options={{
                          // low: 0,
                          // high: 200,
                          showArea: false,
                          height: "275px",
                          axisX: {
                            showGrid: false,
                          },
                          lineSmooth: true,
                          showLine: true,
                          showPoint: false,
                          fullWidth: false,
                          chartPadding: {
                            right: 50,
                          },
                        }}
                        responsiveOptions={[
                          [
                            "screen and (max-width: 640px)",
                            {
                              axisX: {
                                labelInterpolationFnc: function (value) {
                                  return value[0];
                                },
                              },
                            },
                          ],
                        ]}
                      />
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className="legend">
                      <i className="fas fa-circle text-info"></i>
                      Chi???u cao
                    </div>
                    <hr></hr>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Bi???u ????? th???ng k?? c??n n???ng</Card.Title>
                    <p className="card-category">
                      Bi???u ????? tr??n th??? hi???n l???ch s??? thay ?????i c??n n???ng
                    </p>
                    <Row>
                      <Col md="5">
                        <p className="card-category">T???</p>
                        <DatePicker
                          className="card-category"
                          selected={startDate1}
                          onChange={(date) => {
                            setStartDate1(date);
                          }}
                        />
                      </Col>
                      {/* <Col>?????n</Col> */}
                      <Col md="5">
                        <p className="card-category">?????n</p>
                        <DatePicker
                          className="card-category"
                          selected={endDate1}
                          onChange={(date) => {
                            // console.log(date);
                            setEndDate1(date);
                          }}
                        />
                      </Col>
                      <Col>
                        <Button
                          className="card-category"
                          style={{
                            color: "black",
                            borderColor: "black",
                            height: "35px",
                            textAlign: "center",
                          }}
                          onClick={xemBieudoCannang}
                        >
                          Xem
                        </Button>
                      </Col>
                    </Row>
                  </Card.Header>

                  <Card.Body>
                    <div className="ct-chart" id="chartHours">
                      <ChartistGraph
                        data={chartData1}
                        type="Line"
                        options={{
                          // low: 0,
                          // high: 200,
                          showArea: false,
                          height: "275px",
                          axisX: {
                            showGrid: false,
                          },
                          lineSmooth: true,
                          showLine: true,
                          showPoint: false,
                          fullWidth: false,
                          chartPadding: {
                            right: 50,
                          },
                        }}
                        responsiveOptions={[
                          [
                            "screen and (max-width: 640px)",
                            {
                              axisX: {
                                labelInterpolationFnc: function (value) {
                                  return value[0];
                                },
                              },
                            },
                          ],
                        ]}
                      />
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className="legend">
                      <i className="fas fa-circle text-info"></i>
                      C??n n???ng
                    </div>
                    <hr></hr>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="blood_pressure" title="Ch??? s??? ???????ng huy???t">
          <Container fluid>
            <Row>
              <Col md="7">
                <Card className="strpied-tabled-with-hover">
                  <Card.Header>
                    <Card.Title as="h4">Ch??? s??? ???????ng huy???t</Card.Title>
                    <p className="card-category">
                      B???ng tr??n th??? hi???n l???ch s??? thay ?????i ???????ng huy???t
                    </p>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          {/* <th className="border-0">ID</th> */}
                          <th className="border-0">Ng??y t???o</th>
                          <th className="border-0">
                            Ch??? s??? ???????ng huy???t tr?????c khi ??n
                          </th>
                          <th className="border-0">
                            Ch??? s??? ???????ng huy???t sau khi ??n
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
                                  S???a
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
                                  X??a
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
                  pagination={pagination2}
                  onPageChange={handlePageChange2}
                />
              </Col>
              <Col md="5">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">
                      Bi???u ????? th???ng k?? ???????ng huy???t
                    </Card.Title>
                    <p className="card-category">
                      Bi???u ????? tr??n th??? hi???n l???ch s??? thay ?????i ???????ng huy???t
                    </p>
                    <Row>
                      <Col md="5">
                        <p className="card-category">T???</p>
                        <DatePicker
                          className="card-category"
                          selected={startDate2}
                          onChange={(date) => {
                            setStartDate2(date);
                          }}
                        />
                      </Col>
                      {/* <Col>?????n</Col> */}
                      <Col md="5">
                        <p className="card-category">?????n</p>
                        <DatePicker
                          className="card-category"
                          selected={endDate2}
                          onChange={(date) => {
                            // console.log(date);
                            setEndDate2(date);
                          }}
                        />
                      </Col>
                      <Col>
                        <Button
                          className="card-category"
                          style={{
                            color: "black",
                            borderColor: "black",
                            height: "35px",
                            textAlign: "center",
                          }}
                          onClick={xemBieudoDuongHuyet}
                        >
                          Xem
                        </Button>
                      </Col>
                    </Row>
                  </Card.Header>

                  <Card.Body>
                    <div className="ct-chart" id="chartHours">
                      <ChartistGraph
                        data={chartData2}
                        type="Line"
                        options={{
                          // low: 0,
                          // high: 200,
                          showArea: false,
                          height: "275px",
                          axisX: {
                            showGrid: false,
                          },
                          lineSmooth: true,
                          showLine: true,
                          showPoint: false,
                          fullWidth: false,
                          chartPadding: {
                            right: 50,
                          },
                        }}
                        responsiveOptions={[
                          [
                            "screen and (max-width: 640px)",
                            {
                              axisX: {
                                labelInterpolationFnc: function (value) {
                                  return value[0];
                                },
                              },
                            },
                          ],
                        ]}
                      />
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className="legend">
                      <i className="fas fa-circle text-info"></i>
                      ???????ng huy???t tr?????c b???a ??n
                      <i className="fas fa-circle text-danger"></i>
                      ???????ng huy???t sau b???a ??n
                    </div>
                    <hr></hr>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="diabates_melitiyus" title="Ch??? s??? huy???t ??p">
          <Container fluid>
            <Row>
              <Col md="7">
                <Card className="strpied-tabled-with-hover">
                  <Card.Header>
                    <Card.Title as="h4">Ch??? s??? huy???t ??p</Card.Title>
                    <p className="card-category">
                      B???ng tr??n th??? hi???n l???ch s??? thay ?????i huy???t ??p
                    </p>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          {/* <th className="border-0">ID</th> */}
                          <th className="border-0">Ng??y t???o</th>
                          <th className="border-0">Ch??? s??? t??m thu</th>
                          <th className="border-0">Ch??? s??? t??m tr????ng</th>
                          {/* <th className="border-0">City</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {BloodPressureData.map((bloodPressuredata) => {
                          return (
                            <tr key={bloodPressuredata.id}>
                              {/* <td></td> */}
                              <td>{bloodPressuredata.created_at}</td>
                              <td>{bloodPressuredata.systolic}mmHg</td>
                              <td>{bloodPressuredata.diastolic}mmHg</td>
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
                                  S???a
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
                                  X??a
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
                  pagination={pagination3}
                  onPageChange={handlePageChange3}
                />
              </Col>

              <Col md="5">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Bi???u ????? th???ng k?? huy???t ??p</Card.Title>
                    <p className="card-category">
                      Bi???u ????? tr??n th??? hi???n l???ch s??? thay ?????i huy???t ??p
                    </p>
                    <Row>
                      <Col md="5">
                        <p className="card-category">T???</p>
                        <DatePicker
                          className="card-category"
                          selected={startDate3}
                          onChange={(date) => {
                            setStartDate3(date);
                          }}
                        />
                      </Col>
                      {/* <Col>?????n</Col> */}
                      <Col md="5">
                        <p className="card-category">?????n</p>
                        <DatePicker
                          className="card-category"
                          selected={endDate3}
                          onChange={(date) => {
                            // console.log(date);
                            setEndDate3(date);
                          }}
                        />
                      </Col>
                      <Col>
                        <Button
                          className="card-category"
                          style={{
                            color: "black",
                            borderColor: "black",
                            height: "35px",
                            textAlign: "center",
                          }}
                          onClick={xemBieudoHuyetAp}
                        >
                          Xem
                        </Button>
                      </Col>
                    </Row>
                  </Card.Header>

                  <Card.Body>
                    <div className="ct-chart" id="chartHours">
                      <ChartistGraph
                        data={chartData3}
                        type="Line"
                        options={{
                          // low: 0,
                          // high: 200,
                          showArea: false,
                          height: "275px",
                          axisX: {
                            showGrid: false,
                          },
                          lineSmooth: true,
                          showLine: true,
                          showPoint: false,
                          fullWidth: false,
                          chartPadding: {
                            right: 50,
                          },
                        }}
                        responsiveOptions={[
                          [
                            "screen and (max-width: 640px)",
                            {
                              axisX: {
                                labelInterpolationFnc: function (value) {
                                  return value[0];
                                },
                              },
                            },
                          ],
                        ]}
                      />
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className="legend">
                      <i className="fas fa-circle text-info"></i>
                      Ch??? s??? huy???t ??p t??m thu
                      <i className="fas fa-circle text-danger"></i>
                      Ch??? s??? huy???t ??p t??m tr????ng
                    </div>
                    <hr></hr>
                  </Card.Footer>
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
