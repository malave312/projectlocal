const containerVideo = document.getElementById("container-video"),
    template = document.getElementById("template").content,
    fragment = document.createDocumentFragment(),
    cards = document.getElementById("container-card"),
    section2 = document.querySelector(".main-container > .section2");
// cardsHover = document.querySelectorAll(".container-card");

const inputSearch = document.getElementById("input-search");
const btnClear = document.getElementById("clear");
const form = document.querySelector("form");


const
    // card = document.getElementById('container-card'),
    cardHover = document.getElementsByClassName("section2");

const btns = document.getElementsByClassName("link"),
    icon = document.querySelectorAll(".link > i");
let p = 0;

document.addEventListener("DOMContentLoaded", (e) => {
    callApi();
});

inputSearch.addEventListener("input", function (e) {
    e.preventDefault();
    e.target.value.length >= 1
        ? document.querySelector(".clear").classList.remove("d-none")
        : document.querySelector(".clear").classList.add("d-none");
});

btnClear.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("form").reset();
    inputSearch.focus();
    document.querySelector(".clear").classList.add("d-none");
});

inputSearch.addEventListener("focusin", function (e) {
    document
        .querySelector(".navbar-section2-container-action")
        .classList.add("style-input");
    document.querySelector(".bi-search").classList.remove("invisible");
    document
        .querySelector(".navbar-section2-container-action-search")
        .classList.remove("border-rounded");
});

inputSearch.addEventListener("focusout", function (e) {
    // document.querySelector(".navbar-section2-container-action").style.outline =
    // "0";
    document
        .querySelector(".navbar-section2-container-action-search")
        .classList.remove("style-input");

    document
        .querySelector(".navbar-section2-container-action")
        .classList.remove("style-input");
    document.querySelector(".bi-search").classList.add("invisible");
    document
        .querySelector(".navbar-section2-container-action-search")
        .classList.add("border-rounded");
    // document.querySelector('.clear').classList.add('d-none');
    // document.querySelector('.bi-search').classList.remove('border-rounded');
    // document.querySelector('.bi-search').classList.replace('invisible', 'visible');
});

const callApi = async () => {
    try {
        const apiKey = "23543280-ab1316dfc9ab1ef53517801e4";
        const api = await fetch(
            `https://pixabay.com/api/?key=${apiKey}&q=yellow+flowers&image_type=photo&pretty=true`
        );
        const result = await api.json();
        getVideo(result.hits);
    } catch (error) {
        console.log(error);
    }
};

const getVideo = (resultVideo) => {
    for (let i = 0; i < resultVideo.length; i++) {
        const { largeImageURL, userImageURL, user, views, published } =
            resultVideo[i];
        const clone = template.cloneNode(true);
        clone.querySelector(".image").setAttribute("src", `${largeImageURL}`);
        clone.querySelector(".image").setAttribute("alt", `prueba${i}`);
        clone.querySelector(".user-img").setAttribute("src", `${userImageURL}`);
        clone.querySelector(".user-img").setAttribute("alt", `prueba${i}`);
        clone.querySelector(".user").textContent = user;
        clone.querySelector(
            ".views"
        ).textContent = `${views} visualizaciones • hace ${i} horas`;
        fragment.appendChild(clone);
    }
    cards.appendChild(fragment);
    section2.style.gridTemplateRows = `repeat(${
        resultVideo.length / 4
    }, 286px)`;
    const cardHover = document.querySelectorAll('.container-card');
    for (let b = 0; b < cardHover.length; b++) {
        cardHover[b].addEventListener('mouseover', function (e) {
            if (e.target.classList.contains("image") == true) {
                cardHover[b].classList.add("container-card-h");
                // console.log(cardHover[b]);
                cardHover[b].querySelector(".container-ob").classList.add("container-ob-h");
                cardHover[b].querySelector(".title").classList.add("title-h");
                cardHover[b].querySelector(".user").classList.add("user-h");
                cardHover[b].querySelector(".views").classList.add("views-h");
            }
            // if (e.target.classList.contains("image") == false || e.target.classList.contains("container-card") == true) {
            //     cardHover[b].classList.remove("container-card-h");
            // }
        });
        // cardHover[b].addEventListener('mouseout', function (e) {
        //     if (e.target.classList.contains("image") == false) {
        //     }
        // console.log(cardHover[b]);
        // });
    }
};

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (e) {
        const current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";

        if (icon[i].classList[1].indexOf("-fill") == -1) {
            document
                .querySelector(`.${icon[i].dataset.icon}`)
                .classList.replace(
                    icon[i].dataset.icon,
                    `${icon[i].dataset.icon}-fill`
                );
            for (let i = 0; i < icon.length; i++) {
                if (
                    btns[i].classList.contains("active") == false &&
                    icon[i].attributes.class.nodeValue.indexOf("-fill") > -1
                ) {
                    document
                        .querySelector(`.${icon[i].dataset.icon}-fill`)
                        .classList.replace(
                            `${icon[i].dataset.icon}-fill`,
                            icon[i].dataset.icon
                        );
                }
            }
        }
    });
}