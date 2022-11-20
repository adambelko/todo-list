// Adding a new project
const newProjectEventListeners = () => {
    const addNewProject = document.querySelectorAll(".nav__add-new-project");
    addNewProject.forEach((el) => el.addEventListener("click", showProjectForm));

    const projectFormCancellBtn = document.querySelector(".nav__form-cancell-btn");
    projectFormCancellBtn.addEventListener("click", hideProjectForm);

    const projectFormAddBtn = document.querySelector(".nav__form-add-btn");
    projectFormAddBtn.addEventListener("click", processProjectFormInput);
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

const emptyProjectList = [];
const projectListArr = JSON.parse(localStorage.getItem("projectList") || JSON.stringify(emptyProjectList));

const CreateProject = (projectID, projectName) => {
    const taskList = [];
    const taskID = taskList.length;

    return {projectID, projectName, taskList, taskID};
};

const processProjectFormInput = (e) => {
    e.preventDefault();

    const projectID = getProjectID();
    const newProject = CreateProject(projectID, getProjectName());
    projectListArr.push(newProject);
    console.log(projectListArr)
    saveToMemory();
    addProject(getProjectName());
    
};


const getProjectID = () => document.querySelectorAll(".nav__project-name").length;

const saveToMemory = () => {
    const convertedProject = JSON.stringify(projectListArr)
    localStorage.setItem("projectList", convertedProject);
};

const addProject = (name) => {
    const navProjects = document.querySelector(".nav__section-projects");
    const newProject = document.createElement("li");
    newProject.className = "nav__item nav__project-name";
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
    const navProjects = document.querySelector(".nav__section-projects");
    const selectedProject = e.target.parentNode;
    navProjects.removeChild(selectedProject);
};

const getProjectName = () => {
    const formInput = document.querySelector(".nav__form-input").value;
    return makeFirstLetterCap(formInput);
};

const makeFirstLetterCap = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
};

const clearFormInput = () => document.querySelector(".nav__form-input").value = "";

// Event Listemers for Nav tabs and Projects
const navItemsEventListeners = () => {
    const addedProjects = document.querySelectorAll(".nav__item");
    addedProjects.forEach((el) => el.addEventListener("click", highlightNavTab));
};

// Logic for switching in between Home tabs and Projects
const highlightNavTab = (e) => {
    const allNavTabs = document.querySelectorAll(".nav__item");
    allNavTabs.forEach((tab) => tab.classList.remove("nav__item--active"));
    const navTab = e.target;
    if (navTab.classList.contains("nav__add-new-project")) return;
    navTab.closest("li").classList.add("nav__item--active");
    openNavTab(navTab);
};

const openNavTab = (navTab) => {
    renderHeader(navTab);
};

const resetHeaderTitle = (content) => {
    const title = document.querySelector(".right-panel__title");
    content.removeChild(title);
};

const renderHeader = (navTab) => {
    const content = document.querySelector(".right-panel");
    const headerTitle = document.createElement("h1");
    headerTitle.className = "right-panel__title";
    headerTitle.textContent = navTab.closest("li").innerText;
    resetHeaderTitle(content);
    content.prepend(headerTitle);
};


export {newProjectEventListeners, navItemsEventListeners};