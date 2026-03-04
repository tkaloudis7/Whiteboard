//weather API
document.addEventListener("DOMContentLoaded", () => {

  const tempElement = document.querySelector("#temp-display");


  if (!tempElement) return;
  fetch("https://api.open-meteo.com/v1/forecast?latitude=37.98&longitude=23.72&current_weather=true")
    .then(response => response.json())
    .then(data => {
      const temp = data.current_weather.temperature;


      tempElement.innerText = `${temp} °C`;
    })
    .catch(error => {
      console.error("Error:", error);
      tempElement.innerText = "N/A";
    });
});

//dark mode button
const toggleBtn = document.getElementById("darkModeToggle");

//local storage check for previous data
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-bs-theme", "dark");
  if (toggleBtn) toggleBtn.innerText = "Light Mode";
}


if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const htmlElement = document.documentElement;

    if (htmlElement.getAttribute("data-bs-theme") === "dark") {
      //change to light mode
      htmlElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
      toggleBtn.innerText = "Dark Mode";
    } else {
      //change to dark mode
      htmlElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
      toggleBtn.innerText = "Light Mode";
    }
  });
}


//latest activity logic
const activityList = document.querySelector("#activityList");

//load data
if (activityList) {
  const savedActivity = localStorage.getItem("myActivity");
  if (savedActivity) {
    activityList.innerHTML = savedActivity;
  }
}

//log activity
function logActivity(message) {
  let currentActivity = localStorage.getItem("myActivity");
  if (!currentActivity) {
    currentActivity = "";
  }

  const newLog = "<li class='list-group-item'>" + message + "</li>";
  let allActivity = newLog + currentActivity;

  let logsArray = allActivity.split("</li>");
  let limitedActivity = "";
  for (let i = 0; i < 5; i++) {
    if (logsArray[i] && logsArray[i].trim() !== "") {
      limitedActivity += logsArray[i] + "</li>";
    }
  }

  //saves previous history
  localStorage.setItem("myActivity", limitedActivity);
}

//tasks page logic
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskTableBody = document.querySelector("#taskTableBody");
const taskNameInput = document.querySelector("#taskName");
const taskDateInput = document.querySelector("#taskDate");
const taskPriorityInput = document.querySelector("#taskPriority");

if (addTaskBtn) {

  //loads saved data
  const savedTasks = localStorage.getItem("myTasks");
  if (savedTasks) {
    taskTableBody.innerHTML = savedTasks;
  }

  //saves data on local storage
  function saveToLocalStorage() {
    localStorage.setItem("myTasks", taskTableBody.innerHTML);
  }

  addTaskBtn.addEventListener("click", () => {
    const taskName = taskNameInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskPriority = taskPriorityInput.value;

    if (taskName === "") {
      alert("Please enter a task name!");
      return;
    }

//populate with data and delete button
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${taskName}</td>
      <td>${taskDate}</td>
      <td>${taskPriority}</td>
      <td>Pending</td>
      <td class="text-center">
        <button class="btn btn-success btn-sm complete-btn">Complete</button>
        <button class="btn btn-warning btn-sm edit-btn">Edit</button>
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      </td>
    `;

    taskTableBody.appendChild(newRow);
    taskNameInput.value = "";
    taskDateInput.value = "";
    saveToLocalStorage();
    logActivity("Added new task: <strong>" + taskName + "</strong>");
  });

  //task buttons
  taskTableBody.addEventListener("click", (e) => {

    //delete button logic
    if (e.target.classList.contains("delete-btn")) {
      e.target.closest("tr").remove();
      saveToLocalStorage();
      logActivity("You deleted a task.");

      //status button logic
    } else if (e.target.classList.contains("complete-btn")) {
      const row = e.target.closest("tr");
      row.children[3].innerText = "Completed";
      row.classList.add("table-success");
      saveToLocalStorage();
      logActivity("Completed a task.");

      //edit button logic
    } else if (e.target.classList.contains("edit-btn")) {
      const row = e.target.closest("tr");
      const currentName = row.children[0].innerText;
      const newName = prompt("Edit task name:", currentName);

      if (newName !== null && newName.trim() !== "") {
        row.children[0].innerText = newName.trim();
        saveToLocalStorage();
        logActivity("Edited a task.");
      }
    }
  });
}

//pop up on contact form
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //extracts data from fields
    const name = document.querySelector("#fullname").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    //pop up confirmation
    alert("Message Sent Successfully!\n\nDetails::\nName: " + name + "\nEmail: " + email + "\nMessage: " + message);

    //deletes form after submission
    document.querySelector("#fullname").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#message").value = "";
    document.querySelector("#subject").value = "general";
  });
}
