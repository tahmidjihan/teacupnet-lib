# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
