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
    todoDiv.draggable = true;
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

    // Call Drag and Drop Function with a todoDiv
    addEventsDragAndDrop(todoDiv);

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
    console.log(todoDiv)
    
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
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
};

function dragEnter(e) {
    this.classList.add('over');
}

function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function dragDrop(e) {
    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
}
    return false;
}

function dragEnd(e) {
    var listItens = document.querySelectorAll('.draggable');
    [].forEach.call(listItens, function(item) {
        item.classList.remove('over');
    });
    this.style.opacity = '1';
}

function addEventsDragAndDrop(el) {
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
   