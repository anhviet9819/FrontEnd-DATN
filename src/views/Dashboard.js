import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import DatePicker from "react-datepicker";
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import getUserDetails from "services/ProfileApi";
import profileApi from "services/ProfileApi";
import basicProfileApi from "services/BasicProfileApi";
import basicTrackingApi from "services/BasicTrackingApi";
import Select from "react-select";
import mealsTrackingApi from "services/MealsTrackingApi";

function Dashboard() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [usertrackingid, setUsertrackingid] = useState(
    localStorage.getItem("userTrackingId")
  );

  const [userProfile, setUserProfile] = useState({});
  const [userTrackingProfile, setUserTrackingProfile] = useState({});

  const caloServingList = [
    2652, 3000, 2733.6, 2208.6, 3312.6, 1900, 2667, 2553, 2568, 2569.2, 2996,
    2105.4, 2192, 2300, 2999,
  ];

  const caloLostList = [
    210, 307.6, 1220, 1500, 960, 875.5, 875.5, 1050, 670, 695, 824.5, 786,
  ];

  const [pieChartData, setPieChartData] = useState({});
  const [pieChartStart, setPieChartStart] = useState();
  const [pieChartEnd, setPieChartEnd] = useState();

  const chartChosen = [
    {
      value: "7 ngày qua",
      label: "7 ngày qua",
    },
    {
      value: "14 ngày qua",
      label: "14 ngày qua",
    },
  ];

  const [chosen, setChosen] = useState(7);

  const generateCaloServeArray = (dayAmout) => {
    let array = [];
    for (let i = 0; i < dayAmout; i++) {
      const random = Math.floor(Math.random() * caloServingList.length);
      array.push(caloServingList[random]);
    }
    return array;
  };

  const generateCaloLossArray = (dayAmout) => {
    let array = [];
    for (let i = 0; i < dayAmout; i++) {
      const random = Math.floor(Math.random() * caloLostList.length);
      array.push(caloLostList[random]);
    }
    return array;
  };

  const generateSevenDays = (dayAmount) => {
    let today = new Date().toISOString().slice(5, 10);
    let temp = new Date(new Date().toISOString());
    let arraySevenDays = [today];
    for (let i = 1; i <= dayAmount - 1; i++) {
      let epochDay = Date.parse(temp) - i * 86400000;
      let day = new Date(epochDay).toISOString().slice(5, 10);
      arraySevenDays.unshift(day);
    }
    return arraySevenDays;
  };

  useEffect(() => {
    basicProfileApi.getByUsername(username, accessToken).then((data) => {
      localStorage.setItem("name", data.name);
      localStorage.setItem("birthday", data.birthday.substring(0, 10));
      setUserProfile(data);
      basicTrackingApi
        .getById(data.usersTracking.id, accessToken)
        .then((data1) => {
          setUserTrackingProfile(data1);
          localStorage.setItem("userTrackingId", data1.id);
        });
      mealsTrackingApi
        .getBieuDoDinhDuongBuaAnByCreatedAtBetween(
          accessToken,
          data.usersTracking.id,
          "",
          ""
        )
        .then((data2) => {
          setPieChartData({
            labels: [
              `${data2[0].toString()}%`,
              `${data2[1].toString()}%`,
              `${data2[2].toString()}%`,
              `${data2[3].toString()}%`,
              `${data2[4].toString()}%`,
              `${data2[5].toString()}%`,
              `${data2[6].toString()}%`,
            ],
            series: data2,
          });
        });
    });
    return;
  }, []);

  const xemBieudoDinhDuongTheoThanhPhan = () => {
    console.log(
      new Date(
        pieChartStart.getTime() - pieChartStart.getTimezoneOffset() * 60000
      ).toISOString()
    );
    mealsTrackingApi
      .getBieuDoDinhDuongBuaAnByCreatedAtBetween(
        accessToken,
        usertrackingid,
        new Date(
          pieChartStart.getTime() - pieChartStart.getTimezoneOffset() * 60000
        )
          .toISOString()
          .substring(0, 10),
        new Date(
          pieChartEnd.getTime() - pieChartEnd.getTimezoneOffset() * 60000
        )
          .toISOString()
          .substring(0, 10)
      )
      .then((data) => {
        setPieChartData({
          labels: [
            `${data[0].toString()}%`,
            `${data[1].toString()}%`,
            `${data[2].toString()}%`,
            `${data[3].toString()}%`,
            `${data[4].toString()}%`,
            `${data[5].toString()}%`,
            `${data[6].toString()}%`,
          ],
          series: data,
        });
      });
  };

  // useEffect(() => {
  //   mealsTrackingApi
  //     .getBieuDoDinhDuongBuaAnByCreatedAtBetween(
  //       accessToken,
  //       usertrackingid,
  //       "",
  //       ""
  //     )
  //     .then((data) => {
  //       setPieChartData({
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
  // }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Chiều cao</p>
                      <Card.Title as="h4">
                        {userTrackingProfile.current_height}cm
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Cân nặng</p>
                      <Card.Title as="h4">
                        {userTrackingProfile.current_weight}kg
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Chỉ số đường huyết</p>
                      <Card.Title as="h4">
                        {userTrackingProfile.current_normal_blood}mm/Hg
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Chỉ số huyết áp</p>
                      <Card.Title as="h4">
                        {userTrackingProfile.current_systolic}/
                        {userTrackingProfile.current_diastolic}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users Behavior</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
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
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Thống kê dinh dưỡng</Card.Title>
                <p className="card-category">
                  Thống kê các thành phần dinh dưỡng qua bữa ăn theo ngày
                </p>
                <Row>
                  <Col>
                    <p className="card-category">Từ</p>
                    <DatePicker
                      className="card-category"
                      selected={pieChartStart}
                      onChange={(date) => {
                        setPieChartStart(date);
                      }}
                    />
                  </Col>
                  {/* <Col>đến</Col> */}
                  <Col>
                    <p className="card-category">đến</p>
                    <DatePicker
                      className="card-category"
                      selected={pieChartEnd}
                      onChange={(date) => {
                        setPieChartEnd(date);
                      }}
                    />
                  </Col>
                  <Col>
                    <Button
                      className="card-category"
                      style={{
                        marginLeft: "-15px",
                        marginBottom: "0px",
                        fontSize: "15px",
                        color: "black",
                        borderColor: "black",
                        height: "45px",
                        textAlign: "center",
                      }}
                      onClick={xemBieudoDinhDuongTheoThanhPhan}
                    >
                      Xem
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={pieChartData}
                    type="Pie"
                    // options={{ showLabel: false }}
                  />
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
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Col>
                  <Card.Title as="h4">Thống kê dinh dưỡng</Card.Title>
                  {/* <p className="card-category">All products including Taxes</p> */}
                </Col>
                <Col>
                  <Select
                    options={chartChosen}
                    onChange={(e) => {
                      if (e.value === "7 ngày qua") {
                        setChosen(7);
                      } else setChosen(14);
                    }}
                  />
                </Col>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: generateSevenDays(chosen),
                      series: [
                        generateCaloServeArray(chosen),
                        generateCaloLossArray(chosen),
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
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
                  <i className="fas fa-circle text-info"></i>Lượng calo nạp vào
                  <i className="fas fa-circle text-danger"></i>Lượng calo tiêu
                  thụ
                </div>
                <hr></hr>
                {/* <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div> */}
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-488980961">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-537440761">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Flooded: One year later, assessing what was lost and
                          what was found when a ravaging rain swept through
                          metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-577232198">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-773861645">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Create 4 Invisible User Experiences you Never Knew
                          About
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-422471719">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-829164576">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Read "Following makes Medium better"</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-160575228">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-922981635">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                disabled
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Unfollow 5 enemies from twitter</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-938342127">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-119603706">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
