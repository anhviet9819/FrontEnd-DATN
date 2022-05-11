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
};

export default mealsTrackingApi;
