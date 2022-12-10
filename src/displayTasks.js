import { projectList } from "./createProject";
import { addTask } from "./createTask";

// Event Listemers for Nav tabs and Projects
const navItemsEventListeners = () => {
    const navTabItems = document.querySelectorAll(".nav__item");
    navTabItems.forEach((item) => item.addEventListener("click", (e) => {
        highlightNavTab(e);
        displayHeader(e);
    }));

    const projectList = document.querySelectorAll(".nav__project-name");
    projectList.forEach((project) => {
        project.addEventListener("click", displayProjectTasks);
    });

    const inbox = document.querySelector(".nav__inbox");
    inbox.addEventListener("click", displayInbox);

    const important = document.querySelector(".nav__important");
    important.addEventListener("click", displayImportant);
};

const displayInbox = (e) => {
    resetTaskList();

    projectList.forEach((project) => {
        project.taskList.forEach((task) => {
            addTask(task.uuid, task.title, task.description, task.dueDate);
        });
    });

    checkForImportantTasks();
};

const displayImportant = () => {
    resetTaskList();

    projectList.forEach((project) => {
        project.taskList.forEach((task) => {
            if (task.important === true) {
                addTask(task.uuid, task.title, task.description, task.dueDate);
            }
        });
    });

    checkForImportantTasks();
};

const displayProjectTasks = (e) => {
    if (e.target.classList.contains("nav__remove-icon")) return;
    resetTaskList();

    let uuid = e.target.dataset.uuid;
    if (uuid === undefined) uuid = e.target.parentNode.dataset.uuid;
    const projectIndex = projectList.findIndex((object) => object.uuid === uuid);

    projectList[projectIndex].taskList.forEach((task) => {
        addTask(task.uuid, task.title, task.description, task.dueDate);
    });

    checkForImportantTasks();
};

const checkForImportantTasks = () => {
    const allTasks = document.querySelectorAll(".right-panel__task-item");
    const importantTasks = getImportantTasksArray();

    if (importantTasks.length === 0) return;

    for (const task of allTasks) {
        if (importantTasks.includes(task.dataset.uuid)) {
            const importantIcon = task.childNodes[2].childNodes[1];
            importantIcon.classList.add("task-item__important-icon--active");
        }
      }
};

const getImportantTasksArray = () => {
    const importantTasksArray = [];

    projectList.forEach((project) => {
        project.taskList.forEach((task) => {
            if (task.important === true) importantTasksArray.push(task.uuid);
        });
    });

    return importantTasksArray;
};

const highlightNavTab = (e) => {
    if (e.target.classList.contains("nav__remove-icon")) return;
    if (e.target.classList.contains("nav__add-new-project")) return;

    const allNavTabs = document.querySelectorAll(".nav__item");
    allNavTabs.forEach((tab) => tab.classList.remove("nav__item--active"));

    e.target.closest("li").classList.add("nav__item--active");
};

const displayHeader = (e) => {
    if (e.target.classList.contains("nav__add-new-project")) return;
    if (e.target.classList.contains("nav__remove-icon")) return;

    const content = document.querySelector(".right-panel");
    const headerTitle = document.createElement("h1");
    headerTitle.className = "right-panel__title";
    headerTitle.textContent = e.target.closest("li").innerText;

    resetHeaderTitle();
    content.prepend(headerTitle);
};

const resetHeaderTitle = () => {
    const content = document.querySelector(".right-panel");
    const title = document.querySelector(".right-panel__title");
    content.removeChild(title);
};

const resetTaskList = () => {
    const taskList = document.querySelector(".right-panel__task-list");
    const taskItems = document.querySelectorAll(".right-panel__task-item");

    taskItems.forEach(task => taskList.removeChild(task));
};

// This runs when Project is removed from Nav panel
const displayDefaultPage = () => {
    resetHeaderTitle();

    const content = document.querySelector(".right-panel");
    const headerTitle = document.createElement("h1");
    headerTitle.className = "right-panel__title";
    headerTitle.textContent = "Inbox";
    content.prepend(headerTitle);

    const inboxTab = document.querySelector(".nav__inbox");
    inboxTab.classList.add("nav__item--active");

    displayInbox();
};

export { navItemsEventListeners, displayInbox, displayDefaultPage }