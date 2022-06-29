import { height } from "@mui/system";
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
  Form,
} from "react-bootstrap";
import { Route, Switch, useParams } from "react-router";
import userTrackingHistory from "services/UserTrackingHistoryApi";
import userTrackingHistoryApi from "services/UserTrackingHistoryApi";
import swal from "sweetalert";

function UpdateBloodPressureHistory() {
  const { bloodpressureid } = useParams();

  const [accessToken, setaccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [diastolic, setDiastolic] = useState();
  const [systolic, setSystolic] = useState();

  const [bloodPressure, setBloodPressure] = useState({});

  useEffect(() => {
    userTrackingHistoryApi
      .getBloodPressureById(bloodpressureid, accessToken)
      .then((data) => {
        console.log(data);
        data.created_at = data.created_at.slice(0, 16);
        setBloodPressure(data);
        // console.log(data);
      });
  }, []);

  const updateBloodPressure = async (e) => {
    e.preventDefault();
    const response = await userTrackingHistoryApi.updateBloodPressureById(
      bloodpressureid,
      accessToken,
      {
        diastolic:
          diastolic === undefined ? bloodPressure.diastolic : diastolic,
        systolic: systolic === undefined ? bloodPressure.systolic : systolic,
      }
    );
    // console.log(response);
    if (response.diastolic) {
      // console.log(response.status === 200);
      swal(
        "Success",
        "Bạn đã cập nhật thành công chỉ số huyết áp!",
        "success",
        {
          button: false,
          timer: 2000,
        }
      ).then(() => {
        window.location.href = `/user/basictrackinghistory/updatebloodpressurehistory/${bloodpressureid}`;
      });
    } else {
      // console.log("viett");
      swal(
        "Failed",
        "Thông tin bạn nhập vào không hợp lệ hoặc còn thiếu, hãy kiếm tra lại!",
        "error"
      );
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Chỉnh sửa lịch sử huyết áp</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updateBloodPressure}>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Ngày tạo</label>
                        <Form.Control
                          id="created_at"
                          name="created_at"
                          defaultValue={bloodPressure.created_at}
                          type="datetime-local"
                          disabled
                          // onChange={(e) => {
                          //   // console.log(new Date(e.target.value).toISOString());
                          //   setStart_time(
                          //     new Date(e.target.value).toISOString()
                          //   );
                          // }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Chỉ số tâm trương</label>
                        <Form.Control
                          id="diastolic"
                          name="diastolic"
                          defaultValue={bloodPressure.diastolic}
                          type="number"
                          onChange={(e) => {
                            setDiastolic(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Chỉ số tâm thu</label>
                        <Form.Control
                          id="systolic"
                          name="systolic"
                          defaultValue={bloodPressure.systolic}
                          type="number"
                          onChange={(e) => {
                            setSystolic(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    // onClick={updateProfile}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Cập nhật
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UpdateBloodPressureHistory;
