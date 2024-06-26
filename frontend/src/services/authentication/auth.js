import * as _ from "lodash";
import Storage from "store";
import Request from "../api/request";
import TokenManager from "./token-manager";
import axios from "axios";

class Auth {
  constructor() {}

  /**
   * Singleton constructor
   * @return {Auth} this
   */

  static d() {
    return this.instance ? this.instance : (this.instance = new Auth());
  }

  /**
   * Set token to axios global header
   */
  setToken() {
    axios.defaults.headers.common["Authorization"] = TokenManager().accessToken;
  }

  /**
   * get parameter from URL
   */

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /**
   * Whether a user has logged in
   * @return {Boolean}
   */

  check() {
    if (!this.getParameterByName("timestamp") ||
      !this.getParameterByName("accessToken") ||
      !this.getParameterByName("sign")
    ) {
      if (!TokenManager().accessToken) return false;
    }
    let md5 = require("blueimp-md5");
    let hash = md5(
      this.getParameterByName("timestamp") +
      this.getParameterByName("accessToken") +
      "zhsnqualitysupervision"
    );
    const accessToken = this.getParameterByName("accessToken") ? this.getParameterByName("accessToken").replace(
      "%20",
      " "
    ) : TokenManager().accessToken;

    return Request()
      .post("/api/user/getAuthByAliToken", {
        aliToken: accessToken
      })
      .then(
        success => {
          Storage.set(
            "authData",
            JSON.parse(success.authListInfo).result[0].roleCode
          );
          Storage.set(
            "authList",
            JSON.parse(success.authListInfo).result[0].privilegeList
          );
          window.history.replaceState({}, document.title, "/");
          Storage.set("userData", JSON.parse(success.userInfo).result);
          if (accessToken) TokenManager().accessToken = accessToken;
          return Promise.resolve(success);
        },
        error => {
          this.clearSavedData();
          console.log(error);
          window.history.replaceState({}, document.title, "/");
          if (accessToken) TokenManager().accessToken = "";
          return Promise.reject(error);
        }
      );
  }

  /**
   * Retrieve details of loggedin user
   * @return {Object} user data
   */
  user() {
    if (Storage.get("userData")) {
      return Storage.get("userData");
    }

    return null;
  }

  /**
   * Create and login user with response data
   * @param  {Object} data Response data
   * @return {Void}
   */
  createUserFrom(data) {
    // save or remove user's info
    const rememberStatus = Storage.get("isRemember");
    if (rememberStatus) {
      Storage.set("userName", data["userId"]);
    } else {
      if (data["userID"] == Storage.get("userName")) {
        Storage.remove("userName");
        Storage.remove("password");
      }
    }
    // save user's tokens
    TokenManager().accessToken = data["token"];
    // // bind token to api request
    this.setToken();

    // // instantiate current user
    Storage.set("userData", JSON.stringify(this.loggedInUser));
  }

  /**
   * if error clear password and isremember from storage
   * @return {Void}
   */

  clearSavedData() {
    Storage.remove("password");
  }

  /**
   * Sign up a new user using data provider
   * @param  {Object} data Packaged data for creating new user
   * @return {Promise}      Response
   */
  signup(data) {
    return Request()
      .post("auth/signup", data, {}, true)
      .then(
        success => {
          this.createUserFrom(_.merge(success["data"], data));
          return Promise.resolve(success);
        },

        error => {
          return Promise.reject(error);
        }
      );
  }

  /**
   * Verify a new host using data provider
   * @param  {Object} data Packaged data for creating new user
   * @return {Promise}      Response
   */
  verifyHost(data) {
    return Request()
      .post("auth/verify-host", data, {}, true)
      .then(
        success => {
          this.createUserFrom(_.merge(success["data"], data));
          return Promise.resolve(success);
        },

        error => {
          return Promise.reject(error);
        }
      );
  }

  /**
   * Login with email and password
   * @param  {String} email
   * @param  {String} password
   * @return {Promise}          API response
   */
  login(formData) {
    Storage.set("isRemember", formData.isRemember);
    Storage.set("password", formData.password);
    return Request()
      .post(
        "/api/user/login", {
          password: formData.password,
          username: formData.username
        }, {},
        true
      )
      .then(
        success => {
          this.createUserFrom(success);
          return Promise.resolve(success);
        },
        error => {
          this.clearSavedData();
          return Promise.reject(error);
        }
      );
  }

  /**
   * Reset a user's password from email
   * @param  {String} email Email of user
   * @return {Promise}       API Response
   */
  resetPassword(email) {
    return Request()
      .post("auth/reset_password", { username: email })
      .then(
        success => {
          return Promise.resolve(success);
        },
        error => {
          return Promise.reject(error);
        }
      );
  }

  /**
   * Logout the current user
   * @return {void}
   */
  logout() {
    if (this.check()) {
      // remove logged in user
      this.loggedInUser = null;

      // remove user tokens
      TokenManager().removeAccessToken();
      TokenManager().removeAuthToken();
    }
  }

}

export default () => {
  return Auth.d();
};