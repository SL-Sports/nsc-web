import axios from "axios";
import Cookies from "js-cookie";
const baseUrl = "https://slsports.anuda.me/auth";
const tokenExpiryTime = 10800;

const getToken = async () => {
  let token = await Cookies.get("token");

  if (token === undefined) {
    logout();
  } else {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    let tokenRefreshedAt = await Cookies.get("tokenRefreshedAt");

    if (currentTime - parseInt(tokenRefreshedAt) < tokenExpiryTime) {
      return token;
    } else {
      let refreshRes = await refreshToken();
      if (refreshRes) {
        return getToken();
      } else {
        logout();
      }
    }
  }
};

const getProfileID = async () => {
  return Cookies.get("profileID");
};

const getActiveAssociationID = async () => {
  return Cookies.get("activeAssociation");
};

const getAccountType = async () => {
  return Cookies.get("accountType");
};

const getProfilePic = async () => {
  return Cookies.get("profilePicUrl");
};

const getAssociationName = async () => {
  return Cookies.get("associationName");
};

const logout = async () => {
  await Cookies.remove("token");
  await Cookies.remove("preferredName");
  await Cookies.remove("profileID");
  await Cookies.remove("accountType");
  await Cookies.remove("phone");
  await Cookies.remove("password");
  await Cookies.remove("activeAssociation");
  await Cookies.remove("profilePicUrl");
  await Cookies.remove("associationName");

  window.location.replace("/login");
};

const refreshToken = async () => {
  let phone = await Cookies.get("phone");
  let password = await Cookies.get("password");

  let result = await login(phone, password);
  return result;
};

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
  let result = false;
  await axios
    .post(url, body, config)
    .then((response) => {
      if (response.status === 200) {
        if (
          response.data.accountType === "ATHLETE" ||
          response.data.accountType === "COACH"
        ) {
          alert(
            "This web app is only available for Association and Ministry level Administrators. As a coach or athlete, you should use the SL Sports Mobile App."
          );
        } else {
          Cookies.set("token", response.data.token);
          Cookies.set("preferredName", response.data.profile.preferredName);
          Cookies.set("profileID", response.data.profile._id);
          Cookies.set("accountType", response.data.accountType);
          Cookies.set("phone", phone);
          Cookies.set("password", password);
          Cookies.set("profilePicUrl", response.data.profile.profilePicUrl);

          const currentTime = Math.floor(new Date().getTime() / 1000);

          Cookies.set("tokenRefreshedAt", currentTime.toString());

          if (response.data.accountType === "ASSOCIATION_ADMIN") {
            Cookies.set("activeAssociation", response.data.profile.association);
          }
          result = true;
        }
      }
    })
    .catch((err) => {
      if (err.response.data === undefined) {
        alert("We encountered an error while logging you in");
      } else {
        alert(err.response.data.message);
      }
    });

  return result;
};

const signup = async (phone, password, inviteCode, dateOfBirth) => {
  const url = baseUrl + "/sign-up";

  const validator = new RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
  if (!validator.test(password)) {
    alert(
      "Password validation failed. Password must contain lowercase and uppercase character. Password must be 8-32 characters in length."
    );
    return false;
  }

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
const functions = {
  login,
  signup,
  forgotRequest,
  forgotVerify,
  getToken,
  getProfileID,
  getActiveAssociationID,
  getAccountType,
  logout,
  getProfilePic,
  getAssociationName,
  refreshToken,
};

export default functions;
