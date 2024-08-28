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

    // Update todo list if it exists
    const todoList = projectDiv.querySelector('ul');
    if (todoList) {
        storedProject.toDoList = Array.from(todoList.children).map(li => {
            const [title, dueDate] = li.textContent.split(' - Due: ');
            return { title, dueDate };
        });
    }

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
    return getProjectByID(projectID).toDoList.find(toDo => toDo.internalID === toDoID);
}

export { saveNewProject, updateProject, cleanDB, getProjectByID, getToDoItemByID };