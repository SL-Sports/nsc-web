import axios from 'axios';

const baseUrl = 'https://slsports.anuda.me/profile';
const token = 'omHdMoX8HVao6Ui6aTfLhg8m6CNY6eNqazJFcWOl63fiJwbPg8PFYVa836xuL9uzgjhpmEuQjSDYUZFIsKg9ZN6oARoFJu5Vxl59rfOVmS19jBUqYvWVnmv4NwGaf2GX';

/**
 * getProfiles:
 *  fetches profiles filtered by the input params
 *  if they are supplied
 * 
 * @param {string} firstName first name of a profile
 * @param {string} lastName  last name of a profile
 * @return {Object}          on success, result has the same status
 *                            and data as the API response
 *                           on failure, result has the same status
 *                            as the error, with data containing 
 *                            the error message
 * 
 */
export async function getProfiles (firstName, lastName, preferredName) {
    const url = baseUrl + '/get';

    let body = {};

    // add keys to body if they have been specified
    if (firstName !== undefined) body.firstName = firstName;
    if (lastName !== undefined) body.lastName = lastName;
    if (preferredName !== undefined) body.preferredName = preferredName;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Token': token
        }
    };

    let result = {};

    await axios.post(url, body, config)
        .then(response => {
            result.status = response.status;

            if (response.status === 200) {
                result.data = response.data;
            } else {
                result.data = response.data.message;
            }

            console.log(result);

            // return result;
        })
        .catch(err => {
            result.status = err.response.status;
            result.data = err.response.data.message;

            // return result;
        });

    return result;
};