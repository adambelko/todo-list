import { projectList, saveToMemory } from "./createProject";

const prioritiseTask = () => {
    console.log("hey")
};

const editTask = () => {
    //code to come  
};

const removeTask = (e) => {
    const projectUUID = document.querySelector(".nav__item--active").dataset.uuid;
    const projectIndex = projectList.findIndex(
        (project) => project.uuid === projectUUID);

    const taskUUID = e.target.parentNode.parentNode.dataset.uuid;
    const taskIndex = projectList[projectIndex].taskList.findIndex(
        (task) => task.uuid === taskUUID);

    projectList[projectIndex].taskList.splice(taskIndex, 1);
    saveToMemory();

    const taskList = document.querySelector(".right-panel__task-list");
    const thisTask = e.target.parentNode.parentNode;
    taskList.removeChild(thisTask);
};


export { prioritiseTask, editTask, removeTask };