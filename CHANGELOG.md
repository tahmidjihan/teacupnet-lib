# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-12-26

### Added

- **Duplicate Prevention System**: Analytics data is now compared with previously sent data to prevent duplicates from being stored in the database
- **LocalStorage Fingerprint**: Visitor fingerprint now persists in localStorage across browser sessions for consistent identification
- `getNewData()` function in data controller that filters out duplicate analytics before sending

### Changed

- Fingerprint generation now happens only once per browser and is stored in localStorage with key `teacup_fingerprint`
- Analytics save function now only sends API requests when there is new data to transmit
- Data comparison logic ensures button clicks, page views, and form interactions are only sent once

### Fixed

- Duplicate button clicks on the same page are no longer sent multiple times
- Same page scroll percentages are no longer duplicated in database
- Form completion percentages only update when they change
- Reduced unnecessary API calls when no new analytics data is available

### Performance

- Reduced database writes by filtering duplicates before transmission
- Reduced network requests by skipping empty data intervals
- Fingerprint generation optimized to run only once per browser session

## [1.0.0] - 2025-12-17

### Added

- Initial release of TeacupNet Library
- Analytics tracking module with automatic data collection
- Button click tracking across all pages
- Page view and scroll depth tracking
- Form completion percentage tracking
- Canvas fingerprinting for unique visitor identification
- Data controller for blog management
- API for posting data to inboxes
- Automatic data synchronization every 5 seconds
- Smart deduplication for page and form analytics
- TypeScript definitions for better IDE support

### Features

- **Analytics Module**

  - `analytics.track()` - Start automatic tracking of user interactions
  - Real-time button click tracking
  - Scroll depth monitoring with percentage calculation
  - Form field completion tracking
  - Custom form naming via `data-form-name` or heading detection

- **Data Module**
  - `data.getBlogs()` - Retrieve all blogs for client
  - `data.getBlog(id)` - Get specific blog by ID
  - `data.postData(inboxId, data)` - Post data to inbox

### Technical Details

- ES modules support
- Production-ready with Vercel backend integration
- Browser-based fingerprinting for visitor tracking
- Optimized data storage preventing duplicates
- Credential validation on initialization

## [Unreleased]

### Planned

- Custom event tracking
- Configurable sync intervals
- Offline data queue
- Enhanced TypeScript definitions
- Custom analytics filters
- Dashboard integration examples
