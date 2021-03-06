import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import basicProfileApi from "services/BasicProfileApi";
import basicTrackingApi from "services/BasicTrackingApi";
import getUserDetails from "services/ProfileApi";
import ProfileApi from "services/ProfileApi";
import getUserTrackingById from "services/trackingApi";
import swal from "sweetalert";

function UserBasicTracking() {
  const [userTrackingId, setUserTrackingId] = useState(
    localStorage.getItem("userTrackingId")
  );
  const [birthday, setBirthday] = useState(localStorage.getItem("birthday"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [userTrackingProfile, setUserTrackingProfile] = useState({});

  const [current_height, setCurrent_height] = useState();
  const [current_weight, setCurrent_weight] = useState();
  const [is_diabates_meltiyus, setIs_diabates_meltiyus] = useState();
  const [is_heart_diseases, setIs_heart_diseases] = useState();
  const [is_blood_pressure_diseases, setIs_blood_pressure_diseases] =
    useState();
  const [current_blood_before_meal, setCurrent_blood_before_meal] = useState();
  const [current_normal_blood, setCurrent_normal_blood] = useState();
  const [current_diastolic, setCurrent_diastolic] = useState();
  const [current_systolic, setCurrent_systolic] = useState();

  const [isValidHeight, setIsValidHeight] = useState(true);
  const [isValidWeight, setIsValidWeight] = useState(true);
  const [isValidGluBef, setIsValidGluBef] = useState(true);
  const [isValidGluAf, setIsValidGluAf] = useState(true);
  const [isValidDias, setIsValidDias] = useState(true);
  const [isValidSys, setIsValidSys] = useState(true);

  const [disabledSubmit, setDisabledSubmit] = useState(false);

  const updateUsertracking = async (e) => {
    e.preventDefault();
    console.log(current_weight);
    const response = await basicTrackingApi.updateById(
      userTrackingId,
      accessToken,
      {
        is_diabates_meltiyus:
          is_diabates_meltiyus === undefined
            ? userTrackingProfile.is_diabates_meltiyus
            : is_diabates_meltiyus,
        is_blood_pressure_diseases:
          is_blood_pressure_diseases === undefined
            ? userTrackingProfile.is_blood_pressure_diseases
            : is_blood_pressure_diseases,
        is_heart_diseases:
          is_heart_diseases === undefined
            ? userTrackingProfile.is_heart_diseases
            : is_heart_diseases,
        current_height:
          current_height === undefined
            ? userTrackingProfile.current_height
            : current_height,
        current_weight:
          current_weight === undefined
            ? userTrackingProfile.current_weight
            : current_weight,
        current_blood_before_meal:
          current_blood_before_meal === undefined
            ? userTrackingProfile.current_blood_before_meal
            : current_blood_before_meal,
        current_normal_blood:
          current_normal_blood === undefined
            ? userTrackingProfile.current_normal_blood
            : current_normal_blood,
        current_diastolic:
          current_diastolic === undefined
            ? userTrackingProfile.current_diastolic
            : current_diastolic,
        current_systolic:
          current_systolic === undefined
            ? userTrackingProfile.current_systolic
            : current_systolic,
      }
    );
    if (response.id) {
      swal(
        "Success",
        "B???n ???? c???p nh???t ch??? s??? s???c kh???e c?? nh??n th??nh c??ng!",
        "success",
        {
          button: false,
          timer: 2000,
        }
      ).then((value) => {
        window.location.href = "/user/usertracking";
      });
    } else {
      // console.log("viett");
      swal(
        "Failed",
        "Th??ng tin b???n nh???p kh??ng h???p l???, h??y ki???m tra l???i!",
        "error"
      );
    }
  };

  useEffect(() => {
    basicTrackingApi.getById(userTrackingId, accessToken).then((data) => {
      setUserTrackingProfile(data);
      setIs_diabates_meltiyus(data.is_diabates_meltiyus);
      setIs_blood_pressure_diseases(data.is_blood_pressure_diseases);
      setIs_heart_diseases(data.is_heart_diseases);
      // console.log(data.is_blood_pressure_diseases);
      console.log(data);
    });
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Th??ng tin s???c kh???e c?? nh??n</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updateUsertracking}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>H??? v?? t??n</label>
                        <Form.Control
                          id="name"
                          name="name"
                          defaultValue={name}
                          // defaultValue={usertrackingid}
                          placeholder="Enter your name"
                          type="text"
                          // onChange={(e) => setName(e.target.value)}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Ng??y sinh</label>
                        <Form.Control
                          id="birthday"
                          name="birthday"
                          defaultValue={birthday}
                          placeholder="Enter your birthday"
                          type="date"
                          // onChange={(e) => setBirthday(e.target.value)}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>T??nh tr???ng ???????ng huy???t hi???n t???i </label>
                        <input
                          type="radio"
                          id="normal"
                          onChange={() => setIs_diabates_meltiyus(false)}
                          checked={is_diabates_meltiyus === false}
                          name="is_diabates_meltiyus"
                        />
                        B??nh th?????ng
                        {/* <label htmlFor="current">B??nh th?????ng</label> */}
                        <input
                          type="radio"
                          id="not-normal"
                          onChange={() => setIs_diabates_meltiyus(true)}
                          checked={is_diabates_meltiyus === true}
                          name="is_diabates_meltiyus"
                        />
                        B??? b???nh
                        {/* <label htmlFor="normal">B??? b???nh</label> */}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>T??nh tr???ng huy???t ??p hi???n t???i </label>
                        <input
                          type="radio"
                          id="normal"
                          checked={is_blood_pressure_diseases === false}
                          name="is_blood_pressure_diseases"
                          onChange={() =>
                            // console.log(e.target.checked);
                            setIs_blood_pressure_diseases(false)
                          }
                        />
                        B??nh th?????ng
                        <input
                          type="radio"
                          id="not-normal"
                          checked={is_blood_pressure_diseases === true}
                          name="is_blood_pressure_diseases"
                          onChange={() => {
                            setIs_blood_pressure_diseases(true);
                          }}
                        />
                        B??? b???nh
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group>
                        <label>T??nh tr???ng tim m???ch hi???n t???i </label>
                        <input
                          type="radio"
                          id="normal"
                          checked={is_heart_diseases === false}
                          name="is_heart_diseases"
                          onChange={() => setIs_heart_diseases(false)}
                        />
                        B??nh th?????ng
                        <input
                          type="radio"
                          id="not-normal"
                          checked={is_heart_diseases === true}
                          name="is_heart_diseases"
                          onChange={() => setIs_heart_diseases(true)}
                        />
                        B??? b???nh
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Chi???u cao</label>
                        <Form.Control
                          id="height"
                          name="height"
                          defaultValue={userTrackingProfile.current_height}
                          placeholder="Nh???p v??o chi???u cao c???a b???n"
                          type="text"
                          onChange={(e) => {
                            setCurrent_height(e.target.value);
                            if (parseFloat(e.target.value) <= 0) {
                              setIsValidHeight(false);
                              setDisabledSubmit(true);
                            } else {
                              setIsValidHeight(true);
                              setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidHeight === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Chi???u cao ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>C??n n???ng</label>
                        <Form.Control
                          id="weight"
                          name="weight"
                          defaultValue={userTrackingProfile.current_weight}
                          placeholder="Nh???p v??o c??n n???ng c???a b???n"
                          type="text"
                          onChange={(e) => {
                            setCurrent_weight(e.target.value);
                            if (parseFloat(e.target.value) <= 0) {
                              setIsValidWeight(false);
                              setDisabledSubmit(true);
                            } else {
                              setIsValidWeight(true);
                              setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidWeight === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *C??n n???ng ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Ch??? s??? ???????ng huy???t tr?????c b???a ??n</label>
                        <Form.Control
                          id="current_blood_before_meal"
                          name="current_blood_before_meal"
                          defaultValue={
                            userTrackingProfile.current_blood_before_meal
                          }
                          placeholder="Nh???p v??o ch??? s??? ???????ng huy???t tr?????c b???a ??n c???a b???n"
                          type="text"
                          onChange={(e) => {
                            setCurrent_blood_before_meal(e.target.value);
                            if (parseFloat(e.target.value) <= 0) {
                              setIsValidGluBef(false);
                              setDisabledSubmit(true);
                            } else {
                              setIsValidGluBef(true);
                              setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidGluBef === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Ch??? s??? ???????ng huy???t tr?????c khi ??n ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Ch??? s??? ???????ng huy???t sau b???a ??n</label>
                        <Form.Control
                          id="current_nornmal_blood"
                          name="current_nornmal_blood"
                          defaultValue={
                            userTrackingProfile.current_normal_blood
                          }
                          placeholder="Nh???p v??o ch??? s??? ???????ng huy???t sau b???a ??n c???a b???n"
                          type="text"
                          onChange={(e) => {
                            setCurrent_normal_blood(e.target.value);
                            if (parseFloat(e.target.value) <= 0) {
                              setIsValidGluAf(false);
                              setDisabledSubmit(true);
                            } else {
                              setIsValidGluAf(true);
                              setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidGluAf === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Ch??? s??? ???????ng huy???t sau khi ??n ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Ch??? s??? huy???t ??p t??m tr????ng</label>
                        <Form.Control
                          id="current_diastolic"
                          name="current_diastolic"
                          defaultValue={userTrackingProfile.current_diastolic}
                          placeholder="Nh???p v??o huy???t ??p t??m tr????ng c???a b???n"
                          type="number"
                          onChange={(e) => {
                            setCurrent_diastolic(e.target.value);
                            if (parseFloat(e.target.value) <= 0) {
                              setIsValidDias(false);
                              setDisabledSubmit(true);
                            } else {
                              setIsValidDias(true);
                              setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidDias === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Ch??? s??? huy???t ??p t??m tr????ng ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Ch??? s??? huy???t ??p t??m thu</label>
                        <Form.Control
                          id="current_systolic"
                          name="current_systolic"
                          defaultValue={userTrackingProfile.current_systolic}
                          placeholder="Nh???p v??o huy???t ??p t??m thu"
                          type="number"
                          onChange={(e) => {
                            setCurrent_systolic(e.target.value);
                            if (parseFloat(e.target.value) <= 0) {
                              setIsValidSys(false);
                              setDisabledSubmit(true);
                            } else {
                              setIsValidSys(true);
                              setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidSys === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Ch??? s??? huy???t ??p t??m thu ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  <Button
                    // onChange={updateProfile}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    disabled={disabledSubmit}
                  >
                    C???p nh???t
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

export default UserBasicTracking;
