import { newProjectEventListeners } from "./createProject";
import { displayInboxTab, navItemsEventListeners } from "./displayTasks";
import { taskFormEventListeners } from "./createTask";

newProjectEventListeners();
navItemsEventListeners();
taskFormEventListeners();
displayInboxTab();