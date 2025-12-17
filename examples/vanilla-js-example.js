// Vanilla JavaScript Example - Using TeacupNet Library
import teacupnet from '../index.js';

// Configuration
const CONFIG = {
  clientID: 'your-client-id',
  clientKey: 'your-client-key'
};

// Initialize TeacupNet
const client = teacupnet(CONFIG.clientID, CONFIG.clientKey);

if (client.error) {
  console.error('❌ TeacupNet initialization failed:', client.message);
  throw new Error(client.message);
}

console.log('✅ TeacupNet initialized successfully!');

// Start analytics tracking
client.analytics.track();
console.log('📊 Analytics tracking started');

// Example 1: Fetch and display blogs
async function loadBlogs() {
  try {
    const blogs = await client.data.getBlogs();
    console.log('📚 Fetched blogs:', blogs);
    
    // Display blogs in DOM
    const blogContainer = document.getElementById('blogs');
    if (blogContainer) {
      blogContainer.innerHTML = blogs
        .map(blog => `
          <div class="blog-card">
            <h3>${blog.title}</h3>
            <p>${blog.excerpt}</p>
            <button onclick="loadBlogDetails('${blog.id}')">Read More</button>
          </div>
        `)
        .join('');
    }
    
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

// Example 2: Load a specific blog
async function loadBlogDetails(blogId) {
  try {
    const blog = await client.data.getBlog(blogId);
    console.log('📖 Blog details:', blog);
    
    // Display blog details
    const detailsContainer = document.getElementById('blog-details');
    if (detailsContainer) {
      detailsContainer.innerHTML = `
        <h2>${blog.title}</h2>
        <div class="blog-content">${blog.content}</div>
        <button onclick="closeBlogDetails()">Close</button>
      `;
    }
    
    return blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
  }
}

// Example 3: Submit form data to inbox
async function submitContactForm(formData) {
  const inboxId = 'your-inbox-id';
  
  try {
    const response = await client.data.postData(inboxId, formData);
    console.log('✅ Form submitted:', response);
    return response;
  } catch (error) {
    console.error('❌ Form submission failed:', error);
    throw error;
  }
}

// Example 4: Handle contact form submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('form[data-form-name="Contact"]');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      
      try {
        await submitContactForm(data);
        alert('Message sent successfully!');
        contactForm.reset();
      } catch (error) {
        alert('Failed to send message. Please try again.');
      }
    });
  }
});

// Example 5: Custom tracking for specific elements
function trackCustomEvent(eventName, eventData) {
  console.log(`🎯 Custom event tracked: ${eventName}`, eventData);
  // Note: Custom events would need to be added to the library
  // This is just an example of how you might extend functionality
}

// Example 6: Monitor analytics data locally (for debugging)
function showAnalyticsData() {
  // This imports the internal data controller for debugging
  // In production, data is automatically sent to the server
  import('./Analytics/data.controller.js').then(dataController => {
    console.log('Current analytics data:', dataController.default.data);
  });
}

// Export functions for global use
window.teacupnetExample = {
  loadBlogs,
  loadBlogDetails,
  submitContactForm,
  trackCustomEvent,
  showAnalyticsData
};

// Auto-load blogs on page load (optional)
// loadBlogs();

console.log('🚀 TeacupNet example script loaded');
console.log('Available functions: window.teacupnetExample');
