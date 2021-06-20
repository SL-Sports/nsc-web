import axios from "axios";
import authService from "./authService";
const baseUrl = "https://slsports.anuda.me/profile";

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
