const containerVideo = document.getElementById("container-video"),
    template = document.getElementById("template").content,
    fragment = document.createDocumentFragment(),
    cards = document.getElementById("container-card"),
    section2 = document.querySelector(".main-container > .section2"),
    iconBar = document.getElementById("icon-nav");

const inputSearch = document.getElementById("input-search");
const btnClear = document.getElementById("clear");
const form = document.querySelector("form");

const cardHover = document.getElementsByClassName("section2");

const btns = document.getElementsByClassName("link"),
    icon = document.querySelectorAll(".link > i");
let p = 0;

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    buttonActive();
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
});

iconBar.addEventListener("click", function (e) {
    document.querySelector(".section1").classList.toggle("toggle-nav");
    document.querySelector(".bar-section3").classList.toggle("d-none");
    document.querySelector(".clock").classList.toggle("d-none");
    for (const btn of btns) {
        btn.classList.toggle("bg-white");
    }
    for (const i of document.querySelectorAll('.container-card')) {
        // console.log(iterator);
        i.querySelector(".image").classList.toggle("h-2");
        i.querySelector(".btn-add").classList.toggle("mt-2");
    }
    // if (document.querySelector(".section1").classList.contains("toggle-nav")) {
        // document.querySelector('.image');
        // clone.querySelector('.image').classList.add("h-19");
        // clone.querySelector('.card-hv').classList.add("transform");
        // console.log(document.querySelector(".section1"));
    // }
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
    let i = 0;
    for (let result of resultVideo) {
        i++;
        const {
            largeImageURL,
            userImageURL,
            user,
            views,
            webformatURL,
            pageURL,
        } = result;
        const clone = template.cloneNode(true);
        clone.querySelector(".image").setAttribute("src", webformatURL);
        clone.querySelector(".image").setAttribute("alt", `prueba${i}`);
        clone.querySelector(".user-img").setAttribute("src", userImageURL);
        clone.querySelector(".href").setAttribute("href", pageURL);
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
    }, 306px)`;
    const cardHover = document.querySelectorAll(".container-card");
    videoThumbnail(cardHover);
};

const videoThumbnail = (cardHover) => {
    for (let hover of cardHover) {
        window.addEventListener('load', function (e) {
            hover.querySelector(".image").onmouseover = standBy;
            hover.onmouseout = cancel;
        });
        function standBy() {
            if (
                hover.dataset.state == "true" &&
                hover.classList.contains("card-hv")
                ) {
                    return;
                }
            standBy.time = setTimeout(showCards, 1000);
            bucle();
        }
        function cancel() {
            if (hover.dataset.state == "true") {
                return;
            }
            clearTimeout(standBy.time);
            bucle();
        }
        function showCards(e) {
            if (hover.dataset.state == "false") {
                hover.classList.add("card-hv");
                hover.querySelector(".title").classList.add("tl-hv");
                hover.querySelector(".user").classList.add("usr-hv");
                hover.querySelector(".views").classList.add("vws-hv");
                hover.querySelector(".container-button-hover").classList.replace("d-none", "d-flex");
                hover.querySelector('.info').classList.add("d-none");
                hover.dataset.state = true;
                hover.querySelector('.container-card-img').style.borderBottomLeftRadius = "0px";
                hover.querySelector('.container-card-img').style.borderBottomRightRadius = "0px";
            }
        }
        function bucle() {
            for (const c of cardHover) {
                if (c.dataset.state == "true") {
                    c.classList.remove("card-hv");
                    c.querySelector(".title").classList.add("tl-hv");
                    c.querySelector(".user").classList.add("usr-hv");
                    c.querySelector(".views").classList.add("vws-hv");
                    c.querySelector(".container-button-hover").classList.replace("d-flex", "d-none");
                    c.querySelector('.info').classList.remove("d-none");
                    c.querySelector('.container-card-img').style.borderBottomLeftRadius = "8px";
                    c.querySelector('.container-card-img').style.borderBottomRightRadius = "8px";
                    c.dataset.state = false;
                }
                if (c.dataset.state && !c.classList.contains("card-hv")) {
                    c.dataset.state = false;
                }
                if (document.querySelector('.section1').classList.contains("toggle-nav")) {
                    c.querySelector(".container-button-hover").classList.add("flex-row");
                }
                if (!document.querySelector('.section1').classList.contains("toggle-nav")) {
                    c.querySelector(".container-button-hover").classList.remove("flex-row");
                }
            }
        }
    }
};

const buttonActive = () => {
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
}