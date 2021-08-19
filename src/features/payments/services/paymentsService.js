import { postHTTP } from "../../../helpers/http";

const baseUrl = "https://slsports.anuda.me/payment";

export default class PaymentService {
  static getPayments = (associationID) => {
    const data = {
      association: associationID,
      isDeleted: false,
    };

    return postHTTP("/payment/get", data, { withCredentials: true });
  };

  static getUnapprovedPayments = (associationID) => {
    const data = {
      association: associationID,
      isDeleted: false,
      approvedByAssociation: false,
    };

    return postHTTP("/payment/get", data, { withCredentials: true });
  };

  static getPaymentDetail = (paymentID) => {
    let data = {
      _id: paymentID,
    };

    return postHTTP("/payment/get", data, { withCredentials: true });
  };

  static sendNewPayment = ({ month, year, profileID, amount, paymentType }) => {
    const data = {
      month,
      year,
      profile: profileID,
      amount,
      paymentType,
    };

    return postHTTP("/payment/new", data, { withCredentials: true });
  };

  static editPayment = ({
    paymentID,
    month,
    year,
    profileID,
    amount,
    paymentType,
    isDeleted,
  }) => {
    const data = {
      id: paymentID,
      month,
      year,
      profile: profileID,
      amount,
      paymentType,
      isDeleted,
    };

    return postHTTP("/payment/edit", data, { withCredentials: true });
  };

  static deletePayment = (paymentID) => {
    const data = {
      id: paymentID,
      isDeleted: true,
    };

    return postHTTP("/payment/edit", data, { withCredentials: true });
  };

  static approvePayment = ({ paymentID, approvedBy }) => {
    const data = {
      payment: paymentID,
      approvedBy,
    };

    return postHTTP("/payment/approve", data, { withCredentials: true });
  };

  static newComment = ({ text, payment }) => {
    const data = { text, payment };
    return postHTTP("/payment/comment/new", data, { withCredentials: true });
  };

  static editComment = ({ id, text, isDeleted }) => {
    const data = { id, text, isDeleted };
    return postHTTP("/payment/comment/edit", data, { withCredentials: true });
  };

  static newCheque = ({ payment, createdBy, chequeNumber }) => {
    const data = { payment, createdBy, chequeNumber };

    return postHTTP("/payment/cheque/new", data, { withCredentials: true });
  };

  static editCheque = ({ id, chequeNumber, isDeleted }) => {
    const data = { id, chequeNumber, isDeleted };

    return postHTTP("/payment/cheque/edit", data, { withCredentials: true });
  };

  static collectCheque = ({ chequeId }) => {
    const data = { chequeId };

    return postHTTP("/payment/cheque/collect", data, { withCredentials: true });
  };

  // potentially buggy - check prior implementation for what to send in body
  // supposed to use getActiveAssociation
  static getPaymentsForProfile = ({ profileID, associationID }) => {
    const data = {
      profile: profileID,
      association: associationID,
      isDeleted: false,
    };

    return postHTTP("/payment/get", data, { withCredentials: true });
  };
}
