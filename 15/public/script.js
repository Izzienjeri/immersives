const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const brushSizeRange = document.getElementById("brushSize");
const createSessionBtn = document.getElementById("createSession");
const joinSessionBtn = document.getElementById("joinSession");
const sessionKeyInput = document.getElementById("sessionKey");
const notificationContainer = document.getElementById("notification-container");
const clearCanvasBtn = document.getElementById("clearCanvas");

let currentColor = "#000000";
let brushSize = 5;
let isDrawing = false;
let startX, startY;
let sessionId = null;
let ws;

ctx.strokeStyle = currentColor;
ctx.lineWidth = brushSize;
ctx.lineCap = "round";

colorPicker.addEventListener("change", (event) => {
  currentColor = event.target.value;
  ctx.strokeStyle = currentColor;
});

brushSizeRange.addEventListener("input", (event) => {
  brushSize = event.target.value;
  ctx.lineWidth = brushSize;
});

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.textContent = message;
  notificationContainer.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showNotification("Session key copied to clipboard!", "success");
  } catch {
    showNotification("Failed to copy session key", "error");
  }
}

function draw(x1, y1, x2, y2, color, size) {
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  if (sessionId && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "clearCanvas", sessionId }));
  }
}

function sendDrawData(startX, startY, x, y) {
  if (!sessionId) {
    showNotification(
      "Please create or join a session before drawing.",
      "error"
    );
    return;
  }

  const drawData = {
    startX,
    startY,
    x,
    y,
    color: currentColor,
    size: brushSize,
  };
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "draw", sessionId, drawData }));
  }
  draw(startX, startY, x, y, currentColor, brushSize);
}

function handleMove(event) {
  if (isDrawing) {
    const x =
      event.offsetX ||
      (event.touches && event.touches[0].clientX - canvas.offsetLeft);
    const y =
      event.offsetY ||
      (event.touches && event.touches[0].clientY - canvas.offsetTop);
    sendDrawData(startX, startY, x, y);
    startX = x;
    startY = y;
  }
  event.preventDefault();
}

function handleStart(event) {
  if (!sessionId) {
    showNotification(
      "Please create or join a session before drawing.",
      "error"
    );
    return;
  }
  isDrawing = true;
  startX =
    event.offsetX ||
    (event.touches && event.touches[0].clientX - canvas.offsetLeft);
  startY =
    event.offsetY ||
    (event.touches && event.touches[0].clientY - canvas.offsetTop);
  event.preventDefault();
}

function handleEnd() {
  isDrawing = false;
  ctx.beginPath();
}

canvas.addEventListener("mousedown", handleStart);
canvas.addEventListener("mouseup", handleEnd);
canvas.addEventListener("mousemove", handleMove);

canvas.addEventListener("touchstart", handleStart);
canvas.addEventListener("touchend", handleEnd);
canvas.addEventListener("touchmove", handleMove);

function setupWebSocket(onMessageCallback, onErrorCallback) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close();
  }
  ws = new WebSocket(`ws://${location.host}`);

  ws.onopen = () => {
    console.log("connection opened");

    if (sessionId) {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "joinSession", sessionId: sessionId }));
      }
    }
  };

  ws.onmessage = (message) => {
    try {
      const data = JSON.parse(message.data);
      onMessageCallback(data);
    } catch (error) {
      console.error("Error parsing websocket message", error);
      showNotification("Error parsing message from server", "error");
    }
  };

  ws.onclose = () => {
    console.log("CLOSING WEB SOCKET RECONNECTION REQUIRED IF NEEDED");
  };
  ws.onerror = (error) => {
    console.error("WebSocket Error:", error);
    onErrorCallback(error);
  };
}

function handleSessionMessage(data) {
  if (data.type === "sessionCreated") {
    sessionId = data.sessionId;
    sessionKeyInput.value = sessionId;
    copyToClipboard(sessionId);
    showNotification(`Session Created! Key: ${sessionId}`, "success");
  } else if (data.type === "sessionJoined") {
    sessionId = data.sessionId;
    showNotification(`Joined Session: ${sessionId}`, "success");
  } else if (data.type === "initialDraw") {
    data.drawData.forEach((drawItem) => {
      draw(
        drawItem.startX,
        drawItem.startY,
        drawItem.x,
        drawItem.y,
        drawItem.color,
        drawItem.size
      );
    });
  } else if (data.type === "draw") {
    const { startX, startY, x, y, color, size } = data.drawData;
    draw(startX, startY, x, y, color, size);
  } else if (data.type === "clearCanvas") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  } else if (data.type === "error") {
    showNotification(`Error creating session: ${data.message}`, "error");
    sessionId = null;
  }
}

function handleSessionError(error) {
  showNotification(`Error creating session: ${error.message}`, "error");
  sessionId = null;
}

createSessionBtn.addEventListener("click", () => {
  setupWebSocket(handleSessionMessage, handleSessionError);
  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "createSession" }));
  };
});

joinSessionBtn.addEventListener("click", () => {
  const key = sessionKeyInput.value;
  if (!key) {
    showNotification("Please enter a session key.", "error");
    return;
  }
  setupWebSocket(handleSessionMessage, handleSessionError);

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "joinSession", sessionId: key }));
  };
});

clearCanvasBtn.addEventListener("click", clearCanvas);
