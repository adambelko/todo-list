import { format, parseISO } from "date-fns";
import { projectList, saveToMemory } from "./createProject";
import { prioritiseTask, editTask, removeTask, updateTaskValues,
    resetHighlightedTask, resetHighlightedTaskEditIcon,
    checkTaskCheckbox } from "./manageTask";

import { displayCurrentPage } from "./displayTasks";

const addTaskEventListeners = () => {
    const addTask = document.querySelectorAll(".right-panel__add-task");
    addTask.forEach((el) => el.addEventListener("click", showTaskForm));

    const taskFormCancelBtn = document.querySelector(".add-task__cancell-btn");
    taskFormCancelBtn.addEventListener("click", hideTaskForm);

    const taskFormAddBtn = document.querySelector(".add-task__add-btn");
    taskFormAddBtn.addEventListener("click", processTaskFormInput);
};

const showTaskForm = () => {
    const addTaskForm = document.querySelector(".right-panel__task-form");
    addTaskForm.classList.add("right-panel__task-form--active");
    document.querySelector(".task-form__title").focus();
};

const hideTaskForm = () => {
    const addTaskForm = document.querySelector(".right-panel__task-form");
    addTaskForm.classList.remove("right-panel__task-form--active");
    clearFormInput();
    resetHighlightedTask();
    resetHighlightedTaskEditIcon();
};

const clearFormInput = () => {
    document.querySelector(".task-form__title").value = "";
    document.querySelector(".task-form__description").value = "";
};

//Factory for new tasks
const CreateTask = (uuid, title, description, dueDate) => {
    const checked = false;
    const important = false;

    return {uuid, title, description, dueDate, checked, important};
};

const processTaskFormInput = (e) => {
    e.preventDefault();    
    const projectIndex = getProjectIndex();
    const id = self.crypto.randomUUID();
    const title = getTaskInputValue("title");
    const description = getTaskInputValue("description");
    const dueDate = getTaskDueDate();

    // In case we are using the form for editing a specific task
    const taskUUID = checkForActiveEditIcon();
    if (taskUUID !== false){
        updateTaskValues(taskUUID, title, description, dueDate);
        hideTaskForm();
        return displayCurrentPage(e);
    }

    // Adding a fresh new task
    const newTask = CreateTask(id, title, description, dueDate);
    projectList[projectIndex].taskList.push(newTask);
    saveToMemory();
    addTask(id, title, description, dueDate);
    hideTaskForm();
};

const getProjectIndex = () => {
    let projectUUID = document.querySelector(".nav__item--active");
    projectUUID = projectUUID.dataset.uuid;

    const projectIndex = projectList.findIndex((project) => {
        return project.uuid === projectUUID;
    });
    return projectIndex;
};

const getTaskDueDate = () => {
    const input = document.querySelector(".task-form__date").value;
    const dueDate = parseISO(input);
    return (dueDate === "") ? "No Due Date" : format(dueDate, "dd/MM/YYY");
};

const addTask = (id, title, description, dueDate) => {
    const taskList = document.querySelector(".right-panel__task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "right-panel__task-item";
    taskItem.dataset.uuid = id;
    taskList.appendChild(taskItem);
    
    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.className = "right-panel__task-checkbox";
    taskItem.appendChild(taskCheckbox);
    taskCheckbox.addEventListener("click", () => checkTaskCheckbox(id));

    const textWrapper = document.createElement("div");
    textWrapper.className = "right-panel__task-text-wrapper";
    taskItem.appendChild(textWrapper);

    const taskTitle = document.createElement("div");
    taskTitle.className = "right-panel__task-title";
    taskTitle.textContent = title;
    textWrapper.appendChild(taskTitle);

    const taskDescript = document.createElement("div");
    taskDescript.className = "right-panel__task-description";
    taskDescript.textContent = description;
    textWrapper.appendChild(taskDescript);

    const iconWrapper = document.createElement("div");
    iconWrapper.className = "right-panel__task-icons";
    taskItem.appendChild(iconWrapper);

    const taskDueDate = document.createElement("div");
    taskDueDate.className = "right-panel__task-due-date";
    taskDueDate.textContent = dueDate;
    iconWrapper.appendChild(taskDueDate);

    const iconImportant = document.createElement("img");
    iconImportant.src = "../dist/img/nav_priority.png";
    iconImportant.className = "task-item__important-icon";
    iconWrapper.appendChild(iconImportant);
    iconImportant.addEventListener("click", (e) => prioritiseTask(e, id));

    const iconEdit = document.createElement("img");
    iconEdit.src = "../dist/img/edit.png";
    iconEdit.className = "task-item__edit-icon";
    iconWrapper.appendChild(iconEdit);
    iconEdit.addEventListener("click", (e) => {
        editTask(e, title, description, dueDate)
    });

    const iconRemove = document.createElement("img");
    iconRemove.src = "../dist/img/nav_remove.png";
    iconRemove.className = "task-item__remove-icon";
    iconWrapper.appendChild(iconRemove);
    iconRemove.addEventListener("click", (e) => removeTask(e, id));

    addTaskEventListeners();
};

const checkForActiveEditIcon = () => {
    const editIcon = document.querySelector(".task-item__edit-icon--active");
    if (!editIcon) return false;
    const uuid = editIcon.parentNode.parentNode.dataset.uuid;
    if (editIcon) return uuid;
};

const getTaskInputValue = (name) => {
    const formInput = document.querySelector(`.task-form__${name}`);
    return makeFirstLetterCap(formInput.value);
};

const makeFirstLetterCap = (formInput) => {
    return formInput.charAt(0).toUpperCase() + formInput.slice(1);
};

export { addTaskEventListeners, addTask, showTaskForm };