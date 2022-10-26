let task = {};

const btnClean = document.getElementById('clean');
const btn = document.getElementById('mode');

/* Page 1  -> All */
const
    form = document.getElementById('form'),
    input = document.getElementById('input-text');
    template = document.getElementById('template').content,
    fragment = document.createDocumentFragment(),
    list = document.getElementById('list');


/* Page 2 -> Active */
const
    templateActive = document.getElementById('template-active').content,
    fragmentActive = document.createDocumentFragment(),
    listActive = document.getElementById('active-list');

/* Page 3 -> Completed */
const
    templateCompleted = document.getElementById('template-completed').content,
    fragmentCompleted = document.createDocumentFragment(),
    listCompleted = document.getElementById('completed');

const checkAll = document.querySelector('.check-all');

const
    page = document.getElementById('page'),
    btns = page.getElementsByClassName('page-link');

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(e) {
        const current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";

        if (e.target.classList.contains('link-1')) {
            document.getElementById('completed').classList.replace('block', 'none');
            document.getElementById('list').classList.remove('none');
            document.getElementById('input-text').style.backgroundColor = '#25273c';
            document.getElementById('input-text').disabled = false;
            document.getElementById('check-all').disabled = false;
            document.querySelector('.div-main').style.pointerEvents = 'auto';
            document.querySelector('.title').textContent = 'todo';
            addTask(task, 0);
            return
        }
        if (e.target.classList.contains('link-2')) {
            active(e);
            return
        }
        if (e.target.classList.contains('link-3')) {
            taskCompleted(e);
            return
        }
    });
}

// Nota: idea al hacer un filtrado de All, Active y completed intentar guardar los valores en una tarea nuevo
// ejemplo -> el objeto donde se guardan las tareas se llama task{}, puedo crear un objeto llamado filterTask y guardar en task guardar el filtrado
// task{filterTask} y llamar a tarea addTask(task);

checkAll.addEventListener('click', (e) => {
    let leng = Object.values(task).length;
    if (e.target.classList.contains('check-all-button')) {
        if (leng == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'No hay tareas en la lista de tareas!',
                background: document.getElementById('mode').classList.contains('modedark') ? 'hsl(235, 24%, 19%)' : 'hsl(0, 0%, 98%)',
                color: document.getElementById('mode').classList.contains('modedark') ? '#fff' : 'hsl(233, 14%, 35%)'
            });
            return
        };
        document.getElementById('check-all').classList.replace('check-all-button', 'checked-all-button');
        completeTask(leng);
        return
    };
    if (e.target.classList.contains('checked-all-button')) {
        document.getElementById('check-all').classList.replace('checked-all-button', 'check-all-button')
        uncomplete(leng);
        return
    };
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    captureDate(e);
});

btn.addEventListener("click", () => {
   change();
});

list.addEventListener("click", (e) => {
    const count = Object.keys(task).length;
    if (e.target.classList.contains('btncheck')) {
        task[e.target.parentElement.dataset.id].state = true;
        addTask(task, count);
        return
    }
    if (e.target.classList.contains('btnDelete')) {
        btnDelete(e.target.dataset.id);
        return
    }
    if (e.target.classList.contains('btnchecked')) {
        task[e.target.parentElement.dataset.id].state = false;
        return addTask(task, count);
    };
});

btnClean.addEventListener("click", (e) => {
    taskClean(e);
});

input.focus();

const captureDate = (e) => {
    if (input.value.trim() === '') {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'No puede estar vacio el campo texto!',
            background: document.getElementById('mode').classList.contains('modedark') ? 'hsl(235, 24%, 19%)' : 'hsl(0, 0%, 98%)',
            color: document.getElementById('mode').classList.contains('modedark') ? '#fff' : 'hsl(233, 14%, 35%)'
        })
        return
    }
    let tasks = {
        id: Date.now(),
        text: e.target.elements[1].value,
        state: false
    }
    task[tasks.id] = {...tasks};
    addTask(task);
    form.reset();
    input.focus();
}

const addTask = (task, count) => {

    list.innerHTML = '';
    if (count === 0) {
        document.getElementById('footer-list').classList.replace('block', 'none');
    };
    for (let i in task){
        const clone = template.cloneNode(true);
        clone.querySelector('.border').dataset.id = task[i].id;
        clone.getElementById('template-text').innerHTML = task[i].text;
        clone.getElementById('btnDelete').dataset.id = task[i].id;
        clone.getElementById('btncheck').dataset.state = task[i].state;
        // clone.getElementById('template-text').dataset.change = task[i].mode;
        // || document.getElementById('check-all').dataset.check
        // NOTA: agregar otro if con este comprobacion de arriba para probar
        if (task[i].state == true || document.getElementById('check-all').dataset.check == true) {
            clone.getElementById('btncheck').classList.replace('btncheck', 'btnchecked');
            clone.getElementById('template-text').style.textDecoration = 'line-through';
            clone.getElementById('template-text').style.color = 'darkgray';
        };
        if (document.getElementById('mode').classList.contains('modelight')) {
            clone.querySelector('#template-text').style.color = 'hsl(235, 19%, 35%)';
            clone.getElementById('btncheck').style.backgroundColor = 'hsl(0, 0%, 98%)';
            // Nota: hacer hover al btndelete y
        }
        const count = Object.keys(task).length;
        document.querySelector('.count-item').innerHTML = count;
        document.getElementById('footer-list').classList.replace('none', 'block');
        document.getElementById('clean').dataset.page = 1;
        document.querySelector('#page-1').classList.replace('none', 'block');
        document.querySelector('#page-2').classList.replace('block', 'none');
        document.querySelector('#page-3').classList.replace('block', 'none');
        fragment.appendChild(clone);
    }
    list.appendChild(fragment);
}

const btnDelete = (id) => {
    delete task[id];
    const count = Object.keys(task).length;
    addTask(task, count)
}

const taskClean = (e) => {

        for (let i in task) {
            delete task[i];
        }
    document.getElementById('check-all').dataset.check = false;
    document.getElementById('check-all').classList.replace('checked-all-button', 'check-all-button');
    document.getElementById('completed').classList.replace('block', 'none');
    document.querySelector('.title').textContent = 'done';
    document.getElementById('list').classList.remove('none');
    document.getElementById('input-text').style.backgroundColor = '#25273c';
    document.getElementById('input-text').disabled = false;
    document.getElementById('check-all').disabled = false;
    document.querySelector('.div-main').style.pointerEvents = 'auto';
    document.querySelector('.link-3').classList.remove('active');
    document.querySelector('.link-2').classList.remove('active');
    document.querySelector('.link-1').classList.add('active');
    addTask(task, 0);
    active(task, 0);
    taskCompleted(task, 0);
}

const change = () => {
    if (document.getElementById('mode').classList.contains('modedark')) {
        document.getElementById('mode').classList.replace('modedark', 'modelight');
        document.querySelector('body').classList.add('body');
        document.getElementById('list').style.backgroundColor = 'hsl(0, 0%, 98%)';
        document.getElementById('input-text').classList.replace('text', 'text-light');
        document.querySelector('.list-footer').style.backgroundColor = 'hsl(0, 0%, 98%)';
        document.getElementById('clean').classList.replace('btn-clean', 'btn-clean-light');
        document.getElementById('check-all').style.backgroundColor = 'hsl(0, 0%, 98%)';
        document.getElementById('completed').style.backgroundColor = 'hsl(0, 0%, 98%)';
        const count = Object.keys(task).length;
        addTask(task, count);
        return
    };
    if (document.getElementById('mode').classList.contains('modelight')) {
        document.getElementById('mode').classList.replace('modelight', 'modedark');
        document.querySelector('body').classList.remove('body');
        document.getElementById('list').style.backgroundColor = 'hsl(235, 24%, 19%)';
        document.getElementById('input-text').classList.replace('text-light', 'text');
        document.querySelector('.list-footer').style.backgroundColor = 'hsl(235, 24%, 19%)';
        document.getElementById('clean').classList.replace('btn-clean-light', 'btn-clean');
        document.getElementById('check-all').style.backgroundColor = '#25273c';
        document.getElementById('completed').style.backgroundColor = 'hsl(235, 24%, 19%)';
        const count = Object.keys(task).length;
        addTask(task, count);
        return
    };
}

const completeTask = () => {
    let leng = Object.keys(task).length;
    document.getElementById('check-all').dataset.check = true;
    for(let c in task) {
        task[c].state = true;
    }
    return addTask(task, leng);
}

const uncomplete = () => {
    let leng = Object.keys(task).length;
    document.getElementById('check-all').dataset.check = false;
    for(let c in task) {
        task[c].state = false;
    }
    return addTask(task, leng);
}

const taskCompleted = (e) => {
    let countTask = Object.keys(task).length;
    let leng = 0;
    let a = 0;
    listCompleted.innerHTML = '';

    for(let i in task) {
        if (!task[i].state) {
            a++;
            if (a == countTask) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debes selecciona una tarea!',
                    confirmButtonColor: '#D2001A',
                    background: document.getElementById('mode').classList.contains('modedark') ? 'hsl(235, 24%, 19%)' : 'hsl(0, 0%, 98%)',
                    color: document.getElementById('mode').classList.contains('modedark') ? '#fff' : 'hsl(233, 14%, 35%)'
                });
                e.target.classList.remove('active');
                e.target.parentElement.children[0].classList.add('active');
                document.querySelector('#page-1').classList.replace('none', 'block');
                document.querySelector('#page-2').classList.replace('block', 'none');
                document.querySelector('#page-3').classList.replace('block', 'none');
                document.querySelector('.title').textContent = 'todo';
            }
        }
        if (task[i].state) {
            leng++
            if (leng >= 1) {
                const cloneCompleted = templateCompleted.cloneNode(true);
                cloneCompleted.getElementById('taskc').innerHTML = task[i].text;
                fragmentCompleted.appendChild(cloneCompleted);
            }
        };
    }
    listCompleted.appendChild(fragmentCompleted);
    if (leng >= 1) {
        input.blur();
        form.reset();
        document.querySelector('.title').textContent = 'Completed';
        document.getElementById('list').classList.add('none');
        document.getElementById('input-text').style.backgroundColor = 'rgba(0, 0, 0, .4)';
        document.getElementById('input-text').disabled = true;
        document.getElementById('check-all').disabled = true;
        document.querySelector('.div-main').style.pointerEvents = 'none';
        document.getElementById('completed').classList.replace('none', 'block');
        document.querySelector('.count-item').innerHTML = leng;
        document.getElementById('clean').dataset.page = 3;
        document.querySelector('#page-3').classList.replace('none', 'block');
        document.querySelector('#page-1').classList.replace('block', 'none');
        document.querySelector('#page-2').classList.replace('block', 'none');
    };
}

const active = (e) => {
    let cont = 0;
    listActive.innerHTML = '';

    for (const key in task) {
        if (!task[key].state) {
            cont++;
            const cloneActive = templateActive.cloneNode(true);
            cloneActive.getElementById('text-active').textContent = task[key].text;
            cloneActive.getElementById('btnDelete-active').dataset.id = task[key].id;
            fragmentActive.appendChild(cloneActive);
        
        }
    }
    if (cont == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay tareas activas!',
            confirmButtonColor: '#D2001A',
            background: document.getElementById('mode').classList.contains('modedark') ? 'hsl(235, 24%, 19%)' : 'hsl(0, 0%, 98%)',
            color: document.getElementById('mode').classList.contains('modedark') ? '#fff' : 'hsl(233, 14%, 35%)'
        });
        document.querySelector('.link-2').classList.remove('active');
        document.querySelector('.link-1').classList.add('active');
        return
    }
    listActive.appendChild(fragmentActive);
    document.querySelector('#page-2').classList.replace('none', 'block');
    document.querySelector('#page-1').classList.replace('block', 'none');
    document.querySelector('#page-3').classList.replace('block', 'none');
    document.querySelector('.title').textContent = 'active';
    document.querySelector('.count-item').innerHTML = cont;
}