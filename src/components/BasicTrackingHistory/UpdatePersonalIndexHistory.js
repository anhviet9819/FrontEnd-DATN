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

function UpdatePersonalIndexHistory() {
  const { personalindexid } = useParams();

  const [accessToken, setaccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();

  const [personalIndex, setPersonalIndex] = useState({});

  useEffect(() => {
    userTrackingHistoryApi
      .getPersonalIndexById(personalindexid, accessToken)
      .then((data) => {
        data.created_at = data.created_at.slice(0, 16);
        setPersonalIndex(data);
        console.log(data);
      });
  }, []);

  const updatePersonalIndex = async (e) => {
    e.preventDefault();
    const response = await userTrackingHistoryApi.updatePersonalIndexById(
      personalindexid,
      accessToken,
      {
        height: height === undefined ? personalIndex.height : height,
        weight: weight === undefined ? personalIndex.weight : weight,
      }
    );
    // console.log(response);
    if (response.height) {
      // console.log(response.status === 200);
      swal(
        "Success",
        "Bạn đã cập nhật thành công chiều cao, cân nặng!",
        "success",
        {
          button: false,
          timer: 2000,
        }
      ).then(() => {
        window.location.href = `/user/basictrackinghistory/updatepersonalindexhistory/${personalindexid}`;
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
                <Card.Title as="h4">
                  Chỉnh sửa lịch sử chiều cao, cân nặng
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updatePersonalIndex}>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Ngày tạo</label>
                        <Form.Control
                          id="created_at"
                          name="created_at"
                          defaultValue={personalIndex.created_at}
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
                        <label>Chiều cao</label>
                        <Form.Control
                          id="height"
                          name="height"
                          defaultValue={personalIndex.height}
                          type="number"
                          onChange={(e) => {
                            setHeight(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Cân nặng</label>
                        <Form.Control
                          id="weight"
                          name="weight"
                          defaultValue={personalIndex.weight}
                          type="number"
                          onChange={(e) => {
                            setWeight(e.target.value);
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

export default UpdatePersonalIndexHistory;
