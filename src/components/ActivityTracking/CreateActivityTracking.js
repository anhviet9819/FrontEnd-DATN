import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Select,
} from "react-bootstrap";
import { useHistory } from "react-router";
import activitiesTrackingApi from "services/ActivitiesTrackingApi";
import listActivitiesApi from "services/ListActivitiesApi";
import mealsTrackingApi from "services/MealsTrackingApi";
import swal from "sweetalert";
import CreatableSelect from "react-select/creatable";
import { Typography } from "@mui/material";

function CreateActivityTracking() {
  const [usertrackingid, setUsertrackingid] = useState(
    localStorage.getItem("userTrackingId")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const history = useHistory();

  const [start_time, setStart_time] = useState();
  const [end_time, setEnd_time] = useState();
  const [typeActivityName, setTypeActivityName] = useState();
  const [activityId, setActivityId] = useState();
  const [calo_per_hour, setCalo_per_hour] = useState();

  const [epochTimeNow, setEpochTimeNow] = useState(Date.now() - 100000);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isValidStartTime, setIsValidStartTime] = useState(true);
  const [isValidEndTime, setIsValidEndTime] = useState(true);

  const [isShowNewActivityAdd, setIsShowNewActivityAdd] = useState(false);

  const [listActivities, setListActivities] = useState([]);

  const handleBack = () => {
    return history.push("/mealstracking");
  };

  useEffect(() => {
    // console.log(epochTimeNow);
    listActivitiesApi.getAll(0, 1000, "").then((data) => {
      data.content.map((Data) => {
        Data.value = Data.name;
        Data.label = `${Data.name} - ${Data.calo_per_hour}calo/h`;
        // delete Data.name;
      });
      // console.log(data.content);
      setListActivities(data.content);
    });
  }, []);

  const createActivitytracking = async (e) => {
    e.preventDefault();
    if (calo_per_hour === undefined) {
      const response = await activitiesTrackingApi.createByUserTrackingId(
        usertrackingid,
        accessToken,
        {
          start_time,
          end_time,
          listActivities: {
            id: activityId,
          },
        }
      );
      if (response.id) {
        swal("Success", "B???n ???? t???o th??nh c??ng nh???t k?? ho???t ?????ng!", "success", {
          button: false,
          timer: 2000,
        }).then(() => {
          window.location.href = "/user/activitiestracking";
        });
      } else {
        swal(
          "Failed",
          "Th??ng tin b???n nh???p kh??ng h???p l???, h??y ki???m tra l???i!",
          "error"
        );
      }
    } else {
      const response = await activitiesTrackingApi.createByUserTrackingId(
        usertrackingid,
        accessToken,
        {
          start_time,
          end_time,
          listActivities: {
            id: 1000,
            name: typeActivityName,
            calo_per_hour: calo_per_hour,
          },
        }
      );
      if (response.id) {
        swal("Success", "B???n ???? t???o th??nh c??ng nh???t k?? ho???t ?????ng!", "success", {
          button: false,
          timer: 2000,
        }).then(() => {
          window.location.href = "/user/activitiestracking";
        });
      } else {
        swal(
          "Failed",
          "Th??ng tin b???n nh???p kh??ng h???p l???, h??y ki???m tra l???i!",
          "error"
        );
      }
    }
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">T???o m???i nh???t k?? ho???t ?????ng</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={createActivitytracking}>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Th???i gian b???t ?????u ho???t ?????ng</label>
                        <Form.Control
                          id="start_time"
                          name="start_time"
                          placeholder="Ch???n th???i gian b???t ?????u ho???t ?????ng"
                          type="datetime-local"
                          onChange={(e) => {
                            // console.log(new Date(e.target.value).toISOString());
                            let temp = new Date(e.target.value).getTime();
                            // console.log(temp);
                            // console.log(temp - epochTimeNow);
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
                          *Th???i gian ???????c ch???n kh??ng ???????c l???n h??n th???i gian hi???n
                          t???i
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Th???i gian k???t th??c ho???t ?????ng</label>
                        <Form.Control
                          id="end_time"
                          name="end_time"
                          placeholder="Ch???n th???i gian k???t th??c ho???t ?????ng"
                          type="datetime-local"
                          onChange={(e) => {
                            let endTime = new Date(e.target.value).getTime();
                            let startTime = new Date(start_time).getTime();
                            // console.log(new Date(start_time).getTime());
                            // console.log(endTime - startTime);
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
                          *Th???i gian k???t th??c ph???i l???n h??n th???i gian b???t ?????u
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Ch???n lo???i ho???t ?????ng</label>
                        <Form.Select
                          id="activity_type"
                          name="activity_type"
                          defaultValue="??i b??? 3km/h - 105calo"
                          // type="datetime-local"
                          onChange={(e) => {
                            // console.log(e.target.value);
                            let temp = e.target.value.indexOf("-");
                            let typeActivityName = e.target.value.slice(
                              0,
                              temp - 1
                            );
                            setTypeActivityName(typeActivityName);
                          }}
                        >
                          {listActivities.map((typeActivity) => {
                            return (
                              <option>
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
                      <label>Ch???n lo???i ho???t ?????ng</label>
                      <CreatableSelect
                        options={listActivities}
                        onChange={(e) => {
                          console.log(e);
                          setActivityId(e.id);
                          setTypeActivityName(e.value);
                          e.__isNew__ === true
                            ? setIsShowNewActivityAdd(true)
                            : setIsShowNewActivityAdd(false);
                        }}
                      />
                    </Col>
                  </Row>
                  {isShowNewActivityAdd && (
                    <Row>
                      <Col className="px-1" md="6">
                        <Form.Group>
                          <label>
                            L?????ng calo ti??u th??? c???a ho???t ?????ng trong 1 gi???
                          </label>
                          <Form.Control
                            id="calo_per_hour"
                            name="calo_per_hour"
                            // plceholder="Ch???n th???i gian k???t th??c ho???t ?????ng "
                            type="number"
                            onChange={(e) => {
                              setCalo_per_hour(e.target.value);
                            }}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                  <Button
                    // onClick={updateProfile}
                    disabled={disabledButton}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    T???o ????ng k?? cho b???a ??n
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

export default CreateActivityTracking;
