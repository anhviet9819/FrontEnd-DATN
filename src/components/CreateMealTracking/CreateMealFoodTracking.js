import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import mealsTrackingApi from "services/MealsTrackingApi";
import AddBoxIcon from "@mui/icons-material/AddBox";

function CreateMealFoodTracking() {
  const [mealtrackingid, setMealtrackingid] = useState(
    localStorage.getItem("mealtrackingid")
  );
  const [accessToken, setAccesstoken] = useState(
    localStorage.getItem("accessToken")
  );

  const [mealTracking, setMealtracking] = useState();
  const [mealFood, setMealFood] = useState([]);
  const [created_at, setCreated_at] = useState();

  useEffect(() => {
    mealsTrackingApi
      .getMealTrackingById(mealtrackingid, accessToken)
      .then((data) => {
        // console.log(data);
        // console.log(data.created_at);
        data.created_at = data.created_at.substring(0, 10);
        // console.log(data.created_at);
        setMealtracking(data);
        setCreated_at(data.created_at);
        // console.log(data);
      });
    mealsTrackingApi
      .getMealFoodByMealsTrackingId(mealtrackingid, accessToken)
      .then((data) => {
        console.log(data);
        console.log(mealtrackingid);
        setMealFood(data);
      });
  }, []);

  const addFood = () => {
    return <p>Voet</p>;
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">
                  Nhật ký ăn uống ngày{" "}
                  {/* {mealTracking.created_at.slice(0, 10).reverse()} */}
                  {/* {mealTracking.created_at} */}
                  {created_at}
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Nhóm thực phẩm</th>
                      <th className="border-0">Món ăn</th>
                      <th className="border-0">Khối lượng món ăn(g)</th>
                      <th className="border-0">Hàm lượng cung cấp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mealFood.map((mealFoodData) => {
                      return (
                        <tr>
                          <td>{mealFoodData.food.foodGroup.name}</td>
                          <td>{mealFoodData.food.name}</td>
                          <td>{mealFoodData.food_volume}</td>
                          {/* <td>{mealstrackingData.meal_volume} calo</td> */}
                          {/* <td>
                                  <Button
                                    className="btn-fill pull-right"
                                    // variant="primary"
                                    href="/admin/mealstracking/updatemealtracking"
                                    onClick={() => {
                                      localStorage.setItem(
                                        "mealtrackingid",
                                        mealstrackingData.id
                                      );
                                    }}
                                  >
                                    Sửa
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() =>
                                      removeMealtracking(mealstrackingData.id)
                                    }
                                  >
                                    Xóa
                                  </Button>
                                </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <AddBoxIcon onClick={() => addFood()} /> Thêm món ăn
        </Row>
      </Container>
    </>
  );
}
export default CreateMealFoodTracking;
