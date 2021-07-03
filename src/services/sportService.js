import axios from "axios";
import authService from "./authService";

const baseUrl = "https://nsc-app.herokuapp.com/profile/sports";

export async function getSports() {
  const url = baseUrl + "/get";
  const body = {};

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let result = {};

  await axios
    .post(url, body, config)
    .then((response) => {
      result.status = response.status;
      if (response.status === 200) {
        result.data = response.data;
      } else {
        if (response.data.message !== undefined) {
          result.data = response.data.message;
        } else {
          result.data =
            "We encountered an error while retrieving sports data. Please try again.";
        }
        alert(result.data);
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while retrieving sports data. Please try again.";
      }
      alert(result.data);
    });

  return result;
}

export async function getSportById(id) {
  const url = baseUrl + "/get";
  const body = {
    _id: id,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let result = {};

  await axios
    .post(url, body, config)
    .then((response) => {
      result.status = response.status;
      if (response.status === 200) {
        result.data = response.data;
      } else {
        if (response.data.message !== undefined) {
          result.data = response.data.message;
        } else {
          result.data =
            "We encountered an error while retrieving sports data. Please try again.";
        }
        alert(result.data);
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while retrieving sports data. Please try again.";
      }
      alert(result.data);
    });

  return result;
}

export async function addSport(name, description) {
  let token = await authService.getToken();
  const url = baseUrl + "/new";
  const body = {
    name: name,
    description: description,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  };

  let result = {};

  await axios
    .post(url, body, config)
    .then((response) => {
      result.status = response.status;
      if (response.status === 200) {
        result.data = response.data.message;
      } else {
        if (response.data.message !== undefined) {
          result.data = response.data.message;
        } else {
          result.data =
            "We encountered an error while adding this sport. Please try again.";
        }
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while adding this sport. Please try again.";
      }
    });

  alert(result.data);
  return result;
}

export async function editSport(id, name, description) {
  let token = await authService.getToken();
  const url = baseUrl + "/edit";
  const body = {
    name: name,
    description: description,
    _id: id,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  };

  let result = {};

  await axios
    .post(url, body, config)
    .then((response) => {
      result.status = response.status;
      if (response.status === 200) {
        result.data = response.data.message;
      } else {
        if (response.data.message !== undefined) {
          result.data = response.data.message;
        } else {
          result.data =
            "We encountered an error while editing this sport. Please try again.";
        }
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while editing this sport. Please try again.";
      }
    });

  alert(result.data);
  return result;
}
