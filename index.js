const data = require('./Controllers/data.controller');

class tc {
  #clientId;
  #clientKey;
  constructor(clientId, clientKey) {
    // this.name = "tc";
    this.#clientId = clientId;
    this.#clientKey = clientKey;
  }
  // basic methods
  static data = class {
    sendInbox(id, data) {
      return data.postInbox(id, data);
    }
    blogs(email) {
      // console.log('here is the blogs');
      return data.getBlogs(email);
    }
    blog(email, id) {
      // console.log('here is the blog');
      return data.getBlog(email, id);
    }
  };
  // analytics
  static analytics = class {
    // future methods
    track() {}
  };
}
// module.exports = tc;
exports.default = tc;
