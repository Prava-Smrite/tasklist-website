let form = document.querySelector('#form');
let taskInput = document.querySelector('#addTask');
let filtertask = document.querySelector('#filtertask');
let tasklist = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');



form.addEventListener('submit',addedTask);
tasklist.addEventListener('click',removeTask);
clearBtn.addEventListener('click',removeAllTask);
filtertask.addEventListener('keyup',filterTask);
document.addEventListener('DOMContentLoaded', getTask);





//add task
function addedTask(e){
    if(taskInput.value === ''){
        alert('Add new task');
    }else{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + ' '));
        tasklist.appendChild(li);

        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';

    }
    e.preventDefault();
}
//remove task
function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm('Are you sure?')){
            let ele = e.target.parentElement;
            ele.remove();

            removeFromLs(ele);
        }
        
    }
    
}
//remove all task
function removeAllTask(){
    tasklist.innerHTML = '';
    localStorage.clear(); 
}

//filter task
function filterTask(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display='block';
        }else{
            task.style.display='none';
        }
        
    })
}

//to store in localstorage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


function  getTask(){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task =>{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ' '));
        tasklist.appendChild(li);

        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);
    })
}

//remove task from ls
function removeFromLs(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task,index)=>{
        if(li.textContent.trim() === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))
}


