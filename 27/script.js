const todoList = document.getElementById("todo-list");
const inprogressList = document.getElementById("inprogress-list");
const doneList = document.getElementById("done-list");

let draggedItem = null;

todoList.addEventListener("dragstart", handleDragStart);
todoList.addEventListener("dragover", handleDragOver);
todoList.addEventListener("drop", handleDrop);

inprogressList.addEventListener("dragstart", handleDragStart);
inprogressList.addEventListener("dragover", handleDragOver);
inprogressList.addEventListener("drop", handleDrop);

doneList.addEventListener("dragstart", handleDragStart);
doneList.addEventListener("dragover", handleDragOver);
doneList.addEventListener("drop", handleDrop);

function handleDragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = "move";
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function handleDrop(event) {
  event.preventDefault();
  if (event.target.nodeName === "LI") {
    event.target.parentNode.insertBefore(draggedItem, event.target);
  } else {
    event.target.appendChild(draggedItem);
  }
  draggedItem = null;
}

const newTaskInput = document.getElementById("new-task-input");
const newTaskDescription = document.getElementById("new-task-description");
const newTaskPriority = document.getElementById("new-task-priority");
const addTaskButton = document.getElementById("add-task-button");

addTaskButton.addEventListener("click", () => {
  if (
    !newTaskInput.value.trim() ||
    !newTaskDescription.value.trim() ||
    !newTaskPriority.value
  ) {
    alert("Please fill in all fields");
    return;
  }
  const newTaskText = newTaskInput.value;
  const newTaskDescriptionValue = newTaskDescription.value;
  const newTaskPriorityValue = newTaskPriority.value;

  const newTaskItem = document.createElement("li");
  newTaskItem.draggable = true;
  newTaskItem.textContent = newTaskText;

  const descriptionSpan = document.createElement("span");
  descriptionSpan.textContent = ` - ${newTaskDescriptionValue}`;
  const prioritySpan = document.createElement("span");
  prioritySpan.textContent = ` [${newTaskPriorityValue}]`;

  newTaskItem.appendChild(descriptionSpan);
  newTaskItem.appendChild(prioritySpan);

  newTaskItem.addEventListener("dragstart", handleDragStart);
  newTaskItem.addEventListener("dragover", handleDragOver);
  newTaskItem.addEventListener("drop", handleDrop);

  todoList.appendChild(newTaskItem);

  newTaskInput.value = "";
  newTaskDescription.value = "";
  newTaskPriority.value = "";
});
