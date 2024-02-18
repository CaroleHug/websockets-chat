import { Server } from "socket.io";
  
  const io = new Server({
    cors: {
      origin: "*"
    }
  });

  let retroboard = [];
  
  io.on('connection', socket => {
    console.log(`connect ${socket.id}`);
    io.emit('current retroboard', retroboard);

    socket.on('add post', post => {
      const newPost = {id: retroboard.length, post: post.post};
      retroboard.push(newPost);
      io.emit('new post added', newPost);
    });

    socket.on('add new action', action => {
      retroboard.find(post => post.id === action.id).action = action.action;
      io.emit('new action added', retroboard.find(post => post.id === action.id));
    });
  
    socket.on('disconnect', reason => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });
  });

  io.listen(3000);