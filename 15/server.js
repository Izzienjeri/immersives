const express = require("express");
const { WebSocketServer } = require("ws");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

const server = app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

const wss = new WebSocketServer({ server });
const sessions = {};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "createSession") {
      const sessionId = uuidv4();
      sessions[sessionId] = {
        clients: [ws],
        drawingData: [],
      };

      if (!sessionId) {
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Failed to create session.",
          })
        );
        return;
      }
      ws.sessionId = sessionId;
      ws.send(JSON.stringify({ type: "sessionCreated", sessionId }));
    }

    if (data.type === "joinSession") {
      const { sessionId } = data;
      if (sessions[sessionId]) {
        sessions[sessionId].clients.push(ws);
        ws.sessionId = sessionId;

        ws.send(
          JSON.stringify({
            type: "initialDraw",
            drawData: sessions[sessionId].drawingData,
          })
        );

        ws.send(JSON.stringify({ type: "sessionJoined", sessionId }));
      } else {
        ws.send(
          JSON.stringify({ type: "error", message: "Invalid session ID" })
        );
      }
    }

    if (data.type === "draw") {
      const { sessionId, drawData } = data;
      if (sessions[sessionId]) {
        sessions[sessionId].drawingData.push(drawData);
        sessions[sessionId].clients.forEach((client) => {
          client.send(JSON.stringify({ type: "draw", drawData }));
        });
      }
    }
    if (data.type === "clearCanvas") {
      const { sessionId } = data;
      if (sessions[sessionId]) {
        sessions[sessionId].drawingData = [];
        sessions[sessionId].clients.forEach((client) => {
          client.send(JSON.stringify({ type: "clearCanvas" }));
        });
      }
    }
  });

  ws.on("close", () => {
    if (ws.sessionId) {
      if (sessions[ws.sessionId]) {
        sessions[ws.sessionId].clients = sessions[ws.sessionId].clients.filter(
          (client) => client !== ws
        );
      }
    }
  });
});
