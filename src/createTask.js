import {projectList, saveToMemory } from "./createProject";
import {prioritiseTask, editTask, removeTask} from "./manageTask";

const addTaskEventListeners = () => {
    const addTask = document.querySelectorAll(".right-panel__add-task");
    addTask.forEach((el) => el.addEventListener("click", showAddTaskForm));

    const AddTaskFormCancellBtn = document.querySelector(".add-task__cancell-btn");
    AddTaskFormCancellBtn.addEventListener("click", hideAddTaskForm);

    const addTaskFormAddBtn = document.querySelector(".add-task__add-btn");
    addTaskFormAddBtn.addEventListener("click", processAddTaskFormInput);
};

const showAddTaskForm = () => {
    const addTaskForm = document.querySelector(".right-panel__task-form");
    addTaskForm.classList.add("right-panel__task-form--active");
    document.querySelector(".task-form__title").focus();
};

const hideAddTaskForm = () => {
    const addTaskForm = document.querySelector(".right-panel__task-form");
    addTaskForm.classList.remove("right-panel__task-form--active");
    clearFormInput();
};

const clearFormInput = () => {
    document.querySelector(".task-form__title").value = "";
    document.querySelector(".task-form__description").value = "";
};

//Factory for new tasks
const CreateTask = (ID, title, description, dueDate) => {

    return {ID, title, description, dueDate};
};

// here comes logic for reading tasks from memory

const processAddTaskFormInput = (e) => {
    const projectID = getProjectID();
    const ID = getTaskID();
    const title = getTaskInputValue("title");
    const description = getTaskInputValue("description");
    const dueDate = getTaskDueDate();
    
    const newTask = CreateTask(ID, title, description, dueDate);
    projectList[projectID].taskList.push(newTask);
    console.log(projectList);
    saveToMemory();
    addTask(e);
};

const getProjectID = () => document.querySelector(".nav__item--active").dataset.index;
const getTaskID = () => document.querySelectorAll(".right-panel__task-item").length;

const getTaskDueDate = () => {
    const dueDate = document.querySelector(".task-form__date").value;
    return (dueDate === "") ? "No Due Date" : dueDate;  
};

const addTask = (e) => {
    e.preventDefault();
    const taskList = document.querySelector(".right-panel__task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "right-panel__task-item";
    taskList.appendChild(taskItem);
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    taskItem.appendChild(checkbox);

    const textWrapper = document.createElement("div");
    textWrapper.className = "right-panel__task-text-wrapper";
    taskItem.appendChild(textWrapper);

    const taskTitle = document.createElement("div");
    taskTitle.className = "right-panel__task-title";
    textWrapper.appendChild(taskTitle);
    taskTitle.appendChild(getTaskInputValue("title"));

    const taskDescript = document.createElement("div");
    taskDescript.className = "right-panel__task-description";
    textWrapper.appendChild(taskDescript);
    taskDescript.appendChild(getTaskInputValue("description"));

    const iconWrapper = document.createElement("div");
    iconWrapper.className = "right-panel__task-icons";
    taskItem.appendChild(iconWrapper);

    const taskDueDate = document.createElement("div");
    taskDueDate.className = "right-panel__task-due-date";
    taskDueDate.textContent = getTaskDueDate();
    iconWrapper.appendChild(taskDueDate);

    const iconImportant = document.createElement("img");
    iconImportant.src = "../dist/img/nav_priority.png";
    iconImportant.className = "task-item__important-icon";
    iconWrapper.appendChild(iconImportant);
    iconImportant.addEventListener("click", prioritiseTask);

    const iconEdit = document.createElement("img");
    iconEdit.src = "../dist/img/edit.png";
    iconEdit.className = "task-item__edit-icon";
    iconWrapper.appendChild(iconEdit);
    iconEdit.addEventListener("click", editTask);

    const iconRemove = document.createElement("img");
    iconRemove.src = "../dist/img/nav_remove.png";
    iconRemove.className = "task-item__remove-icon";
    iconWrapper.appendChild(iconRemove);
    iconRemove.addEventListener("click", removeTask);

    hideAddTaskForm();
    addTaskEventListeners();
};

const getTaskInputValue = (name) => {
    const formInput = document.querySelector(`.task-form__${name}`);
    return document.createTextNode(makeFirstLetterCap(formInput.value));
};

const makeFirstLetterCap = (formInput) => {
    return formInput.charAt(0).toUpperCase() + formInput.slice(1);
};

export {addTaskEventListeners, showAddTaskForm};