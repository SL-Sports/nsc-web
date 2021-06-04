import axios from 'axios';

const baseUrl = 'https://slsports.anuda.me/activity';
const token = '29kEKPmzISvPHSNPpS4GxfOjDqwhh5HyctmMEIR4yHW9EZZwpKq04F8cVCKZXAMfx7pbaxdpRH35XuY7gccKy98HaL4m88EMuQJQ4FKeB7PwhZTtmzIw17kPwJR9Nbv0';

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
            alert(result.data);
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