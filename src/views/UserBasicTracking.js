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
import basicTrackingApi from "services/BasicTrackingApi";
import getUserDetails from "services/ProfileApi";
import ProfileApi from "services/ProfileApi";
import getUserTrackingById from "services/trackingApi";
import swal from "sweetalert";

function UserBasicTracking() {
  const [usertrackingid, setUsertrackingid] = useState();
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [birthday, setBirthday] = useState();
  const [name, setName] = useState();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [userProfile, setUserProfile] = useState({});
  const [userTrackingProfile, setUserTrackingProfile] = useState({});
  const [data, setData] = useState([]);

  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [isDiabatesMeltiyus, setIsDiabatesMeltiyus] = useState();
  const [isHeartDiseases, setIsHeartDiseases] = useState();
  const [isBloodPressureDiseases, setIsBloodPressureDiseases] = useState();
  const [currentBloodBeforeMeal, setCurrentBloodBeforeMeal] = useState();
  const [currentBloodAfterMeal, setCurrentBloodAfterMeal] = useState();
  const [currentDiastolic, setCurrentDiastolic] = useState();
  const [currentSystolic, setCurrentSystolic] = useState();

  const updateUsertracking = async (e) => {
    e.preventDefault();
    const response = await basicTrackingApi.updateById(
      usertrackingid,
      accessToken,
      data
    );
    if (response) {
      console.log(response.status === 200);
      swal("Success", "You 've update user tracking profile!", "success", {
        button: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = "/admin/userstracking";
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

  useEffect(() => {
    let mounted = true;

    getUserDetails(
      localStorage.getItem("username"),
      localStorage.getItem("accessToken")
    ).then((userProfileDetails) => {
      if (mounted) {
        if (userProfileDetails.birthday) {
          // console.log(userProfileDetails.birthday.substring(0, 10));
          userProfileDetails.birthday = userProfileDetails.birthday.substring(
            0,
            10
          );
        }
        // console.log(userProfileDetails.usersTracking.id);
        setUsertrackingid(userProfileDetails.usersTracking.id);
        setUserProfile(userProfileDetails);
      }
    });
    basicTrackingApi
      .getById(localStorage.getItem("userTrackingId"), accessToken)
      .then((basicTrackingProfile) => {
        if (mounted) {
          setUserTrackingProfile(basicTrackingProfile);
          console.log(basicTrackingProfile);
          console.log(basicTrackingProfile.is_diabates_meltiyus);
          console.log(basicTrackingProfile.is_blood_pressure_diseases);
          console.log(basicTrackingProfile.is_heart_diseases);
        }
      });
  }, []);

  // useEffect(() => {
  //   let mounted = true;
  //   basicTrackingApi
  //     .getById(localStorage.getItem("userTrackingId"), accessToken)
  //     .then((basicTrackingProfile) => {
  //       if (mounted) {
  //         setUserTrackingProfile(basicTrackingProfile);
  //         console.log(basicTrackingProfile);
  //       }
  //     });
  // }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Thông tin sức khỏe cá nhân</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updateUsertracking}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Họ và tên</label>
                        <Form.Control
                          id="name"
                          name="name"
                          defaultValue={userProfile.name}
                          // defaultValue={usertrackingid}
                          placeholder="Enter your name"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Ngày sinh</label>
                        <Form.Control
                          id="birthday"
                          name="birthday"
                          defaultValue={userProfile.birthday}
                          placeholder="Enter your birthday"
                          type="date"
                          onChange={(e) => setBirthday(e.target.value)}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Chiều cao</label>
                        <Form.Control
                          id="height"
                          name="height"
                          defaultValue={userTrackingProfile.current_height}
                          placeholder="Nhập vào chiều cao của bạn"
                          type="number"
                          onChange={(e) => setHeight(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Cân nặng</label>
                        <Form.Control
                          id="weight"
                          name="weight"
                          defaultValue={userTrackingProfile.current_weight}
                          placeholder="Nhập vào cân nặng của bạn"
                          type="number"
                          onChange={(e) => setWeight(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>Tình trạng đường huyết hiện tại </label>
                        <input
                          type="radio"
                          checked={
                            userTrackingProfile.is_diabates_meltiyus === false
                          }
                          name="is_diabates_meltiyus"
                          onChange={(e) =>
                            setIsDiabatesMeltiyus(e.target.value)
                          }
                        />
                        Bình thường
                        <input
                          type="radio"
                          checked={
                            userTrackingProfile.is_diabates_meltiyus === true
                          }
                          name="is_diabates_meltiyus"
                          onChange={(e) =>
                            setIsDiabatesMeltiyus(e.target.value)
                          }
                        />
                        Bị bệnh
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>Tình trạng huyết áp hiện tại </label>
                        <input
                          type="radio"
                          checked={
                            userTrackingProfile.is_blood_pressure_diseases ===
                            false
                          }
                          name="is_blood_pressure_diseases"
                          onClick={(e) =>
                            setIsBloodPressureDiseases(e.target.value)
                          }
                        />
                        Bình thường
                        <input
                          type="radio"
                          checked={
                            userTrackingProfile.is_blood_pressure_diseases ===
                            true
                          }
                          name="is_blood_pressure_diseases"
                          onChange={(e) => {
                            setIsBloodPressureDiseases(e.target.value);
                          }}
                        />
                        Bị bệnh
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>Tình trạng tim mạch hiện tại </label>
                        <input
                          type="radio"
                          checked={
                            userTrackingProfile.is_heart_diseases === false
                          }
                          name="is_heart_diseases"
                          onChange={(e) => setIsHeartDiseases(e.target.value)}
                        />
                        Bình thường
                        <input
                          type="radio"
                          checked={
                            userTrackingProfile.is_heart_diseases === true
                          }
                          name="is_heart_diseases"
                          onChange={(e) => setIsHeartDiseases(e.target.value)}
                        />
                        Bị bệnh
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Chỉ số đường huyết trước bữa ăn</label>
                        <Form.Control
                          id="current_blood_before_meal"
                          name="current_blood_before_meal"
                          defaultValue={
                            userTrackingProfile.current_blood_before_meal
                          }
                          placeholder="Nhập vào chỉ số đường huyết trước bữa ăn của bạn"
                          type="number"
                          onChange={(e) =>
                            setCurrentBloodBeforeMeal(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Chỉ số đường huyết sau bữa ăn</label>
                        <Form.Control
                          id="current_nornmal_blood"
                          name="current_nornmal_blood"
                          defaultValue={
                            userTrackingProfile.current_normal_blood
                          }
                          placeholder="Nhập vào chỉ số đường huyết sau bữa ăn của bạn"
                          type="number"
                          onChange={(e) =>
                            setCurrentBloodAfterMeal(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Chỉ số huyết áp tâm trương</label>
                        <Form.Control
                          id="current_diastolic"
                          name="current_diastolic"
                          defaultValue={userTrackingProfile.current_diastolic}
                          placeholder="Nhập vào huyết áp tâm trương của bạn"
                          type="number"
                          onChange={(e) => setCurrentDiastolic(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Chỉ số huyết áp tâm thu</label>
                        <Form.Control
                          id="current_systolic"
                          name="current_systolic"
                          defaultValue={userTrackingProfile.current_systolic}
                          placeholder="Nhập vào huyết áp tâm thu"
                          type="number"
                          onChange={(e) => setCurrentSystolic(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    // onClick={updateProfile}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    // disabled={(e) => {
                    //   return e.target.value;
                    // }}
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

export default UserBasicTracking;
