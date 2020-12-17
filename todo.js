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

let activeFilter = 'All';

// render notice for how many tasks are left to do
const renderTasksLeftTodo = () => {
    const numOfTasksLeft = [...todoListArr.filter((task) => task.isActive === true)].length;
    const itemsLeftEl = document.querySelector('.itemsLeft');
    itemsLeftEl.innerHTML = `${numOfTasksLeft} items left`;
}

const renderToDoList = (listArr) => {

    // get a reference to the ul element where the list will be rendered
    const todoListEl = document.querySelector('.todo');

    let todoListHTML = "";

    listArr.forEach((task) => {
        if (task.isActive) {
            todoListHTML += `<li><button class="check"></button>`;
        } else {
            todoListHTML += `<li class="complete"><button class="check on">
                             <div class="icon-check"></div></button>`;
        }
        todoListHTML += `<span class="listText">${task.description}</span></li>`
    });
    todoListEl.innerHTML = todoListHTML;
}



// render the list
const filterToDoList = (type) => {

    let displayListArr = [];

    if (type === 'All') {
        displayListArr = [...todoListArr];
    }
    if (type === 'Active') {
        displayListArr = [...todoListArr].filter((task)=>task.isActive);
    }
    if (type==='Completed') {
        displayListArr =  [...todoListArr].filter((task)=>!task.isActive);
    }

    renderToDoList(displayListArr);
}

const handleClickFilterAll = () => {
    // get reference to 'All' button element
    const filterAllEl = document.querySelector('.all');
    filterAllEl.addEventListener('click', () => {
        activeFilter = 'All';
        filterToDoList(activeFilter);
    });
}

const handleClickFilterActive = () => {
    // get reference to 'Active' button element
    const filterActiveEl = document.querySelector('.active');
    filterActiveEl.addEventListener('click', () => {
        activeFilter = 'Active';
        filterToDoList(activeFilter);
    });
}

const handleClickFilterCompleted = () => {
    // get reference to 'Completed' button element
    const filterCompletedEl = document.querySelector('.completed');
    filterCompletedEl.addEventListener('click', () => {
        activeFilter = 'Completed';
        filterToDoList(activeFilter);
    });
}

const handleClickClearCompleted = () => {
    const clearCompletedEl = document.querySelector('.clear');
    clearCompletedEl.addEventListener('click', () => {
        const cleanedListArr = [...todoListArr].filter((task)=>task.isActive);
        todoListArr = cleanedListArr;
        filterToDoList(activeFilter);
    })
}

handleClickFilterAll();
handleClickFilterActive();
handleClickFilterCompleted();

handleClickClearCompleted();

filterToDoList(activeFilter);
renderTasksLeftTodo();



// handleClickClearCompleted