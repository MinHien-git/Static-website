//toggle collapse button
function toggleCollapseButton(btn_id) {
	const btn = document.getElementById(btn_id)
	const icon = btn.querySelector("i")
	if (btn.classList.contains("collapsed")) {
		icon.classList.remove("bi-chevron-up")
		icon.classList.add("bi-chevron-down")
	} else {
		icon.classList.add("bi-chevron-up")
		icon.classList.remove("bi-chevron-down")
	}
}

function showToast(toast_id) {
	const toast_element = document.getElementById(toast_id)
	let toast_item = new bootstrap.Toast(toast_element)
	toast_item.show()
	console.log(toast_element)
}

function toggleTextarea(checkbox_id, textarea_id) {
	const textarea_el = document.getElementById(textarea_id)
	const checkbox_el = document.getElementById(checkbox_id)
	console.log(textarea_el)
	console.log(checkbox_el)
	if (checkbox_el.checked) {
		textarea_el.style.display = "flex"
	} else textarea_el.style.display = "none"
}
