# TeacupNet Library Examples

This directory contains example implementations of the TeacupNet library in various environments.

## Available Examples

### 1. Basic HTML Example (`basic-example.html`)

A standalone HTML page demonstrating all tracking features:
- Button click tracking
- Page scroll depth tracking
- Form completion tracking

**To run:**
1. Open `basic-example.html` in a web browser
2. Or use a local server: `python -m http.server 8000`
3. Navigate to `http://localhost:8000/examples/basic-example.html`

### 2. React Example (`react-example.jsx`)

React component showing:
- TeacupNet initialization with hooks
- Analytics tracking in a React app
- Data fetching (blogs)
- Form submission to inbox

**To use:**
1. Copy the code into your React project
2. Set environment variables:
   ```env
   REACT_APP_TEACUPNET_CLIENT_ID=your_client_id
   REACT_APP_TEACUPNET_CLIENT_KEY=your_client_key
   ```
3. Import and use the component

### 3. Vanilla JavaScript Example (`vanilla-js-example.js`)

Pure JavaScript implementation without any framework:
- Manual initialization
- Custom event handling
- Direct API calls

**To use:**
```html
<script type="module" src="examples/vanilla-js-example.js"></script>
```

## Environment Setup

All examples require valid TeacupNet credentials. Create a `.env` file:

```env
TEACUPNET_CLIENT_ID=your_client_id_here
TEACUPNET_CLIENT_KEY=your_secret_key_here
```

## Notes

- Replace demo credentials with your actual TeacupNet credentials
- The basic HTML example uses relative imports and needs to be served from the library root
- React example assumes teacupnet-lib is installed via npm
- All button clicks, form interactions, and page scrolls are automatically tracked

## Getting Credentials

1. Sign up at [TeacupNet](https://teacupnet.vercel.app)
2. Create a new project
3. Copy your Client ID and Client Key from the dashboard

## Support

For help with examples or integration, see the main [README.md](../README.md) or open an issue on GitHub.
