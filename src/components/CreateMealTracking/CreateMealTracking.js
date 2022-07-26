import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import mealsTrackingApi from "services/MealsTrackingApi";
import swal from "sweetalert";
import Select from "react-select";
import { Typography } from "@mui/material";

function CreateMealTracking() {
  const [usertrackingid, setUsertrackingid] = useState(
    localStorage.getItem("userTrackingId")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const history = useHistory();

  const [created_at, setCreated_at] = useState();
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();

  const [epochTimeNow, setEpochTimeNow] = useState(Date.now() - 100000);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isValidCreatedAt, setIsValidCreatedAt] = useState(true);

  const [mealTypeList, setMealTypeList] = useState([
    {
      label: "Bữa sáng",
      value: "Bữa sáng",
    },
    {
      label: "Bữa trưa",
      value: "Bữa trưa",
    },
    {
      label: "Bữa tối",
      value: "Bữa tối",
    },
    {
      label: "Bữa phụ",
      value: "Bữa phụ",
    },
  ]);

  const [mealstracking, setMealsTracking] = useState();

  const handleBack = () => {
    return history.push("/mealstracking");
  };

  const createMealstracking = async (e) => {
    console.log(created_at);
    e.preventDefault();
    const response = await mealsTrackingApi.createByUserTrackingId(
      usertrackingid,
      accessToken,
      {
        name,
        type,
        description,
        created_at,
      }
    );
    if (response.name) {
      console.log(response.status === 200);
      swal("Success", "Bạn đã tạo thành công nhật ký bữa ăn!", "success", {
        button: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = `/user/mealstracking/mealfoodtracking/${response.id}`;
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
          <Col md="5">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Tạo mới nhật ký bữa ăn</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={createMealstracking}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Thời gian</label>
                        <Form.Control
                          id="created_at"
                          name="created_at"
                          // defaultValue=""
                          plceholder="Chọn thời gian bữa ăn"
                          type="datetime-local"
                          onChange={(e) => {
                            // console.log(new Date(e.target.value).toISOString());
                            let temp = new Date(e.target.value).getTime();
                            setCreated_at(
                              new Date(e.target.value).toISOString()
                            );
                            if (temp > epochTimeNow) {
                              setIsValidCreatedAt(false);
                              setDisabledButton(true);
                            } else {
                              setIsValidCreatedAt(true);
                              setDisabledButton(false);
                            }
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {isValidCreatedAt === false ? (
                        <Typography variant="body2" color="red" fontSize="13px">
                          *Thời gian tạo bữa ăn không được lớn hơn thời gian
                          hiện tại
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Tên bữa ăn</label>
                        <Form.Control
                          id="name"
                          name="name"
                          placeholder="Nhập tên cho bữa ăn của bạn"
                          type="text"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col className="pr-1" md="6">
                      <label>Chọn loại bữa ăn</label>
                      <Select
                        placeholder="Chọn loại bữa ăn"
                        options={mealTypeList}
                        onChange={(e) => {
                          // console.log(e.value);
                          setType(e.value);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Chú thích cho bữa ăn</label>
                        <Form.Control
                          id="description"
                          name="description"
                          // defaultValue=""
                          placeholder="Ghi chú thích cho bữa ăn của bạn(nếu có)"
                          type="text"
                          onChange={(e) => {
                            setDescription(e.target.value);
                            // setData.description(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    // onClick={updateProfile}
                    disabled={disabledButton}
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Tạo đăng ký cho bữa ăn
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

export default CreateMealTracking;
