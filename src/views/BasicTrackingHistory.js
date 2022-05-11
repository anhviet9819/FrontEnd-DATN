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
  Tabs,
  Tab,
} from "react-bootstrap";
import userTrackingHistoryApi from "services/UserTrackingHistoryApi";

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
  useEffect(() => {
    userTrackingHistoryApi
      .getPersonalIndexByUserTrackingId(userTrackingId, accessToken)
      .then((data) => {
        setPersonalIndexData(data);
        // console.log(data);
      });
    userTrackingHistoryApi
      .getBloodPressureByUserTrackingId(userTrackingId, accessToken)
      .then((data) => {
        setBloodPressureData(data);
        // console.log(data);
      });
    userTrackingHistoryApi
      .getDiabatesMelitiyusByUserTrackingId(userTrackingId, accessToken)
      .then((data) => {
        setDiabatesMelitiyusData(data);
        // console.log(data);
      });
  }, []);

  return (
    <>
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4"
      >
        <Tab eventKey="personal_index" title="Chỉ số cơ bản">
          <Container fluid>
            <Row>
              <Col md="12">
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
                          {/* <th className="border-0">ID</th> */}
                          <th className="border-0">Ngày tạo</th>
                          <th className="border-0">Chiều cao</th>
                          <th className="border-0">Cân nặng</th>
                          {/* <th className="border-0">City</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {personalIndexData.map((personalIndexdata) => {
                          return (
                            <tr>
                              {/* <td></td> */}
                              <td>{personalIndexdata.created_at}</td>
                              <td>{personalIndexdata.height}cm</td>
                              <td>{personalIndexdata.weight}kg</td>
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
              <Col md="12">
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
                            <tr>
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
              <Col md="12">
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
                            <tr>
                              {/* <td></td> */}
                              <td>{bloodPressuredata.created_at}</td>
                              <td>{bloodPressuredata.diastolic}mmHg</td>
                              <td>{bloodPressuredata.systolic}mmHg</td>
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
