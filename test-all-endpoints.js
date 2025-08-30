// Test script to verify all API endpoints
const http = require('http');

const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}`;

console.log('Testing EventHive Backend API Endpoints\n');

// Test endpoints
const endpoints = [
  {
    method: 'GET',
    path: '/api/events',
    description: 'Get all events',
    auth: false
  },
  {
    method: 'POST', 
    path: '/api/auth/register',
    description: 'User registration',
    auth: false,
    data: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    })
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    description: 'User login',
    auth: false,
    data: JSON.stringify({
      email: 'test@example.com',
      password: 'password123'
    })
  },
  {
    method: 'GET',
    path: '/api/organizer/events',
    description: 'Get organizer events (requires auth)',
    auth: true
  },
  {
    method: 'GET',
    path: '/api/bookings/my',
    description: 'Get user bookings (requires auth)',
    auth: true
  }
];

endpoints.forEach((endpoint, index) => {
  setTimeout(() => {
    console.log(`\n${index + 1}. ${endpoint.description}`);
    console.log(`   ${endpoint.method} ${endpoint.path}`);
    
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: endpoint.path,
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (endpoint.auth) {
      console.log('   ⚠️  Requires authentication');
    }

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        
        if (res.statusCode === 200) {
          console.log('   ✅ Success');
        } else if (res.statusCode === 401) {
          console.log('   🔐 Authentication required (expected)');
        } else if (res.statusCode === 404) {
          console.log('   ❌ Endpoint not found');
        } else {
          console.log(`   Response: ${data.substring(0, 100)}...`);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`   ❌ Error: ${error.message}`);
    });

    if (endpoint.data) {
      req.write(endpoint.data);
    }
    
    req.end();
  }, index * 1000); // Stagger requests by 1 second
});

console.log('\nTest requests will be sent sequentially...');
console.log('Check the server terminal for any errors.');
