// React Example - Using TeacupNet Library with React
import { useEffect, useState } from 'react';
import teacupnet from 'teacupnet-lib';

function App() {
  const [client, setClient] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize TeacupNet on component mount
  useEffect(() => {
    const teacupnetClient = teacupnet(
      process.env.REACT_APP_TEACUPNET_CLIENT_ID,
      process.env.REACT_APP_TEACUPNET_CLIENT_KEY
    );

    if (teacupnetClient.error) {
      console.error('Failed to initialize TeacupNet:', teacupnetClient.message);
      return;
    }

    setClient(teacupnetClient);

    // Start analytics tracking
    teacupnetClient.analytics.track();
    setIsTracking(true);

    console.log('✅ TeacupNet initialized and tracking started');
  }, []);

  // Fetch blogs from TeacupNet
  const fetchBlogs = async () => {
    if (!client) return;

    setLoading(true);
    try {
      const blogsData = await client.data.getBlogs();
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      // Post data to inbox
      await client.data.postData('inbox-id', data);
      alert('Message sent successfully!');
      e.target.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>TeacupNet React Integration</h1>
        {isTracking && (
          <p className="status">✅ Analytics tracking active</p>
        )}
      </header>

      {/* Button tracking example */}
      <section>
        <h2>Button Tracking</h2>
        <p>All button clicks are automatically tracked!</p>
        <button>Click Me</button>
        <button>Learn More</button>
        <button>Get Started</button>
      </section>

      {/* Data fetching example */}
      <section>
        <h2>Fetch Blogs</h2>
        <button onClick={fetchBlogs} disabled={loading}>
          {loading ? 'Loading...' : 'Load Blogs'}
        </button>
        
        {blogs.length > 0 && (
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Form tracking example */}
      <section>
        <h2>Contact Form</h2>
        <p>Form completion is tracked automatically!</p>
        
        <form data-form-name="Contact Form" onSubmit={handleContactSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}

export default App;
