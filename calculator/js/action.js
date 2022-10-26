let screen = document.getElementById('screen');
let screen2 = document.getElementById('screen2');
const buttons = document.querySelectorAll("input[type='button']");

const toggle = document.querySelector('.tri-state-toggle');
const span = toggle.getElementsByClassName('checkbox');
let contNumber1 = '';
let contNumber2 = '';
let givenResult = '';


// Toggle
for (let i = 0; i < span.length; i++) {
    span[i].addEventListener('click', function (e) {
        const current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        if (e.target.classList.contains('link-1')) {
            theme1();
            return
        }
        if (e.target.classList.contains('link-2')) {
            theme2();
            return
        }
        if (e.target.classList.contains('link-3')) {
            theme3();
            return
        }
    });
}

// Buttons
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (e) {
        if (e.target.value >= 0 && e.target.value <= 9 || e.target.value.indexOf('.') > -1) {
            if (!screen.dataset.state) {
                screen.value += e.target.value;
                return
            }
            // contNumber2 += e.target.value;
            screen2.value += e.target.value;
            // contNumberFormat2 = Intl.NumberFormat('en-US');
            // if (contNumberFormat.format(contNumber2) == 'NaN') return screen2.value;
            // screen2.value = contNumberFormat2.format(contNumber2);
        }
        if (e.target.value.indexOf('del') > -1) {
            // Nota: ordenar eliminar screen1 y screen2 con condicionales
            // if (result !== 0) Nota: hacer esto para no borrar el resultado
            // if (screen.classList.contains('d-block')) {
                // let chain = screen.value;
                // let chain = screen.value;
                let chain = screen.value;
                let chainDelete = chain.slice(0, -1);
                contNumber1 = chainDelete;
                // console.log(contNumber1);
                // console.log('2 ' + chain);
                // console.log('3 ' + screen.value);
                screen.value = chainDelete;
                if (screen.value.slice(-1) == ',') screen.value = contNumber1.slice(0, -1);
                // console.log(screen.value);
                // console.log();
                // contNumber1 = chainDelete;
                // screen.value = screen.value.slice(-1) === ',' ? contNumber1 : console.log(chainDelete);
                // console.log(screen.value.slice(-1) == ',');
                // console.log(contNumber1);
                // console.log(screen.value);
                // console.log(chain);
                // console.log(chainDelete);
                // console.log(screen.value);
                // screen.value = contNumber1;
            // }
            // if (screen2.classList.contains('d-block')) {
                // 
                // console.log('Screen2');
            // }
            screen.dataset.state = '';
            // let chain2 = screen2.value;
            // let chainDelete2 = chain2.slice(0, -1);
            // contNumber2 = chainDelete2;
            // screen2.value = chainDelete2;
            // if (screen2.value.slice(-1) === ','){ screen2.value = contNumber2.slice(0, -1)};
            // if (screen2.value != 0) {
                // screen2.value = chainDelete
                // contNumber2 = chainDelete;
            // }
            return
        }
        if (e.target.value.indexOf('reset') > -1) {
            screen.value = '';
            screen2.value = '';
            contNumber1 = '';
            contNumber2 = '';
            screen.dataset.state = '';
            screen.classList.replace('d-none', 'd-block');
            screen2.classList.replace('d-block', 'd-none');
            return
        }
    });
}

function operation(e) {
    // console.log(screen2.value.slice(-1));
    // console.log(contNumber1.slice());
    if (screen.value == '') return;
    screen2.setAttribute('placeholder', screen.value);
    screen.classList.replace('d-block', 'd-none');
    screen2.classList.replace('d-none', 'd-block');
    screen.dataset.operation = e;
    screen.dataset.state = false;
    contNumber2 = '';
    screen2.value = '';
}

function result() {
    let result = 0;
    if (screen.value == '' || screen2.value == '') return;
    screen.classList.replace('d-none', 'd-block');
    screen2.classList.replace('d-block', 'd-none');
    if (screen.dataset.operation === '+') {
        result = parseFloat(screen.value.replace(/,/g,"")) + parseFloat(screen2.value.replace(/,/g,""));
    }
    if (screen.dataset.operation === '-') {
        result = parseFloat(screen.value.replace(/,/g,"")) - parseFloat(screen2.value.replace(/,/g,""));
    }
    if (screen.dataset.operation === '/') {
        result = parseFloat(screen.value.replace(/,/g,"")) / parseFloat(screen2.value.replace(/,/g,""));
    }
    if (screen.dataset.operation === 'x') {
        result = parseFloat(screen.value.replace(/,/g,"")) * parseFloat(screen2.value.replace(/,/g,""));
    }
    givenResult = result;
    internationalNumberFormat = Intl.NumberFormat('en-US');
    screen.value = internationalNumberFormat.format(givenResult);
}

function theme1() {
    for (let c = 0; c < buttons.length; c++) {
        buttons[c].classList.remove(document.querySelector('body').dataset.theme);
    }
    document.querySelector('body').classList.remove(document.querySelector('body').dataset.theme);
    // document.querySelector('body').dataset.theme = 'theme2';
    document.querySelector('.display-text').classList.remove(document.querySelector('body').dataset.theme);
    document.querySelector('.display-text2').classList.remove(document.querySelector('body').dataset.theme);
    document.querySelector('.tri-state-toggle').classList.remove(document.querySelector('body').dataset.theme);
    document.querySelector('.container-toggle').classList.remove(document.querySelector('body').dataset.theme);
    document.querySelector('.title').classList.remove(document.querySelector('body').dataset.theme);
    document.querySelector('.table-grid').classList.remove(document.querySelector('body').dataset.theme);
}

function theme2() {
    document.querySelector('body').classList.contains('theme3') ?  document.querySelector('body').classList.replace('theme3', 'theme2') : document.querySelector('body').classList.add('theme2');

    document.querySelector('body').dataset.theme = 'theme2';
    
    document.querySelector('.display-text').classList.contains('theme3') ? document.querySelector('.display-text').classList.replace('theme3', 'theme2') : document.querySelector('.display-text').classList.add('theme2');

    document.querySelector('.display-text2').classList.contains('theme3') ? document.querySelector('.display-text2').classList.replace('theme3', 'theme2') : document.querySelector('.display-text2').classList.add('theme2');

    document.querySelector('.tri-state-toggle').classList.contains('theme3') ? document.querySelector('.tri-state-toggle').classList.replace('theme3', 'theme2') : document.querySelector('.tri-state-toggle').classList.add('theme2');

    document.querySelector('.container-toggle').classList.contains('theme3') ? document.querySelector('.container-toggle').classList.replace('theme3', 'theme2') : document.querySelector('.container-toggle').classList.add('theme2');

    document.querySelector('.title').classList.contains('theme3') ? document.querySelector('.title').classList.replace('theme3', 'theme2') : document.querySelector('.title').classList.add('theme2');

    document.querySelector('.table-grid').classList.contains('theme3') ? document.querySelector('.table-grid').classList.replace('theme3', 'theme2') : document.querySelector('.table-grid').classList.add('theme2');

    for (let c = 0; c < buttons.length; c++) {
        buttons[c].classList.contains('theme3') ? buttons[c].classList.replace('theme3', 'theme2') : buttons[c].classList.add('theme2');
    }
}

function theme3() {
    document.querySelector('body').classList.contains('theme2') ?  document.querySelector('body').classList.replace('theme2', 'theme3') : document.querySelector('body').classList.add('theme3');

    document.querySelector('body').dataset.theme = 'theme3';
    document.querySelector('.display-text').classList.contains('theme2') ? document.querySelector('.display-text').classList.replace('theme2', 'theme3') : document.querySelector('.display-text').classList.add('theme3');

    document.querySelector('.display-text2').classList.contains('theme2') ? document.querySelector('.display-text2').classList.replace('theme2', 'theme3') : document.querySelector('.display-text2').classList.add('theme3');

    document.querySelector('.tri-state-toggle').classList.contains('theme2') ? document.querySelector('.tri-state-toggle').classList.replace('theme2', 'theme3') : document.querySelector('.tri-state-toggle').classList.add('theme3');

    document.querySelector('.container-toggle').classList.contains('theme2') ? document.querySelector('.container-toggle').classList.replace('theme2', 'theme3') : document.querySelector('.container-toggle').classList.add('theme3');

    document.querySelector('.title').classList.contains('theme2') ? document.querySelector('.title').classList.replace('theme2', 'theme3') : document.querySelector('.title').classList.add('theme3');

    document.querySelector('.table-grid').classList.contains('theme2') ? document.querySelector('.table-grid').classList.replace('theme2', 'theme3') : document.querySelector('.table-grid').classList.add('theme3');

    for (let c = 0; c < buttons.length; c++) {
        buttons[c].classList.contains('theme2') ? buttons[c].classList.replace('theme2', 'theme3') : buttons[c].classList.add('theme3');
    }
}