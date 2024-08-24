import "./styles.css";
import { Project, toDoItem } from './objects.js';
import { saveNewProject } from './storage.js';
import { displayProject } from "./display.js";

// Default Project
const defaultProject = new Project("Project #1", "Add description here", "06/19/2024", 0, []);
saveNewProject(defaultProject);
displayProject(defaultProject);
console.log(defaultProject);