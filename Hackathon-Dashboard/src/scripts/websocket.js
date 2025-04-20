import WebSocket from "ws";

const socket = new WebSocket("ws://localhost:8080/ws"); // replace with your websocket server URL

let connectionTimeout = setTimeout(() => {
  if (socket.readyState !== WebSocket.OPEN) {
    console.error("failed to connect to websocket server");
    socket.terminate(); // force close the socket
  }
}, 10000); // wait 10 seconds for the connection to establish

socket.on("open", () => {
  clearTimeout(connectionTimeout); // clear the timeout if connection is successful
  console.log("connected to websocket server");
  socket.send("{'message': 'Hello World'}"); // send a message to the server
});

socket.on("message", (data) => {
  // interpret the received data as plaintext
  const message = data.toString("utf-8");
  console.log("received from server:", message); // log received messages as plaintext
});

socket.on("close", (code, reason) => {
  console.log(`connection closed (code: ${code}, reason: ${reason || "none"})`);
});

socket.on("error", (error) => {
  console.error("websocket error:", error);
});
