import { lessons, initialTasks } from "./data.js";

// 1. Find the HTML elements we need
const lessonList = document.querySelector("#lesson-list");
const lessonCount = document.querySelector("#lesson-count");
const completedCount = document.querySelector("#completed-count");
const taskList = document.querySelector("#task-list");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");

// 2. Create the current task state.
let tasks = initialTasks.map((task) => ({ ...task }));

// 3. Render all lesson cards
function renderLessons() {
  lessonList.innerHTML = "";

  lessons.forEach((lesson) => {
    // Create a new lesson card
    const article = document.createElement("article");
    article.className = "lesson-card";

    const title = document.createElement("h3");
    title.textContent = lesson.title;

    const category = document.createElement("p");
    category.textContent = `Category: ${lesson.category}`;

    const status = document.createElement("p");
    status.textContent = `Status: ${lesson.status}`;

    article.append(title, category, status);
    lessonList.append(article);
  });

  lessonCount.textContent = lessons.length;
}

// 4. Render tasks and completion statistics.
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    label.append(checkbox, document.createTextNode(`${task.title}`));
    item.append(label);
    taskList.append(item);
  });

  completedCount.textContent = tasks.filter((task) => task.completed).length;
}

// 5. Handle the form submission.
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();

  if (!title) return;

  const newTask = {
    id: Date.now(),
    title: title,
    completed: false,
  };

  tasks.push(newTask);
  taskInput.value = "";

  renderTasks();
});

// 6. Initial page render
renderLessons();
renderTasks();
