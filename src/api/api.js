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

    ////WRITER METHODS
    static async getWriters(queryParams) {
      let res = await this.request(`writers`, queryParams);
      return res.writers;
    };

    static async getWriterById(writerId) {
      let res = await this.request(`writers/${writerId}`);
      return res.writer;
    };

    ////PORTFOLIO METHODS
    static async getPortfolioById(portfolioId) {
      let res = await this.request(`portfolios/${portfolioId}`);
      return res.portfolio;
    };

    static async updatePortfolio(portfolioId, writerId, updates) {
      let res = await this.request(`writers/${writerId}/portfolios/${portfolioId}`, updates, "patch");
      return res.updatedPortfolio;
    };

    static async deletePortfolio(writerId, portfolioId) {
      let res = await this.request(`writers/${writerId}/portfolios/${portfolioId}`, {}, "delete");
      return res.deleted;
    };

    static async createPortfolio(writerId, data) {
      let res = await this.request(`writers/${writerId}/portfolios/new`, data, "post");
      return res.newPortfolio;
    }

    static async addPieceToPortfolio(writerId, portfolioId, pieceId) {
      let res = await this.request(`writers/${writerId}/portfolios/${portfolioId}/pieces/${pieceId}`, {}, 'post');
      return res;
    };

    static async removePieceFromPortfolio(writerId, portfolioId, pieceId) {
      let res = await this.request(`writers/${writerId}/portfolios/${portfolioId}/pieces/${pieceId}`, {}, 'delete');
      return res;
    };

    //PIECE STUFFS

    static async getAllPieces(queryParams) {
      let res = await this.request(`pieces`, queryParams);
      return res.pieces;
    };

    static async getPieceById(pieceId) {
      let res = await this.request(`pieces/${pieceId}`);
      return res.piece;
    };

    static async getPiecesByWriterId(writerId) {
      let res = await this.request(`writers/${writerId}/pieces`);
      return res.pieces;
    };

    static async createPiece(writerId, data) {
      let res = await this.request(`writers/${writerId}/pieces/new`, data, "post");
      return res.newPiece;
    };

    static async updatePiece(writerId, pieceId, updates) {
      let res = await this.request(`writers/${writerId}/pieces/${pieceId}`, updates, "patch");
      return res.updatedPiece;
    };

    static async deletePiece(writerId, pieceId) {
      let res = await this.request(`writers/${writerId}/pieces/${pieceId}`, {}, "delete");
      return res.deletedPiece;
    }

    //TAGS STUFFS

    static async getAllTags() {
      let res = await this.request(`tags`);
      return res.tags;
    };

    static async addTagToPiece(writerId, pieceId, tagId) {
      let res = await this.request(`writers/${writerId}/pieces/${pieceId}/tags/${tagId}`, {}, "post");
      return res.newTag;
    };

    static async removeTagFromPiece(writerId, pieceId, tagId) {
      let res = await this.request(`writers/${writerId}/pieces/${pieceId}/tags/${tagId}`, {}, "delete");
      return res.removedTag;
    };


    //PLATFORM STUFFS
    static async getAllPlatforms(queryParams) {
      let res = await this.request(`platforms`, queryParams);
      return res.platforms;
    };

    static async getPlatformById(platformId) {
      let res = await this.request(`platforms/${platformId}`);
      return res.platform;
    };

    //GIG STUFFS
    static async getAllGigs(queryParams) {
      for(let prop in queryParams) {
        if(queryParams[prop] == "") {
          delete queryParams[prop];
        };
      };
      
      let res = await this.request(`gigs`, queryParams);
      return res.gigs;
    }
};

export default PrintApi;