//Selectors
const inputText = document.getElementById("inputTasks")
const inputDate = document.getElementById("inputDate")
const inputTime = document.getElementById("inputTime")
const containerElements = document.querySelector(".containerElements")
const bnt_save = document.querySelector(".btn_save")
const btn_clear = document.querySelector(".btn_clear")
const message=document.querySelector(".message")
const filterOption = document.querySelector(".filter-todo")



//Envents Listener
document.addEventListener("DOMContentLoaded", getLocalStorage)
bnt_save.addEventListener('click', function () {

    if (inputText.value===""|| inputDate.value===""||inputTime.value==="" )
    {
       return message.innerText="cannot be blank"
    }
    createElements()
    clearElements()
})
btn_clear.addEventListener("click",function () {
  deleteTask() 
})
containerElements.addEventListener("click", deleteCheckEdit)
filterOption.addEventListener("click", filterTodo)


//Functions
function createElements() {
    const noteDiv = document.createElement("div")
    const taskInput = document.createElement("span")
    const taskDate = document.createElement("p")
    const tasktime = document.createElement("p")

    noteDiv.classList.add("noteDiv")

    noteDiv.appendChild(taskInput)
    noteDiv.appendChild(taskDate)
    noteDiv.appendChild(tasktime)

    taskInput.innerHTML = inputText.value
    taskDate.innerHTML = inputDate.value
    tasktime.innerHTML = inputTime.value

    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = `<i class="fas fa-check"></i>`
    deleteButton.classList.add("complete-btn")
    noteDiv.appendChild(deleteButton);

    const trashButton = document.createElement("button")
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`
    trashButton.classList.add("trash-btn")
    noteDiv.appendChild(trashButton)

    const editButton = document.createElement("button")
    editButton.innerHTML = `<i class="fas fa-pen"></i>`
    editButton.classList.add("edit-btn")
    noteDiv.appendChild(editButton)
    containerElements.appendChild(noteDiv)

    noteDiv.classList.add("noteDiv")
    saveLocalStorage(inputText.value+""+inputDate.value+""+inputTime.value);


}
function clearElements() {
    inputText.value = ""
    inputDate.value = ""
    inputTime.value = ""

}

function deleteCheckEdit(e) {
    const item = e.target;
  
    if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
      todo.classList.add("fall")
      removeLocalStorage(todo)
      todo.addEventListener("transitionend", e => {
        todo.remove();
      });
    }
    if (item.classList[0] === "complete-btn") {
      const todo = item.parentElement
      todo.classList.toggle("completed")
    }
    if (item.classList[0] === "edit-btn") {

      const todo = item.parentElement

    }
  }

  function filterTodo(e) {
    const todos = containerElements.childNodes;
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex"
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex"
          } else {
            todo.style.display = "none"
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex"
          } else {
            todo.style.display = "none"
          }
      }
    });
  }

  function saveLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  function removeLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  function getLocalStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo) {
      const noteDiv = document.createElement("div")
      noteDiv.classList.add("noteDiv")

      const taskInput = document.createElement("textarea")
      taskInput.innerText = todo
      noteDiv.appendChild(taskInput)
      inputText.value = ""

      const deleteButton = document.createElement("button")
      deleteButton.innerHTML = `<i class="fas fa-check"></i>`
      deleteButton.classList.add("complete-btn")
      noteDiv.appendChild(deleteButton)
  
      const trashButton = document.createElement("button")
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`
      trashButton.classList.add("trash-btn")
      noteDiv.appendChild(trashButton)
  
      const editButton = document.createElement("button")
      editButton.innerHTML = `<i class="fas fa-pen"></i>`
      editButton.classList.add("edit-btn")
      noteDiv.appendChild(editButton)
      containerElements.appendChild(noteDiv)
    });
  }
  function deleteTask() {
    containerElements.innerHTML=""
    
  }