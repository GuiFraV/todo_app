// GLOBALS SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const counterDisplay = document.querySelector(".counter");
const clearButton = document.querySelector(".items-clear");

// EVENTS LISTENERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkButton);
filterOption.addEventListener("click", filterTodo);
clearButton.addEventListener("click", clearCompleted);

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

    // Delete todo DIV
    todoDiv.addEventListener("mouseenter", function(){
        const crossTodo = document.createElement("button");
        crossTodo.classList.add("cross");
        todoDiv.appendChild(crossTodo);
    });

    todoDiv.addEventListener("mouseleave", function(){
        const crossTodoNone = document.querySelector(".cross");
        crossTodoNone.classList.remove("cross");
    });

    // Add new Todo in todolist
    todoList.appendChild(todoDiv);

    // Reset todo input
    todoInput.value = "";

    // Counter items
    numberTodoDiv = document.querySelectorAll(".todo").length
    counterDisplay.innerHTML = numberTodoDiv;
 
}

function checkButton(e) {
    const item = e.target;
    const todo = item.previousSibling;
    const todoDiv = item.parentNode;

    // uncomment if you want to understand the target event =>
    // console.log(item)
    
    if(item.classList[0] === "todo-check"){
        item.classList.toggle("todo-check-on");
        todo.classList.toggle("todo-item-completed");
        todoDiv.classList.toggle("completed");
        todoDiv.classList.toggle("check");
    }

    // DeleteButton
    if(item.classList[0] === "cross"){
        // Counter Delete Item
        numberTodoDiv = document.querySelectorAll(".todo").length -1;
        counterDisplay.innerHTML = numberTodoDiv;
        todoDiv.remove();
    }
}

function filterTodo(e){
    const todo = todoList.childNodes;
    const target = e.target.getAttribute('name');

    const allFilter = document.querySelector(".select");
    const activeFilter = document.querySelector(".active");
    const completedFilter = document.querySelector(".collection");

    todo.forEach(function(todo){
        switch(target){
            case "all":
                todo.style.display = "flex";
                allFilter.classList.add("all");
                activeFilter.classList.remove("blue");
                completedFilter.classList.remove("blue");
                break;
            case "active":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                    activeFilter.classList.add("blue");
                    allFilter.classList.remove("all");
                    completedFilter.classList.remove("blue");
                }else {
                    todo.style.display = "none";
                }
                break; 
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                    completedFilter.classList.add("blue");
                    allFilter.classList.remove("all");
                    activeFilter.classList.remove("blue");
                }
                break;
        }
    })
}

function clearCompleted(){

    const numberCompletedTodoDiv = document.querySelectorAll(".check");

    for(const elem of numberCompletedTodoDiv){
        elem.remove();
    }
    // Counter items
    numberTodoDiv = document.querySelectorAll(".todo").length;
    counterDisplay.innerHTML = numberTodoDiv;
}

