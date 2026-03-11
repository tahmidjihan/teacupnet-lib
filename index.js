import dataController from "./Controllers/data.controller.js";
import analytics from "./Analytics/analytics.controller.js";
import blogsController from "./Controllers/blogs.controller.js";
import inboxController from "./Controllers/inbox.controller.js";
import analyticsApiController from "./Controllers/analytics-api.controller.js";

/**
 * Teacup client configuration
 */
export const initial = {
  clientID: "",
  clientKey: "",
};

/**
 * Configuration options for Teacup initialization
 * @typedef {Object} TeacupConfig
 * @property {string} clientID - Client ID for authentication
 * @property {string} clientKey - Client key for authentication
 * @property {string} [apiUrl] - Optional custom API URL (default: http://localhost:8001)
 * @property {boolean} [autoTrack] - Enable automatic analytics tracking (default: true)
 */

/**
 * Initialize Teacup client
 * @param {string} clientID - Client ID for authentication
 * @param {string} clientKey - Client key for authentication
 * @param {Partial<TeacupConfig>} [options] - Optional configuration
 * @returns {{data: Object, analytics: Object, blogs: Object, inbox: Object, analyticsApi: Object} | {error: string, message: string}}
 */
function init(clientID, clientKey, options = {}) {
  if (!clientID || !clientKey) {
    return {
      error: "Invalid Credentials",
      message: "Please provide clientID and clientKey",
    };
  }

  // Store credentials
  initial.clientID = clientID;
  initial.clientKey = clientKey;

  console.log(initial);
  // Set custom API URL if provided
  if (options.apiUrl && typeof window !== "undefined") {
    window.TEACUP_API_URL = options.apiUrl;
  }

  // Start automatic tracking if enabled
  if (options.autoTrack !== false && typeof document !== "undefined") {
    analytics.track();
  }

  return {
    /**
     * Data controller for blogs and inbox operations
     * @deprecated Use `blogs` and `inbox` directly
     */
    data: dataController,

    /**
     * Analytics tracker for automatic user interaction tracking
     */
    analytics: analytics,

    /**
     * Blogs controller for fetching blog posts
     */
    blogs: blogsController,

    /**
     * Inbox controller for submitting and retrieving inbox data
     */
    inbox: inboxController,

    /**
     * Analytics API controller for manual analytics events
     */
    analyticsApi: analyticsApiController,
  };
}

export default init;
