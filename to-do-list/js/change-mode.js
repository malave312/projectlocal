btn.addEventListener("click", () => {
    change();
 });

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

export