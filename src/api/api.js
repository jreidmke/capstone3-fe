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

    static async updateWriterProfile(writerId, data) {
      for(let prop in data.writerData) {
        if(data.writerData[prop] === "" || data.writerData[prop] === null) {
          delete data.writerData[prop]
        };
      };
      for(let prop in data.userData) {
        if(data.userData[prop] === "" || data.userData[prop] === null) {
          delete data.userData[prop]
        };
      };
      let res = await this.request(`writers/${writerId}`, data, "patch");
      return res.updatedWriter;
    };
    
    static async deleteWriterAccount(writerId) {
      await this.request(`writers/${writerId}`, {}, "delete");
    }

    static async getApplicationsByWriterId(writerId) {
      let res = await this.request(`writers/${writerId}/applications`);
      return res.apps;
    };

    //WRITER FEEDS
    static async getGigsForFeedFromTags(writerId, tagIds) {
      let res = await this.request(`writers/${writerId}/feed/tags?tag_ids=${tagIds}`);
      return res.gigs;
    }

    static async getGigsForFeedFromPlatforms(writerId, platformIds) {
      let res = await this.request(`writers/${writerId}/feed/platforms?platform_ids=${platformIds}`);
      return res.gigs;
    }

    //WRITER FOLLOWS

    static async getWriterPlatformFollows(writerId) {
      let res = await this.request(`writers/${writerId}/followed_platforms`);
      return res.platforms;
    };

    static async writerFollowPlatform(writerId, platformId) {
      let res = await this.request(`writers/${writerId}/followed_platforms/${platformId}`, {}, "post");
      return res.followed;
    };

    static async writerUnfollowPlatform(writerId, platformId) {
      let res = await this.request(`writers/${writerId}/followed_platforms/${platformId}`, {}, "delete");
      return res.followed;
    }; 

    static async getWriterTagFollows(writerId) {
      let res = await this.request(`writers/${writerId}/followed_tags`);
      return res.tags;
    };

    static async writerFollowTag(writerId, tagId) {
      let res = await this.request(`writers/${writerId}/followed_tags/${tagId}`, {}, "post");
      return res.followed;
    };

    static async writerUnfollowTag(writerId, tagId) {
      let res = await this.request(`writers/${writerId}/followed_tags/${tagId}`, {}, "delete");
      return res.unfollowed;
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

    static async updatePlatformProfile(platformId, data) {
      for(let prop in data.platformData) {
        if(data.platformData[prop] === "" || data.platformData[prop] === null) {
          delete data.platformData[prop];
        };
      };
      for(let prop in data.userData) {
        if(data.userData[prop] === "" || data.userData[prop] === null) {
          delete data.userData[prop];
        };
      };
      let res = await this.request(`platforms/${platformId}`, data, "patch");
      console.log(res);
      return res.updatedPlatform;
    };

    static async deletePlatformAccount(platformId) {
      await this.request(`platforms/${platformId}`, {}, "delete");
    }

    //PLATFORM FEED
    static async getPiecesForFeedFromTags(platformId, tagIds) {
      let res = await this.request(`platforms/${platformId}/feed/tags?tag_ids=${tagIds}`);
      return res.gigs;
    }

    static async getPiecesForFeedFromWriters(platformId, platformIds) {
      let res = await this.request(`platforms/${platformId}/feed/writers?writer_ids=${platformIds}`);
      return res.gigs;
    }

    //PLATFORM FOLLOWS

    static async getPlatformTagFollows(platformId) {
      let res = await this.request(`platforms/${platformId}/followed_tags`);
      return res.tags;
    };

    static async platformFollowTag(platformId, tagId) {
      let res = await this.request(`platforms/${platformId}/followed_tags/${tagId}`, {}, "post");
      return res.followed;
    };

    static async platformUnfollowTag(platformId, tagId) {
      let res = await this.request(`platforms/${platformId}/followed_tags/${tagId}`, {}, "delete");
      return res.followed;
    };

    static async getPlatformWriterFollows(platformId) {
      let res = await this.request(`platforms/${platformId}/followed_writers`);
      return res.writers;
    };

    static async platformFollowWriter(platformId, writerId) {
      let res = await this.request(`platforms/${platformId}/followed_writers/${writerId}`, {}, "post");
      return res.followed;
    };

    static async platformUnfollowWriter(platformId, writerId) {
      let res = await this.request(`platforms/${platformId}/followed_writers/${writerId}`, {}, "delete");
      return res.unfollowed;
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

    //GIG STUFFS
  
    static async getAllGigs(queryParams) {
      for(let prop in queryParams) {
        if(queryParams[prop] == "") {
          delete queryParams[prop];
        };
      };      
      let res = await this.request(`gigs`, queryParams);
      return res.gigs;
    };

    static async getGigById(gigId) {
      let res = await this.request(`gigs/${gigId}`);
      return res.gig;
    };

    static async createGig(platformId, data) {
      let res = await this.request(`platforms/${platformId}/gigs/new`, data, "post");
      return res.newGig;
    };

    static async updateGig(platformId, gigId, updates) {
      for(let prop in updates) {
        if(updates[prop] == "") {
          delete updates[prop];
        };
      };   
      let res = await this.request(`platforms/${platformId}/gigs/${gigId}`, updates, "patch");
      return res.updatedGig;
    };

    static async deleteGig(platformId, gigId) {
      let res = await this.request(`platforms/${platformId}/gigs/${gigId}`, {}, "delete");
      return res;
    }

    static async addTagToGig(platformId, gigId, tagId) {
      let res = await this.request(`platforms/${platformId}/gigs/${gigId}/tags/${tagId}`, {}, "post");
      return res.newTag;
    };

    static async removeTagFromGig(platformId, gigId, tagId) {
      let res = await this.request(`platforms/${platformId}/gigs/${gigId}/tags/${tagId}`, {}, "delete");
      return res.removedTag;
    };

    //APPLICATION STUFFS

    static async getApplicationById(platformId, applicationId) {
      let res = await this.request(`platforms/${platformId}/applications/${applicationId}`);
      return res.app; 
    };

    static async applyToGig(writerId, gigId, data) {
      let res = await this.request(`gigs/${gigId}/apply/writers/${writerId}`, data, "post");
      return res;
    };

    static async getApplicationsByGigId(platformId, gigId) {
      let res = await this.request(`platforms/${platformId}/gigs/${gigId}/applications`);
      return res.apps;
    };

    static async updateApplicationStatus(platformId, applicationId, data) {
      let res = await this.request(`platforms/${platformId}/applications/${applicationId}`, data, "patch");
      return res.app;
    };

    static async withdrawApplication(writerId, gigId) {
      let res = await this.request(`gigs/${gigId}/apply/writers/${writerId}`, {}, "delete");
      return res;
    };
};

export default PrintApi;