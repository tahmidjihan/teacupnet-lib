declare module 'teacupweb' {
  /**
   * Configuration options for Teacup initialization
   */
  interface TeacupConfig {
    clientID: string;
    clientKey: string;
    apiUrl?: string;
    autoTrack?: boolean;
  }

  /**
   * Analytics event data types
   */
  interface ButtonEventData {
    type: 'button';
    button: string;
    page: string;
  }

  interface PageEventData {
    type: 'page';
    page: string;
    percentage: number;
  }

  interface FormEventData {
    type: 'form';
    form: string;
    percentage: number;
  }

  type AnalyticsEventData = ButtonEventData | PageEventData | FormEventData;

  /**
   * Data controller interface (legacy)
   * @deprecated Use blogs and inbox controllers directly
   */
  interface DataController {
    getBlogs: () => Promise<any>;
    getBlog: (id: string) => Promise<any>;
    postData: (inboxId: string, data: any) => Promise<any>;
  }

  /**
   * Analytics tracker interface
   */
  interface AnalyticsController {
    track: () => void;
  }

  /**
   * Blogs controller interface
   */
  interface BlogsController {
    getAllBlogs: (ownerId?: string) => Promise<any>;
    getBlogById: (id: string) => Promise<any>;
  }

  /**
   * Inbox controller interface
   */
  interface InboxController {
    submitData: (inboxId: string, data: any) => Promise<any>;
    getInbox: (id: string) => Promise<any>;
    // getInboxData was removed: reading submissions is dashboard-only (see README).
  }

  /**
   * Analytics API controller interface
   */
  interface AnalyticsApiController {
    submitEvent: (
      fingerprint: string,
      data: AnalyticsEventData
    ) => Promise<any>;
    getAnalytics: (
      owner: string,
      event: 'button' | 'page' | 'form'
    ) => Promise<any>;
  }

  /**
   * Init result interface
   */
  interface InitResult {
    /**
     * Data controller (legacy)
     * @deprecated Use blogs and inbox directly
     */
    data: DataController;
    /**
     * Analytics tracker
     */
    analytics: AnalyticsController;
    /**
     * Blogs controller
     */
    blogs: BlogsController;
    /**
     * Inbox controller
     */
    inbox: InboxController;
    /**
     * Analytics API controller
     */
    analyticsApi: AnalyticsApiController;
  }

  /**
   * Error result interface
   */
  interface ErrorResult {
    error: string;
    message: string;
  }

  /**
   * Initialize Teacup client
   * @param clientID - Client ID for authentication
   * @param clientKey - Client key for authentication
   * @param options - Optional configuration
   * @returns Teacup client instance or error
   */
  export default function init(
    clientID: string,
    clientKey: string,
    options?: Partial<Omit<TeacupConfig, 'clientID' | 'clientKey'>>
  ): InitResult | ErrorResult;

  /**
   * Current client configuration
   */
  export const initial: {
    clientID: string;
    clientKey: string;
  };
}
