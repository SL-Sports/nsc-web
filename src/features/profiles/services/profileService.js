import axios from "axios";
import authService from "../../../services/authService";
import { postHTTP } from "../../../helpers/http";
const baseUrl = "https://slsports.anuda.me/profile";

export default class ProfileService {
  /**
   * searchProfiles:
   *  fetches profiles filtered by the input query string
   *  if they are supplied
   *
   * @param {string} query     string which profile should contain
   * @return {Object}          on success, result has the same status
   *                            and data as the API response
   *                           on failure, result has the same status
   *                            as the error, with data containing
   *                            the error message
   *
   */
  // also used activeAssociationID - fix
  static searchProfiles = ({ query = "", profileType, association }) => {
    const data = { query, profileType, association };

    return postHTTP("/profile/search", data);
  };

  /**
   * advancedSearchProfiles:
   *  fetches profiles filtered by the input params
   *  if they are supplied
   *
   * @param {string} firstName first name of a profile
   * @param {string} lastName  last name of a profile
   * @param {string} preferredName preferred name of a profile
   * @return {Object}          on success, result has the same status
   *                            and data as the API response
   *                           on failure, result has the same status
   *                            as the error, with data containing
   *                            the error message
   *
   */
  static advancedSearchProfiles = ({
    firstName = "",
    lastName = "",
    preferredName = "",
    sportID = "",
    profileType = "",
  }) => {
    let data = {};

    // add keys to data if they have been specified
    if (firstName !== "") data.firstName = firstName;
    if (lastName !== "") data.lastName = lastName;
    if (preferredName !== "") data.preferredName = preferredName;
    if (sportID !== "") data.sport = sportID;
    if (profileType !== "") data.profileType = profileType;

    return postHTTP("/profile/advanced-search", data);
  };

  /**
   * getProfile:
   *  fetches a profile with the id input
   *
   * @param {string} id     profileID
   * @return {Object}          on success, result has the same status
   *                            and data as the API response
   *                           on failure, result has the same status
   *                            as the error, with data containing
   *                            the error message
   *
   */
  static getProfile = (id) => {
    const data = { _id: id };

    return postHTTP("/profile/get", data);
  };

  /**
   * createProfile:
   *  creates a profile with details supplied
   *
   * @param {Object} profile     profile object contaiing profile data
   * @return {Object}          on success, result has the same status
   *                            and data as the API response
   *                           on failure, result has the same status
   *                            as the error, with data containing
   *                            the error message
   *
   */
  // also used activeAssociationID - fix
  static createProfile = ({ profile, association }) => {
    const data = { ...profile, association };

    return postHTTP("/profile/new", data, { withCredentials: true });
  };

  /**
   * editProfile:
   *  edits a profile with id profile.id with details supplied
   *
   * @param {Object} profile     profile object contaiing profile data
   * @return {Object}          on success, result has the same status
   *                            and data as the API response
   *                           on failure, result has the same status
   *                            as the error, with data containing
   *                            the error message
   *
   */
  static editProfile = (profile) => {
    const data = profile;
    return postHTTP("/profile/edit", data, { withCredentials: true });
  };

  // used activeAssociationID - fix
  static getActiveProfiles = (association) => {
    const data = { association };
    return postHTTP("/profile/get", data);
  };

  static sendInvite = (phone, accountType, profileID) => {
    // should have createdBy field - fix
    const data = {
      phone: `94${phone}`,
      accountType: accountType,
      profileId: profileID,
    };

    return postHTTP("/auth/invite", data, { withCredentials: true });
  };

  static addCoach = (
    coachDescription,
    startDate,
    coachProfile,
    athleteProfile
  ) => {
    const data = {
      coachDescription,
      startDate,
      coachProfile,
      athleteProfile,
      activeStatus: "ACTIVE",
    };

    return postHTTP("/profile/coach/add", data, { withCredentials: true });
  };

  static editCoach = (
    coachDescription,
    startDate,
    coachProfile,
    athleteProfile,
    activeStatus,
    endDate,
    coachID
  ) => {
    const data = {
      coachDescription: coachDescription,
      startDate: startDate,
      coachProfile: coachProfile,
      athleteProfile: athleteProfile,
      activeStatus: activeStatus,
      endDate: endDate,
      _id: coachID,
    };
    return postHTTP("/profile/coach/edit", data, { withCredentials: true });
  };

  static getCoachById = (id) => {
    const data = { _id: id };

    return postHTTP("/profile/coach/get", data, { withCredentials: true });
  };
}
