// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const neo4j = require('neo4j-driver').v1;

// Create Express app
const app = express();

// Create HTTP server and attach Express app to it
const server = http.createServer(app);

// SocketIO server setup
const io = socketIo(server);

// Connect to Neo4j database
const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'password')
);

// Register API endpoints

// Endpoint to search for friends of a user
app.get('/api/users/search', (req, res) => {
  const session = driver.session();

  // Get search query from request
  const { query } = req.query;

  // Construct Neo4j query
  const neoQuery = `
    MATCH (u:User)-[r:FRIEND_WITH]->(f:User)
    WHERE u.name CONTAINS $query
    RETURN f.name AS name, f.email AS email
  `;

  // Execute Neo4j query
  session.run(neoQuery, { query: query })
    .then((result) => {
      session.close();

      // Send search results back to client
      res.send(result.records);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Internal server error');
    });
});

// SocketIO setup
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  // Listen for search queries from clients
  socket.on('search', (query) => {
    console.log(`Received search query: ${query}`);

    const session = driver.session();

    // Construct Neo4j query
    const neoQuery = `
      MATCH (u:User)-[r:FRIEND_WITH]->(f:User)
      WHERE u.name CONTAINS $query
      RETURN f.name AS name, f.email AS email
    `;

    // Execute Neo4j query
    session.run(neoQuery, { query: query })
      .then((result) => {
        session.close();

        // Send search results back to client
        io.emit('search_results', result.records);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

// Start server
server.listen(3000, () => console.log('Server running on port 3000'));
