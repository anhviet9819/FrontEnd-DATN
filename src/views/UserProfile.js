import { Typography } from "@mui/material";
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
import profileApi from "services/ProfileApi";
import getUserDetails from "services/ProfileApi";
import ProfileApi from "services/ProfileApi";
import updateUserDetails from "services/ProfileApi2";
import swal from "sweetalert";

function UserProfile() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [userTrackingId, setUserTrackingId] = useState(
    localStorage.getItem("userTrackingId")
  );
  const [userProfile, setUserProfile] = useState([]);
  const [name, setName] = useState();
  const [birthday, setBirthday] = useState();

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

  const [warningIndex, setWarningIndex] = useState({});
  const [highWeight, setHighWeight] = useState();
  const [lowWeight, setLowWeight] = useState();
  const [highGlycemic, setHighGlycemic] = useState();
  const [lowGlycemic, setLowGlycemic] = useState();
  const [highSystolic, setHighSystolic] = useState();
  const [lowSystolic, setLowSystolic] = useState();
  const [highDiastolic, setHighDiastolic] = useState();
  const [lowDiastolic, setLowDiastolic] = useState();

  // const [disabledSubmit, setDisabledSubmit] = useState(false);

  const updateProfile = (e) => {
    e.preventDefault();
    if (
      isValidHeight &&
      isValidWeight &&
      isValidGluBef &&
      isValidGluAf &&
      isValidDias &&
      isValidSys
    ) {
      basicTrackingApi.updateById(userTrackingId, accessToken, {
        is_diabates_meltiyus,
        is_blood_pressure_diseases,
        is_heart_diseases,
        current_height,
        current_weight,
        current_blood_before_meal,
        current_normal_blood,
        current_diastolic,
        current_systolic,
      });
      updateUserDetails(
        username,
        accessToken,
        name === undefined ? userProfile.name : name,
        birthday === undefined ? userProfile.birthday : birthday
      ).then(() => {
        swal(
          "Success",
          "B???n ???? c???p nh???t th??ng tin c?? nh??n th??nh c??ng!",
          "success",
          {
            button: false,
            timer: 2000,
          }
        ).then(() => {
          window.location.href = "/user/userprofile";
        });
      });
    } else {
      swal(
        "Failed",
        "Th??ng tin b???n nh???p kh??ng h???p l???, h??y ki???m tra l???i!",
        "error"
      );
    }
  };

  useEffect(() => {
    basicTrackingApi.getById(userTrackingId, accessToken).then((data) => {
      // setUserTrackingProfile(data);
      setIs_diabates_meltiyus(data.is_diabates_meltiyus);
      setIs_blood_pressure_diseases(data.is_blood_pressure_diseases);
      setIs_heart_diseases(data.is_heart_diseases);
      setCurrent_height(data.current_height);
      setCurrent_weight(data.current_weight);
      setCurrent_blood_before_meal(data.current_blood_before_meal);
      setCurrent_normal_blood(data.current_normal_blood);
      setCurrent_diastolic(data.current_diastolic);
      setCurrent_systolic(data.current_systolic);
      // console.log(data.is_blood_pressure_diseases);
      // console.log(data);
    });
  }, []);

  useEffect(() => {
    let mounted = true;
    basicProfileApi.getByUsername(username, accessToken).then((data) => {
      setUsername(data.username);
      if (mounted) {
        if (data.birthday) {
          let newBirthday = new Date(data.birthday);
          let birthdayLocal = newBirthday.toLocaleDateString().split("/");
          // console.log(newBirthday);
          // console.log(birthdayLocal);
          if (birthdayLocal[1].length === 1) {
            birthdayLocal[1] = `0${birthdayLocal[1]}`;
          }
          if (birthdayLocal[0].length === 1) {
            birthdayLocal[0] = `0${birthdayLocal[0]}`;
          }
          data.birthday = `${birthdayLocal[2]}-${birthdayLocal[0]}-${birthdayLocal[1]}`;
          setBirthday(data.birthday);
        }
        setUserProfile(data);
      }
    });
  }, []);

  useEffect(() => {
    basicProfileApi
      .getWarningIndexByUserTrackingId(accessToken, userTrackingId)
      .then((data) => {
        console.log(data);
        setWarningIndex(data);
        setHighWeight(data.highWeight);
        setLowWeight(data.lowWeight);
        setHighGlycemic(data.highGlycemic);
        setLowGlycemic(data.lowGlycemic);
        setHighSystolic(data.highSystolic);
        setLowSystolic(data.lowSystolic);
        setHighDiastolic(data.highDiastolic);
        setLowDiastolic(data.lowDiastolic);
      });
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Th??ng tin c?? nh??n</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updateProfile}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          id="username"
                          name="username"
                          defaultValue={userProfile.username}
                          // defaultValue={localStorage.getItem("accessToken")}
                          placeholder="Username"
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <Form.Control
                          id="email"
                          name="email"
                          defaultValue={userProfile.email}
                          placeholder="Email"
                          type="email"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>H??? v?? t??n</label>
                        <Form.Control
                          id="name"
                          name="name"
                          defaultValue={userProfile.name}
                          // defaultValue={userProfile.birthday}
                          placeholder="Enter your name"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Ng??y sinh</label>
                        <Form.Control
                          id="birthday"
                          name="birthday"
                          defaultValue={userProfile.birthday}
                          placeholder="Enter your birthday"
                          type="date"
                          onChange={(e) => {
                            // console.log(e.target.value);
                            // let birthday = new Date(e.target.value);
                            // setBirthday(birthday);
                            setBirthday(e.target.value);
                          }}
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
                          defaultValue={current_height}
                          placeholder="Nh???p v??o chi???u cao c???a b???n"
                          type="text"
                          onChange={(e) => {
                            setCurrent_height(e.target.value);
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              setIsValidHeight(false);
                              // setDisabledSubmit(true);
                            } else {
                              setIsValidHeight(true);
                              // setDisabledSubmit(false);
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
                          defaultValue={current_weight}
                          placeholder="Nh???p v??o c??n n???ng c???a b???n"
                          type="text"
                          onChange={(e) => {
                            setCurrent_weight(e.target.value);
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              setIsValidWeight(false);
                              // setDisabledSubmit(true);
                            } else {
                              setIsValidWeight(true);
                              // setDisabledSubmit(false);
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
                          defaultValue={current_blood_before_meal}
                          placeholder="Nh???p v??o ch??? s??? ???????ng huy???t tr?????c b???a ??n c???a b???n"
                          type="text"
                          onChange={(e) => {
                            setCurrent_blood_before_meal(e.target.value);
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              setIsValidGluBef(false);
                              // setDisabledSubmit(true);
                            } else {
                              setIsValidGluBef(true);
                              // setDisabledSubmit(false);
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
                          defaultValue={current_normal_blood}
                          placeholder="Nh???p v??o ch??? s??? ???????ng huy???t sau b???a ??n c???a b???n"
                          type="text"
                          onChange={(e) => {
                            setCurrent_normal_blood(e.target.value);
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              setIsValidGluAf(false);
                              // setDisabledSubmit(true);
                            } else {
                              setIsValidGluAf(true);
                              // setDisabledSubmit(false);
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
                        <label>Ch??? s??? huy???t ??p t??m thu</label>
                        <Form.Control
                          id="current_systolic"
                          name="current_systolic"
                          defaultValue={current_systolic}
                          placeholder="Nh???p v??o huy???t ??p t??m thu"
                          type="text"
                          onChange={(e) => {
                            setCurrent_systolic(e.target.value);
                            // console.log(isNaN(parseFloat(e.target.value)));
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              setIsValidSys(false);
                              // setDisabledSubmit(true);
                            } else {
                              setIsValidSys(true);
                              // setDisabledSubmit(false);
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
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Ch??? s??? huy???t ??p t??m tr????ng</label>
                        <Form.Control
                          id="current_diastolic"
                          name="current_diastolic"
                          defaultValue={current_diastolic}
                          placeholder="Nh???p v??o huy???t ??p t??m tr????ng c???a b???n"
                          type="text"
                          onChange={(e) => {
                            setCurrent_diastolic(e.target.value);
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              setIsValidDias(false);
                              // setDisabledSubmit(true);
                            } else {
                              setIsValidDias(true);
                              // setDisabledSubmit(false);
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
                  </Row>
                  <Button
                    // onClick={updateProfile}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    C???p nh???t
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="54">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  C???nh b??o ch??? s??? s???c kh???e c?? nh??n
                  <p className="card-category">
                    Th??ng tin s??? d???ng ????? c???nh b??o s???c kh???e c???a b???n khi c??c ch???
                    s??? ??? m???c b??o ?????ng
                  </p>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updateProfile}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>C???nh b??o th???a c??n</label>
                        <Form.Control
                          id="highWeight"
                          name="highWeight"
                          defaultValue={highWeight}
                          placeholder="Ch??? s??? th???a c??n"
                          type="text"
                          onChange={(e) => {
                            setHighWeight(e.target.value);
                            if (
                              parseFloat(e.target.value === true) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              // setIsValidHeight(false);
                              // setDisabledSubmit(true);
                            } else {
                              // setIsValidHeight(true);
                              // setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {/* {isValidHeight === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Chi???u cao ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )} */}
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>C???nh b??o thi???u c??n</label>
                        <Form.Control
                          id="lowWeight"
                          name="lowWeight"
                          defaultValue={lowWeight}
                          placeholder="Ch??? s??? thi???u c??n"
                          type="text"
                          onChange={(e) => {
                            setLowWeight(e.target.value);
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              // setIsValidWeight(false);
                              // setDisabledSubmit(true);
                            } else {
                              // setIsValidWeight(true);
                              // setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {/* {isValidWeight === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *C??n n???ng ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )} */}
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>C???nh b??o ???????ng huy???t cao</label>
                        <Form.Control
                          id="highGlycemic"
                          name="highGlycemic"
                          defaultValue={highGlycemic}
                          placeholder="Ch??? s??? ???????ng huy???t cao"
                          type="text"
                          onChange={(e) => {
                            setHighGlycemic(e.target.value);
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              // setIsValidGluBef(false);
                              // setDisabledSubmit(true);
                            } else {
                              // setIsValidGluBef(true);
                              // setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {/* {isValidGluBef === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Ch??? s??? ???????ng huy???t tr?????c khi ??n ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )} */}
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>C???nh b??o h??? ???????ng huy???t</label>
                        <Form.Control
                          id="lowGlycemic"
                          name="lowGlycemic"
                          defaultValue={lowGlycemic}
                          placeholder="Ch??? s??? ???????ng huy???t th???p"
                          type="text"
                          onChange={(e) => {
                            setLowGlycemic(e.target.value);
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              // setIsValidGluAf(false);
                              // setDisabledSubmit(true);
                            } else {
                              // setIsValidGluAf(true);
                              // setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {/* {isValidGluAf === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Ch??? s??? ???????ng huy???t sau khi ??n ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )} */}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>C???nh b??o huy???t ??p t??m thu cao</label>
                        <Form.Control
                          id="highSystolic"
                          name="highSystolic"
                          defaultValue={highSystolic}
                          placeholder="Ch??? s??? huy???t ??p t??m thu cao"
                          type="text"
                          onChange={(e) => {
                            setHighSystolic(e.target.value);
                            // console.log(isNaN(parseFloat(e.target.value)));
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              // setIsValidSys(false);
                              // setDisabledSubmit(true);
                            } else {
                              // setIsValidSys(true);
                              // setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {/* {isValidSys === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Ch??? s??? huy???t ??p t??m thu ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )} */}
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>C???nh b??o huy???t ??p t??m tr????ng cao</label>
                        <Form.Control
                          id="highDiastolic"
                          name="highDiastolic"
                          defaultValue={highDiastolic}
                          placeholder="Ch??? s??? huy???t ??p t??m tr????ng cao"
                          type="text"
                          onChange={(e) => {
                            setHighDiastolic(e.target.value);
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              // setIsValidDias(false);
                              // setDisabledSubmit(true);
                            } else {
                              // setIsValidDias(true);
                              // setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {/* {isValidDias === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Ch??? s??? huy???t ??p t??m tr????ng ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )} */}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>C???nh b??o huy???t ??p t??m thu th???p</label>
                        <Form.Control
                          id="lowSystolic"
                          name="lowSystolic"
                          defaultValue={lowSystolic}
                          placeholder="Ch??? s??? huy???t ??p t??m thu th???p"
                          type="text"
                          onChange={(e) => {
                            setLowSystolic(e.target.value);
                            // console.log(isNaN(parseFloat(e.target.value)));
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              // setIsValidSys(false);
                              // setDisabledSubmit(true);
                            } else {
                              // setIsValidSys(true);
                              // setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {/* {isValidSys === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Ch??? s??? huy???t ??p t??m thu ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )} */}
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>C???nh b??o huy???t ??p t??m tr????ng th???p</label>
                        <Form.Control
                          id="lowDiastolic"
                          name="lowDiastolic"
                          defaultValue={lowDiastolic}
                          placeholder="Ch??? s??? huy???t ??p t??m tr????ng th???p"
                          type="text"
                          onChange={(e) => {
                            setLowDiastolic(e.target.value);
                            if (
                              parseFloat(e.target.value) <= 0 ||
                              isNaN(parseFloat(e.target.value)) === true
                            ) {
                              // setIsValidDias(false);
                              // setDisabledSubmit(true);
                            } else {
                              // setIsValidDias(true);
                              // setDisabledSubmit(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {/* {isValidDias === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Ch??? s??? huy???t ??p t??m tr????ng ph???i l?? s??? d????ng
                        </Typography>
                      ) : (
                        <></>
                      )} */}
                    </Col>
                  </Row>
                  <Button
                    // onClick={updateProfile}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
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

export default UserProfile;
