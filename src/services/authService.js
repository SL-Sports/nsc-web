import axios from "axios";

const baseUrl = "https://slsports.anuda.me/auth";

const login = async (phone, password) => {
  const url = baseUrl + "/login";
  const body = {
    phone: `94${phone}`,
    password: password,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response = await axios.post(url, body, config).catch((err) => {
    if (err.response.data === undefined) {
      alert("We encountered an error while logging you in");
    } else {
      alert(err.response.data.message);
    }

    return false;
  });

  if (response.status === 200) {
    return true;
    //TODO:Save token and profile info in cookies
  }
};

const signup = async (phone, password, inviteCode, dateOfBirth) => {
  const url = baseUrl + "/sign-up";

  const body = {
    phone: `94${phone}`,
    password: password,
    inviteCode: inviteCode,
    dateOfBirth: dateOfBirth,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response = await axios.post(url, body, config).catch((err) => {
    if (err.response.data === undefined) {
      alert("We encountered an error while signing you up");
    } else {
      alert(err.response.data.message);
    }

    return false;
  });

  if (response.status === 200) {
    return login(phone, password);
  }
};

const forgotRequest = async (phone) => {
  const url = baseUrl + "/forgot/request";

  const body = {
    phone: `94${phone}`,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response = await axios.post(url, body, config).catch((err) => {
    if (err.response.data === undefined) {
      alert("We encountered an error while resetting your password");
    } else {
      alert(err.response.data.message);
    }

    return "ERROR";
  });

  if (response.status === 200) {
    return response.data.otpId;
  }
};

const forgotVerify = async (phone, otpSessionId, otp, newPassword) => {
  const url = baseUrl + "/forgot/verify";

  const body = {
    otpSessionId: otpSessionId,
    OTP: otp,
    newPassword: newPassword,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response = await axios.post(url, body, config).catch((err) => {
    if (err.response.data === undefined) {
      alert("We encountered an error while signing you up");
    } else {
      alert(err.response.data.message);
    }

    return false;
  });

  if (response.status === 200) {
    return login(phone, newPassword);
  }
};

export default { login, signup, forgotRequest, forgotVerify };
