import axios from "axios";
import authService from "./authService";

const baseUrl = "https://slsports.anuda.me/payment";

const getPayments = async (associationID) => {
  let token = await authService.getToken();

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
  return result;
};

const getPaymentDetail = async (paymentID) => {
  let token = await authService.getToken();

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
  let token = await authService.getToken();

  const url = baseUrl + "/new";
  const body = {
    month: paymentInfo.month,
    year: paymentInfo.year,
    profile: paymentInfo.profileID,
    amount: paymentInfo.amount,
    paymentType: paymentInfo.paymentType,
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

const editPayment = async (paymentInfo) => {
  let token = await authService.getToken();

  const url = baseUrl + "/edit";
  const body = {
    id: paymentInfo.paymentID,
    month: paymentInfo.month,
    year: paymentInfo.year,
    profile: paymentInfo.profile,
    amount: paymentInfo.amount,
    paymentType: paymentInfo.paymentType,
    isDeleted: paymentInfo.isDeleted,
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

const approvePayment = async (approvalInfo) => {
  let token = await authService.getToken();

  const url = baseUrl + "/approve";
  const body = {
    payment: approvalInfo.paymentID,
    approvedBy: approvalInfo.approvedBy,
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

const editComment = async (commentInfo) => {
  let token = await authService.getToken();

  const url = baseUrl + "/comment/edit";

  const body = commentInfo;

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

const newComment = async (commentInfo) => {
  let token = await authService.getToken();

  const url = baseUrl + "/comment/new";

  const body = commentInfo;

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

const editCheque = async (chequeInfo) => {
  let token = await authService.getToken();

  const url = baseUrl + "/cheque/edit";

  const body = chequeInfo;

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

const collectCheque = async (chequeInfo) => {
  let token = await authService.getToken();

  const url = baseUrl + "/cheque/collect";

  const body = chequeInfo;

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

const newCheque = async (chequeInfo) => {
  let token = await authService.getToken();

  const url = baseUrl + "/cheque/new";

  const body = chequeInfo;

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

const functions = {
  getPayments,
  getPaymentDetail,
  sendNewPayment,
  editPayment,
  approvePayment,
  editComment,
  newComment,
  editCheque,
  collectCheque,
  newCheque,
};

export default functions;
