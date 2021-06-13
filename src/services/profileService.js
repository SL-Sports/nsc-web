import axios from "axios";

const baseUrl = "https://slsports.anuda.me/profile";
const token =
  "omHdMoX8HVao6Ui6aTfLhg8m6CNY6eNqazJFcWOl63fiJwbPg8PFYVa836xuL9uzgjhpmEuQjSDYUZFIsKg9ZN6oARoFJu5Vxl59rfOVmS19jBUqYvWVnmv4NwGaf2GX";

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
export async function searchProfiles(query = "", profileType = "") {
  const url = baseUrl + "/search";

  let body = {};

  // add keys to body if they have been specified
  body.query = query;
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
  preferredName = ""
) {
  const url = baseUrl + "/advanced-search";

  let body = {};

  // add keys to body if they have been specified
  if (firstName !== "") body.firstName = firstName;
  if (lastName !== "") body.lastName = lastName;
  if (preferredName !== "") body.preferredName = preferredName;

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
