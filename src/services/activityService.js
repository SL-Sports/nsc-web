import axios from "axios";

const baseUrl = "https://slsports.anuda.me/activity";
const token =
  "YkOqT2ryn3niQpFf3WjVU1gsUaA0a6ltGg8bepJ9UqIqghbJQ40CE6w5O5iFcYJvv11YV1VdgUWLpYdSnq7IZniXucpuO3AzzbHFPk8YWg4Yc0nGS5agGZ1dovEvUEea";

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

const addComment = async (text, activityId) => {
  const url = baseUrl + "/comment/new";

  const body = {
    activity: activityId,
    text: text,
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

export default {
  getActivities,
  getActivityDetail,
  approveActivity,
  addComment,
};
