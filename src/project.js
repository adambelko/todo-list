const loadEventListeners = () => {
  const addNewProject = document.querySelectorAll(".add-new-project");
  addNewProject.forEach(el => el.addEventListener("click", showProjectForm));

  const projectFormAddBtn = document.querySelector(".project-popup-add-btn");
  projectFormAddBtn.addEventListener("click", addProject);

  const projectFormCancellBtn = document.querySelector(".project-popup-cancell-btn");
  projectFormCancellBtn.addEventListener("click", hideProjectForm);
};

const showProjectForm = () => {
  const projectForm = document.querySelector(".nav_project-popup");
  projectForm.classList.add("active");
};

const addProject = () => {
  // logic here
};

const hideProjectForm = () => {
  const projectForm = document.querySelector(".nav_project-popup");
  projectForm.classList.remove("active");
};

export default loadEventListeners;

