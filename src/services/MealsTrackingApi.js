const mealsTrackingApi = {
  getMealsTrackingByUsertrackingId(userstrackingid, accessToken) {
    return fetch(
      `http://localhost:8080/api/mealstracking/details/userstracking/${userstrackingid}/mealstracking`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getMealFoodByMealsTrackingId(mealstrackingid, accessToken) {
    return fetch(
      `http://localhost:8080/api/mealfood/details/mealstracking/${mealstrackingid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getMealTrackingById(id, accessToken) {
    return fetch(`http://localhost:8080/api/mealstracking/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
  getBieuDoDinhDuongBuaAn(mealstrackingid, accessToken) {
    return fetch(
      `http://localhost:8080/api/mealstracking/bieudodinhduong/${mealstrackingid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getBieuDoDinhDuongBuaAnByCreatedAtBetween(
    accessToken,
    usertrackingid,
    start,
    end
  ) {
    return fetch(
      `http://localhost:8080/api/mealstracking/bieudodinhduongtheoCreatedAtBetween?usertrackingid=${usertrackingid}&start=${start}&end=${end}`,
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
    type
  ) {
    return fetch(
      `http://localhost:8080/api/mealstracking/details/userstrackingTypecreatedAt?usertrackingid=${usertrackingid}&createdAtStart=${createdatstart}&createdAtEnd=${createdatend}&type=${type}`,
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
    type,
    page,
    size
  ) {
    return fetch(
      `http://localhost:8080/api/mealstracking/details/userstrackingTypecreatedAtPagination?usertrackingid=${usertrackingid}&createdAtStart=${createdatstart}&createdAtEnd=${createdatend}&type=${type}&page=${page}&size=${size}`,
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
      `http://localhost:8080/api/mealstracking/create/userstracking/${userTrackingId}/mealstracking`,
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
    return fetch(`http://localhost:8080/api/mealstracking/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
  },
  deleteById(id, accessToken) {
    return fetch(`http://localhost:8080/api/mealstracking/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
};

export default mealsTrackingApi;
