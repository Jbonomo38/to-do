import { saveNewProject, updateProject } from "./storage";
import { displayProject } from "./display";

class Project {
    constructor(title, description, dueDate, priority, toDoList){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.toDoList = toDoList;
        saveNewProject(this);
    }

    setTitle(newTitle) {
        this.title = newTitle;
        updateProject(this);
    }

    setDescription(newDescription) {
        this.description = newDescription;
        updateProject(this);
    }

    setDueDate(newDueDate) {
        this.dueDate = newDueDate;
        updateProject(this);
    }

    setPriority(newPriority) {
        this.priority = newPriority;
        updateProject(this);
    }

    newToDo(toDoItem){
        this.toDoList.push(toDoItem);
        updateProject(this);
    }

    deleteToDo(toDoItem){
        this.toDoList.splice(this.toDoList.indexOf(toDoItem), 1);
        updateProject(this);
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

// exports
export { Project, ToDoItem };


// Testing
// const toDoOne = new ToDoItem("Brush Teeth", "Brush your teeth", "06/19/2024", 0);
// const toDoTwo = new ToDoItem("Cook Dinner", "Cook your dinner", "06/19/2024", 1);
// const toDoThree = new ToDoItem("Wash Car", "Wash your car", "06/19/2024", 2);
// const toDoFour = new ToDoItem("Go to bed", "Go to bed", "06/19/2024", 3);

// const toDoList = [toDoOne, toDoTwo, toDoThree, toDoFour];

// const ProjectOne = new Project("Project One", "Project One Description", "06/19/2024", 0, toDoList);    

// const projectDiv = document.createElement("div");
// projectDiv.textContent = ProjectOne.title;

// document.body.appendChild(projectDiv);
// console.log(localStorage.getItem("Project One"));
// ProjectOne.setDescription("Yooo just updated");
// console.log(localStorage.getItem("Project One"));
// projectDiv.appendChild(displayProject(ProjectOne));



