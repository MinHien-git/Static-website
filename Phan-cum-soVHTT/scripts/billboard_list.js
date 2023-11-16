//toggle collapse button
function toggleCollapseButton() {
	const btn = document.getElementById("collapse__btn")
	const icon = btn.querySelector("i")
	if (btn.classList.contains("collapsed")) {
		icon.classList.remove("bi-chevron-up")
		icon.classList.add("bi-chevron-down")
	} else {
		icon.classList.add("bi-chevron-up")
		icon.classList.remove("bi-chevron-down")
	}
}
