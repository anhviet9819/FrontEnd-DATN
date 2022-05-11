async function signupUser(loginData) {
  return fetch("http://localhost:8080/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  }).then((data) => data.json());
}
export default signupUser;
