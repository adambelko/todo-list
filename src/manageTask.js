import {showAddTaskForm} from "./createTask";

const prioritiseTask = () => {
    //code to come
};

const editTask = () => {
    //code to come  
};

const removeTask = (e) => {
    const taskList = document.querySelector(".right-panel__task-list");
    const thisTask = e.target.parentNode.parentNode;
    taskList.removeChild(thisTask);
};


export {prioritiseTask, editTask, removeTask};