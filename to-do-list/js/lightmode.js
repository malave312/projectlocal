const btn = document.getElementById('mode');


btn.addEventListener("click", () => {
   change();
});

// Agregarle un estado false y llamar addtadk() y cuando este cambie a true cambbie los colores
const change = () => {
    if (document.getElementById('mode').classList.contains('modedark')) {
        document.getElementById('mode').classList.replace('modedark', 'modelight');
        document.querySelector('body').classList.add('body');
        document.getElementById('mode').dataset.change = true;
        addtask();
        // document.querySelector('.container-list').style.backgroundColor = 'hsl(0, 0%, 98%)';
        // document.querySelector('.list').style.borderBottom = '1px solid hsl(233, 11%, 84%)';
        // document.querySelector('.container-list').classList.add('list-light');
        // document.querySelector('.list-footer').style.backgroundColor = 'hsl(0, 0%, 98%)';
        // document.querySelector('.list-footer').style.color = 'hsl(236, 9%, 61%)';
        // document.getElementById('input-text').classList.replace('text', 'text-light');
        // document.querySelector('.template-text').classList.replace('template-text', 'template-text-light');
        // document.querySelector('.text').style.color = 'hsl(235, 19%, 35%)';
        return
    };
    if (document.getElementById('mode').classList.contains('modelight')) {
        document.getElementById('mode').classList.replace('modelight', 'modedark');
        document.querySelector('body').classList.remove('body');

        document.getElementById('input-text').classList.replace('text-light', 'text');
        document.querySelector('.container-list').style.backgroundColor = 'hsl(0, 0%, 98%)';
        document.querySelector('.list-footer').style.backgroundColor = 'hsl(235, 24%, 19%)';
        document.getElementById('input-text').classList.replace('text-light', 'text');
        // document.querySelector('.text').style.color = 'hsl(233, 11%, 84%)';
        // document.querySelector('.text').style.backgroundColor = 'hsl(235, 24%, 19%)';
        document.querySelector('.container-list').style.backgroundColor = 'hsl(235, 24%, 19%)';
        return
    };
}