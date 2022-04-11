// GLOBALS SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const counterDisplay = document.querySelector(".counter");
const clearButton = document.querySelector(".items-clear");
const div = document.querySelectorAll(".todo");

// EVENTS LISTENERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkButton);
filterOption.addEventListener("click", filterTodo);
clearButton.addEventListener("click", clearCompleted);

// DOM EVENTS LOADED LISTENERS and FUNCTIONS
document.addEventListener('DOMContentLoaded', () => {
    // Counter
    numberTodoDiv = document.querySelectorAll(".todo").length
    counterDisplay.innerHTML = numberTodoDiv;
});

// Add cross on todo DIV
var todoDivLoaded = document.querySelectorAll('.todo');

[...todoDivLoaded].forEach(function(e){

    e.addEventListener("mouseenter", function(){
        const crossTodo = document.createElement("button");
        crossTodo.classList.add("cross");
        e.appendChild(crossTodo);
    });
    
    e.addEventListener("mouseleave", function(){
        const crossTodoNone = document.querySelector(".cross");
        crossTodoNone.classList.remove("cross");
    });

});


// FUNCTIONS
function addTodo(event){
    event.preventDefault();

    // Create Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.draggable = true;
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

    // Call Drag and Drop Function with a todoDiv parameter
    addEventsDragAndDrop(todoDiv);

    // Reset todo input
    todoInput.value = "";

    // Counter items
    numberTodoDiv = document.querySelectorAll(".todo").length
    counterDisplay.innerHTML = numberTodoDiv;
 
}

function checkButton(e) {
    const item = e.target;
    const todo = item.previousElementSibling;
    const todoDiv = item.parentNode;

    // uncomment if you want to understand the target event =>
    // console.log(button);
    
        if(item.classList[0] === "todo-check"){
            item.classList.add("todo-check-on");
            item.classList.remove("todo-check");
            todo.classList.add("todo-item-completed");
            todoDiv.classList.add("completed");
            todoDiv.classList.add("check");
        }else{
            item.classList.add("todo-check");
            item.classList.remove("todo-check-on");
            todo.classList.remove("todo-item-completed");
            todoDiv.classList.remove("completed");
            todoDiv.classList.remove("check");
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
    const todo = todoList.children;
    const target = e.target.getAttribute('name');

    // console.log(todo);

    const allFilter = document.querySelector(".select");
    const activeFilter = document.querySelector(".active");
    const completedFilter = document.querySelector(".collection");

    Array.from(todo).forEach(function(todo){
        // console.log(todo);
        // console.log(target);
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

// Drag and Drop Functions :
function dragStart(e) {
    dragSrcEl = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', dragSrcEl.innerHTML);
};

function dragEnter(e) {
    e.target.classList.add('over');
}

function dragLeave(e) {
    e.stopPropagation();
    dragSrcEl.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function dragDrop(e) {
   li = document.querySelector(".todo-item")
    if (dragSrcEl != li) {
        dragSrcEl.innerHTML = e.target.innerHTML;
        console.log(dragSrcEl);
        e.target.innerHTML = e.dataTransfer.getData('text/html');
}
    return false;
}

function dragEnd(e) {
    var listItens = document.querySelectorAll('.draggable');
    [].forEach.call(listItens, function(item) {
        item.classList.remove('over');
    });
}

function addEventsDragAndDrop(el) {
    // console.log(el);
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragenter', dragEnter, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false); 
}

var listItems = document.querySelectorAll(".todo-item");
    [].forEach.call(listItems, function(item) {
        addEventsDragAndDrop(item);
});
   