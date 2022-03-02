// 初始化切换显示
(() => {
    let activeNum = 0
    let activeBar = document.querySelector(".active-bar");
    activeBar.style.cssText = "transform: translateX(0%) translateY(-50%);transition 300ms";
    let listRow = document.querySelectorAll(".list-row");
    listRow.forEach(el => {
        el.style.cssText = "transform: translateX(0%); transition: 300ms";
    })
    let btns = document.querySelectorAll(".btn-item .btn");
    btns.forEach((el, index) => {
        el.addEventListener("click", (event) => {
            // 阻止多次点击带来的错误
            if (index === activeNum) {
                return false;
            }
            let rowNum = document.querySelectorAll(".list-row").length,
                tim = 40;
            activeBar.style.cssText = `transform: translateX(${100 * index}%) translateY(-50%); transition: ${Math.abs(activeNum - index) * 300}ms`;
            listRow.forEach(el => {
                el.style.transition = `${Math.abs(activeNum - index) * 300}ms`;
            })
            if (Math.abs(activeNum - index) !== 0) {
                for (let i = 0; i < rowNum; i++) {
                    setTimeout(() => {
                        listRow[i].style.transform = `translateX(-${index * 33.333}%)`;
                    }, tim * i)
                }
                activeNum = index;
            }
        }, false)
    })
})()