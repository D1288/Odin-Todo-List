const addTodoButton = document.querySelector('.addTodo')
const addForm = document.querySelector('.addForm')
const overlay = document.querySelector('.overlay')
const addtoListBtn = document.querySelector('.addToList')
const todoList = document.querySelector('.todoList')

addTodoButton.addEventListener('click', () => {
    overlay.style.display = 'block';
    addForm.style.display = 'block';
})

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    addForm.style.display = 'none';
})

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove()
    }
})


class Todo {
    constructor(description, dueDate, priority) {
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority
    }
}

function generateTodo(e) {
    e.preventDefault();

    const todo = new Todo(addForm.add.value, addForm.dueDate.value, addForm.priority.value)
    const li = document.createElement('li')
    li.classList.add('todoItem')

    const description = document.createElement('p')
    description.textContent = todo.description

    const dueDate = document.createElement('p')
    dueDate.textContent = `Due Date: ${todo.dueDate}`

    const priority = document.createElement('p')
    priority.textContent = `Priority: ${todo.priority}`

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('headerButtons')

    const editButton = document.createElement('button')
    editButton.classList.add('edit')
    editButton.textContent = 'Edit'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'X'

    buttonContainer.append(editButton, deleteBtn)

    li.append(description, dueDate, priority, buttonContainer);
    todoList.appendChild(li)

    addForm.reset()
}

addtoListBtn.addEventListener('click', generateTodo);


