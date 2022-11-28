function scrollUp() {
    if(window.scrollY > 500) {
        document.getElementById("back-to-top").style.opacity = "1";
    }
    else {
        document.getElementById("back-to-top").style.opacity = "0";
    }
}
function returnToTop() {
    scroll(0,0);
}
