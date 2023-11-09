let primary_header = $("#primary-header");
let burger = $("#burger");
let primary_navigation_bar = $("#primary-navigation-bar");

burger.on("click", (e) => {
  primary_header.toggleClass("active");
});
