import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class PrintApi {
    static token;

    static async request(endpoint, data = {}, method="get") {
        console.debug("Api Call To: ", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${PrintApi.token}`}; 

        const params = (method === "get")
        ? data
        : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
          } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
          }
    };

    // Individual API routes

    /** Get the current user. */

    static async getCurrentUser(userId) {
      let res = await this.request(`auth/users/${userId}`);
      return res.user;
    };

    /** Get token for login from username, password. */

    static async login(data) {
      let res = await this.request(`auth/login`, data, "post");
      return res.token;
    };

    /** Signup for site. */

    static async register(data) {
      let res = await this.request(`auth/register`, data, "post");
      return res.token;
    };

    static async getWriters(queryParams) {
      let res = await this.request(`writers`, queryParams);
      return res.writers;
    }
};

export default PrintApi;