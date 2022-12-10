import { newProjectEventListeners } from "./createProject";
import { displayInboxTab, navItemsEventListeners } from "./displayTasks";
import { addTaskEventListeners } from "./createTask";

newProjectEventListeners();
navItemsEventListeners();
addTaskEventListeners();
displayInboxTab();