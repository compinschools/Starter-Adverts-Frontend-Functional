import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
  constructor(token,logoutHandler){
    this.token = token;
    this.logoutHandler = logoutHandler;
  }

  apiCall(method, url, data) {
    return axios({
      method,
      url,
      data,
    }).catch((error) => {
      throw error;
    });
  }

  authenticatedCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        authorization: this.token
      },
      data,
    }).catch((error) => {
      /* if(error.response.status === 403){
        //this.logoutHandler();
        return Promise.reject()
      } else {
      throw error;
      } */
    });
  }

  async login(userName,password) {
    return await this.apiCall("post",`${url}auth`,{ userName: userName, password: password} );

  }

  getAds() {
    return this.authenticatedCall("get", url);
  }

  addAd(name, price) {
    return this.authenticatedCall("post", url, { name, price });
  }

  removeAd(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateAd(id, name, price) {
    return this.authenticatedCall("put", `${url}${id}`, { name, price });
  }
}
