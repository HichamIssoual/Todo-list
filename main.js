// Hunt The Element
let addTask = document.getElementById("add-task");
let task = document.querySelector(".todo-app-container .create-todo input");
let tasksContainer = document.querySelector(".tasks");
let appContainer = document.querySelector(".todo-app-container");
let isEmpty = 0;
// Trigger The function of save Data
// The Array
let arrTask = [];
let arrStatus = [];
if (window.localStorage.getItem("task")) {
  arrStatus = JSON.parse(window.localStorage.getItem("task"));
}
// create Function Add Task
function addTheTask() {
  if (task.value !== "") {
    let newTask = {
      id: Date.now(),
      title: task.value,
      status: false,
    };
    arrStatus.push(newTask);
    window.localStorage.setItem("task", JSON.stringify(arrStatus));
    let divTask = document.createElement("div");
    divTask.classList.add("task-container");
    let titleTask = document.createElement("span");
    let deleteTask = document.createElement("span");
    let complete = document.createElement("span");
    deleteTask.innerText = "Delete";
    deleteTask.className = "delete";
    titleTask.dataset.id = newTask.id;
    complete.innerText = "Done";
    complete.className = "done";
    titleTask.innerText = task.value;
    arrTask.push(task.value);
    divTask.append(titleTask);
    divTask.append(complete);
    divTask.append(deleteTask);
    tasksContainer.append(divTask);
    task.value = "";
    task.focus();
  }
}
addTask.onclick = addTheTask;
document.addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    e.target.parentElement.remove();
    arrStatus.splice(
      arrStatus.indexOf(e.target.previousElementSibling.textContent),
      1
    );
    window.localStorage.setItem("task", JSON.stringify(arrStatus));
    console.log(arrStatus);
  }
});
document.addEventListener("click", function (e) {
  if (e.target.className === "done") {
    e.target.previousElementSibling.style.textDecoration = "line-through";
    e.target.previousElementSibling.style.backgroundColor = "#00b862";
    e.target.previousElementSibling.style.opacity = ".4";
    let status = JSON.parse(localStorage.getItem("task"));
    status.forEach((ele) => {
      if (
        ele.title == e.target.previousElementSibling.textContent &&
        ele.id == e.target.previousElementSibling.dataset.id
      ) {
        ele.status = true;
      }
    });
    localStorage.setItem("task", JSON.stringify(status));
  }
});
saveData();
function saveData() {
  if (window.localStorage.getItem("task")) {
    if (tasksContainer.innerHTML !== "") {
      tasksContainer.innerHTML = "";
    }
    console.log(arrTask);
    arrStatus.forEach((ele) => {
      let divTask = document.createElement("div");
      divTask.classList.add("task-container");
      let titleTask = document.createElement("span");
      let deleteTask = document.createElement("span");
      let complete = document.createElement("span");
      let status = JSON.parse(localStorage.getItem("task"));
      deleteTask.innerText = "Delete";
      deleteTask.className = "delete";
      complete.innerText = "Done";
      complete.className = "done";
      titleTask.innerText = ele.title;
      titleTask.dataset.id = ele.id;
      status.forEach((ele) => {
        if (ele.id == titleTask.dataset.id && ele.status === true) {
          titleTask.style.textDecoration = "line-through";
          titleTask.style.backgroundColor = "#00b862";
          titleTask.style.opacity = ".4";
        }
      });
      divTask.append(titleTask);
      divTask.append(complete);
      divTask.append(deleteTask);
      tasksContainer.append(divTask);
    });
  }
}
// lets create feature to delete all
function deleteAll() {
  let deleteBtn = document.querySelector(".delete-all");
  deleteBtn.onclick = () => {
    tasksContainer.innerHTML = "";
    arrStatus = [];
    localStorage.clear();
  };
}
deleteAll();
