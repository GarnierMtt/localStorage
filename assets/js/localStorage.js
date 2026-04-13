const todoInput = document.getElementById("todoInput");
const todoAdd = document.getElementById("todoAdd");
const todoList = document.getElementById("todoList");
const filterInput = document.getElementById("filterInput");


function addToList(taskText, finished = false) { 
            //make new task in list from given text
    const newElement = document.createElement("li");
    const task = document.createElement("span");
    const todoDell = document.createElement("button");

    task.innerText = taskText;
    task.classList.add("task");
    task.classList.add("ms-1");

    todoDell.innerText = "supprimer";
    todoDell.classList.add("btn");
    todoDell.classList.add("btn-danger");
    todoDell.addEventListener("click", () => {
                //on delete btn click: delete coresponding task, save list
        newElement.remove();
        save();
        render();
    });

    newElement.appendChild(task);
    newElement.appendChild(todoDell);
    newElement.addEventListener("click", () => {
                //toggle finished satus
        newElement.classList.toggle("finished");
        save();
    });
    if (finished){
        newElement.classList.add("finished");
    }

    todoList.appendChild(newElement);
}

function save() { 
            //save list to local storage
    const tasks = document.querySelectorAll(".task");
    const taskList = [];
    tasks.forEach(task => {
        if (task.parentElement.classList.contains("finished")){
            taskList.push([task.innerText, true]);
        }else{
            taskList.push([task.innerText, false]);
        }
    });
    
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function render() {
            //empty then populate liste
    todoList.innerHTML = null;
    JSON.parse(localStorage.getItem("tasks")).forEach(task => addToList(task[0], task[1])); 
    filterInput.value = "toutes"
}

filterInput.addEventListener("change", () => {
    const tasks = todoList.childNodes;
    tasks.forEach(task => {
        task.classList.remove("hidden");
    });
    if(filterInput.value == "1"){
            tasks.forEach(task => {
            if(task.classList.contains("finished")){
                task.classList.add("hidden");
            }
        });
    }else if(filterInput.value == "2"){
        tasks.forEach(task => {
            if(!task.classList.contains("finished")){
                task.classList.add("hidden");
            }
        });
    }
});
    
todoAdd.addEventListener("click", () => { 
            //on add btn click: pars input text to new task, clear input, save list
    addToList(todoInput.value);
    todoInput.value = null;
    save();
    render();
});


document.getElementById("delAllBtn").addEventListener("click", () =>{
            //dell all tasks
    localStorage.removeItem("tasks");
    render();
});




render();
