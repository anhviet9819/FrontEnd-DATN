const activitiesTrackingApi = {
  getActivitiesTrackingByUsertrackingId(userstrackingid, accessToken) {
    return fetch(
      `http://localhost:8080/api/activitiestracking/details/userstracking/${userstrackingid}/activitiestracking`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getActivityTrackingById(id, accessToken) {
    return fetch(`http://localhost:8080/api/activitiestracking/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
  getActivitiesTrackingByListActivitiesId(listactivitesid, accessToken) {
    return fetch(
      `http://localhost:8080/api/activitiestracking/details/listactivities/${listactivitesid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getByFilters(
    accessToken,
    usertrackingid,
    createdatstart,
    createdatend,
    listactivitiesid
  ) {
    return fetch(
      `http://localhost:8080/api/activitiestracking/details/userstrackingListActivitiesCreatedAt?usertrackingid=${usertrackingid}&createdAtStart=${createdatstart}&createdAtEnd=${createdatend}&listactivitiesid=${listactivitiesid}&`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getByFiltersPagination(
    accessToken,
    usertrackingid,
    createdatstart,
    createdatend,
    listactivitiesid,
    page,
    size
  ) {
    return fetch(
      `http://localhost:8080/api/activitiestracking/details/userstrackingListActivitiesCreatedAtPagination?usertrackingid=${usertrackingid}&createdAtStart=${createdatstart}&createdAtEnd=${createdatend}&listactivitiesid=${listactivitiesid}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getToNotice(accessToken, usertrackingid, starttimestart, starttimeend) {
    return fetch(
      `http://localhost:8080/api/activitiestracking/details/userstrackingStartTime?usertrackingid=${usertrackingid}&startTimeStart=${starttimestart}&startTimeEnd=${starttimeend}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  async createByUserTrackingId(userTrackingId, accessToken, data) {
    return fetch(
      `http://localhost:8080/api/activitiestracking/create/userstracking/${userTrackingId}/activitiestracking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    ).then((data) => data.json());
  },
  async updateById(id, accessToken, data) {
    return fetch(`http://localhost:8080/api/activitiestracking/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
  },
  deleteById(id, accessToken) {
    return fetch(`http://localhost:8080/api/activitiestracking/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
};

export default activitiesTrackingApi;
