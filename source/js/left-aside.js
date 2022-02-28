let navList = document.querySelectorAll(".nav-list .switch")
navList.forEach(el => {
	el.addEventListener("click", (e) => {
		if (el.parentNode.className.includes("active")) {
			el.parentNode.className = "fold-nav";
			el.parentNode.style.height = "40px";
		} else {
			el.parentNode.className += " active";
			let listNum = el.parentNode.querySelectorAll(".link").length;
			el.parentNode.style.height = listNum * 40 + "px" || "";
		}
	})
})


