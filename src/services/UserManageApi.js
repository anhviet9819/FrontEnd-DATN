const userManageApi = {
  getAll() {
    return fetch(`http://localhost:8080/api/auth/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  },
  getWithFilters(rolesId, isActive) {
    return fetch(
      `http://localhost:8080/api/auth/searchwithfilters?rolesId=${rolesId}&isActive=${isActive}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());
  },
  async updateUserStatus(username) {
    return fetch(`http://localhost:8080/api/auth/updatestatus/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  },
};

export default userManageApi;
