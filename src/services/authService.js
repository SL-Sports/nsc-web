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
  const url = baseUrl + "/auth/signup";

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
    if (response.data === undefined) {
      alert("We encountered an error while signing you up");
    } else {
      alert(response.data.message);
    }

    return false;
  });

  if (response.status === 200) {
    return login(phone, password);
  } else {
    alert(response.data.message);
    return false;
  }
};

export default { login, signup };
