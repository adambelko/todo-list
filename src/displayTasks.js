import { projectList } from "./createProject";
import { addTask } from "./createTask";
import { getTaskDueDate } from "./manageTask";
import { isToday, parseISO, addDays, isWithinInterval } from 'date-fns'

// Event Listeners for Nav tabs and Projects
const navItemsEventListeners = () => {
    const navTabItems = document.querySelectorAll(".nav__item");
    navTabItems.forEach((item) => item.addEventListener("click", (e) => {
        highlightNavTab(e);
        displayHeader(e);
    }));

    const projectList = document.querySelectorAll(".nav__project-name");
    projectList.forEach((project) => {
        project.addEventListener("click", displayProject);
    });

    const inboxTab = document.querySelector(".nav__inbox");
    inboxTab.addEventListener("click", displayInboxTab);
    
    const todayTab = document.querySelector(".nav__today");
    todayTab.addEventListener("click", displayTodayTab);

    const upcomingTab = document.querySelector(".nav__upcoming");
    upcomingTab.addEventListener("click", displayUpcomingTab);

    const importantTab = document.querySelector(".nav__important");
    importantTab.addEventListener("click", displayImportantTab);
};

const displayInboxTab = () => {
    removeAddTask();
    resetTaskList();

    projectList.forEach((project) => {
        project.taskList.forEach((task) => {
            addTask(task.uuid, task.title, task.description, task.dueDate);
        });
    });
    checkForCheckedTasks();
    checkForImportantTasks();
};

const displayTodayTab = () => {
    removeAddTask();
    resetTaskList();

    projectList.forEach((project) => {
        project.taskList.forEach((task) => {
            const date = getTaskDueDate(task.dueDate);
            const parsedDate = parseISO(date);
            if (isToday(parsedDate)) {
                addTask(task.uuid, task.title, task.description, task.dueDate);
            }
        });
    })

    checkForCheckedTasks();
    checkForImportantTasks();
};

// Display tasks if due date is within next 7 days
const displayUpcomingTab = () => {
    removeAddTask();
    resetTaskList();

    projectList.forEach((project) => {
        project.taskList.forEach((task) => {
            const date = getTaskDueDate(task.dueDate);
            const parsedDate = parseISO(date);
            if (checkForNextWeek(parsedDate)) {
                addTask(task.uuid, task.title, task.description, task.dueDate);
            }
        });
    })

    checkForCheckedTasks();
    checkForImportantTasks();    
};

const displayImportantTab = () => {
    removeAddTask();
    resetTaskList();

    projectList.forEach((project) => {
        project.taskList.forEach((task) => {
            if (task.important === true) {
                addTask(task.uuid, task.title, task.description, task.dueDate);
            }
        });
    });

    checkForCheckedTasks();
    checkForImportantTasks();
};

const displayProject = (e) => {
    showAddTask();

    // if clicked on project remove icon, return the function
    if (e.target.classList.contains("nav__remove-icon")) return;

    resetTaskList();
    let projectUUID = document.querySelector(".nav__item--active");
    projectUUID = projectUUID.dataset.uuid;
    const projectIndex = projectList.findIndex((object) => {
        return object.uuid === projectUUID;
    });

    projectList[projectIndex].taskList.forEach((task) => {
        addTask(task.uuid, task.title, task.description, task.dueDate);
    });

    checkForCheckedTasks();
    checkForImportantTasks();
};

// Check if the date that's passed as an argument is within the
// next 7 days from today and return boolean value
const checkForNextWeek = (date) => {
    const today = new Date();
    const plusSevenDays = addDays(today, 7);
    return isWithinInterval(date, {
        start: today,
        end: plusSevenDays
    })
};

// Compare an array of checked tasks against all tasks, if there is any
// match, check the checkbox of the task
const checkForCheckedTasks = () => {
    const allTasks = document.querySelectorAll(".right-panel__task-item");
    const checkedTasks = getCheckedTaskArray();

    if (checkedTasks.length === 0) return;

    for (const task of allTasks) {
        if (checkedTasks.includes(task.dataset.uuid)) {
            const checkbox = task.childNodes[0]
            checkbox.checked = true;
        }
      }
};

// Return an array with task uuid's that match condition checked === true;
const getCheckedTaskArray = () => {
    const checkedTasksArray = [];

    projectList.forEach((project) => {
        project.taskList.forEach((task) => {
            if (task.checked === true) checkedTasksArray.push(task.uuid);
        });
    });

    return checkedTasksArray;
};

// Same logic as checkbox is applied here
const checkForImportantTasks = () => {
    const allTasks = document.querySelectorAll(".right-panel__task-item");
    const importantTasks = getImportantTaskArray();
    
    if (importantTasks.length === 0) return;
    
    for (const task of allTasks) {
        if (importantTasks.includes(task.dataset.uuid)) {
            const importantIcon = task.childNodes[2].childNodes[1];
            importantIcon.classList.add("task-item__important-icon--active");
        }
      }
};

const getImportantTaskArray = () => {
    const importantTasksArray = [];

    projectList.forEach((project) => {
        project.taskList.forEach((task) => {
            if (task.important === true) importantTasksArray.push(task.uuid);
        });
    });

    return importantTasksArray;
};

// This runs only when project tab is currently open
const showAddTask = () => {
    const addTaskWrapper = document.querySelector(".right-panel__add-task");
    addTaskWrapper.classList.add("right-panel__add-task--active");
};

// Otherwise there is no option of adding a new task, therefore adding is removed
const removeAddTask = () => {
    const addTaskWrapper = document.querySelector(".right-panel__add-task");
    addTaskWrapper.classList.remove("right-panel__add-task--active");
};

// Change bg of current Nav Tab
const highlightNavTab = (e) => {
    if (e.target.classList.contains("nav__remove-icon")) return;
    if (e.target.classList.contains("nav__add-new-project")) return;

    const allNavTabs = document.querySelectorAll(".nav__item");
    allNavTabs.forEach((tab) => tab.classList.remove("nav__item--active"));

    e.target.closest("li").classList.add("nav__item--active");
};

// Display a name of a current tab
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

// Before apending a new title, reset the old one
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

// This, Inbox page, runs when Project is removed from Nav panel
const displayDefaultPage = () => {
    resetHeaderTitle();
    removeAddTask();

    const content = document.querySelector(".right-panel");
    const headerTitle = document.createElement("h1");
    headerTitle.className = "right-panel__title";
    headerTitle.textContent = "Inbox";
    content.prepend(headerTitle);

    const inboxTab = document.querySelector(".nav__inbox");
    inboxTab.classList.add("nav__item--active");

    displayInboxTab();
};

const displayCurrentPage = (e) => {
    const inboxTab = document.querySelector(".nav__inbox");
    const todayTab = document.querySelector(".nav__today");
    const upcomingTab = document.querySelector(".nav__upcoming");
    const importantTab = document.querySelector(".nav__important");
    const projectList = document.querySelectorAll(".nav__project-name");
    const activeTab = document.querySelector(".nav__item--active");

    if (activeTab.contains(inboxTab)) return displayInboxTab();
    if (activeTab.contains(todayTab)) return displayTodayTab();
    if (activeTab.contains(upcomingTab)) return displayUpcomingTab();
    if (activeTab.contains(importantTab)) return displayImportantTab();
    projectList.forEach((project) => {
        if (activeTab.contains(project)) displayProject(e);
    });
};

export { navItemsEventListeners, displayInboxTab, displayDefaultPage,
    displayCurrentPage };