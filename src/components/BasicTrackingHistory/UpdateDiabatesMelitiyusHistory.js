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

function UpdateDiabatesMelitiyusHistory() {
  const { diabatesmelitiyusid } = useParams();

  const [accessToken, setaccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [blood_glucose_before_meal, setBlood_glucose_before_meal] = useState();
  const [blood_glucose_after_meal, setBlood_glucose_after_meal] = useState();

  const [diabatesmelitiyus, setDiabatesmelitiyus] = useState({});

  useEffect(() => {
    userTrackingHistoryApi
      .getDiabatesMelitiyusById(diabatesmelitiyusid, accessToken)
      .then((data) => {
        data.created_at = data.created_at.slice(0, 16);
        setDiabatesmelitiyus(data);
        console.log(data);
      });
  }, []);

  const updateDiabatesMelitiyus = async (e) => {
    e.preventDefault();
    const response = await userTrackingHistoryApi.updateDiabatesMelitiyusById(
      diabatesmelitiyusid,
      accessToken,
      {
        blood_glucose_before_meal:
          blood_glucose_before_meal === undefined
            ? diabatesmelitiyus.blood_glucose_before_meal
            : blood_glucose_before_meal === ""
            ? 0
            : blood_glucose_before_meal,
        blood_glucose_after_meal:
          blood_glucose_after_meal === undefined
            ? diabatesmelitiyus.blood_glucose_after_meal
            : blood_glucose_after_meal === ""
            ? 0
            : blood_glucose_after_meal,
      }
    );
    // console.log(response);
    if (response.blood_glucose_before_meal) {
      // console.log(response.status === 200);
      swal(
        "Success",
        "Bạn đã cập nhật thành công chỉ số đường huyết!",
        "success",
        {
          button: false,
          timer: 2000,
        }
      ).then(() => {
        window.location.href = `/user/basictrackinghistory/updatediabatesmelitiyushistory/${diabatesmelitiyusid}`;
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
                <Form onSubmit={updateDiabatesMelitiyus}>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Ngày tạo</label>
                        <Form.Control
                          id="created_at"
                          name="created_at"
                          defaultValue={diabatesmelitiyus.created_at}
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
                        <label>Chỉ số đường máu trước khi ăn</label>
                        <Form.Control
                          id="blood_glucose_before_meal"
                          name="blood_glucose_before_meal"
                          defaultValue={
                            diabatesmelitiyus.blood_glucose_before_meal
                          }
                          type="number"
                          onChange={(e) => {
                            setBlood_glucose_before_meal(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Chỉ số đường máu sau khi ăn</label>
                        <Form.Control
                          id="blood_glucose_after_meal"
                          name="blood_glucose_after_meal"
                          defaultValue={
                            diabatesmelitiyus.blood_glucose_after_meal
                          }
                          type="number"
                          onChange={(e) => {
                            setBlood_glucose_after_meal(e.target.value);
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

export default UpdateDiabatesMelitiyusHistory;
