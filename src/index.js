document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".nav-button");

    const izvele = document.querySelectorAll(".input1");
    const paragraphs = document.querySelectorAll("p")

    izvele.forEach((input) => {
        input.addEventListener("click", () => {
            let inputValue = input.getAttribute("value");
            paragraphs.forEach((p) => {
                p.classList.remove("small", "normal", "big");

                if (inputValue == "1") {
                    p.classList.add("small");
                } else if (inputValue == "2") {
                    p.classList.add("normal");
                } else if (inputValue == "3") {
                    p.classList.add("big");
                }
            });
        })
    })

    function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

    buttons.forEach((button) => {
        let hoverCount = 0;
        let isMoving = true;
        let interval = null;

        button.addEventListener("mousemove", function () {
            if (isMoving) {
                let randomX = (Math.random() - 1.5) * 100;
                let randomY = (getRandomInRange(4, document.querySelector("nav").style.height) + 2) * 100;
                
                button.style.transform = `translate(${randomX}px, ${randomY}px)`;

                hoverCount++;
                if (hoverCount >= 10) {
                    isMoving = false;
                    button.style.transform = "translate(0, 0)";
                    setTimeout(() => {
                        isMoving = true;
                        hoverCount = 0;
                    }, 12000)
                }
            }
        });

        button.addEventListener("mouseenter", function () {
            if (!interval) {
                interval = setInterval(() => {
                    let text = button.innerText;
                    let randomIndex = Math.floor(Math.random() * text.length);

                    let newText = text
                        .split("")
                        .map((char, index) =>
                            index === randomIndex
                                ? `<span class="green">${char}</span>`
                                : char
                        )
                        .join("");

                    button.innerHTML = newText;
                }, 200);
            }
        });

        button.addEventListener("mouseleave", function () {
            clearInterval(interval);
            interval = null;
            button.innerHTML = button.innerText;
        });

        button.addEventListener("click", function (event) {
            if (event.target.classList.contains("green")) {
                let targetSection = button.getAttribute("data-target");
                let section = document.getElementById(targetSection);

                if (section) {
                    document.removeEventListener("wheel", preventScroll);
                    document.removeEventListener("keydown", preventKeyScroll);
                    window.removeEventListener("scroll", preventScrollReset);

                    section.scrollIntoView({ behavior: "smooth" });

                    setTimeout(() => {
                        document.addEventListener("wheel", preventScroll, { passive: false });
                        document.addEventListener("keydown", preventKeyScroll);
                        window.addEventListener("scroll", preventScrollReset);
                    }, 1000);
                }
            } else {
                // alert("Click the colored letter");
                event.preventDefault();
            }
        });
    });

    function preventScroll(event) {
        event.preventDefault();
    }

    function preventKeyScroll(event) {
        if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space"].includes(event.key)) {
            event.preventDefault();
        }
    }

    function preventScrollReset() {
        window.scrollTo(0, 0);
    }

    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("keydown", preventKeyScroll);
    window.addEventListener("scroll", preventScrollReset);

    document.querySelector(".buttonR").addEventListener("click", () =>{
        getText("https://catfact.ninja/fact")
    }) 
});

function getText(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.fact)
        document.getElementById("cat").innerHTML = data.fact
    })
}

getText("https://catfact.ninja/fact")