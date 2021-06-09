import axios from "axios";

const baseUrl = "https://slsports.anuda.me/payment";

const token = "8cJeOM8vZUkSPKhn978Lh3LhY86TJSwDzUYVHxD6rrDdSBQazf4MrZSxV94pDxgwXWc5ZKkOuHrqGPt4ma0imc5K4VE7dT8VKdmOA5vZ8mI24J6mG8I3aTnE0mVcpyxE";

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

const newPayment = async (paymentInfo) => {
    const url = baseUrl + "/new";

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

export default { getPayments, getPaymentDetail, newPayment };