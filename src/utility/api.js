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
      let response = await fetch(url, config);
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
      let response = await fetch(url, config);
      // give 401 Object only. So we need to call the method again, to get the right res
      let jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(`${error} while fetching data from ${url}`);
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
      let response = await fetch(url, config);
      // give 401 Object only. So we need to call the method again, to get the right res
      let jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(`${error} while fetching data from ${url}`);
    }
  };
}
