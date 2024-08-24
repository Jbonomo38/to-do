function displayProject(project) {
    const proj = document.createElement("div");
    proj.classList.add("project");

    const projTitle = document.createElement("h2");
    projTitle.textContent = project.title;
    proj.appendChild(projTitle);

    const projDescription = document.createElement("p");
    projDescription.textContent = `Description: ${project.description}`;
    proj.appendChild(projDescription);

    const projDueDate = document.createElement("p");
    projDueDate.textContent = `Due Date: ${project.dueDate}`;
    proj.appendChild(projDueDate);

    const projPriority = document.createElement("p");
    projPriority.textContent = `Priority: ${project.priority}`;
    proj.appendChild(projPriority);

    if (project.toDoList.length > 0) {
        const todoList = document.createElement("ul");
        project.toDoList.forEach(todo => {
            const todoItem = document.createElement("li");
            todoItem.textContent = `${todo.title} - Due: ${todo.dueDate}`;
            todoList.appendChild(todoItem);
        });
        proj.appendChild(todoList);
    }

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    proj.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    editButton.classList.add("delete");
    proj.appendChild(deleteButton);

    document.body.appendChild(proj);
    return proj;
}

export { displayProject };
