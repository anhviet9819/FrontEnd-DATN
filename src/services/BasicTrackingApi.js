const basicTrackingApi = {
  getById(id, accessToken) {
    return fetch(`http://localhost:8080/api/userstracking/details/${id}`, {
      method: "GET",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      // Bearer: accessToken,
    }).then((data) => data.json());
  },
  async updateById(id, accessToken, updateData) {
    return fetch(`http://localhost:8080/api/userstracking/update/${id}`, {
      method: "PUT",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      Bearer: accessToken,
      body: JSON.stringify(updateData),
    }).then((data) => data.json());
  },
};

export default basicTrackingApi;
