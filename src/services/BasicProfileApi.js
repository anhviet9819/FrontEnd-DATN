const basicProfileApi = {
  getByUsername(username, accessToken) {
    return fetch(`http://localhost:8080/api/auth/details/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      Bearer: accessToken,
    }).then((data) => data.json());
  },
  updateByUsername(username, accessToken, name, birthday) {
    return fetch(`http://localhost:8080/api/auth/update/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      Bearer: accessToken,
      body: JSON.stringify({
        name: name,
        birthday: birthday,
      }),
    }).then((data) => data.json());
  },
};

export default basicProfileApi;
