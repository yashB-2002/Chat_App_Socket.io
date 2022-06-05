let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
const path = require("path");
// const { ppid } = require("process");
const realFile = path.join(__dirname, "../");
// console.log(realFile);
app.use(express.static(realFile));
app.get("/", (req, res) => {
  res.sendFile(realFile + "/index.html");
});
// connection between user and server starts from here
let totalUsers = {}; // keep track of users who are joing the meeting
io.on("connection", (socket) => {
  // established connection
  socket.on("newUserJoined", (uname) => {
    // using newUserJoined event i.e emitted from client side
    // console.log(uname);
    // storing users
    totalUsers[socket.id] = uname;
    // adding event when new user joined
    socket.broadcast.emit("userhasjoined", uname); // broadcast to all users that this particular user has joined the meeting
    socket.on("disconnect", () => {
      // disconnection or user left
      // console.log("user left" + uname);
      socket.broadcast.emit("userhasleft", uname);
    });
  });
  socket.on("msgSendbyUser", (currMsg) => {
    // console.log(currMsg);
    // broadcast user msg to all other users
    socket.broadcast.emit("recievedByServer", {
      username: totalUsers[socket.id],
      msg: currMsg,
    });
  });
});
// listening to port 3000
http.listen(3000, () => {
  console.log("hello");
});
