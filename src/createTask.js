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
const CreateTask = (uuid, title, description, dueDate) => {

    return {uuid, title, description, dueDate};
};

const processAddTaskFormInput = (e) => {
    e.preventDefault();
    const projectIndex = getProjectIndex();
    const id = self.crypto.randomUUID();
    const title = getTaskInputValue("title");
    const description = getTaskInputValue("description");
    const dueDate = getTaskDueDate();
    
    const newTask = CreateTask(id, title, description, dueDate);
    projectList[projectIndex].taskList.push(newTask);
    saveToMemory();
    addTask(id, title, description, dueDate);
};

const getProjectIndex = () => {
    const uuid = document.querySelector(".nav__item--active").dataset.uuid;
    const projectIndex = projectList.findIndex((object) => object.uuid === uuid);
    return projectIndex;
};

const getTaskDueDate = () => {
    const dueDate = document.querySelector(".task-form__date").value;
    return (dueDate === "") ? "No Due Date" : dueDate;  
};

const displayTaskList = (index) => {
    projectList[index].taskList.forEach(task => {
        addTask(task.title, task.description, task.dueDate);
    });
};


const addTask = (id, title, description, dueDate) => {
    const taskList = document.querySelector(".right-panel__task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "right-panel__task-item";
    taskItem.dataset.uuid = id;
    taskList.appendChild(taskItem);
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    taskItem.appendChild(checkbox);

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
    return makeFirstLetterCap(formInput.value);
};

const makeFirstLetterCap = (formInput) => {
    return formInput.charAt(0).toUpperCase() + formInput.slice(1);
};

export { addTaskEventListeners, addTask };