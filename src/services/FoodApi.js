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
};

export default foodApi;
