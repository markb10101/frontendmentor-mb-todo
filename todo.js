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

const todo = {
    indexOfTaskBeingDragged: 0,
    indexOfTaskDraggedOver: 0
};


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

const removeTask = (index) => {
    todoListArr.splice(index, 1);
    filterToDoList(activeFilter);
}

const renderToDoList = (type) => {
    let todoListHTML = "";

    todoListArr.forEach((task, index) => {
        if (task.isActive && (type == 'All' || type == 'Active')) {
            todoListHTML += `<li class="draggable" draggable="true"><button class="check" onclick="finishedTask(${index})"></button>
                            <span class="listText" onclick="finishedTask(${index})">${task.description}</span><div class="icon-cross" onclick="removeTask(${index})"></div></li>`;
        } else {
            if (!task.isActive && (type == 'All' || type == 'Completed')) {
                todoListHTML += `<li class="draggable complete" draggable="true"><button class="check on" onclick="unfinishedTask(${index})">
                             <div class="icon-check"></div></button>
                             <span class="listText" onclick="unfinishedTask(${index})">${task.description}</span><div class="icon-cross" onclick="removeTask(${index})"></div></li>`;
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
    handleDraggableItems();
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
    inputNewTaskEl.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const newTask = { isActive: true, description: inputNewTaskEl.value };
            todoListArr.unshift(newTask);
            filterToDoList(activeFilter);
            inputNewTaskEl.value = "";
        }
    })
}

handleClickAllTasksButton = () => {
    allTasksButtonEl.addEventListener('click', () => {
        allTasksButtonEl.classList.toggle('on');
        if (allTasksButtonEl.classList.contains('on')) {
            todoListArr.map(item => item.isActive = false);
        } else {
            todoListArr.map(item => item.isActive = true);
        }
        filterToDoList(activeFilter);
    })
}

const handleColorSchemeSwitch = () => {
    colorSchemeEl.addEventListener('click', () => {
        colorSchemeEl.classList.toggle('dark');
        pageContainerEl.classList.toggle('dark');
    })
}

const handleDraggableItems = () => {
    const listItemsArr = document.querySelectorAll('.draggable');
    listItemsArr.forEach((item) => {
        item.addEventListener('dragstart', () => {
            item.classList.add('dragging');
        })
        item.addEventListener('dragover', event => {
            event.preventDefault();

            const activeItem = document.querySelector('.dragging');
            todoListArr.forEach((task,index) => {
                if(task.description==item.innerText){
                    todo.indexOfTaskDraggedOver = index;
                }
            })
            todoListArr.forEach((task,index) => {
                if(task.description==activeItem.innerText){
                    todo.indexOfTaskBeingDragged = index;
                }
            })
        })
        item.addEventListener('dragend', () => {
            const taskBeingDragged = todoListArr[todo.indexOfTaskBeingDragged];
            todoListArr.splice(todo.indexOfTaskBeingDragged,1);
            todoListArr.splice(todo.indexOfTaskDraggedOver,0,taskBeingDragged);
            filterToDoList(activeFilter);       
        })
    })
}

const colorSchemeEl = document.querySelector('.color-scheme');
const pageContainerEl = document.querySelector('.pageContainer');

const todoListEl = document.querySelector('.todo');
const filterAllEl = document.querySelector('.all');
const filterActiveEl = document.querySelector('.active');
const filterCompletedEl = document.querySelector('.completed');
const clearCompletedEl = document.querySelector('.clear');
const inputNewTaskEl = document.querySelector('.description');
const allTasksButtonEl = document.querySelector('.alltasks');

let activeFilter = 'All';

handleInputField();
handleColorSchemeSwitch();
handleClickFilterAll();
handleClickFilterActive();
handleClickFilterCompleted();
handleClickClearCompleted();
handleClickAllTasksButton();

filterToDoList(activeFilter);



