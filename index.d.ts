declare module 'teacupnet-lib' {
  /**
   * Initial configuration object containing client credentials
   */
  export interface InitialConfig {
    clientID: string;
    clientKey: string;
  }

  /**
   * Error response when initialization fails
   */
  export interface InitError {
    error: string;
    message: string;
  }

  /**
   * Analytics controller for tracking user interactions
   */
  export interface AnalyticsController {
    /**
     * Start tracking user interactions including button clicks, page views, and form completions
     */
    track(): void;
  }

  /**
   * Data controller for managing blogs and inbox data
   */
  export interface DataController {
    /**
     * Retrieve all blogs associated with the client account
     * @returns Promise resolving to array of blog objects
     */
    getBlogs(): Promise<any[]>;

    /**
     * Retrieve a specific blog by its ID
     * @param id - The unique identifier of the blog
     * @returns Promise resolving to a blog object
     */
    getBlog(id: string): Promise<any>;

    /**
     * Post data to a specific inbox
     * @param inboxId - The unique identifier of the inbox
     * @param data - The data to be posted
     * @returns Promise resolving to the server response
     */
    postData(inboxId: string, data: any): Promise<any>;
  }

  /**
   * Successful initialization result
   */
  export interface InitSuccess {
    analytics: AnalyticsController;
    data: DataController;
  }

  /**
   * Initialize the TeacupNet library with client credentials
   * @param clientID - Your unique client identifier
   * @param clientKey - Your secret client key
   * @returns Analytics and data controllers on success, or error object on failure
   */
  export default function init(
    clientID: string,
    clientKey: string
  ): InitSuccess | InitError;

  /**
   * Shared initial configuration accessible across the library
   */
  export const initial: InitialConfig;
}

