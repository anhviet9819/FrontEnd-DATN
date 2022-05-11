function getUserTrackingById(id, accessToken) {
  return fetch(`http://localhost:8080/api/userstracking/details/${id}`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    Bearer: accessToken,
  }).then((data) => data.json());
}
export default getUserTrackingById;
