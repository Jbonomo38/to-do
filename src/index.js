import "./styles.css";
import { Project, toDoItem } from './objects.js';
import { saveNewProject, updateProject, cleanDB } from './storage.js';
import { displayProject, editProject, updateProjectHtml, deleteProject } from "./display.js";

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error('Projects container not found in the DOM');
        return;
    }

    if(Object.keys(localStorage).length === 0) {
        const defaultProject = new Project(0, "Project #1", "Add description here", "06/19/2024", 0, []);
        saveNewProject(defaultProject);
        displayProject(defaultProject, projectsContainer);
    } else {
        Object.keys(localStorage).forEach(key => {
            try {
                const project = JSON.parse(localStorage[key]);
                if (project && project.title && project.description) {
                    displayProject(project, projectsContainer);
                } else {
                    console.log(`Skipping invalid project data for key: ${key}`);
                }
            } catch (error) {
                console.error(`Error parsing project ${key}:`, error);
                delete localStorage[key];
            }
        });
    }

    attachEventListeners();
});

function attachEventListeners() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error('Projects container not found when attaching event listeners');
        return;
    }

    projectsContainer.addEventListener('click', (event) => {
        const projectElement = event.target.closest('.project');
        if (!projectElement) return;

        const projectID = projectElement.dataset.projectID;

        if (event.target.classList.contains('edit')) {
            if(event.target.textContent === "Edit") {
                editProject(projectID);
            } else {
                updateProjectHtml(projectID);
            }
        } else if (event.target.classList.contains('delete')) {
            deleteProject(projectID);
        } else if (event.target.classList.contains('toggle-todos')) {
            const todoList = projectElement.querySelector('.todo-list');
            todoList.classList.toggle('show');
        }
    });

    const newProjectButton = document.getElementById('new-project');
   
    if (newProjectButton) {
        newProjectButton.addEventListener('click', () => {
            console.log("New project button clicked");
            const highestID = Object.keys(localStorage).reduce((max, key) => {
                const projectID = JSON.parse(localStorage[key]).internalID || 0;
                return Math.max(max, projectID);
            }, 0);
            const newID = highestID + 1;
            const newProj = new Project(newID, "New Project", "Add description here", "06/19/2024", 0, []);
            displayProject(newProj, projectsContainer);
            saveNewProject(newProj);
        });
    };
}

// cleanDB();
console.log(localStorage);
// localStorage.clear();