import { addTask } from "./createTask";

// Event listeners for elements in Add New Project Form
const newProjectEventListeners = () => {
    const addNewProject = document.querySelectorAll(".nav__add-new-project");
    addNewProject.forEach((el) => el.addEventListener("click", showProjectForm));

    const projectFormCancellBtn = document.querySelector(".nav__form-cancell-btn");
    projectFormCancellBtn.addEventListener("click", hideProjectForm);

    const projectFormAddBtn = document.querySelector(".nav__form-add-btn");
    projectFormAddBtn.addEventListener("click", processProjectFormInput);

    displayProjectList(projectList);
};

// Event Listemers for Nav tabs and Projects
const navItemsEventListeners = () => {
    const addedProjects = document.querySelectorAll(".nav__item");
    addedProjects.forEach((el) => el.addEventListener("click", displayContent));
};

const showProjectForm = () => {
    const projectForm = document.querySelector(".nav__form");
    projectForm.classList.add("nav__form--active");
    document.querySelector(".nav__form-input").focus();
};

const hideProjectForm = () => {
    const projectForm = document.querySelector(".nav__form");
    projectForm.classList.remove("nav__form--active");
    clearFormInput();
};

// Factory for creating a new objects 
const CreateProject = (projectID, projectName) => {
    const taskList = [];
    
    return {projectID, projectName, taskList};
};

// Global variables 
const emptyProjectList = [];
let projectList = JSON.parse
    (localStorage.getItem("myProjects") || JSON.stringify(emptyProjectList));

const processProjectFormInput = (e) => {
    e.preventDefault();
    const projectID = getProjectID();
    const projectName = getProjectName();

    const newProject = CreateProject(projectID, projectName);
    projectList.push(newProject);
    saveToMemory();
    addProject(projectName);
};

const getProjectName = () => {
    const formInput = document.querySelector(".nav__form-input").value;
    return makeFirstLetterCap(formInput);
};

const makeFirstLetterCap = (input) => input.charAt(0).toUpperCase() + input.slice(1);
const getProjectID = () => document.querySelectorAll(".nav__project-name").length;
const clearFormInput = () => document.querySelector(".nav__form-input").value = "";

const saveToMemory = () => {
    const convertedProject = JSON.stringify(projectList);
    localStorage.setItem("myProjects", convertedProject);
};

const displayProjectList = (array) => {
    array.forEach(obj => addProject(obj.projectName));
};

const addProject = (name) => {
    const navProjects = document.querySelector(".nav__section-projects");
    const newProject = document.createElement("li");
    newProject.className = "nav__item nav__project-name";
    newProject.dataset.index = getProjectID();
    navProjects.appendChild(newProject);

    const projectIcon = document.createElement("img");
    projectIcon.className = "nav__icon";
    projectIcon.src = "../dist/img/nav_project.png";
    newProject.appendChild(projectIcon);

    const projectName = document.createElement("div");
    projectName.className = "nav__text";
    projectName.textContent = name;
    newProject.appendChild(projectName);

    const projectRemoveIcon = document.createElement("img");
    projectRemoveIcon.className = "nav__remove-icon";
    projectRemoveIcon.src = "../dist/img/nav_remove.png";
    projectRemoveIcon.addEventListener("click", removeProject);
    newProject.appendChild(projectRemoveIcon);

    hideProjectForm();
    navItemsEventListeners();
};

const removeProject = (e) => {
    const projectIndex = e.target.parentNode.dataset.index;
    projectList.splice(projectIndex, 1);
    saveToMemory();

    const navProjects = document.querySelector(".nav__section-projects");
    const selectedProject = e.target.parentNode;
    navProjects.removeChild(selectedProject);
};

// Logic for switching in between Home tabs and Projects
const displayContent = (e) => {
    highlightNavTab(e);
    displayHeader(e);
    resetTaskList();
    displayTaskList(e);
};

const highlightNavTab = (e) => {
    const allNavTabs = document.querySelectorAll(".nav__item");
    allNavTabs.forEach((tab) => tab.classList.remove("nav__item--active"));

    const navTab = e.target;
    if (navTab.classList.contains("nav__add-new-project")) return;
    navTab.closest("li").classList.add("nav__item--active");
    return navTab;
};

const displayHeader = (e) => {
    const content = document.querySelector(".right-panel");
    const headerTitle = document.createElement("h1");
    headerTitle.className = "right-panel__title";
    headerTitle.textContent = e.target.closest("li").innerText;
    resetHeaderTitle(content);
    content.prepend(headerTitle);
};

const resetHeaderTitle = (content) => {
    const title = document.querySelector(".right-panel__title");
    content.removeChild(title);
};

const resetTaskList = () => {
    const taskList = document.querySelector(".right-panel__task-list");
    const taskItems = document.querySelectorAll(".right-panel__task-item");

    taskItems.forEach(task => taskList.removeChild(task));
};

const displayTaskList = (e) => {
    let index = e.target.dataset.index;
    if (index === undefined) index = e.target.parentNode.dataset.index;
    
    // logic for HOME tabs 

    projectList[index].taskList.forEach(task => {
        addTask(task.title, task.description, task.dueDate);
    });
};

export {newProjectEventListeners, navItemsEventListeners, projectList, saveToMemory};