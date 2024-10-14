const input = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');


async function save_task(text) {
    const response = await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });

    const tarea = await response.json();
    return tarea.id
}


const agregarTarea = async (id = 0, text = "", completada = 0) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    if (id === 0)
        id = await save_task(text)

    li.appendChild(addCompleteBtn(id))
    p.textContent = text;
    p.className = "task-text"
    li.appendChild(p);
    li.className = "list-element"
    li.appendChild(addDeleteBtn(id));
    ul.appendChild(li)
    input.value = ""
    empty.style.display = "none";
}


addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const text = input.value;

    if(text !== "") {
        agregarTarea(0, text)
    } else {
        alert("Ingrese una tarea valida.")
    }
});


function addCompleteBtn(id) {
    const btn_complete = document.createElement("button");

    btn_complete.textContent = "✔"
    btn_complete.className = "btn-complete"
    btn_complete.setAttribute("id", id)

    btn_complete.addEventListener('click', (e) => {
        e.target.parentElement.className = "task-complete";
    })

    return btn_complete
}

async function change_task(text) {
    const response = await fetch('http://localhost:3000/tareas', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });

    const tarea = await response.json();
    return tarea.id
}


function addDeleteBtn(id) {
    const btn_delete = document.createElement("button");
    
    btn_delete.textContent = "✘";
    btn_delete.className = "btn-delete";
    btn_delete.setAttribute("id", id)

    btn_delete.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);
        if(ul.childElementCount == 0)
            empty.style.display = "block";
        deleteFromDB(e.currentTarget.id)
    })
    
    return btn_delete
}


async function deleteFromDB(id) {
    const response = await fetch('http://localhost:3000/tareas/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    return response
}


const obtenerTareas = async () => {
    const response = await fetch('http://localhost:3000/tareas');
    const data = await response.json();
    data.tareas.forEach((tarea) => agregarTarea(tarea.id, tarea.descripcion, tarea.completada));
    console.log("Tareas cargadas")
};

document.addEventListener('DOMContentLoaded', obtenerTareas);