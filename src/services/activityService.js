import axios from "axios";

const baseUrl = "https://slsports.anuda.me/activity";
const token =
  "X8PIYUwTnPm0oFdiqQOnFRZUCKIAAbez4v0KR40X9O4RD56FkJdeD2bl7lcdPRX9hdGVMt3nfgkfUD4DiXc0Ole5Byr2uxbJX5TSyg6oky4horo1z8oJl1TxZiwxP2by";

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

const mediaUpload = async (file, mediaType, activityId) => {
  const formData = new FormData();

  formData.append("media", file);

  const url = baseUrl + "/media/upload";

  const config = {
    headers: {
      Token: token,
    },
  };

  let result = {};

  let response = await axios.post(url, formData, config).catch((err) => {
    result.status = response.status;
    result.data =
      "We encountered an error while uploading your media. Please try again.";

    return result;
  });

  if (result.status === 200) {
    let urlToMedia = response.data.filePath;

    const body = {
      activity: activityId,
      urlToMedia: urlToMedia,
      mediaType: mediaType,
    };

    const saveUrl = baseUrl + "/media/new";

    const saveConfig = {
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
    };

    let saveResponse = await axios
      .post(saveUrl, body, saveConfig)
      .catch((err) => {
        result.status = err.response.status;
        result.data = err.response.data.message;

        return result;
      });
    result.status = saveResponse.status;

    result.data = saveResponse.data.message;

    return result;
  }
};

const addActivityType = async (activityType, association) => {
  const url = baseUrl + "/type/new";

  const body = {
    association: association,
    activityType: activityType,
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

const getActivityTypes = async (association) => {
  const url = baseUrl + "/type/get";

  const body = {
    association: association,
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

export default {
  getActivities,
  getActivityDetail,
  approveActivity,
  addComment,
  mediaUpload,
  addActivityType,
  getActivityTypes,
};
