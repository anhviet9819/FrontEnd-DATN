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
import profileApi from "services/ProfileApi";
import getUserDetails from "services/ProfileApi";
import ProfileApi from "services/ProfileApi";
import updateUserDetails from "services/ProfileApi2";
import swal from "sweetalert";

function ChangePassword() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [isValidNewPassword, setIsValidNewPassword] = useState();
  const [isValidConfirmNewPassword, setIsValidConfirmNewPassword] = useState();
  const [disabledButton, setDisabledButton] = useState();

  const updatePassword = async (e) => {
    e.preventDefault();
    if (
      oldPassword === undefined ||
      newPassword === undefined ||
      confirmNewPassword === undefined
    ) {
      swal("Failed", "Bạn phải nhập đầy đủ thông tin yêu cầu!", "error");
    } else {
      const response = await basicProfileApi.changePassword(
        username,
        accessToken,
        oldPassword,
        newPassword
      );
      if (response.message === "Change password successfully!") {
        swal("Success", "Bạn đã thay đổi mật khẩu thành công!", "success", {
          button: false,
          timer: 2000,
        }).then(() => {
          window.location.href = "/user/dashboard";
        });
      } else if (response.message === "Old password incorrect!") {
        swal(
          "Failed",
          "Mật khẩu cũ bạn nhập vào không chính xác, hãy kiểm tra lại!",
          "error"
        );
      } else {
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
                <Card.Title as="h4">Thay đổi mật khẩu</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updatePassword}>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          id="username"
                          name="username"
                          defaultValue={username}
                          placeholder="Username"
                          type="text"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Mật khẩu cũ</label>
                        <Form.Control
                          id="oldPassword"
                          name="oldPassword"
                          placeholder="Nhập vào mật khẩu cũ"
                          type="password"
                          onChange={(e) => {
                            setOldPassword(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Mật khẩu mới</label>
                        <Form.Control
                          id="newPassword"
                          name="newPassword"
                          placeholder="Nhập vào mật khẩu mới"
                          type="password"
                          onChange={(e) => {
                            let new_password = e.target.value;
                            setNewPassword(e.target.value);
                            if (
                              new_password.match(
                                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
                              )
                            ) {
                              setIsValidNewPassword(true);
                            } else {
                              setIsValidNewPassword(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidNewPassword === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Mật khẩu phải chứa ít nhất 8 ký tự bao gồm ít nhất 1
                          chữ cái hoa, 1 chữ cái thường, 1 số và không có kí tự
                          đặc biệt
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Xác nhận mật khẩu mới</label>
                        <Form.Control
                          id="confirmNewPassword"
                          name="confirmNewPassword"
                          placeholder="Xác nhận mật khẩu mới"
                          type="password"
                          onChange={(e) => {
                            let confirm_new_password = e.target.value;
                            setConfirmNewPassword(e.target.value);
                            if (
                              confirm_new_password.localeCompare(
                                newPassword
                              ) === 0
                            ) {
                              setIsValidConfirmNewPassword(true);
                              setDisabledButton(false);
                            } else {
                              setIsValidConfirmNewPassword(false);
                              setDisabledButton(true);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidConfirmNewPassword === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Mật khẩu xác nhận không giống mật khẩu mới
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
                    Thay đổi mật khẩu
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

export default ChangePassword;
