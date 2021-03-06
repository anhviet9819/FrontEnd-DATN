const foodApi = {
  getAllFood(accessToken, groupName) {
    return fetch(
      `http://localhost:8080/api/food/search/group_name=${groupName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getAll(_page, _size, nameContaining) {
    return fetch(
      `http://localhost:8080/api/food/search?page=${_page}&size=${_size}&nameContaining=${nameContaining}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());
  },
  getWithFilters(accessToken, foodGroupName, _page, _size, nameContaining) {
    return fetch(
      `http://localhost:8080/api/food/searchwithfilters?foodGroupName=${foodGroupName}&page=${_page}&size=${_size}&nameContaining=${nameContaining}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getById(accessToken, foodId) {
    return fetch(`http://localhost:8080/api/food/details/${foodId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
  async createByFoodGroupId(accessToken, foodGroupId, data) {
    return fetch(
      `http://localhost:8080/api/food/create/foodgroup/${foodGroupId}`,
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
    return fetch(`http://localhost:8080/api/food/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
  },
  async addFoodByMealsTrackingId(accessToken, mealsTrackingId, foodData) {
    return fetch(
      `http://localhost:8080/api/food/add/mealstracking/${mealsTrackingId}/food`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(foodData),
      }
    ).then((data) => data.json());
  },
  getAllFoodAddedByMealsTrackingId(accessToken, mealsTrackingId) {
    return fetch(
      `http://localhost:8080/api/mealfood/details/mealstracking/${mealsTrackingId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
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

export default foodApi;
