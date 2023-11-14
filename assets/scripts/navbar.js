let primary_header = $("#primary-header");
let burger = $("#burger");
let primary_navigation_bar = $("#primary-navigation-bar");

burger.on("click", (e) => {
  primary_header.toggleClass("active");
});

let navbar = document.querySelectorAll("#primary-items-list li");
navbar.forEach((e) => {
    e.addEventListener("mouseover", () => { 
        e.style.color = "hsl(219, 90%, 69%)";
    });
    e.addEventListener("mouseout", () => {
        e.style.color = "black";
    })
})