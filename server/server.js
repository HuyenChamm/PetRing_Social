const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
const session = require('./utils/db');

const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors: {
    origin: "http://localhost:3000"
  }
}
);
io.on("connection", (socket) => {
  // console.log(socket);
  
});


//  routers
const userRoutes = require('./router/userRoutes');
const postRoutes = require('./router/postRoutes');
const petRoutes = require('./router/petRoutes');
const friendRoutes = require('./router/friendRoutes');
const commentRoutes = require('./router/commentRoutes');

const likeRoutes = require('./router/likeRoutes');
const searchRoutes = require('./router/searchRoutes');

app.use((req, res, next) => {
  req.session = session;
  req.io = io ;
  next();

})

app.use(cors());

// API
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/pet', petRoutes);
app.use('/api/friend', friendRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/search', searchRoutes);


/////////////
server.listen(port, () => {
  console.log(`SERVER ${port} is run`);
})