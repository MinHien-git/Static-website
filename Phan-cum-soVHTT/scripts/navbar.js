const toggler = document.querySelector(".btn")

toggler.addEventListener("click", () => {
	document.querySelector(".sidebar").classList.toggle("collapsed")
})
