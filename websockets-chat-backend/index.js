import { Server } from "socket.io";
  
  const io = new Server({
    cors: {
      origin: "*"
    }
  });

  let users = [];
  
  io.on('connection', socket => {
    console.log(`connect ${socket.id}`);

    if(users.length>0) {
      io.emit('new user', {users});
    }

    socket.on('add userName', userName => {
      users.push(userName);
      io.emit('new user', {users});
    });
  
    socket.on('disconnect', reason => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });
  });

  io.listen(3000);