import { getHTTP, postHTTP } from "../../../helpers/http";

class AuthService {
  async login(phone, password) {
    const data = {
      phone: `94${phone}`,
      password: password,
    };

    return postHTTP("/auth/login", data, { withCredentials: true });
  }

  async register(phone, password, inviteCode, dateOfBirth) {
    const data = {
      phone: `94${phone}`,
      password,
      inviteCode,
      dateOfBirth,
    };

    return postHTTP("/auth/sign-up", data, { withCredentials: true });
  }

  async profile() {
    return getHTTP("/auth/profile", { withCredentials: true });
  }

  async logout() {
    return getHTTP("/auth/logout", { withCredentials: true });
  }

  async forgotRequest(phone) {
    const data = {
      phone: `94${phone}`,
    };

    return postHTTP("/auth/forgot/request", data, {
      withCredentials: true,
    }).then((res) => res.data.otpId);
  }

  async forgotVerify(phone, otpSessionId, otp, newPassword) {
    const data = {
      otpSessionId,
      OTP: otp,
      newPassword,
    };

    return postHTTP("/auth/forgot/verify", data, { withCredentials: true });
  }
}

export default AuthService;
