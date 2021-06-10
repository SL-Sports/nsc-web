import axios from "axios";

const baseUrl = "https://slsports.anuda.me/payment";

const token = "q4DRq9lPhYGwgnlTJYm9B4yLG7udKpNHNmW2jocy5m2cWqz546A3yookPfv9hlwu0Gcw9ge1KH1T3Agjrjo3Esb3B6RY57zHxJptoidoGJkWZhOm1IIYvyYqSnA6WIdh";

const getPayments = async (associationID) => {
    const url = baseUrl + "/get";

    const body = {
        association: associationID,
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
    console.log(result);
    return result;
};

const getPaymentDetail = async (paymentID) => {
    const url = baseUrl + "/get";

    const body = {
        _id: paymentID,
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

    if (response.status === 200) {
        result.data = response.data;
    } else {
        result.data = response.data.message;
    }
    return result;
};

const sendNewPayment = async (paymentInfo) => {
    const url = baseUrl + "/new";
    console.log(paymentInfo);
    const body = {
        month: paymentInfo.month,
        year: paymentInfo.year,
        profile: paymentInfo.profileID,
        amount: paymentInfo.amount,
        paymentType: paymentInfo.paymentType
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

export default { getPayments, getPaymentDetail, sendNewPayment };