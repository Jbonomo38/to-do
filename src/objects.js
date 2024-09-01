import { updateProject } from "./storage";

class Project {
    constructor(internalID, title, description, dueDate, priority, toDoList){
        this.internalID = String(internalID);
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.toDoList = toDoList || [];
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
    constructor(internalID, title, description, dueDate, priority){
        this.internalID = String(internalID);
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export { Project, ToDoItem };




