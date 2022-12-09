import { projectList, saveToMemory } from "./createProject";

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

const editTask = () => {
    //code to come  
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

const getIndexData = (taskUUID) => {
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

    return {taskIndex, projectIndex};
};

export { prioritiseTask, editTask, removeTask };