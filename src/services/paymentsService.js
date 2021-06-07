import axios from "axios";

const baseUrl = "https://slsports.anuda.me/payment";

const token = "QQejf9iMKoq0uM7GM00yXmaJvteXkGVXadjGVXx0Ayj1wQv3IXOzzEY55qIAkW9jZJ5CF5zCSuM0FXwiPP5edfzRImsJHuVe0MKgmLccTubiL01IkTPsvQIdlxndDKg8";

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

export default { getPayments, getPaymentDetail };