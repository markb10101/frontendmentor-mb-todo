{/* <li class="complete"><button class="check on"><div class="icon-check"></div></button><span class="listText">Jog around the park 3x</span></li>
<li><button class="check"></button><span class="listText">Jog around the park 3x</span></li>
<li><button class="check""></button><span class=" listText">Jog around the park 3x</span></li >
<li><button class="check""></button><span class=" listText">Jog around the park 3x</span></li >
<li><button class="check""></button><span class=" listText">Jog around the park 3x</span></li > */}


// setup an array for storing the todo tasks

const todoListArr = [
    {
        isActive: false,
        description: "Complete online JavaScript course",
    },
    {
        isActive: true,
        description: "Jog around the park 3x",
    },
    {
        isActive: true,
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

// render the list
const renderTodoList = () => {

    // get a reference to the ul element where the list will be rendered
    const todoListEl = document.querySelector('.todo');

    let todoListHTML = "";

    todoListArr.forEach((task) => {

        if (task.isActive) {
            todoListHTML += `<li><button class="check"></button>`;
           
        } else {
            todoListHTML += `<li class="complete"><button class="check on">
                             <div class="icon-check"></div></button>`;
        }

        todoListHTML += `<span class="listText">${task.description}</span></li>`


    });

    todoListEl.innerHTML= todoListHTML;


}

renderTodoList();
renderTasksLeftTodo();