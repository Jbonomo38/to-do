import { saveNewProject, updateProject } from "./storage";
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
        <div class="todo-list">
            <ul>
                ${project.toDoList
                  .map(
                    (todo) => `
                    <li class="todo-item ${todo.completed ? "completed" : ""}">
                        ${todo.title} - Due: ${todo.dueDate}
                    </li>
                `
                  )
                  .join("")}
            </ul>
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
    if (child.tagName !== "BUTTON") {
      child.contentEditable = bool;
    }
  });

  // Specifically target the edit button
  const editButton = projectDiv.querySelector(".project-actions .edit");
  if (editButton) {
    editButton.textContent = bool ? "Save" : "Edit";
  }

  return projectID;
}

export { displayProject, editProject, updateProjectHtml, deleteProject };
