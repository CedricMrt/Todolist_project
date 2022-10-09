const todoText = document.querySelector('#text')
const todoButton = document.querySelector('#button')
const todo = document.querySelector('.todolist')
const del = document.querySelectorAll('.todos')
const noTache = document.querySelector('.noTache')

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)


function keyCode() {
    const key = event.keyCode
    if (key === 13) {
        addTodo()
    }
}

function addTodo() {
    if (todoText.value == '') {
        alert('Veuillez saisir une tâche')
    }

    else {
        const todoName = todoText.value
        console.log(todoName);
        todoText.value = ''
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todos')
        todoDiv.innerHTML = `
        <input type="checkbox">
        <span id=span>${todoName}</span>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
`
        todo.appendChild(todoDiv)
        let tache = {
            content: todoName
        }
        saveLocalTodos(tache)
        noTache.style.display = 'none'
    }

}

for (let item of del) {
    addTrash(item)
}

function addTrash(item) {
    const trash = document.createElement('button')
    trash.classList.add('delete')
    trash.innerHTML = `<i class="fa-solid fa-trash">`
    item.appendChild(trash)
}

todo.addEventListener('click', function (event) {
    let todos = []
    if (localStorage.getItem('todos') != null) {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const content = document.getElementById('span').firstChild.data
    todos.forEach((list, index) => {
        if (list.content === content) {
            todos.splice(index, 1)
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos))

    const trashcheck = event.target.parentElement
    if (trashcheck.classList[0] === 'delete') {
        const parent = trashcheck.parentElement
        parent.classList.add('fall')
        parent.addEventListener('transitionend', function () {
            parent.remove()
            if (todo.innerHTML == '') {
                noTache.style.display = 'block'
            }
        })
    }

})

function saveLocalTodos(list) {
    let todos = []
    if (localStorage.getItem('todos') != null) {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(list)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos = []
    if (localStorage.getItem('todos') != null) {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(list => {
        const Name = list.content
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todos')
        todoDiv.innerHTML = `
        <input type="checkbox">
        <span id=span>${Name}</span>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
`
        todo.appendChild(todoDiv)
        if (todo.innerHTML == '') {
            noTache.style.display = 'block'
        }
        else {
            noTache.style.display = 'none'
        }

    })
}

