import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Route, Switch, useHistory } from "react-router";
import activitiesTrackingApi from "services/ActivitiesTrackingApi";
import foodApi from "services/FoodApi";
import listActivitiesApi from "services/ListActivitiesApi";
import mealsTrackingApi from "services/MealsTrackingApi";
import nutritionFactApi from "services/NutritionFactApi";
import swal from "sweetalert";

function ActivityManageCreate() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [activityId, setActivityId] = useState(
    localStorage.getItem("activityId")
  );

  const [activityName, setActivityName] = useState();
  const [calo_per_hour, setCalo_per_hour] = useState();

  const [isValidName, setIsValidName] = useState(false);
  const [isValidCalo, setIsValidCalo] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);

  const [activity, setActivity] = useState({});

  useEffect(() => {
    listActivitiesApi.getById(activityId, accessToken).then((data) => {
      setActivity(data);
    });
  }, []);

  const createActivity = async (e) => {
    e.preventDefault();
    // console.log(`${foodName}alo`);
    const response = await listActivitiesApi.createNewActivity(accessToken, {
      name: activityName,
      calo_per_hour: calo_per_hour,
    });

    if (response.name) {
      // console.log(response.status === 200);
      swal("Success", "Bạn đã cập nhật hoạt động thành công!", "success", {
        button: false,
        timer: 2000,
      }).then(() => {
        window.location.href = "/admin/activitymanage";
      });
    } else {
      // console.log("viett");
      swal(
        "Failed",
        "Thông tin bạn nhập không hợp lệ, hãy kiếm tra lại!",
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
                <Card.Title as="h4">Tạo hoạt động</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={createActivity}>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Tên hoạt động</label>
                        <Form.Control
                          id="activity_name"
                          name="activity_name"
                          placeholder="Nhập vào tên hoạt động"
                          type="text"
                          onChange={(e) => {
                            setActivityName(e.target.value);
                            if (e.target.value.length === 0) {
                              setIsValidName(false);
                            } else setIsValidName(true);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidName === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Tên hoạt động không được để trống
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Lượng calo tiêu thụ 1 giờ</label>
                        <Form.Control
                          id="calo_per_hour"
                          name="calo_per_hour"
                          placeholder="Nhập vào lượng calo tiêu thụ trong 1 giờ"
                          type="text"
                          onChange={(e) => {
                            let temp = parseFloat(e.target.value);
                            setCalo_per_hour(e.target.value);
                            if (temp <= 0) {
                              setIsValidCalo(false);
                              setDisabledButton(true);
                            } else {
                              setIsValidCalo(true);
                              setDisabledButton(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidCalo === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Lượng calo tiêu thụ phải là số dương
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  <Button
                    disabled={disabledButton}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Tạo hoạt động
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

export default ActivityManageCreate;
