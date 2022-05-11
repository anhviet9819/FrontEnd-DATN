import CreateMealTracking from "../components/CreateMealTracking/CreateMealTracking";
import CreateMealTrackingNotice from "../components/CreateMealTracking/CreateMealTrackingNotice";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import {
  BrowserRouter,
  Link,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import mealsTrackingApi from "services/MealsTrackingApi";

function MealsTracking() {
  const [isShow, setIsShow] = useState(true);
  const [mealstrackingData, setMealstrackingData] = useState([]);
  const [usertrackingid, setUsertrackingid] = useState(
    localStorage.getItem("userTrackingId")
  );
  const [accesstoken, setAccesstoken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    console.log(`isShow : ${isShow}`);
    mealsTrackingApi
      .getMealsTrackingByUsertrackingId(usertrackingid, accesstoken)
      .then((data) => {
        // console.log(data);
        setMealstrackingData(data);
      });
  }, [isShow]);

  const onHandleClick = () => {
    setIsShow(false);
    if (!isShow) {
      return <CreateMealTracking />;
    }
  };

  return (
    <>
      <Switch>
        <Route path="/admin/mealstracking/createmealtracking">
          <CreateMealTracking />
        </Route>
      </Switch>
      <Container fluid>
        {mealstrackingData.length === 0 ? (
          { isShow } ? (
            <>
              <p>Bạn chưa có nhật ký dinh dưỡng nào cả.</p>
              <Link
                to="/admin/mealstracking/createmealtracking"
                onClick={() => onHandleClick()}
              >
                Tạo ngay nhé!
              </Link>
            </>
          ) : (
            <CreateMealTracking />
            // <p>Viet</p>
          )
        ) : (
          <>
            <Container fluid>
              <Row>
                <Col md="12">
                  <Card className="strpied-tabled-with-hover">
                    <Card.Header>
                      <Card.Title as="h4">Chỉ số cơ bản</Card.Title>
                      <p className="card-category">
                        Bảng trên thể hiện lịch sử thay đổi chiều cao, cân nặng
                      </p>
                    </Card.Header>
                    <Card.Body className="table-full-width table-responsive px-0">
                      <Table className="table-hover table-striped">
                        <thead>
                          <tr>
                            <th className="border-0">Ngày tạo</th>
                            <th className="border-0">Tên nhật ký</th>
                            <th className="border-0">Chi tiết nhật ký</th>
                            <th className="border-0">Loại bữa ăn</th>
                            <th className="border-0">Hàm lượng cung cấp</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mealstrackingData.map((mealstrackingData) => {
                            return (
                              <tr>
                                <td>{mealstrackingData.created_at}</td>
                                <td>{mealstrackingData.name}</td>
                                <td>{mealstrackingData.description}</td>
                                <td>{mealstrackingData.type}</td>
                                <td>{mealstrackingData.meal_volume}calo</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </Container>
    </>
  );
}

export default MealsTracking;
