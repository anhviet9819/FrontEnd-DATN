import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import mealsTrackingApi from "services/MealsTrackingApi";
import swal from "sweetalert";
import Select from "react-select";
import { Typography } from "@mui/material";

function UpdateMealTracking() {
  const { mealstrackingid } = useParams();
  const [usertrackingid, setUsertrackingid] = useState(
    localStorage.getItem("userTrackingId")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const history = useHistory();

  const [mealtrackingid, setMealtrackingid] = useState(
    localStorage.getItem("mealtrackingid")
  );
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

  const [mealtracking, setMealTracking] = useState([]);

  const handleBack = () => {
    return history.push("/mealstracking");
  };

  useEffect(() => {
    mealsTrackingApi
      .getMealTrackingById(mealstrackingid, accessToken)
      .then((data) => {
        console.log(data);
        data.created_at = data.created_at.slice(0, 16);
        setMealTracking(data);
      });
  }, []);

  const updateMeal = async (e) => {
    e.preventDefault();
    console.log(mealtracking.created_at);
    const response = await mealsTrackingApi.updateById(
      mealstrackingid,
      accessToken,
      {
        name: name === undefined ? mealtracking.name : name,
        type: type === undefined ? mealtracking.type : type,
        description:
          description === undefined ? mealtracking.description : description,
        created_at:
          created_at === undefined
            ? mealtracking.created_at.concat(":00Z")
            : created_at,
      }
    );
    if (response.name) {
      swal("Success", "Bạn đã cập nhật thành công nhật ký bữa ăn!", "success", {
        button: false,
        timer: 2000,
      }).then(() => {
        window.location.href = "/user/mealstracking";
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
                <Card.Title as="h4">Cập nhật nhật ký bữa ăn</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updateMeal}>
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Thời gian</label>
                        <Form.Control
                          id="created_at"
                          name="created_at"
                          defaultValue={mealtracking.created_at}
                          //   value={mealtracking.created_at}
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
                  <Row>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Tên bữa ăn</label>
                        <Form.Control
                          id="name"
                          name="name"
                          defaultValue={mealtracking.name}
                          placeholder="Nhập tên cho bữa ăn của bạn"
                          type="text"
                          onChange={(e) => {
                            setName(e.target.value);
                            // setData.name(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <label>Chọn nhóm thức ăn</label>
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
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Chú thích cho bữa ăn</label>
                        <Form.Control
                          id="description"
                          name="description"
                          defaultValue={mealtracking.description}
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
                    Cập nhật nhật ký bữa ăn
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

export default UpdateMealTracking;
