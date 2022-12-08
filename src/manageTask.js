import { projectList, saveToMemory } from "./createProject";

const prioritiseTask = (e, taskUUID) => {
    let taskIndex;
    let projectIndex;

    for (let i = 0; i < projectList.length; i++) {
        let findIndex = projectList[i].taskList.findIndex((task) => task.uuid === taskUUID);
        if (findIndex >= 0) {
            taskIndex = findIndex;    
            projectIndex = i;
            break;
        }
    }
    let importance = projectList[projectIndex].taskList[taskIndex].important;

    if (importance === false) {
        e.target.classList.add("task-item__important-icon--active");
        projectList[projectIndex].taskList[taskIndex].important = true;
        
    } else {
        e.target.classList.remove("task-item__important-icon--active");
        projectList[projectIndex].taskList[taskIndex].important = false;
    }
    
    saveToMemory();
};

const editTask = () => {
    //code to come  
};

const removeTask = (e, taskUUID) => {
    const projectUUID = document.querySelector(".nav__item--active").dataset.uuid;
    const projectIndex = projectList.findIndex(
        (project) => project.uuid === projectUUID);

    const taskIndex = projectList[projectIndex].taskList.findIndex(
        (task) => task.uuid === taskUUID);

    projectList[projectIndex].taskList.splice(taskIndex, 1);
    saveToMemory();

    const taskList = document.querySelector(".right-panel__task-list");
    const thisTask = e.target.parentNode.parentNode;
    taskList.removeChild(thisTask);
};


export { prioritiseTask, editTask, removeTask };