import axios from 'axios';

const baseUrl = 'https://slsports.anuda.me/activity';
const token = 'xRsaKTS1LzThR9K6zAFCeTWVuJyrpYya301EMxmcrG9mlBJL8ZhBxzoyZQFMLGQeIrSHoxNDSRrrUhF5gmmBTGkLx6Wjl3tTEo1n4YY5cyBiWka2vpbSHrn3j7PIOAYq';

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

const getActivityDetail = async (activityId) => {
    const url = baseUrl + '/get';

    const body = {
        _id: activityId
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

export default {getActivities, getActivityDetail};