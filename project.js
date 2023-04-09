const addProject = document.querySelector('.addProjects')
const addForm = document.querySelector('.addForm')
const overlay = document.querySelector('.overlay')
const addtoListBtn = document.querySelector('.addToList')
const todoList = document.querySelector('.todoList')


addProject.addEventListener('click', () => {
    overlay.style.display = 'block';
    addForm.style.display = 'block';
})

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    addForm.style.display = 'none';
})

class Project {
    constructor(description, dueDate, priority) {
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority
    }
}

function changeBackgroundColor(todoItem) {
    const priorityElem = todoItem.querySelector('p:nth-child(3)');
    const priority = priorityElem.textContent

    if (priority === 'Moderate') {
        todoItem.style.backgroundColor = 'lightyellow';
    } else if (priority === 'Critical') {
        todoItem.style.backgroundColor = 'lightcoral'
    }
}

function generateTodo(e) {
    e.preventDefault();

    const project = new Project(addForm.add.value, addForm.dueDate.value, addForm.priority.value)
    const li = document.createElement('li')
    li.classList.add('todoItem')

    const description = document.createElement('p')
    description.textContent = project.description

    const dueDate = document.createElement('p')
    dueDate.textContent = `${project.dueDate}`

    const priority = document.createElement('p')
    priority.textContent = `${project.priority}`

    const notes = document.createElement('textarea')
    notes.classList.add('notes')

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('headerButtons')
    buttonContainer.classList.add('liButtons')

    const notesButton = document.createElement('button')
    notesButton.textContent = 'Notes'
    notesButton.classList.add('showNotes')

    const editButton = document.createElement('button')
    editButton.classList.add('edit')
    editButton.textContent = 'Edit'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete');
    deleteBtn.textContent = 'X'

    buttonContainer.append(notesButton, editButton, deleteBtn)

    li.append(description, dueDate, priority, notes, buttonContainer);
    todoList.appendChild(li)

    addForm.reset()

    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    storedProjects.push(project);
    localStorage.setItem('projects', JSON.stringify(storedProjects))
}

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        const projectsIndex = Array.from(todoList.children).indexOf(e.target.parentElement.parentElement);
        storedProjects.splice(projectsIndex, 1);
        localStorage.setItem('projects', JSON.stringify(storedProjects))
        e.target.parentElement.parentElement.remove()
    } else if (e.target.classList.contains('edit')) {
        const todoItem = e.target.parentElement.parentElement;
        const description = todoItem.querySelector('p:first-child')
        const dueDate = todoItem.querySelector('p:nth-child(2)');
        const priority = todoItem.querySelector('p:nth-child(3)');

        description.outerHTML = `<input type="text" value="${description.textContent}" class="editDescription">`;
        dueDate.outerHTML = `<input type="date" value="${dueDate.textContent.slice(10)}" class="editDueDate">`;
        priority.outerHTML = `<select name="priority" id="priority" class="editPriority">
                              <option value="Low">Low</option>
                              <option value="Moderate">Moderate</option>
                              <option value="Critical">Critical</option>
                              </select>`;

        const saveButton = document.createElement('button');
        saveButton.classList.add('save')
        saveButton.textContent = 'Save'
        e.target.parentElement.replaceChild(saveButton, e.target);
    } else if (e.target.classList.contains('save')) {
        const todoItem = e.target.parentElement.parentElement;
        const editDescription = todoItem.querySelector('.editDescription');
        const editDueDate = todoItem.querySelector('.editDueDate');
        const editPriority = todoItem.querySelector('.editPriority');

        editDescription.outerHTML = `<p>${editDescription.value}</p>`;
        editDueDate.outerHTML = `<p>${editDueDate.value}</p>`;
        editPriority.outerHTML = `<p>${editPriority.value}</p>`;

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.textContent = 'Edit';
        e.target.parentElement.replaceChild(editButton, e.target);
        changeBackgroundColor(todoItem)
    } else if (e.target.classList.contains('showNotes')) {
        const todoItem = e.target.parentElement.parentElement
        const notes = todoItem.querySelector('.notes')
        notes.classList.toggle('show')
    }
})


addtoListBtn.addEventListener('click', generateTodo)

//generate from local storage 
window.addEventListener('load', () => {
    const storedTodos = JSON.parse(localStorage.getItem('projects')) || [];
    storedTodos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todoItem');

        const description = document.createElement('p');
        description.textContent = todo.description;

        const dueDate = document.createElement('p');
        dueDate.textContent = `${todo.dueDate}`;

        const priority = document.createElement('p');
        priority.textContent = `${todo.priority}`;

        const notes = document.createElement('textarea');
        notes.classList.add('notes');

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('headerButtons');
        buttonContainer.classList.add('liButtons');

        const notesButton = document.createElement('button');
        notesButton.textContent = 'Notes';
        notesButton.classList.add('showNotes');

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.textContent = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.textContent = 'X';

        buttonContainer.append(notesButton, editButton, deleteBtn);

        li.append(description, dueDate, priority, notes, buttonContainer);
        todoList.appendChild(li);

        changeBackgroundColor(li);
    });
});
