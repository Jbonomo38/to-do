class Project {
    constructor(title, description, dueDate, priority, toDoList){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.toDoList = toDoList;
    }

    newToDo(toDoItem){
        this.toDoList.push(toDoItem);
    }

    deleteToDo(toDoItem){
        this.toDoList.splice(this.toDoList.indexOf(toDoItem), 1);
    }
}

class ToDoItem {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

// Testing
const toDoOne = new ToDoItem("Brush Teeth", "Brush your teeth", "06/19/2024", 0);
const toDoTwo = new ToDoItem("Cook Dinner", "Cook your dinner", "06/19/2024", 1);
const toDoThree = new ToDoItem("Wash Car", "Wash your car", "06/19/2024", 2);
const toDoFour = new ToDoItem("Go to bed", "Go to bed", "06/19/2024", 3);

const toDoList = [toDoOne, toDoTwo, toDoThree, toDoFour];

const ProjectOne = new Project("Project One", "Project One Description", "06/19/2024", 0, toDoList);    

const projectDiv = document.createElement("div");
projectDiv.textContent = ProjectOne.title;
projectDiv.innerHTML = ProjectOne.description;

document.body.appendChild(projectDiv);
