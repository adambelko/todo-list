// Adding a new project
const newProjectEventListeners = () => {
    const addNewProject = document.querySelectorAll(".nav__add-new-project");
    addNewProject.forEach((el) => el.addEventListener("click", showProjectForm));

    const projectFormCancellBtn = document.querySelector(".nav__form-cancell-btn");
    projectFormCancellBtn.addEventListener("click", hideProjectForm);

    const projectFormAddBtn = document.querySelector(".nav__form-add-btn");
    projectFormAddBtn.addEventListener("click", (e) => processProjectFormInput(e));
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

const CreateProject = (name) => {
    return {name};
};

const processProjectFormInput = (e) => {
    const projectList = [];
    const newProject = CreateProject(getProjectName());
    projectList.push(newProject.name);
    addProject(e);
};

const addProject = (e) => {
    e.preventDefault();
    const navProjects = document.querySelector(".nav__section-projects");
    const newProject = document.createElement("li");
    newProject.className = "nav__item";
    navProjects.appendChild(newProject);

    const projectIcon = document.createElement("img");
    projectIcon.className = "nav__icon";
    projectIcon.src = "../dist/img/nav_project.png";
    newProject.appendChild(projectIcon);

    const projectTextDiv = document.createElement("div");
    projectTextDiv.className = "nav__text";
    newProject.appendChild(projectTextDiv);
    projectTextDiv.appendChild(getProjectName());

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
    const formInput = document.querySelector(".nav__form-input");
    return document.createTextNode(makeFirstLetterCap(formInput.value));
};

const makeFirstLetterCap = (formInput) => {
    return formInput.charAt(0).toUpperCase() + formInput.slice(1);
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

const resetHeaderTitle = (content) => {
    const title = document.querySelector(".right-panel__title");
    content.removeChild(title);
};

const openNavTab = (navTab) => {
    const content = document.querySelector(".right-panel");
    resetHeaderTitle(content);
    const headerTitle = document.createElement("h1");
    headerTitle.className = "right-panel__title";
    headerTitle.textContent = navTab.closest("li").innerText;
    content.appendChild(headerTitle);
};

export {newProjectEventListeners, navItemsEventListeners};