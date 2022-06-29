import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import userManageApi from "services/UserManageApi";
import swal from "sweetalert";
import Select from "react-select";

function UserManage() {
  const [usersData, setUsersData] = useState([]);
  // const [userStatus, setUserStatus] = useState();

  const [filters, setFilters] = useState({
    rolesId: "",
    isActive: "",
  });

  const [rolesList, setRolesList] = useState([
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Người dùng cá nhân",
      label: "Người dùng cá nhân",
    },
    {
      value: "Tất cả",
      label: "Tất cả",
    },
  ]);

  const [isActiveList, setIsActiveList] = useState([
    {
      value: "Đã kích hoạt",
      label: "Đã kích hoạt",
    },
    {
      value: "Chưa kích hoạt",
      label: "Chưa kích hoạt",
    },
    {
      value: "Tất cả",
      label: "Tất cả",
    },
  ]);

  useEffect(() => {
    userManageApi
      .getWithFilters(filters.rolesId, filters.isActive)
      .then((data) => {
        setUsersData(data);
      });
  }, [filters]);

  const updateUserStatus = async (username, isActive) => {
    if (isActive === true) {
      swal({
        title: "Bạn chắc chắn muốn khóa tài khoản này không?",
        text: "Sau khi khóa, tài khoản người dùng sẽ không thể đăng nhập được!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userManageApi.updateUserStatus(username).then((user) => {
            swal(
              "Success",
              `Bạn đã khóa tài khoản ${user.username} thành công!`,
              "success",
              {
                button: false,
                timer: 1000,
              }
            ).then(() => {
              window.location.href = "/admin/usermanage";
            });
          });
        }
      });
    } else {
      swal({
        title: "Bạn chắc chắn muốn kích hoạt tài khoản này không?",
        text: "Sau khi kích hoạt, tài khoản người dùng sẽ đăng nhập được!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userManageApi.updateUserStatus(username).then((user) => {
            swal(
              "Success",
              `Bạn đã kích hoạt tài khoản ${user.username} thành công!`,
              "success",
              {
                button: false,
                timer: 1000,
              }
            ).then(() => {
              window.location.href = "/admin/usermanage";
            });
          });
        }
      });
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Quản lý tài khoản</Card.Title>
                {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">STT</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Username</th>
                      <th className="border-0">
                        <Select
                          placeholder="Loại tài khoản"
                          options={rolesList}
                          onChange={(e) => {
                            if (e.value === "Admin") {
                              setFilters({
                                ...filters,
                                rolesId: "2",
                              });
                            } else if (e.value === "Người dùng cá nhân") {
                              setFilters({
                                ...filters,
                                rolesId: "1",
                              });
                            } else {
                              setFilters({
                                ...filters,
                                rolesId: "",
                              });
                            }
                          }}
                        />
                      </th>
                      <th className="border-0">Birthday</th>
                      <th className="border-0">
                        <Select
                          placeholder="Trạng thái tài khoản"
                          options={isActiveList}
                          onChange={(e) => {
                            if (e.value === "Đã kích hoạt") {
                              setFilters({
                                ...filters,
                                isActive: "true",
                              });
                            } else if (e.value === "Chưa kích hoạt") {
                              setFilters({
                                ...filters,
                                isActive: "false",
                              });
                            } else {
                              setFilters({
                                ...filters,
                                isActive: "",
                              });
                            }
                          }}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.map((userData, index) => {
                      // console.log(userData.is_active);
                      return (
                        <tr key={userData.id}>
                          <td>{index + 1}</td>
                          <td>{userData.email}</td>
                          <td>{userData.username}</td>
                          <td>{userData.roles[0].name}</td>
                          <td>{userData.birthday}</td>
                          <td>
                            {userData.is_active === true ? (
                              <Button
                                variant="danger"
                                onClick={() =>
                                  updateUserStatus(
                                    userData.username,
                                    userData.is_active
                                  )
                                }
                              >
                                Khóa tài khoản
                              </Button>
                            ) : userData.roles[0].name === "ROLE_ADMIN" ? (
                              <></>
                            ) : (
                              <Button
                                // className="btn-fill pull-right"
                                variant="primary"
                                onClick={() =>
                                  updateUserStatus(
                                    userData.username,
                                    userData.is_active
                                  )
                                }
                              >
                                Kích hoạt tài khoản
                              </Button>
                            )}
                          </td>
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
  );
}

export default UserManage;
