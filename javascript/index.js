let canvas = document.querySelector("canvas");
let defColor = document.querySelector(".def-Color");

let widthSize = document.querySelector("#num")

if (Number(widthSize.value) < 1) {
    widthSize.value = 1;
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

// resize the line width;
widthSize.addEventListener("change", (e) => {
    ctx.lineWidth = Number(e.target.value);
})

let prevX = null;
let prevY = null;

let drow = false;
let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);
clrs.forEach(clr => {
    clr.addEventListener("click", ()=>{
        ctx.strokeStyle = clr.dataset.clr;
        defColor.style.backgroundColor = clr.dataset.clr;
    })
})

// save the sketch;
let saveBTN = document.querySelector(".save")

saveBTN.addEventListener("click", () => {
    let data = canvas.toDataURL("img/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";
    a.click()
})

// clear sketch;
let clearBTN = document.querySelector(".clear");
clearBTN.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})


// drowings
window.addEventListener("mousedown", (e)=> drow = true);
window.addEventListener("mouseup", (e) => drow = false);

window.addEventListener("mousemove", (e)=>{
    if(prevX == null || prevY == null || !drow) {
        prevX = e.clientX;
        prevY = e.clientY;
        return;
    }

    let mouseX = e.clientX;
    let mouseY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX,prevY);
    ctx.lineTo(mouseX,mouseY);
    ctx.stroke();

    prevX = e.clientX;
        prevY = e.clientY;
})
