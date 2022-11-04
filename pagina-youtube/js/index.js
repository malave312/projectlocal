const containerVideo = document.getElementById("container-video"),
    template = document.getElementById("template").content,
    fragment = document.createDocumentFragment(),
    cards = document.getElementById("container-card"),
    section2 = document.querySelector(".main-container > .section2"),
    iconBar = document.getElementById('icon-nav');

const inputSearch = document.getElementById("input-search");
const btnClear = document.getElementById("clear");
const form = document.querySelector("form");

const // card = document.getElementById('container-card'),
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

iconBar.addEventListener('click', function (e) {
    console.log("click");
    // document.querySelector('.section1').style.width = "85px";
    // document.querySelector('.section1').classList.toggle("wd");
    document.querySelector('.section1').classList.toggle("toggle-nav");
    document.querySelector('.bar-section3').classList.toggle("d-none");
    document.querySelector('.clock').classList.toggle("d-none");
    // document.querySelector('.active').classList.add("bg-white");

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
        const { largeImageURL, userImageURL, user, views, webformatURL,pageURL } =
            resultVideo[i];
        const clone = template.cloneNode(true);
        clone.querySelector(".image").setAttribute("src",  webformatURL);
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
    for (let i = 0; i < cardHover.length; i++) {
        window.addEventListener('load', function (e) {
            cardHover[i].querySelector(".image").onmouseover = standBy;
            cardHover[i].onmouseout = cancel;
        });
        // cardHover[i].addEventListener('mouseenter', function (e) {
        //     cardHover[i].querySelector(".image").onmouseover = standBy;
        //     cardHover[i].onmouseout = cancel;
        // });
        function standBy() {
            if (cardHover[i].dataset.state == "true" && cardHover[i].classList.contains("card-hv")) {
                return
            }
            standBy.time = setTimeout(showCards, 1000);
            for (let i = 0; i < cardHover.length; i++) {
                if (cardHover[i].dataset.state == "true") {
                    cardHover[i].classList.remove("card-hv");
                    cardHover[i].querySelector('.title').classList.add("tl-hv");
                    cardHover[i].querySelector('.user').classList.add("usr-hv");
                    cardHover[i].querySelector('.views').classList.add("vws-hv");
                }
            }

        }

        function cancel() {
            // console.log(document.querySelector('.section1').classList.contains("container-card"));
            if (cardHover[i].dataset.state == "true") {
                return
            }
            for (let i = 0; i < cardHover.length; i++) {
                if (cardHover[i].dataset.state == "true") {
                    cardHover[i].classList.remove("card-hv");
                    cardHover[i].querySelector('.title').classList.add("tl-hv");
                cardHover[i].querySelector('.user').classList.add("usr-hv");
                cardHover[i].querySelector('.views').classList.add("vws-hv");
                    cardHover[i].dataset.state = false;
                }
            }
            clearTimeout(standBy.time);
        }

        function showCards(e) {
            if (cardHover[i].dataset.state == "false") {
                cardHover[i].classList.add("card-hv");
                // cardHover[i].classList.add("fade");
                cardHover[i].querySelector('.title').classList.add("tl-hv");
                cardHover[i].querySelector('.user').classList.add("usr-hv");
                cardHover[i].querySelector('.views').classList.add("vws-hv");
                cardHover[i].dataset.state = true;
            }
        }
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
