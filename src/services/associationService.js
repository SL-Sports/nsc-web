import axios from "axios";
import authService from "./authService";

const baseUrl = "https://slsports.anuda.me/association";

export async function getAssociations() {
  const url = baseUrl + "/get";
  const body = {
    isDeleted: false,
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
            "We encountered an error while retrieving association data. Please try again.";
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
          "We encountered an error while retrieving association data. Please try again.";
      }
      alert(result.data);
    });

  return result;
}

export async function getAssociationById(id) {
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
            "We encountered an error while retrieving association data. Please try again.";
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
          "We encountered an error while retrieving association data. Please try again.";
      }
      alert(result.data);
    });

  return result;
}

export async function addAssociation(name, description) {
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
            "We encountered an error while adding this association. Please try again.";
        }
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while adding this association. Please try again.";
      }
    });

  alert(result.data);
  return result;
}

export async function editAssociation(id, name, description) {
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
            "We encountered an error while editing this association. Please try again.";
        }
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while editing this association. Please try again.";
      }
    });

  alert(result.data);
  return result;
}

export async function deleteAssociation(associationId) {
  let token = await authService.getToken();
  const url = baseUrl + "/edit";
  const body = {
    _id: associationId,
    isDeleted: true,
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
        result.data = "Successfully deleted this association!";
      } else {
        if (response.data.message !== undefined) {
          result.data = response.data.message;
        } else {
          result.data =
            "We encountered an error while deleting this association. Please try again.";
        }
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while deleting this association. Please try again.";
      }
    });

  alert(result.data);
  return result;
}
