import "./styles.css";
import { Project, ToDoItem } from './objects.js';
import { saveNewProject, updateProject, getProjectByID, cleanDB } from './storage.js';
import { 
    displayProject, 
    editProject, 
    updateProjectHtml, 
    deleteProject, 
    displayToDoList, 
    displayToDoItem,
    editToDoItem,
    deleteToDoItem
} from "./display.js";

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error('Projects container not found in the DOM');
        return;
    }

    if(Object.keys(localStorage).length === 0) {
        const defaultProject = new Project(0, "Project #1", "Add description here", "06/19/2024", 0, [
            new ToDoItem(0, "title", "description", "today", "1"),
            new ToDoItem(1, "title2", "description2", "tomorrow", "2")
        ]);
        saveNewProject(defaultProject);
        displayProject(defaultProject, projectsContainer);
    } else {
        Object.keys(localStorage).forEach(key => {
            if (key !== 'appTitle') {
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
            }
        });
    }

    attachEventListeners();

    const appTitle = document.getElementById('app-title');

    // Save the title whenever it's changed
    appTitle.addEventListener('input', () => {
        localStorage.setItem('appTitle', appTitle.textContent);
        console.log("Title saved to local storage: ", appTitle.textContent);
    });

    // Load saved title on page load
    const savedTitle = localStorage.getItem('appTitle');
    if (savedTitle) {
        appTitle.textContent = savedTitle;
    } else {
        // If no saved title exists, save the current text content
        localStorage.setItem('appTitle', appTitle.textContent);
    }
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
        } else if (event.target.classList.contains('delete-todo')) {
            const todoItem = event.target.closest('.todo-item');
            if (todoItem) {
                const todoId = todoItem.dataset.todoId;
                if (todoId) {
                    deleteToDoItem(projectID, todoId);
                } else {
                    console.error('Todo item does not have a todoId in its dataset');
                }
            } else {
                console.error('Could not find parent todo-item element');
            }
        } else if (event.target.classList.contains('toggle-todos')) {
            displayToDoList(projectID);
        } else if (event.target.classList.contains('edit-todo')) {
            const todoID = event.target.closest('.todo-item').dataset.todoId;
            if(event.target.textContent === "Edit") {
                editToDoItem(projectID, todoID);
            } else {
                updateProjectHtml(projectID, todoID);
            }
        }
    });

    const newProjectButton = document.getElementById('new-project');
   
    if(newProjectButton) {
        newProjectButton.addEventListener('click', () => {
            console.log("New project button clicked");
            const highestID = Object.keys(localStorage).reduce((max, key) => {
                try {
                    const projectData = JSON.parse(localStorage[key]);
                    const projectID = projectData.internalID ? parseInt(projectData.internalID, 10) : 0;
                    return Math.max(max, projectID);
                } catch (error) {
                    console.error(`Error parsing localStorage item with key "${key}":`, error);
                    return max;
                }
            }, 0);
            const newID = highestID + 1;
            const newProj = new Project(newID, "New Project", "Add description here", "06/19/2024", 0, []);
            displayProject(newProj, projectsContainer);
            saveNewProject(newProj);
        });
    };

    projectsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('new-todo-button')) {
            console.log("New to-do item button clicked");
            const projectElement = event.target.closest('.project');
            const projectID = projectElement.dataset.projectID;
            const project = getProjectByID(projectID);
            
            const newToDoID = project.toDoList.length + 1;
            const newToDo = new ToDoItem(newToDoID, "New To-Do", "Add description here", "06/19/2024", "Low");
            
            const todoItemsContainer = projectElement.querySelector('.todo-items');
            const newTodoButton = todoItemsContainer.querySelector('.new-todo-button');
            
            // Create the new to-do item element
            const newToDoElement = document.createElement('div');
            displayToDoItem(newToDo, newToDoElement);
            
            // Insert the new to-do item before the "New" button
            todoItemsContainer.insertBefore(newToDoElement, newTodoButton);
            
            project.toDoList.push(newToDo);
            localStorage.setItem(projectID, JSON.stringify(project));
        }
    });
}

console.log(getProjectByID(1));

// cleanDB();
console.log(localStorage);
// localStorage.clear();