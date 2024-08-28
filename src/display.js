import { saveNewProject, updateProject, getProjectByID } from "./storage";
import { Project } from "./objects";

function displayProject(project, container) {
  if (!container) {
    console.error("Container element not provided to displayProject");
    return;
  }

  const projectElement = document.createElement("div");
  projectElement.classList.add("project");
  projectElement.dataset.projectID = project.internalID;

  projectElement.innerHTML = `
        <div class="project-title">${project.title}</div>
        <div class="project-description">${project.description}</div>
        <div class="project-due-date">${project.dueDate}</div>
        <div class="project-priority">${project.priority}</div>
        <div class="project-actions">
            <button class="edit" id="${project.internalID}">Edit</button>
            <button class="delete" id="${project.internalID}">Delete</button>
            <button class="toggle-todos" id="${
              project.internalID
            }">To-Do List</button>
        </div>
        `;

  container.appendChild(projectElement);
}

function editProject(projectID) {
  const editButton = document.querySelector(
    `[data-project-i-d="${projectID}"] .project-actions .edit`
  );
  console.log("Edit button:", editButton);

  switchEditable(true, projectID);
}

function updateProjectHtml(projectID) {
  switchEditable(false, projectID);
  console.log(`Saving project ${projectID}`);
  updateProject(projectID);
}

function deleteProject(projectID) {
    document.querySelector(`[data-project-i-d="${projectID}"]`).remove();
    localStorage.removeItem(projectID);
}

function switchEditable(bool, projectID) {
  const projectDiv = document.querySelector(
    `[data-project-i-d="${projectID}"]`
  );
  console.log("Project div:", projectDiv);

  if (!projectDiv) {
    console.error(`Project with ID ${projectID} not found`);
    return;
  }

  Array.from(projectDiv.children).forEach((child) => {
    if (!child.classList.contains('project-actions') && !child.classList.contains('todo-list')) {
      child.contentEditable = bool;
    }
  });

  // Ensure to-do list items are not editable
  projectDiv.querySelectorAll('.todo-item').forEach(item => item.contentEditable = false);

  const editButton = projectDiv.querySelector(".project-actions .edit");
  if (editButton) {
    editButton.textContent = bool ? "Save" : "Edit";
  }

  return projectID;
}

function displayToDoList(projectID) {
  const projectDiv = document.querySelector(`[data-project-i-d="${projectID}"]`);
  const project = getProjectByID(projectID);

  let todoListContainer = projectDiv.querySelector('.todo-list');
  if (!todoListContainer) {
    todoListContainer = document.createElement('div');
    todoListContainer.classList.add('todo-list');
    projectDiv.appendChild(todoListContainer);
  }

  todoListContainer.innerHTML = `
    <div class="todo-headers">
      <div class="todo-header-item">Title</div>
      <div class="todo-header-item">Description</div>
      <div class="todo-header-item">Due Date</div>
      <div class="todo-header-item">Priority</div>
      <div class="todo-header-item">Actions</div>
    </div>
    <div class="todo-items"></div>
  `;

  const todoItemsContainer = todoListContainer.querySelector('.todo-items');

  if (project.toDoList.length) {
    project.toDoList.forEach((toDo) => {
      displayToDoItem(toDo, todoItemsContainer);
    });
  } else {
    const newTodoButton = document.createElement('button');
    newTodoButton.textContent = 'Add New';
    newTodoButton.classList.add('new-todo-button');
    todoItemsContainer.appendChild(newTodoButton);
  }
}

function displayToDoItem(toDo, todoItemsContainer) {
  const toDoElement = document.createElement("div");
  toDoElement.classList.add("todo-item");
  toDoElement.innerHTML = `
    <div class="todo-title">${toDo.title}</div>
    <div class="todo-description">${toDo.description}</div>
    <div class="todo-due-date">${toDo.dueDate}</div>
    <div class="todo-priority">${toDo.priority}</div>
    <div class="todo-actions">
      <button class="edit-todo" id="${toDo.internalID}">Edit</button>
      <button class="delete-todo" id="${toDo.internalID}">Delete</button>
    </div>
  `;
  todoItemsContainer.appendChild(toDoElement);
}

function editToDoItem(projectID, toDoID) {
    const toDoItem = getToDoItemByID(projectID, toDoID);
    
}

export { displayProject, editProject, updateProjectHtml, deleteProject, displayToDoList, displayToDoItem };