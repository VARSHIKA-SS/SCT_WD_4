const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const undoBtn = document.getElementById("undoBtn");

let lastAction = null; // To store last deleted/completed task

// Add Task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;

  if (taskText === "") return;

  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
    <span>${taskText} ${taskDate ? `<small>(${taskDate})</small>` : ""}</span>
    <div class="task-buttons">
      <button class="complete-btn">Complete</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  // Complete
  li.querySelector(".complete-btn").addEventListener("click", () => {
    lastAction = { action: "complete", element: li, text: li.innerHTML };
    li.classList.toggle("completed");
    enableUndo();
  });

  // Edit
  li.querySelector(".edit-btn").addEventListener("click", () => {
    const newTask = prompt("Edit task:", taskText);
    if (newTask) li.querySelector("span").textContent = newTask;
  });

  // Delete
  li.querySelector(".delete-btn").addEventListener("click", () => {
    lastAction = { action: "delete", element: li, text: li.innerHTML };
    taskList.removeChild(li);
    enableUndo();
  });

  taskList.appendChild(li);
  taskInput.value = "";
  dateInput.value = "";
});

// Undo
undoBtn.addEventListener("click", () => {
  if (!lastAction) return;

  if (lastAction.action === "delete") {
    const li = document.createElement("li");
    li.className = "task";
    li.innerHTML = lastAction.text;
    taskList.appendChild(li);
  } else if (lastAction.action === "complete") {
    lastAction.element.classList.toggle("completed");
  }

  lastAction = null;
  undoBtn.disabled = true;
});

function enableUndo() {
  undoBtn.disabled = false;
}
