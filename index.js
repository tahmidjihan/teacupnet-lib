import dataController from "./Controllers/data.controller.js";
import analytics from "./Analytics/analytics.controller.js";
import blogsController from "./Controllers/blogs.controller.js";
import inboxController from "./Controllers/inbox.controller.js";
import analyticsApiController from "./Controllers/analytics-api.controller.js";
import leadsController from "./Controllers/leads.controller.js";
import appointmentsController from "./Controllers/appointments.controller.js";
import testimonialsController from "./Controllers/testimonials.controller.js";
import headTagsController from "./Controllers/headTags.controller.js";

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
 * @property {boolean} [autoInjectHeadTags] - Automatically fetch and inject
 *   this company's custom head tags (meta/link/script/style/noscript) into
 *   document.head on init (default: true)
 */

/**
 * Initialize Teacup client
 * @param {string} clientID - Client ID for authentication
 * @param {string} clientKey - Client key for authentication
 * @param {Partial<TeacupConfig>} [options] - Optional configuration
 * @returns {{data: Object, analytics: Object, blogs: Object, inbox: Object, analyticsApi: Object, leads: Object, appointments: Object, testimonials: Object} | {error: string, message: string}}
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

  // Set custom API URL if provided
  if (options.apiUrl && typeof window !== "undefined") {
    window.TEACUP_API_URL = options.apiUrl;
  }

  // Start automatic tracking if enabled
  if (options.autoTrack !== false && typeof document !== "undefined") {
    analytics.track();
  }

  // Inject custom <head> tags (meta/link/script/style/noscript) unless disabled
  if (options.autoInjectHeadTags !== false && typeof document !== "undefined") {
    headTagsController.inject();
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

    /**
     * Leads controller — submit contact/quote forms into the Teacup dashboard
     * (with built-in spam defenses), or auto-bind an existing form element.
     */
    leads: leadsController,

    /**
     * Appointments controller — fetch open slots, book, and cancel
     * appointments against the business's configured availability.
     */
    appointments: appointmentsController,

    /**
     * Testimonials controller — submit testimonials for approval and fetch
     * the approved ones for display.
     */
    testimonials: testimonialsController,

    /**
     * Head tags controller — injects the company's custom <head> tags
     * (meta/link/script/style/noscript) into document.head. Runs
     * automatically on init unless `autoInjectHeadTags: false` was passed;
     * exposed here so it can be re-run manually (e.g. after a client-side
     * route change in an SPA).
     */
    headTags: headTagsController,
  };
}

export default init;
