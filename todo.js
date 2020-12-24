// frontend mentor: todo list App
// m.birchall dec 2020


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

const global = {
    indexOfTaskBeingDragged: 0,
    indexOfTaskDraggedOver: 0
};

const renderTasksLeftTodo = () => {
    const numOfTasksLeft = [...todoListArr.filter((task) => task.isActive === true)].length;
    const itemsLeftEl = document.querySelector('.itemsLeft');
    itemsLeftEl.innerHTML = `${numOfTasksLeft} items left`;
}

const finishTask = (index) => {
    todoListArr[index].isActive = false;
    filterToDoList(activeFilter);
}

const unfinishTask = (index) => {
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
            todoListHTML += `<li class="draggable" draggable="true"><button aria-label="finish" class="check" onclick="finishTask(${index})"></button>
                            <span class="listText" onclick="finishTask(${index})">${task.description}</span><div class="icon-cross" onclick="removeTask(${index})"></div></li>`;
        } else {
            if (!task.isActive && (type == 'All' || type == 'Completed')) {
                todoListHTML += `<li class="draggable complete" draggable="true"><button aria-label="unfinish" class="check on" onclick="unfinishTask(${index})">
                             <span class="icon-check"></span></button>
                             <span class="listText" onclick="unfinishTask(${index})">${task.description}</span><div class="icon-cross" onclick="removeTask(${index})"></div></li>`;
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
    setupDraggableItems();
}

const setupClickFilterAll = () => {
    filterAllEl.addEventListener('click', () => {
        activeFilter = 'All';
        filterToDoList(activeFilter);
    });
}

const setupClickFilterActive = () => {
    filterActiveEl.addEventListener('click', () => {
        activeFilter = 'Active';
        filterToDoList(activeFilter);
    });
}

const setupClickFilterCompleted = () => {
    filterCompletedEl.addEventListener('click', () => {
        activeFilter = 'Completed';
        filterToDoList(activeFilter);
    });
}

const setupClickClearCompleted = () => {
    clearCompletedEl.addEventListener('click', () => {
        const cleanedListArr = [...todoListArr].filter((task) => task.isActive);
        todoListArr = cleanedListArr;
        filterToDoList(activeFilter);
    })
}

const setupInputField = () => {
    inputNewTaskEl.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const newTask = { isActive: true, description: inputNewTaskEl.value };
            todoListArr.unshift(newTask);
            filterToDoList(activeFilter);
            inputNewTaskEl.value = "";
        }
    })
}

setupClickAllTasksButton = () => {
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

const setupColorSchemeSwitch = () => {
    colorSchemeEl.addEventListener('click', () => {
        colorSchemeEl.classList.toggle('dark');
        pageContainerEl.classList.toggle('dark');
    })
}

const setupDraggableItems = () => {
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
                    global.indexOfTaskDraggedOver = index;
                }
            })
            todoListArr.forEach((task,index) => {
                if(task.description==activeItem.innerText){
                    global.indexOfTaskBeingDragged = index;
                }
            })
        })
        item.addEventListener('dragend', () => {
            const taskBeingDragged = todoListArr[global.indexOfTaskBeingDragged];
            todoListArr.splice(global.indexOfTaskBeingDragged,1);
            todoListArr.splice(global.indexOfTaskDraggedOver,0,taskBeingDragged);
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

setupInputField();
setupColorSchemeSwitch();
setupClickFilterAll();
setupClickFilterActive();
setupClickFilterCompleted();
setupClickClearCompleted();
setupClickAllTasksButton();

filterToDoList(activeFilter);



