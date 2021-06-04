import axios from 'axios';

const baseUrl = 'https://slsports.anuda.me/activity';
const token = 'wIdKuVMY82d1OXg1vMQ7Yao6MqAnbJCAjyCoQ00wusYbAWCcQjz2sXYewO8Hpq41orbiZ0R2UVGRAVdVrayml9Uuroc5NMAGfZDf3BcZXhJoliXfqGT17XXkDTra3MU4';

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