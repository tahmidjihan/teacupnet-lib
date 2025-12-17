# TeacupNet Library

A powerful JavaScript library for integrating TeacupNet analytics and data management capabilities into your web applications. Track user interactions, page views, form completions, and seamlessly connect to the TeacupNet backend.

## Features

- 📊 **Analytics Tracking**: Automatic tracking of button clicks, page views, and form interactions
- 🎯 **Smart Form Tracking**: Track form completion percentage in real-time
- 📈 **Page Scroll Tracking**: Monitor how far users scroll on each page
- 🔒 **Fingerprinting**: Unique visitor identification using canvas fingerprinting
- 🚀 **Easy Integration**: Simple initialization and automatic data synchronization
- 📦 **Lightweight**: Minimal dependencies, optimized for performance

## Installation

```bash
npm install teacupnet-lib
```

## Quick Start

### 1. Initialize the Library

```javascript
import teacupnet from 'teacupnet-lib';

// Initialize with your credentials
const client = teacupnet('YOUR_CLIENT_ID', 'YOUR_CLIENT_KEY');

if (client.error) {
  console.error(client.message);
} else {
  console.log('TeacupNet initialized successfully!');
}
```

### 2. Enable Analytics Tracking

```javascript
import teacupnet from 'teacupnet-lib';

const client = teacupnet('YOUR_CLIENT_ID', 'YOUR_CLIENT_KEY');

// Start tracking analytics
client.analytics.track();
```

That's it! The library will now automatically track:

- Button clicks
- Page navigation and scroll depth
- Form completion percentages

## API Reference

### Initialization

#### `teacupnet(clientID, clientKey)`

Initializes the TeacupNet library with your credentials.

**Parameters:**

- `clientID` (string): Your unique client identifier
- `clientKey` (string): Your secret client key

**Returns:**

- On success: Object with `analytics` and `data` controllers
- On failure: Object with `error` and `message` properties

**Example:**

```javascript
const client = teacupnet('123', 'secretKey456');
```

### Analytics Module

#### `client.analytics.track()`

Starts automatic tracking of user interactions including:

- **Button Clicks**: Tracks every button click with the button text and page location
- **Page Views**: Tracks page navigation and scroll depth percentage
- **Form Interactions**: Monitors form completion percentage

**Example:**

```javascript
client.analytics.track();
```

**Data Collection:**

- Automatically sends analytics data to the server every 5 seconds
- Uses canvas fingerprinting for unique visitor identification
- Tracks only the highest scroll percentage per page (no duplicates)
- Tracks only the highest form completion percentage per form

### Data Module

#### `client.data.getBlogs()`

Retrieves all blogs associated with your client account.

**Returns:** Promise resolving to an array of blog objects

**Example:**

```javascript
const blogs = await client.data.getBlogs();
console.log(blogs);
```

#### `client.data.getBlog(blogId)`

Retrieves a specific blog by its ID.

**Parameters:**

- `blogId` (string): The unique identifier of the blog

**Returns:** Promise resolving to a blog object

**Example:**

```javascript
const blog = await client.data.getBlog('blog123');
console.log(blog);
```

#### `client.data.postData(inboxId, data)`

Posts data to a specific inbox.

**Parameters:**

- `inboxId` (string): The unique identifier of the inbox
- `data` (object): The data to be posted

**Returns:** Promise resolving to the server response

**Example:**

```javascript
const response = await client.data.postData('inbox123', {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello!',
});
```

## Analytics Details

### Button Click Tracking

Tracks all button clicks automatically:

```javascript
// Captured data format:
{
  button: "Submit", // Button text
  page: "/contact"  // Current page path
}
```

### Page View Tracking

Monitors page navigation and scroll depth:

```javascript
// Captured data format:
{
  page: "/about",
  percentage: 75 // Highest scroll depth reached (0-100)
}
```

**Note:** Only the highest scroll percentage is stored for each page visit.

### Form Tracking

Tracks form completion in real-time:

```javascript
// Captured data format:
{
  form: "Contact Us", // From data-form-name attribute or preceding H1-H3 heading
  percent: 66.7       // Percentage of filled fields
}
```

**Form Naming:**

1. Use `data-form-name` attribute on your form element
2. Or place an `<h1>`, `<h2>`, or `<h3>` heading before the form
3. Fallback: "unknown-form"

**Example:**

```html
<!-- Option 1: Using data-form-name -->
<form data-form-name="Newsletter Signup">
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>

<!-- Option 2: Using heading -->
<h2>Contact Us</h2>
<form>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

## Advanced Usage

### Custom Analytics Implementation

If you want more control over tracking:

```javascript
import teacupnet from 'teacupnet-lib';

const client = teacupnet('YOUR_CLIENT_ID', 'YOUR_CLIENT_KEY');

// Enable only specific tracking
// Note: This requires manual implementation
// The track() method enables all tracking automatically
```

### Working with React/Vue/Angular

The library works seamlessly with modern frameworks:

```javascript
// React example
import { useEffect } from 'react';
import teacupnet from 'teacupnet-lib';

function App() {
  useEffect(() => {
    const client = teacupnet(
      process.env.REACT_APP_CLIENT_ID,
      process.env.REACT_APP_CLIENT_KEY
    );

    if (!client.error) {
      client.analytics.track();
    }
  }, []);

  return <div>Your App</div>;
}
```

## Data Synchronization

Analytics data is automatically sent to the TeacupNet backend:

- **Interval**: Every 5 seconds
- **Endpoint**: `https://teacupnet-backend.vercel.app/api/analytics`
- **Included**: Fingerprint, client credentials, and collected analytics data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note:** This library uses ES modules and requires a modern browser or build tool.

## Security Considerations

- **Credentials**: Store your `clientID` and `clientKey` securely
- **Environment Variables**: Use environment variables for credentials in production
- **HTTPS**: The library communicates with the backend over HTTPS

**Example `.env` file:**

```env
TEACUPNET_CLIENT_ID=your_client_id
TEACUPNET_CLIENT_KEY=your_client_key
```

## Troubleshooting

### Library not tracking

Make sure you've called `client.analytics.track()` after initialization:

```javascript
const client = teacupnet('CLIENT_ID', 'CLIENT_KEY');
client.analytics.track(); // Don't forget this!
```

### Invalid Credentials error

Verify your `clientID` and `clientKey` are correct:

```javascript
const client = teacupnet('CLIENT_ID', 'CLIENT_KEY');
if (client.error) {
  console.error('Initialization failed:', client.message);
}
```

### Data not appearing in dashboard

- Check browser console for errors
- Verify network requests are being sent to the backend
- Confirm your credentials have the correct permissions

## Support

For issues, questions, or feature requests:

- GitHub Issues: [https://github.com/tahmidjihan/teacupnet-lib/issues](https://github.com/tahmidjihan/teacupnet-lib/issues)
- Repository: [https://github.com/tahmidjihan/teacupnet-lib](https://github.com/tahmidjihan/teacupnet-lib)

## License

ISC © Tahmid Jihan, Teacupnet

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.
