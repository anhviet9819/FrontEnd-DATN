const listActivitiesApi = {
  getAll(_page, _size, nameContaining) {
    return fetch(
      `http://localhost:8080/api/listactivities/search?page=${_page}&size=${_size}&nameContaining=${nameContaining}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());
  },
  getAllWithFilters(accessToken, sort, page, size, nameContaining) {
    return fetch(
      `http://localhost:8080/api/listactivities/searchwithfilters?sort=${sort}&page=${page}&size=${size}&nameContaining=${nameContaining}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  getAllNoFilters(accessToken) {
    return fetch(`http://localhost:8080/api/listactivities/searchnofilters`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
  getById(id, accessToken) {
    return fetch(`http://localhost:8080/api/listactivities/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
  getByName(name, accessToken) {
    return fetch(
      `http://localhost:8080/api/listactivities/details/name` +
        new URLSearchParams({
          name: name,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((data) => data.json());
  },
  async createNewActivity(accessToken, data) {
    return fetch(`http://localhost:8080/api/listactivities/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
  },
  async updateById(id, accessToken, data) {
    return fetch(`http://localhost:8080/api/listactivities/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
  },
  deleteById(id, accessToken) {
    return fetch(`http://localhost:8080/api/listactivities/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
  },
};

export default listActivitiesApi;
