const { postInbox } = require('./Controllers/inboxes.controller');
const { getBlogs, getBlog } = require('./Controllers/blogs.controller');

class tc {
  #clientId;
  #clientKey;
  constructor(clientId, clientKey) {
    // this.name = "tc";
    this.#clientId = clientId;
    this.#clientKey = clientKey;
  }
  sendInbox(id, data) {
    return postInbox(id, data);
  }
  blogs(email) {
    return getBlogs(email);
  }
  sendBlog(email, id) {
    return getBlog(email, id);
  }
}
module.exports = tc;
