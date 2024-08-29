import {
  saveNewProject,
  updateProject,
  getProjectByID,
  getToDoItemByID,
  updateToDoItem,
} from "./storage";
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
            <button class="toggle-todos" id="${project.internalID}">To-Do List</button>
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

function updateProjectHtml(projectID, toDoID) {
  switchEditable(false, projectID, toDoID);
  console.log(`Saving project ${projectID}`);
  if (toDoID) {
    updateToDoItem(projectID, toDoID);
  } else {
    updateProject(projectID);
  }
}

function deleteProject(projectID) {
  document.querySelector(`[data-project-i-d="${projectID}"]`).remove();
  localStorage.removeItem(projectID);
}

function switchEditable(bool, projectID, toDoID) {
  const projectDiv = document.querySelector(
    `[data-project-i-d="${projectID}"]`
  );
  console.log("Project div:", projectDiv);

  if (!projectDiv) {
    console.error(`Project with ID ${projectID} not found`);
    return;
  }

  if (toDoID) {
    console.log("To-Do ID:", toDoID);
    const todoContainer = projectDiv.querySelector(".todo-list");
    const todoItems = Array.from(todoContainer.querySelectorAll(".todo-item"));
    todoItems.forEach((item) => {
      if (item.dataset.todoId === toDoID) {
        item.querySelector(".todo-title").contentEditable = bool;
        item.querySelector(".todo-description").contentEditable = bool;
        item.querySelector(".todo-due-date").contentEditable = bool;
        item.querySelector(".todo-priority").contentEditable = bool;

        const editButton = item.querySelector(".todo-actions .edit-todo");
        if (editButton) {
          editButton.textContent = bool ? "Save" : "Edit";
        }

        return toDoID;
      }
    });
  } else {
    Array.from(projectDiv.children).forEach((child) => {
      if (
        !child.classList.contains("project-actions") &&
        !child.classList.contains("todo-list")
      ) {
        child.contentEditable = bool;
      }
    });

    // Ensure to-do list items are not editable
    projectDiv
      .querySelectorAll(".todo-item")
      .forEach((item) => (item.contentEditable = false));

    const editButton = projectDiv.querySelector(".project-actions .edit");
    if (editButton) {
      editButton.textContent = bool ? "Save" : "Edit";
    }

    return projectID;
  }
}

function displayToDoList(projectID) {
  const projectDiv = document.querySelector(
    `[data-project-i-d="${projectID}"]`
  );
  const project = getProjectByID(projectID);

  let todoListContainer = projectDiv.querySelector(".todo-list");
  if (!todoListContainer) {
    todoListContainer = document.createElement("div");
    todoListContainer.classList.add("todo-list");
    projectDiv.appendChild(todoListContainer);
  } else {
    todoListContainer.remove();
    return;
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

  const todoItemsContainer = todoListContainer.querySelector(".todo-items");

  project.toDoList.forEach((toDo) => {
    displayToDoItem(toDo, todoItemsContainer);
  });

  // Always add the "New" button
  const newTodoButton = document.createElement("button");
  newTodoButton.textContent = "New";
  newTodoButton.classList.add("new-todo-button");
  todoItemsContainer.appendChild(newTodoButton);
}

function displayToDoItem(toDo, todoItemsContainer) {
  const toDoElement = document.createElement("div");
  toDoElement.classList.add("todo-item");
  toDoElement.dataset.todoId = toDo.internalID;
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
  switchEditable(true, projectID, toDoID);
}

function deleteToDoItem(projectID, toDoID) {
  // Remove the to-do item from the DOM
  const toDoElement = document.querySelector(`[data-todo-id="${toDoID}"]`);
  if (toDoElement) {
    toDoElement.remove();
  } else {
    console.error(`To-Do item with ID ${toDoID} not found in the DOM`);
  }

  // Remove the to-do item from localStorage
  const project = JSON.parse(localStorage.getItem(projectID));
  if (project) {
    const updatedToDoList = project.toDoList.filter(
      (item) => item.internalID !== toDoID
    );
    project.toDoList = updatedToDoList;
    localStorage.setItem(projectID, JSON.stringify(project));
  } else {
    console.error(`Project with ID ${projectID} not found in localStorage`);
  }
}

export {
  displayProject,
  editProject,
  updateProjectHtml,
  deleteProject,
  displayToDoList,
  displayToDoItem,
  editToDoItem,
  deleteToDoItem,
};
