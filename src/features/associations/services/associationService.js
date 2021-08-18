import { postHTTP } from "../../../helpers/http";

export default class AssocationService {
  static getAssociations = () => {
    const data = { isDeleted: false };

    return postHTTP("/association/get", data);
  };

  static getAssociationById = (id) => {
    const data = { _id: id };

    return postHTTP("/association/get", data);
  };

  static addAssociation = (associationName, description) => {
    const data = { name: associationName, description };

    return postHTTP("/association/new", data, { withCredentials: true });
  };

  static editAssociation = (associationId, associationName, description) => {
    const data = { _id: associationId, name: associationName, description };

    return postHTTP("/association/edit", data, { withCredentials: true });
  };

  static deleteAssociation(associationId) {
    const data = {
      _id: associationId,
      isDeleted: true,
    };

    return postHTTP("/association/edit", data, { withCredentials: true });
  }
}
