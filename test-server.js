// Simple test script to verify server endpoints without MongoDB connection
const http = require('http');

const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}`;

// Test endpoints
const endpoints = [
  '/api/auth',
  '/api/events',
  '/api/bookings',
  '/api/organizer/events',
  '/api/organizer/bookings/123'
];

console.log('Testing server endpoints...\n');

endpoints.forEach(endpoint => {
  const url = `${BASE_URL}${endpoint}`;
  
  console.log(`Testing: ${endpoint}`);
  
  const req = http.request(url, { method: 'GET' }, (res) => {
    let data = '';
    
    res.on('data', chunk => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`Status: ${res.statusCode}`);
      if (res.statusCode === 401) {
        console.log('✓ Authentication required (expected)');
      } else if (res.statusCode === 200) {
        console.log('✓ Success');
      } else {
        console.log(`Response: ${data.substring(0, 100)}...`);
      }
      console.log('---');
    });
  });
  
  req.on('error', (error) => {
    console.log(`✗ Error: ${error.message}`);
    console.log('---');
  });
  
  req.end();
});

console.log('Test requests sent. Check if server responds without crashing.');
