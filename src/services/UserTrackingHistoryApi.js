const userTrackingHistory = {
  getPersonalIndexByUserTrackingId(usertrackingid, accessToken) {
    return fetch(
      `http://localhost:8080/api/personalindex/userstracking/${usertrackingid}/personalindex`,
      {
        method: "GET",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        // Bearer: accessToken,
      }
    ).then((data) => data.json());
  },
  getBloodPressureByUserTrackingId(usertrackingid, accessToken) {
    return fetch(
      `http://localhost:8080/api/bloodpressure/userstracking/${usertrackingid}/bloodpressure`,
      {
        method: "GET",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        // Bearer: accessToken,
      }
    ).then((data) => data.json());
  },
  getDiabatesMelitiyusByUserTrackingId(usertrackingid, accessToken) {
    return fetch(
      `http://localhost:8080/api/diabatesmelitiyus/userstracking/${usertrackingid}/diabatesmelitiyus`,
      {
        method: "GET",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        // Bearer: accessToken,
      }
    ).then((data) => data.json());
  },
};

export default userTrackingHistory;
