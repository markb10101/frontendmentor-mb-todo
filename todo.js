// setup an array for storing the todo tasks
let todoListArr = [
    {
        isActive: false,
        description: "Complete online JavaScript course",
    },
    {
        isActive: true,
        description: "Jog around the park 3x",
    },
    {
        isActive: false,
        description: "10 minutes meditation",
    },
    {
        isActive: true,
        description: "Read for 1 hour",
    },
    {
        isActive: true,
        description: "Pick up groceries",
    },
    {
        isActive: true,
        description: "Complete Todo App on Frontend Mentor",
    },
];



// render notice for how many tasks are left to do
const renderTasksLeftTodo = () => {
    const numOfTasksLeft = [...todoListArr.filter((task) => task.isActive === true)].length;
    const itemsLeftEl = document.querySelector('.itemsLeft');
    itemsLeftEl.innerHTML = `${numOfTasksLeft} items left`;
}

const finishedTask = (index) => {
    todoListArr[index].isActive = false;
    filterToDoList(activeFilter);
}

const unfinishedTask = (index) => {
    todoListArr[index].isActive = true;
    filterToDoList(activeFilter);
}

const renderToDoList = (type) => {
    let todoListHTML = "";

    todoListArr.forEach((task, index) => {
        if (task.isActive && (type == 'All' || type == 'Active')) {
            todoListHTML += `<li><button class="check" onclick="finishedTask(${index})"></button>
                            <span class="listText">${task.description}</span></li>`;
        } else {
            if (!task.isActive && (type == 'All' || type == 'Completed')) {
                todoListHTML += `<li class="complete"><button class="check on" onclick="unfinishedTask(${index})">
                             <div class="icon-check"></div></button>
                             <span class="listText">${task.description}</span></li>`;
            }
        }
    });
    todoListEl.innerHTML = todoListHTML;
    renderTasksLeftTodo();
}


const filterToDoList = (type) => {

    let displayListArr = [];

    if (filterAllEl.classList.contains('on')) filterAllEl.classList.remove('on');
    if (filterActiveEl.classList.contains('on')) filterActiveEl.classList.remove('on');
    if (filterCompletedEl.classList.contains('on')) filterCompletedEl.classList.remove('on');

    switch (type) {
        case 'All':
            filterAllEl.classList.add('on');
            break;
        case 'Active':
            filterActiveEl.classList.add('on');
            break;
        case 'Completed':
            filterCompletedEl.classList.add('on');
            break;
    }
    renderToDoList(type);
}

const handleClickFilterAll = () => {
    filterAllEl.addEventListener('click', () => {
        activeFilter = 'All';
        filterToDoList(activeFilter);
    });
}

const handleClickFilterActive = () => {
    filterActiveEl.addEventListener('click', () => {
        activeFilter = 'Active';
        filterToDoList(activeFilter);
    });
}

const handleClickFilterCompleted = () => {
    filterCompletedEl.addEventListener('click', () => {
        activeFilter = 'Completed';
        filterToDoList(activeFilter);
    });
}

const handleClickClearCompleted = () => {
    clearCompletedEl.addEventListener('click', () => {
        const cleanedListArr = [...todoListArr].filter((task) => task.isActive);
        todoListArr = cleanedListArr;
        filterToDoList(activeFilter);
    })
}

const handleInputField = () => {
    let newTaskActive = true
    buttonNewTaskEl.addEventListener('click', () => {
        newTaskActive = !newTaskActive;
        newTaskActive==false ? buttonNewTaskEl.classList.add('on') :  buttonNewTaskEl.classList.remove('on');
        buttonNewTaskEl.innerHTML = `<div class="icon-check"></div>`;
    })

    inputNewTaskEl.addEventListener('keypress', (event) => {
        if(event.key==='Enter'){
            const newTask = {isActive:newTaskActive, description: inputNewTaskEl.value};
            todoListArr.push(newTask);
            filterToDoList(activeFilter);
            inputNewTaskEl.value = "";
        }
    })
}

const handleColorSchemeSwitch = () => {
    colorSchemeEl.addEventListener('click', () => {
        console.log('clicked');
        if(colorSchemeEl.classList.contains('night')){
            colorSchemeEl.classList.remove('night');
            colorSchemeEl.classList.add('day');
        }else{
            colorSchemeEl.classList.remove('day');
            colorSchemeEl.classList.add('night');
        }
    })
}

const colorSchemeEl = document.querySelector('.color-scheme');
const todoListEl = document.querySelector('.todo');
const filterAllEl = document.querySelector('.all');
const filterActiveEl = document.querySelector('.active');
const filterCompletedEl = document.querySelector('.completed');
const clearCompletedEl = document.querySelector('.clear');
const buttonNewTaskEl = document.querySelector('.newtask');
const inputNewTaskEl = document.querySelector('.description');

let activeFilter = 'All';


handleInputField();
handleColorSchemeSwitch();
handleClickFilterAll();
handleClickFilterActive();
handleClickFilterCompleted();

handleClickClearCompleted();

filterToDoList(activeFilter);


