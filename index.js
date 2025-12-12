const wrapper = document.querySelector(".wrapper");
document.querySelectorAll(".menu").forEach((menu, i) =>
    menu.onclick = () => wrapper.style.transform = `translateX(-${i * 100}vw)`
);
document.querySelector('.limited').onclick = () => {
  document.querySelector('#ftproducts').scrollIntoView({ behavior: 'smooth' });
};

const allft = document.querySelector(".allft");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

allft.addEventListener("click", () => {
    payment.style.display = "flex";
});

close.addEventListener("click", () => {
    payment.style.display = "none";
});

function scrollToProduct(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

document.querySelector(".contact-btn").onclick = () => {
    document.querySelector(".footer").scrollIntoView({ behavior: "smooth" });
};


