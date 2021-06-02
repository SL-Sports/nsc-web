import axios from 'axios';

const baseUrl = 'https://slsports.anuda.me/activity';
const token = 'omHdMoX8HVao6Ui6aTfLhg8m6CNY6eNqazJFcWOl63fiJwbPg8PFYVa836xuL9uzgjhpmEuQjSDYUZFIsKg9ZN6oARoFJu5Vxl59rfOVmS19jBUqYvWVnmv4NwGaf2GX';

const getActivities = async (profileId) => {
    const url = baseUrl + '/get';

    const body = {
        profile: profileId
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Token': token
        }
    };

    let result = {};

    let response = await axios.post(url, body, config)
        .catch(err => {
            result.status = err.response.status;
            result.data = err.response.data.message;

            return result;
        });
    result.status = response.status;


    if(response.status === 200){
        result.data = response.data;
    }else{
        result.data = response.data.message;
    }

    return result;
};

export default {getActivities};