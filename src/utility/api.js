import {CONFIG} from './config';
import axios from 'axios';

export default class API {
  static instance = API.instance || new API();

  // METHOD TO GET THE RESPONSE
  get = async url => {
    try {
      let config = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      let response = await fetch(CONFIG.baseUrl + url, config);
      // give 401 Object only. So we need to call the method again, to get the right res
      let jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(`${error} while fetching data from ${url}`);
    }
  };

  // METHOD TO POST THE DATA
  // data should always come with JSON.Stringify()
  post = async (url, data) => {
    try {
      let config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      };
      let response = await fetch(CONFIG.baseUrl + url, config);
      // give 401 Object only. So we need to call the method again, to get the right res
      let jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(`${error} while fetching data from ${url}`);
    }
  };

  upload = async (url, data) => {
    try {
      const response = await axios({
        method: 'post',
        url: CONFIG.baseUrl + url,
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      // console.log(`${error} while fetching data from ${url}`);
      return this.upload(url, data);
    }
  };

  // METHOD TO UPDATE THE DATA
  // data should always come in JSON.stringify() format from the dev side
  put = async (url, data) => {
    try {
      let config = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      };
      let response = await fetch(CONFIG.baseUrl + url, config);
      // give 401 Object only. So we need to call the method again, to get the right res
      let jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(`${error} while fetching data from ${url}`);
    }
  };
}
