import axios from "axios";
import authService from "./authService";
const baseUrl = "https://api.slsports.lk/profile";

/**
 * searchProfiles:
 *  fetches profiles filtered by the input query string
 *  if they are supplied
 *
 * @param {string} query     string which profile should contain
 * @return {Object}          on success, result has the same status
 *                            and data as the API response
 *                           on failure, result has the same status
 *                            as the error, with data containing
 *                            the error message
 *
 */
export async function searchProfiles(query = "") {
  let token = await authService.getToken();
  const url = baseUrl + "/search";

  let body = {};

  // add keys to body if they have been specified
  body.query = query;
  body.association = await authService.getActiveAssociationID();

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
        result.data = response.data;
      } else {
        result.data = response.data.message;
      }

      // return result;
    })
    .catch((err) => {
      result.status = err.response.status;
      result.data = err.response.data.message;

      // return result;
    });

  return result;
}

/**
 * advancedSearchProfiles:
 *  fetches profiles filtered by the input params
 *  if they are supplied
 *
 * @param {string} firstName first name of a profile
 * @param {string} lastName  last name of a profile
 * @param {string} preferredName preferred name of a profile
 * @return {Object}          on success, result has the same status
 *                            and data as the API response
 *                           on failure, result has the same status
 *                            as the error, with data containing
 *                            the error message
 *
 */
export async function advancedSearchProfiles(
  firstName = "",
  lastName = "",
  preferredName = "",
  sportID = "",
  profileType = ""
) {
  let token = await authService.getToken();
  const url = baseUrl + "/advanced-search";

  let body = {};

  // add keys to body if they have been specified
  if (firstName !== "") body.firstName = firstName;
  if (lastName !== "") body.lastName = lastName;
  if (preferredName !== "") body.preferredName = preferredName;
  if (sportID !== "") body.sport = sportID;
  if (profileType !== "") body.profileType = profileType;

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
        result.data = response.data;
      } else {
        result.data = response.data.message;
      }

      // return result;
    })
    .catch((err) => {
      result.status = err.response.status;
      result.data = err.response.data.message;

      // return result;
    });

  return result;
}

/**
 * getProfile:
 *  fetches a profile with the id input
 *
 * @param {string} id     profileID
 * @return {Object}          on success, result has the same status
 *                            and data as the API response
 *                           on failure, result has the same status
 *                            as the error, with data containing
 *                            the error message
 *
 */
export async function getProfile(id) {
  let token = await authService.getToken();
  const url = baseUrl + "/get";

  let body = {};

  // add keys to body if they have been specified
  body._id = id;

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
        result.data = response.data;
      } else {
        result.data = response.data.message;
      }

      // return result;
    })
    .catch((err) => {
      result.status = err.response.status;
      result.data = err.response.data.message;

      // return result;
    });

  return result;
}

/**
 * createProfile:
 *  creates a profile with details supplied
 *
 * @param {Object} profile     profile object contaiing profile data
 * @return {Object}          on success, result has the same status
 *                            and data as the API response
 *                           on failure, result has the same status
 *                            as the error, with data containing
 *                            the error message
 *
 */
export async function createProfile(profile) {
  let token = await authService.getToken();
  let association = await authService.getActiveAssociationID();
  const url = baseUrl + "/new";

  let body = profile;
  body.association = association;
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
        result.data = response.data;
      } else {
        result.data = response.data.message;
      }

      // return result;
    })
    .catch((err) => {
      result.status = err.response.status;
      result.data = err.response.data.message;

      // return result;
    });

  return result;
}

/**
 * editProfile:
 *  edits a profile with id profile.id with details supplied
 *
 * @param {Object} profile     profile object contaiing profile data
 * @return {Object}          on success, result has the same status
 *                            and data as the API response
 *                           on failure, result has the same status
 *                            as the error, with data containing
 *                            the error message
 *
 */
export async function editProfile(profile) {
  let token = await authService.getToken();
  const url = baseUrl + "/edit";

  let body = profile;

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
        result.data = response.data;
      } else {
        result.data = response.data.message;
      }

      // return result;
    })
    .catch((err) => {
      result.status = err.response.status;
      result.data = err.response.data.message;

      // return result;
    });

  return result;
}

export async function upload(file) {
  let token = await authService.getToken();
  const formData = new FormData();

  formData.append("media", file);

  const url = "https://api.slsports.lk/activity/media/upload";

  const config = {
    headers: {
      Token: token,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  };

  let result = {};

  await axios
    .post(url, formData, config)
    .then((response) => {
      result.status = response.status;
      result.data = response.data.filePath;
    })
    .catch((err) => {
      console.log(err);
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while uploading your media. Please try again.";
      }
    });
  return result;
}

export async function getActiveProfiles() {
  let association = await authService.getActiveAssociationID();
  const url = baseUrl + "/get";

  let body = {};

  // add keys to body if they have been specified
  body.association = association;

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
        result.data = response.data.message;
      }

      // return result;
    })
    .catch((err) => {
      result.status = err.response.status;
      result.data = err.response.data.message;

      // return result;
    });

  return result;
}

export async function sendInvite(phone, accountType, profileID) {
  let token = await authService.getToken();
  let createdBy = await authService.getProfileID();
  const url = "https://api.slsports.lk/auth/invite";
  const body = {
    phone: `94${phone}`,
    accountType: accountType,
    createdBy: createdBy,
    profileId: profileID,
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
            "We encountered an error while sending this invite. Please try again.";
        }
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while sending this invite. Please try again.";
      }
    });

  alert(result.data);
  return result;
}

export async function addCoach(
  coachDescription,
  startDate,
  coachProfile,
  athleteProfile
) {
  let token = await authService.getToken();
  const url = baseUrl + "/coach/add";
  const body = {
    coachDescription: coachDescription,
    startDate: startDate,
    coachProfile: coachProfile,
    athleteProfile: athleteProfile,
    activeStatus: "ACTIVE",
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
            "We encountered an error while assigning this coach. Please try again.";
        }
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while assigning this coach. Please try again.";
      }
    });

  alert(result.data);
  return result;
}

export async function editCoach(
  coachDescription,
  startDate,
  coachProfile,
  athleteProfile,
  activeStatus,
  endDate,
  coachID
) {
  let token = await authService.getToken();
  const url = baseUrl + "/coach/edit";
  const body = {
    coachDescription: coachDescription,
    startDate: startDate,
    coachProfile: coachProfile,
    athleteProfile: athleteProfile,
    activeStatus: activeStatus,
    endDate: endDate,
    _id: coachID,
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
            "We encountered an error while editing this coach assignment. Please try again.";
        }
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while editing this coach assignment. Please try again.";
      }
    });

  alert(result.data);
  return result;
}

export async function getCoachById(id) {
  const url = baseUrl + "/coach/get";
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
            "We encountered an error while retrieving coach data. Please try again.";
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
          "We encountered an error while retrieving coach data. Please try again.";
      }
      alert(result.data);
    });

  return result;
}
