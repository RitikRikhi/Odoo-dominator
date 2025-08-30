// Test server without MongoDB connection for basic functionality testing
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5001; // Use different port to avoid conflicts

// Start server without MongoDB connection
const server = app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT} (without MongoDB)`);
  console.log('Server is ready to accept requests');
  console.log('\nAvailable endpoints:');
  console.log('- GET /api/auth');
  console.log('- GET /api/events'); 
  console.log('- GET /api/bookings');
  console.log('- GET /api/organizer/events');
  console.log('- GET /api/organizer/bookings/:eventId');
  console.log('\nPress Ctrl+C to stop the server');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down test server...');
  server.close(() => {
    console.log('Test server stopped');
    process.exit(0);
  });
});
