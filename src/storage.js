import { Project, toDoItem } from './objects.js';

function saveNewProject (project) {
    localStorage[`${project.title}`] = JSON.stringify(project);
}

function updateProject (project) {
    localStorage[`${project.title}`] = JSON.stringify(project);
}

export { saveNewProject, updateProject };