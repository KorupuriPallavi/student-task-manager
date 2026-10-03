const inputBox = document.getElementById("input-box");
const priority = document.getElementById("priority");
const listContainer = document.getElementById("list-container");


// Add a new task
function addTask() {

    if (inputBox.value === '') {

        alert("You must write something!");

    } else {

        let li = document.createElement("li");

        li.innerHTML = inputBox.value + " - " + priority.value;

        listContainer.appendChild(li);

        let span = document.createElement("span");

        span.innerHTML = "\u00d7";

        li.appendChild(span);
    }

    inputBox.value = "";

    saveData();

    updateStats();
}


// Complete or delete a task
listContainer.addEventListener("click", function(e) {

    if (e.target.tagName === "LI") {

        e.target.classList.toggle("checked");

        saveData();

        updateStats();

    }

    else if (e.target.tagName === "SPAN") {

        e.target.parentElement.remove();

        saveData();

        updateStats();
    }

}, false);


// Save tasks to Local Storage
function saveData() {

    localStorage.setItem("data", listContainer.innerHTML);

}


// Display saved tasks
function showTask() {

    listContainer.innerHTML = localStorage.getItem("data") || "";

}


// Show all tasks
function showAll() {

    let tasks = listContainer.children;

    for (let task of tasks) {

        task.style.display = "block";

    }
}


// Show pending tasks
function showPending() {

    let tasks = listContainer.children;

    for (let task of tasks) {

        if (task.classList.contains("checked")) {

            task.style.display = "none";

        } else {

            task.style.display = "block";

        }
    }
}


// Show completed tasks
function showCompleted() {

    let tasks = listContainer.children;

    for (let task of tasks) {

        if (task.classList.contains("checked")) {

            task.style.display = "block";

        } else {

            task.style.display = "none";

        }
    }
}


// Update task statistics
function updateStats() {

    let total = listContainer.children.length;

    let completed =
        listContainer.querySelectorAll(".checked").length;

    let pending = total - completed;

    document.getElementById("task-stats").innerHTML =
        "Total: " + total +
        " | Completed: " + completed +
        " | Pending: " + pending;
}


// Load saved tasks
showTask();


// Update statistics when page loads
updateStats();