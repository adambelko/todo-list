const loadEventListeners = () => {
    const addNewProject = document.querySelectorAll(".nav__add-new-project");
    addNewProject.forEach(el => el.addEventListener("click", showProjectForm));

    const projectFormCancellBtn = document.querySelector(".nav__form-cancell-btn");
    projectFormCancellBtn.addEventListener("click", hideProjectForm);

    const projectFormAddBtn = document.querySelector(".nav__form-add-btn");
    projectFormAddBtn.addEventListener("click", addProject);
};

const showProjectForm = () => {
    const projectForm = document.querySelector(".nav__form");
    projectForm.classList.add("nav__form--active");
    document.querySelector(".nav__form-input").focus();
};

const hideProjectForm = () => {
    const projectForm = document.querySelector(".nav__form");
    projectForm.classList.remove("nav__form--active");
};

const addProject = () => {
    const navProjects = document.querySelector(".nav__section-projects");
    const newProject = document.createElement("li");
    newProject.className = "nav__item";

    const projectIcon = document.createElement("img");
    projectIcon.className = "nav__icon";
    projectIcon.src = "../dist/img/nav_project.png";

    const projectTextDiv = document.createElement("div");
    projectTextDiv.className = "nav__text";

    const formInput = document.querySelector(".nav__form-input");
    const projectName = document.createTextNode(formInput.value);
    hideProjectForm();

    navProjects.appendChild(newProject);
    newProject.appendChild(projectIcon);
    newProject.appendChild(projectTextDiv);
    projectTextDiv.appendChild(projectName);
};


export default loadEventListeners;

