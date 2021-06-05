import axios from "axios";

const baseUrl = "https://slsports.anuda.me/activity";
const token =
  "BRIffYuSBZ6xEG1jnDqMMKV1rfbGz74rGbBAp6HCaP5RSPQbtLESShcHqBdA8qLGLi35dCGEietsGlO9FgeqKb8gNFlxsz3zEV7d5em3c0iIbK4YrQPP971xtx3Y3iWk";

const getActivities = async (profileId) => {
  const url = baseUrl + "/get";

  const body = {
    profile: profileId,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  };

  let result = {};

  let response = await axios.post(url, body, config).catch((err) => {
    result.status = err.response.status;
    result.data = err.response.data.message;
    alert(result.data);
    return result;
  });
  result.status = response.status;

  if (response.status === 200) {
    result.data = response.data;
  } else {
    result.data = response.data.message;
  }

  return result;
};

const getActivityDetail = async (activityId) => {
  const url = baseUrl + "/get";

  const body = {
    _id: activityId,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  };

  let result = {};

  let response = await axios.post(url, body, config).catch((err) => {
    result.status = err.response.status;
    result.data = err.response.data.message;

    return result;
  });
  result.status = response.status;

  if (response.status === 200) {
    result.data = response.data;
  } else {
    result.data = response.data.message;
  }

  return result;
};

export default { getActivities, getActivityDetail };
