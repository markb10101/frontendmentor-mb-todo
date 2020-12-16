{/* <li class="complete"><button class="check on"><div class="icon-check"></div></button><span class="listText">Jog around the park 3x</span></li>
<li><button class="check"></button><span class="listText">Jog around the park 3x</span></li>
<li><button class="check""></button><span class=" listText">Jog around the park 3x</span></li >
<li><button class="check""></button><span class=" listText">Jog around the park 3x</span></li >
<li><button class="check""></button><span class=" listText">Jog around the park 3x</span></li > */}

console.log("apporking");

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


const itemsLeft = [...todoListArr.filter((task)=>task.isActive===true)].length;

console.log(itemsLeft);