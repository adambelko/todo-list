import { projectList, saveToMemory } from "./createProject";
import { showTaskForm } from "./createTask";

const prioritiseTask = (e, taskUUID) => {
    const indexes = getIndexData(taskUUID);
    const taskIndex = indexes.taskIndex;
    const projectIndex = indexes.projectIndex;
    
    let important = projectList[projectIndex].taskList[taskIndex].important;

    if (important === false) {
        e.target.classList.add("task-item__important-icon--active");
        projectList[projectIndex].taskList[taskIndex].important = true;
        
    } else {
        e.target.classList.remove("task-item__important-icon--active");
        projectList[projectIndex].taskList[taskIndex].important = false;
    }
    
    saveToMemory();
};

const editTask = (e, title, description, dueDate) => {
    highlightTask(e);
    highlightTaskEditIcon(e);
    showTaskForm();
    showTaskFormValues(title, description, dueDate);
};

const removeTask = (e, taskUUID) => {
    const indexes = getIndexData(taskUUID);
    const taskIndex = indexes.taskIndex;
    const projectIndex = indexes.projectIndex;

    projectList[projectIndex].taskList.splice(taskIndex, 1);
    saveToMemory();

    const taskList = document.querySelector(".right-panel__task-list");
    const thisTask = e.target.parentNode.parentNode;
    taskList.removeChild(thisTask);
};

const highlightTask = (e) => {
    resetHighlightedTask();
    const taskLiEl = e.target.parentNode.parentNode;
    taskLiEl.classList.add("right-panel__task-item--active");
};

const resetHighlightedTask = () => {
    const highTask = document.querySelectorAll(".right-panel__task-item--active");
    highTask.forEach((task) => {
        task.classList.remove("right-panel__task-item--active");
    });
};

const highlightTaskEditIcon = (e) => {
    resetHighlightedTaskEditIcon();
    e.target.classList.add("task-item__edit-icon--active");
};

const resetHighlightedTaskEditIcon = () => {
    const allIcons = document.querySelectorAll(".task-item__edit-icon--active");
    allIcons.forEach((icon) => {
        icon.classList.remove("task-item__edit-icon--active");
    });
};

const showTaskFormValues = (title, description, dueDate) => {
    const taskForm = document.querySelector(".right-panel__task-form");
    taskForm.classList.add("right-panel__task-form-edit");

    const taskTitle = document.querySelector(".task-form__title");
    taskTitle.value = title;

    const taskDescription = document.querySelector(".task-form__description");
    taskDescription.value = description;

    const taskDueDate = document.querySelector(".task-form__date");
    taskDueDate.value = getTaskDueDate(dueDate);
};

const updateTaskValues = (taskUUID, title, description, dueDate) => {
    const indexes = getIndexData(taskUUID);
    const taskIndex = indexes.taskIndex;
    const projectIndex = indexes.projectIndex;

    projectList[projectIndex].taskList[taskIndex].title = title;
    projectList[projectIndex].taskList[taskIndex].description = description;
    projectList[projectIndex].taskList[taskIndex].dueDate = dueDate;
    saveToMemory();
};

const getTaskDueDate = (date) => date === "No Due Date" ? "" : date;

const getIndexData = (taskUUID) => {
    let taskIndex;
    let projectIndex;

    for (let i = 0; i < projectList.length; i++) {
        let findIndex = projectList[i].taskList.findIndex((task) => {
            return task.uuid === taskUUID;
        });
        if (findIndex >= 0) {
            taskIndex = findIndex;
            projectIndex = i;
            break;
        }
    }
    return {taskIndex, projectIndex};
};

export { prioritiseTask, editTask, removeTask, 
    updateTaskValues, resetHighlightedTask, resetHighlightedTaskEditIcon };