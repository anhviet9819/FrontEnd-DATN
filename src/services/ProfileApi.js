const profileApi = {
  getUserDetails(username, accessToken) {
    return fetch(`http://localhost:8080/api/auth/details/${username}`, {
      method: "GET",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      // Bearer: accessToken,
      // body: JSON.stringify(username),
    }).then((data) => data.json());
  },
};

export default profileApi;
