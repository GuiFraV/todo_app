// GLOBALS SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

// EVENTS LISTENERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkButton);
filterOption.addEventListener("click", filterTodo);

// FUNCTIONS
function addTodo(event){
    event.preventDefault();

    // Create Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Create button
    const todoCheck = document.createElement("button");
    todoCheck.classList.add("todo-check");
    todoDiv.appendChild(todoCheck);

    // Add new Todo in todolist
    todoList.appendChild(todoDiv);

    // Reset todo input
    todoInput.value = "";
}

function checkButton(e) {
    const item = e.target;
    const todo = item.previousSibling;

    // uncomment if you want to understand the target event =>
    // console.log(item)
    
    if(item.classList[0] === "todo-check"){
        item.classList.toggle("todo-check-on");
        todo.classList.toggle("todo-item-completed");
    }
}

function filterTodo(e){
    const todoDiv = document.querySelector(".todo");
    const todo = todoDiv.childNodes;
    const test = e.target;
    
    console.log(todoDiv);
    console.log(todo);

    console.log(test);

    todo.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "active":
                if(todo.classList.contains("todo-item-completed")){
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
                break;
            case "Completed":
                if(!todo.classList.contains("todo-item-completed")){
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}