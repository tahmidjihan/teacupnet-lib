import prisma from './Prisma.js';

/**
 * Domain Cache Structure
 * @typedef {Object} DomainCacheEntry
 * @property {boolean} authorized - Whether the domain is authorized
 * @property {number} timestamp - Unix timestamp when cache entry was created
 */

/**
 * In-memory cache for authorized domains
 * Cache TTL: 5 minutes (300000ms)
 * @type {Map<string, DomainCacheEntry>}
 */
const domainCache = new Map();

/**
 * Cache TTL in milliseconds (5 minutes)
 */
const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * Clean up expired cache entries
 * Runs periodically to prevent memory leaks
 */
function cleanupExpiredCache() {
  const now = Date.now();
  for (const [domain, entry] of domainCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL_MS) {
      domainCache.delete(domain);
    }
  }
}

// Run cache cleanup every 10 minutes
setInterval(cleanupExpiredCache, 10 * 60 * 1000);

/**
 * Check if a domain is cached and still valid
 * @param {string} domain - The domain to check
 * @returns {boolean|null} - true if authorized, false if not authorized, null if not in cache
 */
function getCachedDomain(domain) {
  const entry = domainCache.get(domain);
  if (!entry) {
    return null;
  }

  const now = Date.now();
  if (now - entry.timestamp > CACHE_TTL_MS) {
    // Cache entry expired
    domainCache.delete(domain);
    return null;
  }

  return entry.authorized;
}

/**
 * Cache an authorized domain
 * @param {string} domain - The domain to cache
 * @param {boolean} authorized - Whether the domain is authorized
 */
function cacheDomain(domain, authorized) {
  domainCache.set(domain, {
    authorized,
    timestamp: Date.now(),
  });
}

/**
 * Query the database to check if a domain is registered
 * @param {string} domain - The domain to verify
 * @returns {Promise<boolean>} - true if domain is registered, false otherwise
 */
async function queryDomainFromDatabase(domain) {
  try {
    const companyData = await prisma.companyData.findFirst({
      where: {
        domain: domain,
      },
      select: {
        id: true,
        domain: true,
      },
    });

    return !!companyData;
  } catch (error) {
    console.error(`Error querying domain ${domain} from database:`, error);
    throw new Error('Failed to verify domain');
  }
}

/**
 * Validate Origin header against registered domains in CompanyData table
 * Implements 5-minute in-memory caching for authorized domains
 *
 * @param {string} originHeader - The Origin header value from the request
 * @returns {Promise<boolean>} - true if domain is authorized
 * @throws {Error} - Throws error if domain is not recognized or validation fails
 *
 * @example
 * // In an Express middleware
 * app.use(async (req, res, next) => {
 *   try {
 *     await validateOrigin(req.headers.origin);
 *     next();
 *   } catch (error) {
 *     res.status(403).json({ error: 'Origin not authorized' });
 *   }
 * });
 */
export async function validateOrigin(originHeader) {
  // Handle missing origin header
  if (!originHeader) {
    throw new Error('Origin header is required');
  }

  // Parse the origin to extract the domain
  let domain;
  try {
    const url = new URL(originHeader);
    domain = url.hostname;
  } catch (error) {
    throw new Error(`Invalid origin format: ${originHeader}`);
  }

  // Check cache first
  const cachedResult = getCachedDomain(domain);
  if (cachedResult !== null) {
    if (!cachedResult) {
      throw new Error(`Domain not authorized: ${domain}`);
    }
    return true;
  }

  // Cache miss - query database
  const isAuthorized = await queryDomainFromDatabase(domain);

  // Cache the result
  cacheDomain(domain, isAuthorized);

  if (!isAuthorized) {
    throw new Error(`Domain not recognized: ${domain}`);
  }

  return true;
}

/**
 * Express middleware wrapper for validateOrigin
 * Automatically handles errors and returns appropriate HTTP responses
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 */
export function validateOriginMiddleware(req, res, next) {
  const originHeader = req.headers.origin;

  validateOrigin(originHeader)
    .then(() => {
      next();
    })
    .catch((error) => {
      console.warn(`Origin validation failed: ${error.message}`);
      res.status(403).json({
        error: 'Origin not authorized',
        message: error.message,
      });
    });
}

/**
 * Get cache statistics (useful for debugging/monitoring)
 * @returns {Object} Cache statistics
 */
export function getCacheStats() {
  const now = Date.now();
  let validEntries = 0;
  let expiredEntries = 0;

  for (const [, entry] of domainCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL_MS) {
      expiredEntries++;
    } else {
      validEntries++;
    }
  }

  return {
    totalEntries: domainCache.size,
    validEntries,
    expiredEntries,
    cacheTTL: CACHE_TTL_MS,
  };
}

/**
 * Clear the domain cache (useful for testing or manual invalidation)
 */
export function clearDomainCache() {
  domainCache.clear();
}

export default {
  validateOrigin,
  validateOriginMiddleware,
  getCacheStats,
  clearDomainCache,
};
