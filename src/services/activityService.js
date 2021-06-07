import axios from "axios";

const baseUrl = "https://slsports.anuda.me/activity";
const token =
  "VzLEcf6QcmkiIKVVUz0uyraoPW7hhwSfOJpuRjMjCBbt8thzGnAt8PRv5w4RKjQIcG3KufRbN057HdFHyr7o9ejtJsqNuBXSe28TxrE3hL1JP73DM18EB7oa51irnsh7";

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

const approveActivity = async (activityId, approvedBy) => {
  const url = baseUrl + "/approve";

  const body = {
    activityId: activityId,
    approvedBy: approvedBy,
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

  result.data = response.data.message;

  return result;
};

export default { getActivities, getActivityDetail, approveActivity };
