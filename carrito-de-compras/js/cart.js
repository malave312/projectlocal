const
    increase = document.getElementById('increase'),
    diminish = document.getElementById('diminish'),
    btnAddCart = document.getElementById('btnaddcart'),
    showCart = document.getElementById('icon-cart'),
    btnClose = document.getElementById('btnclose'),
    item = document.getElementById('item'),
    count = document.getElementById('count'),
    btnList = document.getElementById('buttonlist'),
    btncloselist = document.getElementById('btncloselist');

let cart = {
    id: 0,
    image: 'assets/images/image-product-1-thumbnail.jpg',
    price: 125,
    name: 'fall limited edition sneaker',
    amount: 0
};

btncloselist.addEventListener("click", () => {
    document.getElementById('container-list').classList.add('none');
});

btnList.addEventListener("click", () => {
    document.getElementById('container-list').classList.remove('none');
});

showCart.addEventListener("click", () => {
    iconCart();
});

const iconCart = () => {
    document.querySelector('.content').style.display = 'block';
}

btnAddCart.addEventListener("click", (e) => {
    addCart();
    e.preventDefault();
});

btnClose.addEventListener("click", () => {
    close();
});

const close = () => {
    document.querySelector('.content').style.display = 'none';
}

const addCart = () => {
    if (cart.amount > 0) {
        const {id, image, price, name, amount } = cart;
        const car = {
            id: id,
            image: image,
            price: price,
            name: name,
            amount: amount
        }
        document.querySelector('.count').style.display = 'block';
        count.innerHTML = amount;
        item.innerHTML = `
            <div class="prueba">
                <div class="check">
                    <div class="container-img">
                        <img src=${car.image} alt="image">
                    </div>
                    <div class="container-body">
                        <p class="title">${car.name}</p>
                        <div class="info">
                            <p class="price">${car.price}.00$ x ${car.amount} <span class="bold">${car.price * amount}.00$</span></p>
                        </div>
                    </div>
                    <button type="button" class="trash" id="">
                        <i class="bi bi-trash" id="trash"></i>
                    </button>
                </div>
            </div>
        `;
        const btnTrash = document.getElementById('trash');
        btnTrash.addEventListener("click", () => {
            trash();
        })
        const trash = () => {
            delete car.id;
            delete car.price;
            delete car.amount;
            delete car.image;
            delete car.name;
            document.querySelector('.count').style.display = 'none';
            document.querySelector('.prueba').style.display = 'none';
            item.innerHTML = 'Your cart is empty.';
        }
    }
    else {
        cart.amount = 0;
        document.querySelector('.count').style.display = 'none';
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Debes elergir un item',
            showConfirmButton: false,
            timer: 1200
        })
    }
}

diminish.addEventListener("click", () => {
    buttonDiminish();
});

increase.addEventListener("click", () => {
    buttonIncrease();
});

const buttonIncrease = () => {
    if (cart.amount < 10) {
        cart.amount += 1;
        number.innerHTML = cart.amount;
    } 
    else {
        cart.amount = 10;
    }
}


const buttonDiminish = () => {
    if (cart.amount > 0) {
        cart.amount -= 1;
        number.innerHTML = cart.amount;
    }
    else {
        cart.amount = 0;
    }
}