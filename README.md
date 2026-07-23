# Teacup Library

A powerful JavaScript library for integrating Teacup analytics and data management capabilities into your web applications. Track user interactions, page views, form completions, and seamlessly connect to the Teacup backend.

## Features

- 📊 **Analytics Tracking**: Automatic tracking of button clicks, page views, and form interactions
- 🎯 **Smart Form Tracking**: Track form completion percentage in real-time
- 📈 **Page Scroll Tracking**: Monitor how far users scroll on each page
- 🔒 **Fingerprinting**: Unique visitor identification using canvas fingerprinting
- 🚀 **Easy Integration**: Simple initialization and automatic data synchronization
- 🏷️ **Custom Head Tags**: Auto-injects dashboard-configured meta/link/script/style tags into `<head>`
- 📦 **Lightweight**: Minimal dependencies, optimized for performance

## Installation

```bash
npm install teacupweb
```

## Quick Start

### 1. Initialize the Library

```javascript
import teacup from 'teacupweb';

// Initialize with your credentials
const client = teacup('YOUR_CLIENT_ID', 'YOUR_CLIENT_KEY');

if (client.error) {
  console.error(client.message);
} else {
  console.log('Teacup initialized successfully!');
}
```

### 2. Enable Analytics Tracking

```javascript
import teacup from 'teacupweb';

const client = teacup('YOUR_CLIENT_ID', 'YOUR_CLIENT_KEY');

// Start tracking analytics
client.analytics.track();
```

That's it! The library will now automatically track:

- Button clicks
- Page navigation and scroll depth
- Form completion percentages

## API Reference

### Initialization

#### `teacup(clientID, clientKey)`

Initializes the Teacup library with your credentials.

**Parameters:**

- `clientID` (string): Your unique client identifier
- `clientKey` (string): Your secret client key

**Returns:**

- On success: Object with `analytics` and `data` controllers
- On failure: Object with `error` and `message` properties

**Example:**

```javascript
const client = teacup('123', 'secretKey456');
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

### Leads Module

Submit contact/quote/consultation forms straight into the Teacup dashboard's
Leads pipeline. Submissions are spam-filtered server-side (honeypot,
time-to-submit, rate limiting) and deduplicated on double-clicks.

#### `client.leads.submit(lead)`

```javascript
const result = await client.leads.submit({
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'I would like a quote for a kitchen remodel',
  type: 'QUOTE', // CONTACT | QUOTE | CONSULTATION | OTHER
  phone: '+1 555 0100', // optional
  fields: { budget: '10-20k' }, // optional extra fields
});
```

UTM parameters on the current URL are captured automatically.

#### `client.leads.bindForm(formOrSelector, options?)`

Auto-wires an existing `<form>`: inputs named `name`, `email`, `message`,
`phone` map to the lead; all other named inputs land in `fields`. Add a
hidden input named `website` as a spam honeypot — real users never fill it.

```javascript
const unbind = client.leads.bindForm('#contact-form', {
  type: 'CONTACT',
  onSuccess: () => alert('Thanks! We will get back to you.'),
});
```

### Appointments Module

Let visitors book appointments against the availability configured in the
Teacup dashboard (Dashboard → Appointments → Settings).

```javascript
// 1. Show open slots for a date (business timezone)
const { configured, slots } = await client.appointments.getAvailability('2026-08-01');

// 2. Book one of the returned slots
const booking = await client.appointments.book({
  date: '2026-08-01',
  startsAt: slots[0].startsAt,
  customerName: 'Jane Doe',
  customerEmail: 'jane@example.com',
  service: 'Consultation', // optional
});

// 3. Cancel later — the single-use cancel token is stored in the visitor's
//    browser automatically, or pass booking.cancelToken explicitly.
await client.appointments.cancel(booking.id);
```

Booking returns `409 Slot unavailable` if someone takes the slot first —
re-fetch availability and let the visitor pick again.

### Testimonials Module

```javascript
// Fetch approved testimonials for display (only APPROVED ones are returned)
const { testimonials } = await client.testimonials.getApproved();

// Submit a new testimonial — it stays hidden until approved in the dashboard
await client.testimonials.submit({
  authorName: 'Jane Doe',
  body: 'Great service!',
  rating: 5,
});
```

### Head Tags Module

Custom `<meta>`, `<link>`, `<script>`, `<style>`, and `<noscript>` tags — configured
in the Teacup dashboard — are fetched and injected into `document.head`
automatically when `init()` runs. There's nothing to call for the common case:

```javascript
import init from 'teacupweb';

// Enabled head tags are injected into <head> as soon as this runs
init('your-client-id', 'your-client-key');
```

Opt out of the automatic injection (e.g. to control timing yourself) with
`autoInjectHeadTags: false`, then call `client.headTags.inject()` when ready.
Also useful to re-run after a client-side route change in a single-page app:

```javascript
const client = init('your-client-id', 'your-client-key', {
  autoInjectHeadTags: false,
});

await client.headTags.inject();
```

Tags already present on the page (matched by id) are never duplicated, so
`inject()` is safe to call more than once.

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
import teacup from 'teacupweb';

const client = teacup('YOUR_CLIENT_ID', 'YOUR_CLIENT_KEY');

// Enable only specific tracking
// Note: This requires manual implementation
// The track() method enables all tracking automatically
```

### Working with React/Vue/Angular

The library works seamlessly with modern frameworks:

```javascript
// React example
import { useEffect } from 'react';
import teacup from 'teacupweb';

function App() {
  useEffect(() => {
    const client = teacup(
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

Analytics data is automatically sent to the Teacup backend:

- **Interval**: Every 5 seconds
- **Endpoint**: `https://backend.teacup.website/api/client/analytics`
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
TEACUP_CLIENT_ID=your_client_id
TEACUP_CLIENT_KEY=your_client_key
```

## Troubleshooting

### Library not tracking

Make sure you've called `client.analytics.track()` after initialization:

```javascript
const client = teacup('CLIENT_ID', 'CLIENT_KEY');
client.analytics.track(); // Don't forget this!
```

### Invalid Credentials error

Verify your `clientID` and `clientKey` are correct:

```javascript
const client = teacup('CLIENT_ID', 'CLIENT_KEY');
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

- GitHub Issues: [https://github.com/teacupweb/teacup-lib/issues](https://github.com/teacupweb/teacup-lib/issues)
- Repository: [https://github.com/teacupweb/teacup-lib](https://github.com/teacupweb/teacup-lib)
- Website: [https://teacup.website](https://teacup.website)

## License

ISC © Tahmid Jihan, Teacup

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.
