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
import getUserDetails from "services/ProfileApi";
import ProfileApi from "services/ProfileApi";
import updateUserDetails from "services/ProfileApi2";
import swal from "sweetalert";

function AdminProfile() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [userProfile, setUserProfile] = useState([]);
  const [name, setName] = useState();
  const [birthday, setBirthday] = useState();

  const updateProfile = async (e) => {
    e.preventDefault();
    const response = await updateUserDetails(
      username,
      accessToken,
      name,
      birthday
    );
    if (response) {
      console.log(response.status === 200);
      swal(
        "Success",
        "Bạn đã cập nhật thông tin cá nhân thành công!",
        "success",
        {
          button: false,
          timer: 2000,
        }
      ).then((value) => {
        // localStorage.setItem("accessToken", response["accessToken"]);
        // localStorage.setItem("username", response["username"]);
        window.location.href = "/user/user";
      });
    } else {
      console.log("viett");
      // console.log(response)
      swal(
        "Failed",
        "Thông tin bạn nhập không hợp lệ! Hãy kiểm tra lại.",
        "error"
      );
      // alert("hahaha");
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
        localStorage.setItem(
          "userTrackingId",
          userProfileDetails.usersTracking.id
        );
        setUserProfile(userProfileDetails);
      }
    });
    // return () => (mounted = false);
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updateProfile}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Company (disabled)</label>
                        <Form.Control
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
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
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
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
                        <label>Name</label>
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
                        <label>Birthday</label>
                        <Form.Control
                          id="birthday"
                          name="birthday"
                          defaultValue={userProfile.birthday}
                          placeholder="Enter your birthday"
                          type="date"
                          onChange={(e) => setBirthday(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    {/* <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col> */}
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
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
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  // src={
                  //   require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                  //     .default
                  // }
                  // src={
                  //   require("../assets/img/photo-1431578500526-4d9613015464.jpeg")
                  //     .default
                  // }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      // src={require("../assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminProfile;
