const socket = io();
const msgCont = document.getElementById("messageBox");
const inputBox = document.getElementById("sendMsg");
const form = document.getElementById("formtag");
const yourname = prompt("your good name please!!");
function addInPage(msg, pos) {
  const elem = document.createElement("div");
  elem.classList.add("message");
  elem.classList.add(pos);
  elem.innerText = msg;
  msgCont.appendChild(elem);
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const ipmsg = inputBox.value;
  addInPage(` You : ${ipmsg}`, "right");
  socket.emit("msgSendbyUser", ipmsg);
  inputBox.value = "";
});
socket.emit("newUserJoined", yourname);
socket.on("userhasjoined", (uName) => {
  addInPage(`${uName} has joined the meeting!!`, "center");
});
socket.on("recievedByServer", (d) => {
  addInPage(`${d.username} : ${d.msg}`, "left");
});
socket.on("userhasleft", (uName) => {
  addInPage(`${uName} has joined the meeting!!`, "center");
});
