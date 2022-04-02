// Variables of TOdo DOM
const a = document.getElementById("Circle");

// When User click on button => get value in the input
a.onclick = function() {
    var inputValue = document.getElementById("CreateSentence").value;
    console.log(inputValue);
    // Reset input value
    var inputValue = document.getElementById("CreateSentence").value = " ";
}

// When User click on button => put a new todo on list
a.onclick = function() {
    
    var inputValue = document.getElementById("CreateSentence").value;

    // Create an "li" node:
    const node = document.createElement("li");
    node.innerHTML = '<span></span>';
    
    // Create a text node:
    const textnode = document.createTextNode(inputValue);
    
    // Append the text node to the "li" node:
    node.appendChild(textnode);
    
    // Append the "li" node to the list:
    document.getElementById("BodyToDo").appendChild(node);

    // Reset input value
    var inputValue = document.getElementById("CreateSentence").value = " ";
        
}
