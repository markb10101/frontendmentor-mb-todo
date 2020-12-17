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
    console.log('finished '+todoListArr[index]);
    todoListArr[index].isActive = false;
    filterToDoList(activeFilter);
}

const unfinishedTask = (index) => {
    todoListArr[index].isActive = true;
    filterToDoList(activeFilter);
}

const renderToDoList = (listArr) => {

    console.log('rendering');
    let todoListHTML = "";

    listArr.forEach((task,index) => {
        if (task.isActive) {
            todoListHTML += `<li><button class="check" onclick="finishedTask(${index})"></button>`;
        } else {
            todoListHTML += `<li class="complete"><button class="check on" onclick="unfinishedTask(${index})">
                             <div class="icon-check"></div></button>`;
        }
        todoListHTML += `<span class="listText">${task.description}</span></li>`
    });
    todoListEl.innerHTML = todoListHTML;
}


const filterToDoList = (type) => {

    let displayListArr = [];

    if (filterAllEl.classList.contains('on')) filterAllEl.classList.remove('on');
    if (filterActiveEl.classList.contains('on')) filterActiveEl.classList.remove('on');
    if (filterCompletedEl.classList.contains('on')) filterCompletedEl.classList.remove('on');

    switch (type) {
        case 'All':
            displayListArr = [...todoListArr];
            filterAllEl.classList.add('on');
            break;
        case 'Active':
            displayListArr = [...todoListArr].filter((task) => task.isActive);
            filterActiveEl.classList.add('on');
            break;
        case 'Completed':
            displayListArr = [...todoListArr].filter((task) => !task.isActive);
            filterCompletedEl.classList.add('on');
            break;
    }

    renderToDoList(displayListArr);
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

const todoListEl = document.querySelector('.todo');
const filterAllEl = document.querySelector('.all');
const filterActiveEl = document.querySelector('.active');
const filterCompletedEl = document.querySelector('.completed');
const clearCompletedEl = document.querySelector('.clear');

let activeFilter = 'All';

handleClickFilterAll();
handleClickFilterActive();
handleClickFilterCompleted();

handleClickClearCompleted();

filterToDoList(activeFilter);
renderTasksLeftTodo();



// handleClickClearCompleted