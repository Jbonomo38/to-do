import { Project, toDoItem } from './objects.js';

function saveNewProject (project) {
    if(localStorage.getItem(project.internalID)) {
        console.log(`Project already exists: ${project.internalID}`);
    } else {
        console.log(`Saving new project: ${project.internalID}`);
        localStorage.setItem(project.internalID, JSON.stringify(project));
    }
}

function updateProject(projectID) {
    const projectDiv = document.querySelector(`[data-project-i-d="${projectID}"]`);
    if (!projectDiv) {
        console.error(`Project with ID ${projectID} not found in HTML`);
        return;
    }

    const storedProject = JSON.parse(localStorage.getItem(projectID));
    if (!storedProject) {
        console.error(`Project with ID ${projectID} not found in localStorage`);
        return;
    }

    storedProject.title = projectDiv.querySelector('.project-title').textContent;
    storedProject.description = projectDiv.querySelector('.project-description').textContent;
    storedProject.dueDate = projectDiv.querySelector('.project-due-date').textContent.replace('Due Date: ', '');
    storedProject.priority = projectDiv.querySelector('.project-priority').textContent.replace('Priority: ', '');

    localStorage.setItem(projectID, JSON.stringify(storedProject));
}

function updateToDoItem(projectID, toDoID) {
    const projectDiv = document.querySelector(`[data-project-i-d="${projectID}"]`);
    const toDoItemDiv = projectDiv?.querySelector(`.todo-item[data-todo-id="${toDoID}"]`);
    const storedProject = JSON.parse(localStorage.getItem(projectID));
    console.log("Stored project:", storedProject);

    const toDoItemIndex = storedProject.toDoList.findIndex(item => item.internalID === toDoID);
    if (toDoItemIndex === -1) {
        console.error(`To-Do item with ID ${toDoID} not found in project's to-do list`);
        return;
    }

    storedProject.toDoList[toDoItemIndex] = {
        ...storedProject.toDoList[toDoItemIndex],
        title: toDoItemDiv.querySelector('.todo-title').textContent,
        description: toDoItemDiv.querySelector('.todo-description').textContent,
        dueDate: toDoItemDiv.querySelector('.todo-due-date').textContent,
        priority: toDoItemDiv.querySelector('.todo-priority').textContent
    };

    localStorage.setItem(projectID, JSON.stringify(storedProject));
}

function cleanDB() {
    Object.keys(localStorage).forEach(key => {
        Array.from(document.children).forEach(child => {
            if(child.dataset.internalID === key) {
                console.log(`Deleting ${key}`);
                delete localStorage[key];
            };
        });
    });
}

function getProjectByID(projectID) {
    return JSON.parse(localStorage.getItem(projectID));
}

function getToDoItemByID(projectID, toDoID) {
    const project = getProjectByID(projectID);
    return project.toDoList.find(toDo => toDo.internalID === toDoID);
}

export { saveNewProject, updateProject, cleanDB, getProjectByID, getToDoItemByID, updateToDoItem };