const userTrackingHistory = {
  getPersonalIndexByUserTrackingId(usertrackingid, accessToken) {
    return fetch(
      `http://localhost:8080/api/personalindex/userstracking/${usertrackingid}/personalindex`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getPersonalIndexByUserTrackingIdFilters(
    usertrackingid,
    accessToken,
    sorting
  ) {
    return fetch(
      `http://localhost:8080/api/personalindex/userstracking/${usertrackingid}?sorting=${sorting}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getBloodPressureByUserTrackingId(usertrackingid, accessToken) {
    return fetch(
      `http://localhost:8080/api/bloodpressure/userstracking/${usertrackingid}/bloodpressure`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getDiabatesMelitiyusByUserTrackingId(usertrackingid, accessToken) {
    return fetch(
      `http://localhost:8080/api/diabatesmelitiyus/userstracking/${usertrackingid}/diabatesmelitiyus`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getBieuDoChieuCaoCanNang(usertrackingid, accessToken, start, end) {
    return fetch(
      `http://localhost:8080/api/personalindex/bieudo/${usertrackingid}?starttime=${start}&endtime=${end}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getBieuDoHuyetAp(usertrackingid, accessToken, start, end) {
    return fetch(
      `http://localhost:8080/api/bloodpressure/bieudo/${usertrackingid}?starttime=${start}&endtime=${end}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getBieuDoDuongHuyet(usertrackingid, accessToken, start, end) {
    return fetch(
      `http://localhost:8080/api/diabatesmelitiyus/bieudo/${usertrackingid}?starttime=${start}&endtime=${end}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getPersonalIndexById(id, accessToken) {
    return fetch(`http://localhost:8080/api/personalindex/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
  getBloodPressureById(id, accessToken) {
    return fetch(`http://localhost:8080/api/bloodpressure/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
  getDiabatesMelitiyusById(id, accessToken) {
    return fetch(`http://localhost:8080/api/diabatesmelitiyus/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
  getPersonalIndexByUserTrackingIdPagination(
    accessToken,
    usertrackingid,
    page,
    size,
    sorting
  ) {
    return fetch(
      `http://localhost:8080/api/personalindex/userstracking/${usertrackingid}/pagination?page=${page}&size=${size}&sorting=${sorting}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getBloodPressureByUserTrackingIdPagination(
    accessToken,
    usertrackingid,
    page,
    size,
    sorting
  ) {
    return fetch(
      `http://localhost:8080/api/bloodpressure/userstracking/${usertrackingid}/pagination?page=${page}&size=${size}&sorting=${sorting}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getDiabatesMelitiyusByUserTrackingIdPagination(
    accessToken,
    usertrackingid,
    page,
    size,
    sorting
  ) {
    return fetch(
      `http://localhost:8080/api/diabatesmelitiyus/userstracking/${usertrackingid}/pagination?page=${page}&size=${size}&sorting=${sorting}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  updatePersonalIndexById(id, accessToken, data) {
    return fetch(`http://localhost:8080/api/personalindex/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
  },
  updateBloodPressureById(id, accessToken, data) {
    return fetch(`http://localhost:8080/api/bloodpressure/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
  },
  updateDiabatesMelitiyusById(id, accessToken, data) {
    return fetch(`http://localhost:8080/api/diabatesmelitiyus/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
  },
  deletePersonalIndexById(id, accessToken) {
    return fetch(`http://localhost:8080/api/personalindex/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
  deleteBloodPressureById(id, accessToken) {
    return fetch(`http://localhost:8080/api/bloodpressure/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
  deleteDiabatesMeltiyusById(id, accessToken) {
    return fetch(`http://localhost:8080/api/diabatesmelitiyus/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
};

export default userTrackingHistory;
