import { navItemsEventListeners, displayDefaultPage } from "./displayTasks";

// Event listeners for elements in Add New Project Form
const newProjectEventListeners = () => {
    const addNewPrj = document.querySelectorAll(".nav__add-new-project");
    addNewPrj.forEach((el) => el.addEventListener("click", showProjectForm));

    const prjFormCancellBtn = document.querySelector(".nav__form-cancell-btn");
    prjFormCancellBtn.addEventListener("click", hideProjectForm);

    const prjFormAddBtn = document.querySelector(".nav__form-add-btn");
    prjFormAddBtn.addEventListener("click", processProjectFormInput);

    displayProjectList(projectList);
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
const CreateProject = (uuid, projectName) => {
    const taskList = [];
    
    return {uuid, projectName, taskList};
};

// Global variables 
const emptyProjectList = [];
let projectList = JSON.parse
(localStorage.getItem("myProjects") || JSON.stringify(emptyProjectList));

const processProjectFormInput = (e) => {
    e.preventDefault();
    let projectID = self.crypto.randomUUID();
    const projectName = getProjectName();
    const newProject = CreateProject(projectID, projectName);
    projectList.push(newProject);
    saveToMemory();
    addProject(projectName, projectID);
};

const getProjectName = () => {
    const formInput = document.querySelector(".nav__form-input").value;
    return makeFirstLetterCap(formInput);
};

const makeFirstLetterCap = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
};

const clearFormInput = () => {
    document.querySelector(".nav__form-input").value = "";
};

// Local Storage
const saveToMemory = () => {
    const convertedProject = JSON.stringify(projectList);
    localStorage.setItem("myProjects", convertedProject);
};

// Render all projects into Nav Projects section
const displayProjectList = (array) => {
    array.forEach((obj) => addProject(obj.projectName, obj.uuid));
};

const addProject = (name, id) => {
    const navProjects = document.querySelector(".nav__section-projects");
    const newProject = document.createElement("li");
    newProject.className = "nav__item nav__project-name";
    newProject.dataset.uuid = id;
    navProjects.appendChild(newProject);

    const projectIcon = document.createElement("img");
    projectIcon.className = "nav__icon";
    projectIcon.src = "./img/nav_project.png";
    newProject.appendChild(projectIcon);

    const projectName = document.createElement("div");
    projectName.className = "nav__text";
    projectName.textContent = name;
    newProject.appendChild(projectName);

    const projectRemoveIcon = document.createElement("img");
    projectRemoveIcon.className = "nav__remove-icon";
    projectRemoveIcon.src = ".img/nav_remove.png";
    projectRemoveIcon.addEventListener("click", removeProject);
    newProject.appendChild(projectRemoveIcon);

    hideProjectForm();
    navItemsEventListeners();
};

const removeProject = (e) => {
    const uuid = e.target.parentNode.dataset.uuid;
    const projectIndex = projectList.findIndex((object) => {
        return object.uuid === uuid
    });
    projectList.splice(projectIndex, 1);
    saveToMemory();

    const navProjects = document.querySelector(".nav__section-projects");
    const selectedProject = e.target.parentNode;
    navProjects.removeChild(selectedProject);
    
    displayDefaultPage();
};

export { newProjectEventListeners, projectList, saveToMemory };