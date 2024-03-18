import {v4 as uuidV4} from "uuid"

type task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

console.log(uuidV4())
const list  = document.querySelector<HTMLUListElement>("#list");
const form  = document.getElementById("new-task-form") as HTMLFormElement | null;
const input  = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", e => {

  e.preventDefault();

  if(input?.value == "" || input?.value == null) return 

  const newTask: task = {
    id:uuidV4(),
    title: input?.value ,
    completed: true,
    createdAt: new Date(),
  }
  input.value
  tasks.push(newTask);

  addListItem(newTask)
  input.value = "";
})


function addListItem(task: task){
  
   const item = document.createElement("li")
   const label = document.createElement("label")
   const checkbox = document.createElement("input")
   checkbox.addEventListener("change", ()=>{
    task.completed = checkbox.checked
    saveTasks()
   })
   checkbox.type = "checkbox"
   checkbox.checked = task.completed
   label.append(checkbox, task.title)
   item.append(label)
   list?.append(item)
}

function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}