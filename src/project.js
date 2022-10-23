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
  // logic here
};


export default loadEventListeners;

