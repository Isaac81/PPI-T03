const input = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');

addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const text = input.value;
    const li = document.createElement("li");
    const p = document.createElement("p");

    if(text !== "") {
        li.appendChild(addCompleteBtn())
        p.textContent = text;
        p.className = "task-text"
        li.appendChild(p);
        li.className = "list-element"
        li.appendChild(addDeleteBtn());
        ul.appendChild(li)

        input.value = ""

        empty.style.display = "none";
    } else {
        alert("Ingrese una tarea valida.")
    }
});


function addCompleteBtn() {
    const btn_complete = document.createElement("button");

    btn_complete.textContent = "✔"
    btn_complete.className = "btn-complete"

    btn_complete.addEventListener('click', (e) => {
        e.target.parentElement.className = "task-complete";
    })

    return btn_complete
}


function addDeleteBtn() {
    const btn_delete = document.createElement("button");
    
    btn_delete.textContent = "✘";
    btn_delete.className = "btn-delete";

    btn_delete.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);
        if(ul.childElementCount == 0)
            empty.style.display = "block";
    })
    

    return btn_delete
}