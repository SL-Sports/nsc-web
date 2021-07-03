import axios from "axios";
import authService from "./authService";

const baseUrl = "https://nsc-app.herokuapp.com/activity";

const getActivities = async (profileId) => {
  let token = await authService.getToken();
  let accountType = await authService.getAccountType();
  const url = baseUrl + "/get";

  const body = {
    profile: profileId,
  };

  if (accountType === "ASSOCIATION_ADMIN") {
    body.association = await authService.getActiveAssociationID();
  }

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
  let token = await authService.getToken();
  let accountType = await authService.getAccountType();
  const url = baseUrl + "/get";
  const body = {
    _id: activityId,
  };

  if (accountType === "ASSOCIATION_ADMIN") {
    body.association = await authService.getActiveAssociationID();
  }

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
  let token = await authService.getToken();
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
  let token = await authService.getToken();
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
  let token = await authService.getToken();
  const formData = new FormData();

  formData.append("media", file);

  const url = baseUrl + "/media/upload";

  const config = {
    headers: {
      Token: token,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  };

  let result = {};

  let response = await axios.post(url, formData, config).catch((err) => {
    console.log(err);
    result.status = response.status;
    result.data =
      "We encountered an error while uploading your media. Please try again.";

    return result;
  });

  if (response.status === 200) {
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
  let token = await authService.getToken();
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
  let token = await authService.getToken();
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

const functions = {
  getActivities,
  getActivityDetail,
  approveActivity,
  addComment,
  mediaUpload,
  addActivityType,
  getActivityTypes,
};

export default functions;
