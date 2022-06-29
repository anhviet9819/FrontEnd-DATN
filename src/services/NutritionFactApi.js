const nutritionFactApi = {
  getByFoodId(accessToken, foodId) {
    return fetch(
      `http://localhost:8080/api/nutritionfact/details/food/${foodId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  async getAll() {
    return fetch(`http://localhost:8080/api/nutritionfact/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  },
  async updateByFoodId(accessToken, foodId, data) {
    return fetch(
      `http://localhost:8080/api/nutritionfact/update/food/${foodId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    ).then((data) => data.json());
  },
  deleteById(id, accessToken) {
    return fetch(`http://localhost:8080/api/food/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
};

export default nutritionFactApi;
