import Select from "react-select";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import activitiesTrackingApi from "services/ActivitiesTrackingApi";
import listActivitiesApi from "services/ListActivitiesApi";
import mealsTrackingApi from "services/MealsTrackingApi";
import swal from "sweetalert";
import { Typography } from "@mui/material";

function UpdateActivityTracking() {
  const { activitytrackingid } = useParams();
  const [usertrackingid, setUsertrackingid] = useState(
    localStorage.getItem("userTrackingId")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  // const [activitytrackingid, setActivitytrackingid] = useState(
  //   localStorage.getItem("activitytrackingid")
  // );
  const [start_time, setStart_time] = useState();
  const [end_time, setEnd_time] = useState();
  const [typeActivityName, setTypeActivityName] = useState();
  const [activityId, setActivityId] = useState();
  const [calo_per_hour, setCalo_per_hour] = useState();

  const [epochTimeNow, setEpochTimeNow] = useState(Date.now() - 100000);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isValidStartTime, setIsValidStartTime] = useState(true);
  const [isValidEndTime, setIsValidEndTime] = useState(true);

  const [activityTrackingLabel, setActivityTrackingLabel] = useState();

  const [activitytracking, setActivitytracking] = useState({});
  const [listActivities, setListActivities] = useState([]);

  useEffect(() => {
    // console.log(activitytrackingid);
    activitiesTrackingApi
      .getActivityTrackingById(activitytrackingid, accessToken)
      .then((data) => {
        // setStart_time(data.start_time.slice(0, 16));
        // setEnd_time(data.end_time.slice(0, 16));
        // setTypeActivityName(data.listActivities.name);
        // setCalo_per_hour(data.listActivities.calo_per_hour);

        data.start_time = data.start_time.slice(0, 16);
        data.end_time = data.end_time.slice(0, 16);

        setActivitytracking(data);
        setActivityTrackingLabel(
          `${data.listActivities.name} - ${data.listActivities.calo_per_hour}/h`
        );
        // console.log(data);
      });

    // listActivitiesApi.getAll(0, 100, "").then((data) => {

    //   setListActivities(data.content);
    // });
  }, []);

  useEffect(() => {
    listActivitiesApi.getAll(0, 1000, "").then((data) => {
      data.content.map((Data) => {
        Data.value = Data.name;
        Data.label = `${Data.name} - ${Data.calo_per_hour}calo/h`;
        // delete Data.name;
      });
      // console.log(data.content[1].label);
      setListActivities(data.content);
    });
  }, []);

  const updateActivityTracking = async (e) => {
    console.log(activitytracking.start_time);
    console.log(activitytracking.end_time);
    e.preventDefault();
    const response = await activitiesTrackingApi.updateById(
      activitytrackingid,
      accessToken,
      {
        start_time:
          start_time === undefined
            ? activitytracking.start_time.concat(":00Z")
            : start_time,
        end_time:
          end_time === undefined
            ? activitytracking.end_time.concat(":00Z")
            : end_time,
        listActivities: {
          id:
            activityId === undefined
              ? activitytracking.listActivities.id
              : activityId,
        },
      }
    );
    // console.log(response);
    if (response.calo_loss) {
      // console.log(response.status === 200);
      swal(
        "Success",
        "Bạn đã cập nhật thành công nhật ký hoạt động!",
        "success",
        {
          button: false,
          timer: 2000,
        }
      ).then(() => {
        window.location.href = "/user/activitiestracking";
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
                <Card.Title as="h4">Chỉnh sửa nhật ký hoạt động</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updateActivityTracking}>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Thời gian bắt đầu hoạt động</label>
                        <Form.Control
                          id="start_time"
                          name="start_time"
                          defaultValue={activitytracking.start_time}
                          //   value={mealtracking.created_at}
                          // plceholder="Chọn thời gian bắt đầu"
                          type="datetime-local"
                          onChange={(e) => {
                            let temp = new Date(e.target.value).getTime();
                            setStart_time(
                              new Date(e.target.value).toISOString()
                            );
                            if (temp > epochTimeNow) {
                              setIsValidStartTime(false);
                              setDisabledButton(true);
                            } else {
                              setIsValidStartTime(true);
                              setDisabledButton(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidStartTime === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Thời gian được chọn không được lớn hơn thời gian hiện
                          tại
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Thời gian kết thúc hoạt động</label>
                        <Form.Control
                          id="end_time"
                          name="end_time"
                          defaultValue={activitytracking.end_time}
                          //   value={mealtracking.created_at}
                          // plceholder="Chọn thời gian bữa ăn"
                          type="datetime-local"
                          onChange={(e) => {
                            let endTime = new Date(e.target.value).getTime();
                            let startTime = new Date(start_time).getTime();

                            setEnd_time(new Date(e.target.value).toISOString());
                            if (endTime <= startTime) {
                              setIsValidEndTime(false);
                              setDisabledButton(true);
                            } else {
                              setIsValidEndTime(true);
                              setDisabledButton(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidEndTime === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Thời gian kết thúc phải lớn hơn thời gian bắt đầu
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Chọn loại hoạt động</label>
                        <Form.Select
                          id="activity_type"
                          name="activity_type"
                          defaultValue={activitytracking.name}
                          // type="datetime-local"
                          onChange={(e) => {
                            let temp = e.target.value.indexOf("-");
                            let typeActivityName = e.target.value.slice(
                              0,
                              temp - 1
                            );
                            setTypeActivityName(typeActivityName);
                          }}
                        >
                          {listActivities.map((typeActivity, index) => {
                            return (
                              <option key={typeActivity.id}>
                                {typeActivity.name} -{" "}
                                {typeActivity.calo_per_hour} calo
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row> */}

                  <Row>
                    <Col className="px-1" md="6">
                      <label>Chọn loại hoạt động</label>
                      <Select
                        options={listActivities}
                        defaultValue={listActivities[0]}
                        onChange={(e) => {
                          // console.log(listActivities[1]);
                          setActivityId(e.id);
                        }}
                      />
                    </Col>
                  </Row>

                  <Button
                    // onClick={updateProfile}
                    disabled={disabledButton}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Cập nhật nhật ký hoạt động
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

export default UpdateActivityTracking;
