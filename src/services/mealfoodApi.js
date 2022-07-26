const mealFoodApi = {
  getByMealsTrackingId(accessToken, mealstrackingid) {
    return fetch(
      `http://localhost:8080/api/mealfood/details/mealstracking/${mealstrackingid}/mealfood`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getByFoodId(accessToken, foodid) {
    return fetch(`http://localhost:8080/api/mealfood/details/food/${foodid}`, {
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
      `http://localhost:8080/api/mealstracking/add/mealstracking/${mealsTrackingId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        Bearer: accessToken,
        body: JSON.stringify(foodData),
      }
    ).then((data) => data.json());
  },
  async addFood2ByMealsTrackingId(accessToken, mealsTrackingId, foodData) {
    return fetch(
      `http://localhost:8080/api/food/addfood/mealstracking/${mealsTrackingId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        Bearer: accessToken,
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
  deleteByMealFoodId(mealtrackingid, foodid, accessToken) {
    return fetch(
      `http://localhost:8080/api/mealfood/delete?mealTrackingId=${mealtrackingid}&foodId=${foodid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
};

export default mealFoodApi;
