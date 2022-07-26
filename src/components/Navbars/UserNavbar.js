import React, { Component, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

import routes from "../../routes";
import mealsTrackingApi from "services/MealsTrackingApi";
import activitiesTrackingApi from "services/ActivitiesTrackingApi";
import basicProfileApi from "services/BasicProfileApi";

function Header() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [usertrackingid, setUsertrackingid] = useState(
    localStorage.getItem("userTrackingId")
  );
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const [notificationMealTracking, setNotificationMealTracking] = useState();
  const [notificationActivityTracking, setNotificationActivityTracking] =
    useState();
  const [notificationCount, setNotificationCount] = useState(0);

  const [mealsTracking, setMealstracking] = useState([]);
  const [activitiesTracking, setActivitiesTracking] = useState([]);

  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  useEffect(
    //2 buoc:
    //bước 1: Xác định xem tìm vào ngày nào: Ví dụ đang là 3h sáng 3/7/2022 ở VN thì
    //chỉ là 20h 2/7/2022 giờ UTC, nên phải convert xem cần tìm trong ngày nào trước rồi mới tìm
    //bước 2: convert từ 0h giờ VN -> 17h ngày trước đó giờ UTC
    () => {
      basicProfileApi.getByUsername(username, accessToken).then((data) => {
        let currentDateUTC = new Date().toISOString();
        let epochDateUTC = Date.parse(currentDateUTC);
        let epochDateVN = epochDateUTC + 7 * 3600000;
        let dateVN = new Date(epochDateVN).toISOString();

        let dateConvertToSearch = dateVN.slice(0, 10).concat("T00:00:00.001Z");
        let epochDateConvertToSearch = Date.parse(dateConvertToSearch);
        let epochYesterday17hToSearch = epochDateConvertToSearch - 7 * 3600000;
        let start = new Date(epochYesterday17hToSearch).toISOString();
        let end = dateVN.slice(0, 10).concat("T16:59:59.001Z");
        Promise.all([
          mealsTrackingApi.getByFilters(
            accessToken,
            data.usersTracking.id,
            start,
            end,
            ""
          ),
          activitiesTrackingApi.getToNotice(
            accessToken,
            data.usersTracking.id,
            start,
            end
          ),
        ]).then(([mealsTracking, activitiesTracking]) => {
          let mealsNoti = 0;
          let activitiesNoti = 0;
          if (mealsTracking.length === 0) {
            setNotificationMealTracking(1);
            mealsNoti = 1;
          } else {
            setNotificationMealTracking(0);
            mealsNoti = 0;
          }
          if (activitiesTracking === false) {
            setNotificationActivityTracking(1);
            activitiesNoti = 1;
          } else {
            setNotificationActivityTracking(0);
            activitiesNoti = 0;
          }
          setNotificationCount(mealsNoti + activitiesNoti);
        });
      });
      return;
    },
    [notificationCount]
  );

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link
                data-toggle="dropdown"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="m-0"
              >
                <i className="nc-icon nc-palette"></i>
                <span className="d-lg-none ml-1">Dashboard</span>
              </Nav.Link>
            </Nav.Item>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                as={Nav.Link}
                data-toggle="dropdown"
                id="dropdown-67443507"
                variant="default"
                className="m-0"
              >
                <i className="nc-icon nc-planet"></i>
                {notificationCount !== 0 ? (
                  <span className="notification">{notificationCount}</span>
                ) : (
                  <></>
                )}
                <span className="d-lg-none ml-1">Notification</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {notificationMealTracking !== 0 ? (
                  <Dropdown.Item
                    href="/user/mealstracking/createmealtracking"
                    // onClick={(e) => e.preventDefault()}
                  >
                    Bạn chưa tạo nhật ký ăn uống ngày hôm nay, tạo ngay nhé!
                  </Dropdown.Item>
                ) : (
                  <></>
                )}
                {notificationActivityTracking !== 0 ? (
                  <Dropdown.Item
                    href="/user/activitiestracking/createactivitytracking"
                    // onClick={(e) => e.preventDefault()}
                  >
                    Bạn chưa tạo nhật ký hoạt động ngày hôm nay, tạo ngay nhé!
                  </Dropdown.Item>
                ) : (
                  <></>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="nc-icon nc-zoom-split"></i>
                <span className="d-lg-block"> Search</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto" navbar>
            {/* <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="no-icon">Account</span>
              </Nav.Link>
            </Nav.Item> */}
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <span className="no-icon">Tài khoản</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item
                  href="/user/userprofile"
                  // onClick={(e) => e.preventDefault()}
                >
                  Thông tin cá nhân
                </Dropdown.Item>
                <Dropdown.Item
                  href="/user/updatepassword"
                  // onClick={(e) => e.preventDefault()}
                >
                  Đổi mật khẩu
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                // href="#pablo"
                onClick={() => handleLogout()}
              >
                <span className="no-icon">Đăng xuất</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
