let username = "";

window.addEventListener("load", function () {
  username = prompt("Please enter your username:");
  sendMessage("Hello there!", "Obi Wan");
  sendMessage("General Kenobi!", "Grievous");
});

const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatHistory = document.querySelector(".chat-history");

sendButton.addEventListener("click", function () {
  const message = messageInput.value;
  if (message.trim() !== "") {
    sendMessage(message, username);
    messageInput.value = "";
  }
});

function sendMessage(message, sender) {
  const messageElement = document.createElement("div");
  if (sender === username) {
    messageElement.classList.add("chat-message");
  } else {
    messageElement.classList.add("chat-message", "other");
  }

  const senderSpan = document.createElement("span");
  senderSpan.classList.add("sender");
  senderSpan.textContent = `${sender}: `;
  messageElement.appendChild(senderSpan);

  const messageContentSpan = document.createElement("span");
  messageContentSpan.classList.add("message");
  messageContentSpan.textContent = message;
  messageElement.appendChild(messageContentSpan);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", () => {
    messageElement.remove();
  });
  messageElement.prepend(deleteButton);

  const editButton = document.createElement("button");
  editButton.textContent = "Update";
  editButton.classList.add("edit-btn");
  editButton.addEventListener("click", () => {
    const originalMessage = messageContentSpan.textContent;
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = originalMessage;

    messageContentSpan.replaceWith(inputField);

    let saveButton = messageElement.querySelector(".save-btn");
    if (!saveButton) {
      saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.classList.add("save-btn");
      messageElement.appendChild(saveButton);

      saveButton.addEventListener("click", () => {
        const updatedMessage = inputField.value;
        messageContentSpan.textContent = updatedMessage;

        inputField.replaceWith(messageContentSpan);

        saveButton.remove();
      });
    }
  });

  messageElement.prepend(editButton);

  if (sender !== username) {
    deleteButton.style.display = "none";
    editButton.style.display = "none";
  }

  chatHistory.appendChild(messageElement);

  chatHistory.scrollTop = chatHistory.scrollHeight;
}
