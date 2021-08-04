import axios from "axios";

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => response,
  function (error) {
    if (error.response && error.response.status === 401) {
      // Show unauthorized message and logout
    } else if (error.response && error.response.status === 403) {
      // Show unauthorized message
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/**
 * Get call to API
 * @param {String} url API base URL
 * @param {String} endpoint API end point
 * @param {Object} options HTTP Request options
 */
export const getHTTP = (endpoint, options = {}) => {
  return axiosApi.get(endpoint, options);
};

/**
 * Post call to API
 * @param {String} url API base URL
 * @param {String} endpoint API end point
 * @param {String} data Post Request body
 * @param {Object} options HTTP Request options
 */
export const postHTTP = (endpoint, data = {}, options = {}) => {
  return axiosApi.post(endpoint, data, options);
};

/**
 * Put call to API
 * @param {String} url API base URL
 * @param {String} endpoint API end point
 * @param {String} data Put Request body
 * @param {Object} options HTTP Request options
 */
export const putHTTP = (endpoint, data = {}, options = {}) => {
  return axiosApi.put(endpoint, data, options);
};

/**
 * Delete call to API
 * @param {String} url API base URL
 * @param {String} endpoint API end point
 * @param {Object} options HTTP Request options
 */
export const deleteHTTP = (endpoint, options = {}) => {
  return axiosApi.delete(endpoint, options);
};

/**
 * Patch call to API
 * @param {String} url API base URL
 * @param {String} endpoint API end point
 * @param {Object} options HTTP Request options
 */
export const patchHTTP = (endpoint, data = {}, options = {}) => {
  return axiosApi.patch(endpoint, data, options);
};
